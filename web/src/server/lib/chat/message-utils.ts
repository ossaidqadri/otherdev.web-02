import type { UIMessage } from 'ai'

/**
 * Slices messages up to and including the message with the given id.
 * Used for the industry-standard replace-and-replay edit pattern:
 * - keeps the edited message itself (index + 1 slice)
 * - discards everything after it (new fork point)
 *
 * This matches how Claude, ChatGPT, and Copilot handle edits:
 * once you edit anything, everything after is discarded and the
 * conversation replays from the edited message.
 */
export function sliceMessagesAtId(messages: UIMessage[], id: string): UIMessage[] {
  const index = messages.findIndex(m => m.id === id)
  if (index === -1) return messages
  return messages.slice(0, index + 1)
}

/**
 * Replaces the message at messageId with the replacement message.
 * The replacement must have the same id to maintain conversation continuity.
 * Returns the sliced + replaced message array ready for re-streaming.
 */
export function replaceMessageAtId(
  messages: UIMessage[],
  messageId: string,
  replacement: UIMessage,
): UIMessage[] {
  const index = messages.findIndex(m => m.id === messageId)
  if (index === -1) return messages
  const sliced = messages.slice(0, index + 1)
  sliced[index] = replacement
  return sliced
}
