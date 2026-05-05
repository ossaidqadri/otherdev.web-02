import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'
import type { UIMessage } from 'ai'

const redis = Redis.fromEnv()

const CHAT_HISTORY_TTL_SECONDS = Number.parseInt(
  process.env.CHAT_HISTORY_TTL_SECONDS || `${14 * 24 * 60 * 60}`,
  10
)

function historyKey(chatId: string): string {
  return `chat:history:v1:${chatId}`
}

function safeParseJson<T>(value: unknown): T | null {
  if (typeof value !== 'string') return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export async function loadChatMessages(chatId: string): Promise<UIMessage[]> {
  try {
    const raw = await redis.get(historyKey(chatId))
    const parsed = safeParseJson<UIMessage[]>(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function saveChatMessages(chatId: string, messages: UIMessage[]): Promise<void> {
  try {
    await redis.setex(historyKey(chatId), CHAT_HISTORY_TTL_SECONDS, JSON.stringify(messages))
  } catch {
    // Do not fail request path when persistence is unavailable.
  }
}
