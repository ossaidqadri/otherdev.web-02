// ─── Text Models ────────────────────────────────────────────────────────────────
// groq/gpt-oss-120b: Primary — fast free tier via Groq
// cerebras/qwen-3-235b: First fallback (full model via Cerebras)
// cerebras/qwen-3-32b: Second fallback (smaller, faster via Cerebras)

export const TEXT_MODEL = 'groq/gpt-oss-120b'
export const TEXT_MODEL_FALLBACK = 'cerebras/qwen-3-235b-a22b-instruct-2507'
export const TEXT_MODEL_FALLBACK_2 = 'groq/qwen3-32b'

// ─── Vision Models ────────────────────────────────────────────────────────────
// mistral/pixtral-large: Primary — Mistral's multimodal model (images + text)
// groq/llama-4-scout: Fallback (multimodal via Groq)

export const VISION_MODEL = 'mistral/pixtral-large'
export const VISION_MODEL_FALLBACK = 'groq/llama-4-scout-17b-16e-instruct'