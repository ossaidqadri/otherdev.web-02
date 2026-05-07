import { consumeStream, type TextStreamPart, type ToolSet, type UIMessage, validateUIMessages } from 'ai'
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
      // Industry-standard replace-and-replay: client sends full history + the messageId to edit
      // We slice at messageId, replace with the new content, and re-run the model.
      if (!body.messageId || !Array.isArray(body.messages)) {
        return createJsonResponse({ error: 'messageId and messages required for edit-message' }, 400)
      }
      candidateMessages = replaceMessageAtId(body.messages, body.messageId, body.message)
    } else {
      // submit-user-message: append new user message to loaded history, or use provided full history
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

    // For submit: save AFTER streaming via onFinish (industry standard)
    // For edit: save AFTER streaming via onFinish
    // No pre-stream save — history is saved only after AI response is complete

    const { result, response, suggestions } = await handleStreamChat({
      messages: uiMessages,
      supportsArtifacts,
      request,
    })

    if (!result || !response) {
      return response as Response
    }

    // consumeStream ensures onFinish fires even if client disconnects
    result.consumeStream()

    return result.toUIMessageStreamResponse({
      originalMessages: uiMessages,
      generateMessageId: () => crypto.randomUUID(),
      onFinish: ({ messages }) => {
        saveChatMessages(chatId, messages).catch(err => {
          console.error('[chat] save failed:', err)
        })
      },
      messageMetadata({ part }: { part: TextStreamPart<ToolSet> }) {
        if (part.type === 'finish') {
          return { suggestions } as Record<string, unknown>
        }
        return undefined
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return createJsonResponse({ error: 'Internal server error. Please try again.' }, 500)
  }
}
