import { gateway } from 'ai'

// Provider model identifiers
const GROQ_SCOUT = 'groq/llama-4-scout-17b-16e-instruct'
const GROQ_LLAMA = 'groq/llama-3.3-70b-versatile'
const CEREBRAS_QWEN = 'cerebras/qwen-3-235b-a22b-instruct-2507'
const MISTRAL_CODESTRAL = 'mistral/codestral'
const MINIMAX_M2_7 = 'minimax/minimax-m2.7'

// Fallback chain for fast model (Cerebras primary → Mistral → MiniMax)
export const FAST_MODEL_FALLBACKS = [MISTRAL_CODESTRAL, MINIMAX_M2_7]

// Fallback chain for capable model (Groq primary → Mistral → MiniMax)
export const CAPABLE_MODEL_FALLBACKS = [MISTRAL_CODESTRAL, MINIMAX_M2_7]

/**
 * Fast general-purpose model — Cerebras Qwen-3-235B primary (fastest).
 * Falls back to Mistral → MiniMax.
 */
export function getFastModel() {
  return gateway(CEREBRAS_QWEN)
}

/**
 * Capable model for complex tasks — Groq Scout primary.
 * Best for reasoning, tool calling, code generation, artifacts, vision.
 */
export function getCapableModel() {
  return gateway(GROQ_SCOUT)
}

/**
 * Vision-capable model — Groq Llama-4-Scout (multimodal).
 * MiniMax M-series blocks image input, so Groq is required.
 */
export function getVisionModel() {
  return gateway(GROQ_SCOUT)
}

/**
 * Alias for getCapableModel — kept for backward compatibility.
 */
export function getChatModel() {
  return gateway(GROQ_SCOUT)
}
