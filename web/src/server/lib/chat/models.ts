import { gateway } from 'ai'

// Primary model identifiers
const GROQ_GPT_OSS = 'openai/gpt-oss-120b'
const GROQ_SCOUT = 'groq/llama-4-scout-17b-16e-instruct'
const GROQ_VISION_MODEL = 'groq/llama-4-scout-17b-16e-instruct'

// Fallback chains — AI Gateway retries left-to-right on error/timeout
// Fast: Groq GPT-OSS → Groq Qwen → Mistral Large
export const FAST_MODEL_FALLBACKS = ['openai/gpt-oss-120b', 'groq/qwen-3-235b-a22b-instruct-2507', 'mistral/mistral-large-3']
// Vision: Groq Scout → Mistral (multimodal)
export const VISION_MODEL_FALLBACKS = ['mistral/pixtral-12b-2409']
// Capable uses same fallbacks as fast
export const CAPABLE_MODEL_FALLBACKS = FAST_MODEL_FALLBACKS

/**
 * Fast general-purpose model — Groq GPT-OSS primary.
 * Falls back to Groq Qwen → Mistral Large.
 */
export function getFastModel() {
  return gateway(GROQ_GPT_OSS)
}

/**
 * Capable model for complex tasks — Groq Scout primary.
 * Best for reasoning, tool calling, code generation, artifacts.
 */
export function getCapableModel() {
  return gateway(GROQ_SCOUT)
}

/**
 * Vision-capable model — Groq Scout (multimodal).
 * Falls back to Cohere Command-A-Vision.
 */
export function getVisionModel() {
  return gateway(GROQ_VISION_MODEL)
}

/**
 * Alias for getCapableModel — kept for backward compatibility.
 */
export function getChatModel() {
  return gateway(GROQ_SCOUT)
}
