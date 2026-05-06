// ─── Text Models ────────────────────────────────────────────────────────────────
// groq/gpt-oss-120b:   Primary — Groq BYOK; gateway also falls back to Cerebras/Bedrock for this model
// alibaba/qwen-3-235b: First fallback — canonical slug, gateway routes via Cerebras or Groq
// groq/qwen3-32b:      Second fallback — canonical alibaba/qwen-3-32b served via Groq

export const TEXT_MODEL = 'groq/gpt-oss-120b'
export const TEXT_MODEL_FALLBACK = 'alibaba/qwen-3-235b'
export const TEXT_MODEL_FALLBACK_2 = 'groq/qwen3-32b'

// ─── Vision Models ────────────────────────────────────────────────────────────
// mistral/pixtral-large: Primary — Mistral's multimodal model (images + text)
// groq/llama-4-scout: Fallback (multimodal via Groq)

export const VISION_MODEL = 'mistral/pixtral-large'
export const VISION_MODEL_FALLBACK = 'groq/llama-4-scout-17b-16e-instruct'