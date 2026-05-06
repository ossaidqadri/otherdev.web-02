import { type UIMessage, validateUIMessages } from 'ai'
import { z } from 'zod'

import { createJsonResponse } from '@/server/lib/api-helpers'
import { handleStreamChat } from '@/server/lib/chat'
import { createArtifactTool, retrieveKnowledgeTool, tavilySearchTool } from '@/server/lib/chat/tools'
import { loadChatMessages, saveChatMessages } from '@/server/lib/chat-cache-store'
import { checkRateLimit, getClientIdentifier, REQUESTS_PER_WINDOW } from '@/server/lib/rate-limit'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const suggestionDataSchema = z.object({
  suggestion: z.string(),
})

export async function POST(request: Request): Promise<Response> {
  try {
    const clientId = getClientIdentifier(request)
    const rateLimitResult = await checkRateLimit(clientId)

    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      return createJsonResponse({ error: 'Too many requests. Please try again later.' }, 429, {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': REQUESTS_PER_WINDOW.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      })
    }

    const body = (await request.json()) as {
      id?: string
      message?: UIMessage
      messages?: UIMessage[]
      supportsArtifacts?: boolean
    }

    const chatId =
      typeof body.id === 'string' && body.id.trim().length > 0 ? body.id : crypto.randomUUID()
    const supportsArtifacts = body.supportsArtifacts === true

    let candidateMessages: UIMessage[] = []

    if (body.message) {
      const previousMessages = await loadChatMessages(chatId)
      candidateMessages = [...previousMessages, body.message]
    } else if (Array.isArray(body.messages)) {
      candidateMessages = body.messages
    }

    if (candidateMessages.length === 0) {
      return createJsonResponse({ error: 'No messages provided' }, 400)
    }

    // Filter to only valid messages
    candidateMessages = candidateMessages.filter(m => {
      if (m.role === 'user') {
        if (!m.parts || m.parts.length === 0) {
          return false
        }
        return m.parts.some(p => {
          if (p.type === 'text') return Boolean('text' in p && p.text?.trim())
          if (p.type === 'file') return true
          return false
        })
      }

      return Boolean(m.parts && m.parts.length > 0)
    })

    if (candidateMessages.length === 0) {
      return createJsonResponse({ error: 'No valid messages provided' }, 400)
    }

    // Pass artifact tool for validation (no execute = client-side only)
    const artifactTool = createArtifactTool

    // Validate messages
    let uiMessages: UIMessage[]
    try {
      uiMessages = (await validateUIMessages({
        messages: candidateMessages,
        dataSchemas: {
          suggestion: suggestionDataSchema,
        },
        tools: {
          // biome-ignore lint/suspicious/noExplicitAny: AI SDK tool validation
          createArtifact: artifactTool as any,
          // biome-ignore lint/suspicious/noExplicitAny: AI SDK tool validation
          retrieveKnowledge: retrieveKnowledgeTool as any,
          // biome-ignore lint/suspicious/noExplicitAny: AI SDK tool validation
          tavilySearch: tavilySearchTool as any,
        },
      })) as UIMessage[]
    } catch (error) {
      if (error instanceof (await import('ai')).TypeValidationError) {
        console.error('[VALIDATION] Invalid chat messages:', error.message)
        return createJsonResponse({ error: 'Invalid message payload' }, 400)
      }
      throw error
    }

    // Save messages before streaming
    await saveChatMessages(chatId, uiMessages)

    const { response } = await handleStreamChat({
      messages: uiMessages,
      supportsArtifacts,
      request,
    })

    const encoder = new TextEncoder()

    // Wrap the AI SDK stream in a TransformStream that converts to plain W3C SSE
    const transformer = new TransformStream({
      transform(chunk, controller) {
        switch (chunk.type) {
          case 'text-delta':
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'text', content: chunk.text })}\n\n`),
            )
            break
          case 'tool-call':
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'tool', name: chunk.toolName, args: chunk.args })}\n\n`,
              ),
            )
            break
          case 'tool-result':
            // Send tool result — Flutter can display or ignore
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'tool-result', name: chunk.toolName, result: chunk.result })}\n\n`,
              ),
            )
            break
          case 'finish':
            // AI SDK finish — nothing to forward, [DONE] comes after
            break
        }
      },
      flush(controller) {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(response.body!.pipeThrough(transformer), {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-RateLimit-Limit': REQUESTS_PER_WINDOW.toString(),
        'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return createJsonResponse({ error: 'Internal server error. Please try again.' }, 500)
  }
}
