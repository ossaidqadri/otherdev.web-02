// ─── Text Models ───────────────────────────────────────────────────────────────
// gpt-oss-120b: Primary — fast free tier via Groq/Cerebras
// qwen-3-235b: First fallback
// qwen-3-32b: Second fallback

export const TEXT_MODEL = 'gpt-oss-120b'
export const TEXT_MODEL_FALLBACK = 'qwen-3-235b'
export const TEXT_MODEL_FALLBACK_2 = 'qwen-3-32b'

// ─── Vision Models ────────────────────────────────────────────────────────────
// pixtral-large: Primary — Mistral's multimodal model (images + text)
// llama-4-scout: Fallback (multimodal)

export const VISION_MODEL = 'pixtral-large'
export const VISION_MODEL_FALLBACK = 'llama-4-scout'