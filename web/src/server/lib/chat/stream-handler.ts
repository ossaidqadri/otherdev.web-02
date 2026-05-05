import {
  convertToModelMessages,
  generateObject,
  type ModelMessage,
  stepCountIs,
  streamText,
  type TextStreamPart,
  type ToolSet,
  type UIMessage,
  validateUIMessages,
} from 'ai'
import { after } from 'next/server'
import { z } from 'zod'

import { createJsonResponse } from '@/server/lib/api-helpers'
import {
  getCachedRetrievalContext,
  setCachedRetrievalContext,
} from '@/server/lib/chat-cache-store'
import {
  type ChatRoute,
  classifyChatRoute,
  detectQueryQuality,
  type QueryQuality,
  shouldUseRagFromDecision,
} from '@/server/lib/chat-routing'
import {
  CAPABLE_MODEL_FALLBACKS,
  FAST_MODEL_FALLBACKS,
  VISION_MODEL_FALLBACKS,
  getCapableModel,
  getFastModel,
  getVisionModel,
} from './models'
import { createArtifactTool, tavilySearchTool } from './tools'

export interface HandleStreamChatOptions {
  chatId: string
  messages: UIMessage[]
  supportsArtifacts: boolean
  request: Request
}

export interface HandleStreamChatResult {
  response: Response
  rateLimit: {
    limit: number
    remaining: number
  }
}

const RAG_MAX_MESSAGE_LENGTH = Number.parseInt(process.env.RAG_MAX_MESSAGE_LENGTH || '500', 10)
const RAG_SIMILARITY_THRESHOLD = Number.parseFloat(process.env.RAG_SIMILARITY_THRESHOLD || '0.1')
const RAG_MATCH_COUNT = Number.parseInt(process.env.RAG_MATCH_COUNT || '5', 10)

const INJECTION_PATTERN =
  /\[INST\]|\[\/INST\]|<\|im_start\|>|<\|im_end\|>|<\|system\|>|<\|user\|>|<\|assistant\|>/gi

const suggestionDataSchema = z.object({
  suggestion: z.string(),
})

const SUGGESTIONS_SCHEMA = z.object({
  suggestions: z.array(z.string()).min(2).max(3),
})

function sanitizeInput(text: string): string {
  return text.replace(INJECTION_PATTERN, '').slice(0, RAG_MAX_MESSAGE_LENGTH)
}

function extractUserText(message: UIMessage | undefined): string {
  if (!message || message.role !== 'user' || !Array.isArray(message.parts)) {
    return ''
  }
  return message.parts
    .filter(part => part.type === 'text')
    .map(part => (part as { type: 'text'; text: string }).text)
    .join(' ')
}

function isDomainRoute(route: ChatRoute): boolean {
  return route === 'otherdev_rag' || route === 'otherdev_no_rag'
}

function scopeMessagesForRoute(messages: UIMessage[], activeRoute: ChatRoute): UIMessage[] {
  if (messages.length <= 1) return messages

  const targetIsDomain = isDomainRoute(activeRoute)
  let startIndex = 0

  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const msg = messages[i]
    if (msg.role !== 'user') continue

    const rawUserText = extractUserText(msg)
    const query = sanitizeInput(rawUserText).replace(/otherdev/gi, 'Other Dev')
    const decision = classifyChatRoute(query, detectQueryQuality(query))
    const decisionIsDomain = isDomainRoute(decision.route)

    if (decisionIsDomain !== targetIsDomain) {
      startIndex = i + 1
      break
    }
  }

  const scoped = messages.slice(startIndex)
  return scoped.length > 0 ? scoped : [messages[messages.length - 1]]
}

function getAdaptiveThreshold(queryQuality: QueryQuality): number {
  if (queryQuality.isConversational) {
    return RAG_SIMILARITY_THRESHOLD * 0.5
  }
  if (queryQuality.isLowQuality || queryQuality.hasRepeatedWords) {
    return RAG_SIMILARITY_THRESHOLD * 0.7
  }
  if (queryQuality.tokenCount < 5) {
    return RAG_SIMILARITY_THRESHOLD * 0.8
  }
  return RAG_SIMILARITY_THRESHOLD
}

interface SimilarDocument {
  similarity: number
  metadata: { title: string }
  content: string
}

function buildContext(similarDocs: SimilarDocument[], queryQuality: QueryQuality): string {
  if (similarDocs.length > 0) {
    return similarDocs
      .map(
        (doc, idx) =>
          `Document ${idx + 1} (Relevance: ${(doc.similarity * 100).toFixed(1)}%):\nTitle: ${doc.metadata.title}\n${doc.content}\n`
      )
      .join('\n---\n\n')
  }

  const baseFacts =
    'Other Dev is a web development and design studio based in Karachi, Pakistan. Specializations: fashion, e-commerce, real estate, legal tech, SaaS, enterprise systems. Website: https://otherdev.com'

  if (queryQuality.isConversational) {
    return `Context: ${baseFacts}. User sent a conversational message. Respond naturally and helpfully. Format all links and contact info in blue text.`
  }

  if (queryQuality.isLowQuality || queryQuality.hasRepeatedWords) {
    return `Context: ${baseFacts}. User query is unclear. Respond naturally and offer to help with information about Other Dev's work, services, or projects. Format all links and contact info in blue text.`
  }

  return `Context: ${baseFacts}. Provide helpful general information about Other Dev's projects, services, and capabilities based on common topics. Format all links and contact info in blue text.`
}

// Sanitize user message text parts in standard ModelMessage[] (injection protection + length cap)
function sanitizeModelMessages(messages: ModelMessage[]): ModelMessage[] {
  return messages.map(msg => {
    if (msg.role !== 'user' || !Array.isArray(msg.content)) return msg

    const content = msg.content.map(part => {
      if (part.type === 'text') {
        return { ...part, text: sanitizeInput(part.text) }
      }
      return part
    })

    const hasText = content.some(
      p => p.type === 'text' && (p as { type: 'text'; text: string }).text.trim()
    )

    if (!hasText) {
      return { ...msg, content: [...content, { type: 'text' as const, text: ' ' }] }
    }

    return { ...msg, content }
  })
}

// convertToModelMessages maps FileUIPart.url → FilePart.data, so a data: URI becomes
// { type: 'file', data: 'data:image/webp;base64,...' }. The AI SDK's downloadAssets
// calls new URL(data) on strings, which succeeds for data: URIs, then tries to fetch
// them as HTTP resources and fails. Converting to Buffer bypasses the download path.
function resolveDataURIs(messages: ModelMessage[]): ModelMessage[] {
  // biome-ignore lint/suspicious/noExplicitAny: ModelMessage union content arrays resist narrow inference
  return messages.map((msg): any => {
    if (!Array.isArray(msg.content)) return msg
    const content = (msg.content as Array<{ type: string; [k: string]: unknown }>).map(part => {
      if (part.type === 'image') {
        const image = part.image as string | URL | Uint8Array
        if (typeof image === 'string' && image.startsWith('data:')) {
          const commaIdx = image.indexOf(',')
          const header = image.slice(0, commaIdx)
          const base64 = image.slice(commaIdx + 1)
          return {
            ...part,
            image: Buffer.from(base64, 'base64'),
            mediaType: (part.mediaType as string | undefined) ?? header.match(/data:([^;]+)/)?.[1],
          }
        }
      }
      if (part.type === 'file') {
        const data = part.data as string | Uint8Array
        if (typeof data === 'string' && data.startsWith('data:')) {
          const commaIdx = data.indexOf(',')
          const base64 = data.slice(commaIdx + 1)
          return { ...part, data: Buffer.from(base64, 'base64') }
        }
      }
      return part
    })
    return { ...msg, content }
  }) as ModelMessage[]
}

// Inject RAG context into the last user message's first text part
function injectRagContext(messages: ModelMessage[], ragContext: string): ModelMessage[] {
  if (!messages.length) return messages

  const result = [...messages]
  const lastIdx = result.length - 1
  const lastMsg = result[lastIdx]

  if (lastMsg.role !== 'user' || !Array.isArray(lastMsg.content)) return result

  const content = [...lastMsg.content]
  const textIdx = content.findIndex(p => p.type === 'text')
  if (textIdx < 0) return result

  const textPart = content[textIdx] as { type: 'text'; text: string }
  content[textIdx] = {
    type: 'text',
    text: `=== CONTEXT ===\n${ragContext}\n=== END CONTEXT ===\n\n${textPart.text}`,
  }
  result[lastIdx] = { ...lastMsg, content }
  return result
}

/**
 * Core streaming handler — all chat routes flow through here.
 * Uses AI Gateway automatic failover (Groq primary → MiniMax fallback).
 * Suggestions are generated via generateObject before streaming starts.
 */
export async function handleStreamChat({
  chatId,
  messages,
  supportsArtifacts,
  request,
}: HandleStreamChatOptions): Promise<HandleStreamChatResult> {
  const checkRateLimit = (await import('@/server/lib/rate-limit')).checkRateLimit
  const getClientIdentifier = (await import('@/server/lib/rate-limit')).getClientIdentifier
  const REQUESTS_PER_WINDOW = (await import('@/server/lib/rate-limit')).REQUESTS_PER_WINDOW

  const clientId = getClientIdentifier(request)
  const rateLimitResult = await checkRateLimit(clientId)

  if (!rateLimitResult.allowed) {
    const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
    return {
      response: createJsonResponse({ error: 'Too many requests. Please try again later.' }, 429, {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': REQUESTS_PER_WINDOW.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      }),
      rateLimit: { limit: REQUESTS_PER_WINDOW, remaining: 0 },
    }
  }

  const lastUserMessage = messages.filter((m: UIMessage) => m.role === 'user').pop()
  const lastUserText = extractUserText(lastUserMessage)
  const sanitizedQuery = sanitizeInput(lastUserText)
  const normalizedQuery = sanitizedQuery.replace(/otherdev/gi, 'Other Dev')

  const queryQuality = detectQueryQuality(normalizedQuery)
  const routeDecision = classifyChatRoute(normalizedQuery, queryQuality)
  const ragEnabled = shouldUseRagFromDecision(routeDecision)
  const enableArtifacts = supportsArtifacts && queryQuality.needsArtifact
  const scopedUIMessages = scopeMessagesForRoute(messages, routeDecision.route)

  const hasImageContent = scopedUIMessages.some((m: UIMessage) =>
    m.parts?.some(
      p =>
        p.type === 'file' &&
        'mediaType' in p &&
        (p as { mediaType?: string }).mediaType?.startsWith('image/')
    )
  )

  const isSearchLikeQuery = !queryQuality.isConversational && queryQuality.tokenCount >= 3
  const enableWebSearch =
    routeDecision.route === 'general_chat' &&
    isSearchLikeQuery &&
    !hasImageContent &&
    !enableArtifacts
  const selectedModel = hasImageContent
    ? getVisionModel()
    : enableArtifacts || enableWebSearch
      ? getCapableModel()
      : getFastModel()

  // Build tools based on route
  const tools: ToolSet = {}
  if (enableWebSearch) {
    tools.tavilySearch = tavilySearchTool
  }
  if (enableArtifacts) {
    tools.createArtifact = createArtifactTool
  }

  // Pass artifact tool for validation (no execute = client-side only)
  const artifactTool = createArtifactTool

  // Validate messages
  let uiMessages: UIMessage[]
  try {
    uiMessages = (await validateUIMessages({
      messages: scopedUIMessages,
      dataSchemas: {
        suggestion: suggestionDataSchema,
      },
      tools: {
        // biome-ignore lint/suspicious/noExplicitAny: AI SDK tool validation
        createArtifact: artifactTool as any,
        // biome-ignore lint/suspicious/noExplicitAny: AI SDK tool validation
        tavilySearch: tavilySearchTool as any,
      },
    })) as UIMessage[]
  } catch (error) {
    if (error instanceof (await import('ai')).TypeValidationError) {
      console.error('[VALIDATION] Invalid chat messages:', error.message)
      return {
        response: createJsonResponse({ error: 'Invalid message payload' }, 400),
        rateLimit: { limit: REQUESTS_PER_WINDOW, remaining: rateLimitResult.remaining },
      }
    }
    throw error
  }

  // Fetch RAG context before streaming
  let ragContext: string | null = null
  if (ragEnabled) {
    try {
      const { generateEmbedding } = await import('@/server/lib/rag/embeddings')
      const { searchSimilarDocuments } = await import('@/server/lib/rag/vector-search')

      const cachedContext = await getCachedRetrievalContext(normalizedQuery)
      if (cachedContext) {
        ragContext = cachedContext
      } else {
        const queryEmbedding = await generateEmbedding(normalizedQuery)
        const adaptiveThreshold = getAdaptiveThreshold(queryQuality)
        const similarDocs = await searchSimilarDocuments(
          normalizedQuery,
          queryEmbedding,
          adaptiveThreshold,
          RAG_MATCH_COUNT
        )
        ragContext = buildContext(similarDocs, queryQuality)
        after(() => setCachedRetrievalContext(normalizedQuery, ragContext as string))
      }
    } catch (error) {
      console.error(
        '[RAG] Error during RAG pipeline:',
        error instanceof Error ? error.message : error
      )
    }
  }

  // Convert UIMessages to AI SDK ModelMessage[] format
  const rawModelMessages = await convertToModelMessages(uiMessages, {
    tools: { createArtifact: artifactTool },
  })

  // Sanitize, resolve data URIs, inject RAG context
  const sanitizedMessages = sanitizeModelMessages(rawModelMessages)
  const resolvedMessages = resolveDataURIs(sanitizedMessages)
  const modelMessages = ragContext
    ? injectRagContext(resolvedMessages, ragContext)
    : resolvedMessages

  // Generate suggestions before streaming (ew/web pattern)
  const suggestionsPromise = generateObject({
    model: getCapableModel(),
    schema: SUGGESTIONS_SCHEMA,
    system:
      'Generate 2-3 short follow-up questions (max 10 words each) a user might ask next about web development, design, or Other Dev services. Be specific to what was asked. Return only the questions.',
    prompt: `User asked: "${normalizedQuery}".`,
  })
    .then(r => r.object.suggestions)
    .catch(err => {
      console.error('[chat] suggestion generation failed:', err)
      return [] as string[]
    })

  const resolvedSuggestions = await suggestionsPromise

  const systemPrompt =
    routeDecision.route === 'general_chat' ? getGeneralSystemPrompt() : getSystemPromptDomain()

  const getFallbackChain = () => {
    if (hasImageContent) return VISION_MODEL_FALLBACKS
    if (enableArtifacts || enableWebSearch) return CAPABLE_MODEL_FALLBACKS
    return FAST_MODEL_FALLBACKS
  }

  const result = streamText({
    model: selectedModel,
    system: systemPrompt,
    messages: modelMessages,
    temperature: 0.7,
    maxOutputTokens: enableArtifacts ? 4096 : 1024,
    stopWhen: stepCountIs(5),
    toolChoice: 'auto',
    tools,
    providerOptions: {
      gateway: {
        models: getFallbackChain(),
      },
    },
  })

  return {
    response: result.toUIMessageStreamResponse({
      messageMetadata({ part }: { part: TextStreamPart<ToolSet> }) {
        if (part.type === 'finish') {
          // Attach suggestions to the finish message
          return { suggestions: resolvedSuggestions } as Record<string, unknown>
        }
        return undefined
      },
    }),
    rateLimit: { limit: REQUESTS_PER_WINDOW, remaining: rateLimitResult.remaining },
  }
}

// Called per-request so the date is never stale from module-load time
function getGeneralSystemPrompt(): string {
  return `You are a helpful, neutral AI assistant.
Current date: ${new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}

Provide direct, accurate answers for general topics in a concise conversational tone.

RULES
1. ALWAYS be aware of today's date above — do not say "current" events are from previous years.
2. Use tavilySearch tool when asked about current events, news, or real-time information.
3. Do not pretend to have live access to breaking events unless the user provides context.
4. For high-stakes or time-sensitive topics (news, wars, laws, finance), provide a best-effort current status first when web search context is available, include concrete dates when relevant, and avoid fabricated specifics.
5. Keep answers practical and clear.
6. For short conversational inputs, reply naturally.`
}

function getSystemPromptDomain(): string {
  return `You are a helpful assistant representing Other Dev, a web development and design studio based in Karachi, Pakistan.

Answer questions about Other Dev's projects, services, technologies, and capabilities in a professional, conversational tone.

CRITICAL RULES
1. NEVER say "I don't have information", "I don't have data", "I cannot find", or similar phrases claiming lack of knowledge.
2. NEVER mention technical limitations, missing data, or system constraints.
3. If a question is unclear, vague, or conversational (like "ok", "sure", "thanks"), respond naturally and helpfully without claiming you lack information.
4. Always provide value in your response, even for brief or unclear queries.

ARTIFACT CAPABILITY
- When the user asks you to BUILD, CREATE, MAKE, or GENERATE any interactive web content (websites, apps, games, calculators, dashboards, visualizations, forms, landing pages, etc.), you MUST use the createArtifact tool.
- The createArtifact tool allows you to generate complete, self-contained HTML/CSS/JS applications that will be displayed in a live preview panel.
- Always use modern frameworks via CDN when appropriate: React (unpkg.com/react), Tailwind CSS (cdn.tailwindcss.com), Vue, etc.
- Make artifacts visually polished, responsive, and production-ready.
- For building/creating requests, focus on delivering a working interactive artifact rather than just code snippets.

GUIDELINES
1. Use the context provided in the user message to answer questions accurately and factually.
2. When specific details aren't in the context, provide general helpful information about Other Dev and invite them to connect for specifics.
3. When discussing projects, include relevant details like the project name and year when available.
4. Keep responses concise and well-structured, using 2-3 short paragraphs maximum.
5. Use Markdown formatting when it helps clarity.
6. Focus on being helpful, engaging, and client-friendly.
7. For conversational inputs like "sure", "ok", "thanks", respond naturally and ask how you can help further.

CONTACT INFORMATION
- Website: https://otherdev.com
- Location: Karachi, Pakistan
- Specializations: fashion, e-commerce, real estate, legal tech, SaaS, enterprise systems

FORMAT RULE: Always format URLs as [label](url) markdown links — never output bare URLs. Phone numbers as [tel:+...](tel:+...), emails as [email](mailto:...). Example: [otherdev.com](https://otherdev.com), not https://otherdev.com.

Be professional, friendly, and focused on helping potential clients learn about Other Dev.`
}
