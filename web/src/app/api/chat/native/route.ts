import { type UIMessage, validateUIMessages } from 'ai'
import { z } from 'zod'

import { createJsonResponse } from '@/server/lib/api-helpers'
import { handleStreamChat } from '@/server/lib/chat'
import { createArtifactTool, retrieveKnowledgeTool, tavilySearchTool } from '@/server/lib/chat/tools'
import { loadChatMessages, saveChatMessages } from '@/server/lib/chat-cache-store'
import { checkRateLimit, getClientIdentifier, REQUESTS_PER_WINDOW } from '@/server/lib/rate-limit'
import { replaceMessageAtId } from '@/server/lib/chat/message-utils'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const suggestionDataSchema = z.object({
  suggestion: z.string(),
})

type RequestBody = {
  id?: string
  message?: UIMessage
  messages?: UIMessage[]
  supportsArtifacts?: boolean
  trigger?: 'submit-user-message' | 'edit-message'
  messageId?: string
}

function toSseChunk(chunk: { type: string; [k: string]: unknown }): Uint8Array {
  const encoder = new TextEncoder()
  switch (chunk.type) {
    case 'text-delta':
      return encoder.encode(`data: ${JSON.stringify({ type: 'text', content: chunk.text })}\n\n`)
    case 'tool-call':
      return encoder.encode(
        `data: ${JSON.stringify({ type: 'tool', name: chunk.toolName, args: chunk.args })}\n\n`,
      )
    case 'tool-result':
      return encoder.encode(
        `data: ${JSON.stringify({ type: 'tool-result', name: chunk.toolName, result: chunk.result })}\n\n`,
      )
    case 'reasoning':
      return encoder.encode(
        `data: ${JSON.stringify({ type: 'reasoning', content: chunk.textDelta })}\n\n`,
      )
    case 'error':
      return encoder.encode(
        `data: ${JSON.stringify({ type: 'error', message: chunk.error })}\n\n`,
      )
    case 'finish': {
      const finishData = {
        type: 'finish',
        reason: chunk.finishReason,
        usage: chunk.usage,
      }
      return encoder.encode(`data: ${JSON.stringify(finishData)}\n\n`)
    }
    default:
      return encoder.encode(
        `data: ${JSON.stringify({ type: 'unknown', chunkType: chunk.type })}\n\n`,
      )
  }
}

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

    const body = (await request.json()) as RequestBody

    const chatId =
      typeof body.id === 'string' && body.id.trim().length > 0 ? body.id : crypto.randomUUID()
    const supportsArtifacts = body.supportsArtifacts === true
    const isEditMessage = body.trigger === 'edit-message'

    let candidateMessages: UIMessage[] = []

    if (isEditMessage) {
      if (!body.messageId || !Array.isArray(body.messages)) {
        return createJsonResponse({ error: 'messageId and messages required for edit-message' }, 400)
      }
      candidateMessages = replaceMessageAtId(body.messages, body.messageId, body.message)
    } else {
      if (body.message) {
        const previousMessages = await loadChatMessages(chatId)
        candidateMessages = [...previousMessages, body.message]
      } else if (Array.isArray(body.messages)) {
        candidateMessages = body.messages
      }
    }

    if (candidateMessages.length === 0) {
      return createJsonResponse({ error: 'No messages provided' }, 400)
    }

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

    const artifactTool = createArtifactTool

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

    if (!isEditMessage) {
      await saveChatMessages(chatId, uiMessages)
    }

    const { response } = await handleStreamChat({
      messages: uiMessages,
      supportsArtifacts,
      request,
    })

    // For edit-message: consume stream manually to get result.response.messages for Redis
    // For submit-user-message: use existing pipeThrough (no message tracking needed post-stream)
    if (isEditMessage) {
      const chunks: Uint8Array[] = []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for await (const chunk of (response as any).fullStream) {
        chunks.push(toSseChunk(chunk))
      }
      chunks.push(new TextEncoder().encode('data: [DONE]\n\n'))

      // result.response is a PromiseLike — accessing triggers full stream consumption
      const resultResponse = await (response as { response: Promise<{ messages: unknown[] }> }).response
      const streamedMessages = resultResponse.messages as UIMessage[]
      await saveChatMessages(chatId, streamedMessages)

      const stream = new ReadableStream({
        start(controller) {
          for (const chunk of chunks) {
            controller.enqueue(chunk)
          }
          controller.close()
        },
      })

      return new Response(stream, {
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
    }

    // submit-user-message: use pipeThrough with explicit chunk type coverage
    const encoder = new TextEncoder()

    const transformer = new TransformStream({
      transform(chunk, controller) {
        controller.enqueue(toSseChunk(chunk as { type: string; [k: string]: unknown }))
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
