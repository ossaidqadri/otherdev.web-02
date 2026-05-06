# API Reference

> Complete API documentation for Other Dev Next.js application

## Table of Contents

- [Overview](#overview)
- [Chat API (`/api/chat/stream`)](#chat-api-apichatstream)
- [Native Chat API (`/api/chat/native`)](#native-chat-api-apichatnative)
- [Contact API (`/api/contact`)](#contact-api-apicontact)
- [Transcribe API (`/api/transcribe`)](#transcribe-api-apitranscribe)
- [Process Document API (`/api/process-document`)](#process-document-api-apiprocess-document)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)

---

## Overview

The application exposes four API routes, all under `/api/`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/stream` | Streaming RAG chat with AI Gateway (web) |
| POST | `/api/chat/native` | Streaming chat via SSE (Flutter + web) |
| POST | `/api/contact` | Contact form submission |
| POST | `/api/transcribe` | Audio transcription via Groq Whisper |
| POST | `/api/process-document` | PDF/image OCR via Mistral |

### Tech Stack

- **Vercel AI SDK** — LLM integration, streaming, tool calling
- **Zod** — Runtime schema validation
- **Upstash Redis** — Rate limiting and chat message caching

---

## Chat API (`/api/chat/stream`)

**Location:** `src/app/api/chat/stream/route.ts`

Streaming RAG-powered AI chat endpoint using Vercel AI Gateway with automatic model fallbacks.

### Request Format

```
POST /api/chat/stream
```

**Headers:**
- `Content-Type: application/json`

**Body:**

```typescript
{
  id?: string;                    // Chat ID (auto-generated if omitted)
  message?: UIMessage;            // Single new message to append
  messages?: UIMessage[];         // Full message history (mutually exclusive with message)
  supportsArtifacts?: boolean;   // Enable artifact generation tool
}
```

**`UIMessage` type:**

```typescript
interface UIMessage {
  role: 'user' | 'assistant' | 'system';
  parts: Array<
    | { type: 'text'; text: string }
    | { type: 'file'; data: string; mediaType?: string }
  >;
  createdAt?: string;
}
```

### Response Format

Server-Sent Events (SSE) stream:

```
data: {"content":"Hello"}
data: {"content":" there!"}
data: {"content":"."}
data: [DONE]
```

**Chunk format:**

```typescript
// Text chunk
{ "content": "token string" }

// Suggestion chunk (AI SDK suggestion tool)
{ "type": "suggestion", "suggestion": "..." }

// Tool call chunk
{ "type": "tool-call", "tool": "tavilySearch", "input": {...} }
{ "type": "tool-call", "tool": "createArtifact", "input": {...} }

// Done signal
[DONE]
```

### Response Headers

```
Content-Type: text/event-stream
Cache-Control: no-cache
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1740000000000
```

### Tool-Driven Routing

The LLM decides at runtime via `toolChoice: 'auto'` — there is no pre-flight query classification. The model chooses which tool to call based on the system prompt guidance:

| Tool | When the model calls it |
|------|------------------------|
| `retrieveKnowledge` | Questions about Other Dev's projects, services, team, or domain knowledge |
| `tavilySearch` | General knowledge, current events, or factual queries |
| `createArtifact` | Requests to build or create something (gated by `supportsArtifacts`) |
| *(no tool)* | Conversational acknowledgments ("ok", "thanks", "hi") |

### RAG Context

When the model calls `retrieveKnowledge`:
1. Generate embedding via **Cohere `embed-v4.0`** via AI Gateway (1536-dim)
2. Search **Qdrant** collection `otherdev_documents` (3× results, cosine similarity)
3. Re-rank results via **Cohere `rerank-v4-fast`** cross-encoder (always-on)
4. Return formatted context to the model
5. Response cached in Upstash Redis (24-hour TTL)

### Tools

#### tavilySearch

Used for `general_chat` queries. Returns web search results.

```typescript
// Tool call format
{ "type": "tool-call", "tool": "tavilySearch", "input": { "query": "..." } }

// Result
{ "type": "tool-result", "tool": "tavilySearch", "result": { "query": "...", "answer": "..." } }
```

#### createArtifact

Used when user requests building/creating something (code, calculator, form, etc.).

```typescript
// Tool call format
{ "type": "tool-call", "tool": "createArtifact", "input": {
  "title": "Project Calculator",
  "description": "...",
  "code": "<!DOCTYPE html><style>body{...}</style><script>...</script>"
} }

// Result: rendered as iframe in chat
```

### Environment Variables

```bash
GROQ_API_KEY=your-groq-api-key
QDRANT_URL=https://your-qdrant.cloud
QDRANT_API_KEY=your-qdrant-key
TAVILY_API_KEY=your-tavily-key
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
RAG_SIMILARITY_THRESHOLD=0.1
RAG_MATCH_COUNT=5
RAG_MAX_MESSAGE_LENGTH=500
CHAT_HISTORY_TTL_SECONDS=1209600
RAG_RETRIEVAL_CACHE_TTL_SECONDS=21600
CHAT_RESPONSE_CACHE_TTL_SECONDS=86400
```

---

## Native Chat API (`/api/chat/native`)

**Location:** `src/app/api/chat/native/route.ts`

SSE endpoint for native Flutter and web clients. Same streaming handler as `/api/chat/stream` but returns raw SSE without the Vercel AI SDK `useChat` transport wrapper.

### Request Format

```
POST /api/chat/native
```

**Headers:**
- `Content-Type: application/json`

**Query Parameters:**
- `key` — Auth key (required; `EventSource` cannot set custom headers)

**Body:**
```json
{
  "id": "chat-id-uuid",
  "message": { "role": "user", "parts": [{ "type": "text", "text": "Hello" }] },
  "messages": [],
  "supportsArtifacts": true,
  "trigger": "submit-user-message"
}
```

### Response Format

Raw SSE stream — each event is `data: {...}` JSON:

```json
{"content":"Hello"}
{"content":" world"}
{"type":"finish","suggestions":["Ask about projects","Try our contact form"]}
```

On error:
```json
{"error":"Too many requests. Please try again later."}
```

### Key Features

- **Tool-driven routing:** Model decides whether to call `retrieveKnowledge`, `tavilySearch`, or `createArtifact`
- **`messageMetadata` suggestions:** Follow-up suggestions sent via `finish` event metadata (industry standard)
- **`trigger: 'edit-message'`:** Causes AI to regenerate response from edited user message (replace-and-replay)
- Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`

---

## Contact API (`/api/contact`)

**Location:** `src/app/api/contact/route.ts`

Contact form submission with dual integration (Google Sheets + Gmail).

### Request Format

```
POST /api/contact
```

**Headers:**
- `Content-Type: application/json`

**Body:**

```typescript
{
  name: string;       // Min 2 characters
  companyName: string; // Required
  email: string;       // Valid email format
  subject: string;     // Required
  message: string;     // Min 10 characters
}
```

### Response

**Success (200):**

```json
{ "message": "Form submitted successfully" }
```

**Validation Error (400):**

```json
{
  "error": {
    "fieldErrors": {
      "email": ["Please enter a valid email address."],
      "message": ["Message must be at least 10 characters."]
    }
  }
}
```

**Rate Limited (429):**

```json
{
  "error": "Too many submissions. Try again after 3:45 PM."
}
```

**Server Error (500):**

```json
{ "error": "Failed to submit. Please try again." }
```

### Rate Limiting

- **5 requests per minute per IP** (contact-specific limiter)
- Separate from chat rate limit
- Returns `429` with human-readable retry time

### Backend Operations

1. Validate input with Zod schema
2. Append row to Google Sheet (timestamp + all fields)
3. Send email via Gmail SMTP

Both operations run in parallel via `Promise.allSettled()` — partial success (one fails, one succeeds) returns success.

### Environment Variables

```bash
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
GMAIL_RECIPIENTS=recipient1@example.com,recipient2@example.com  # Optional, defaults to GMAIL_USER
```

---

## Transcribe API (`/api/transcribe`)

**Location:** `src/app/api/transcribe/route.ts`

Audio transcription using Groq Whisper via Vercel AI SDK.

### Request Format

```
POST /api/transcribe
Content-Type: multipart/form-data
```

**Body (FormData):**

| Field | Type | Description |
|-------|------|-------------|
| `audio` | File | Audio file (required) |

**Supported formats:** Any format supported by Groq Whisper (mp3, wav, m4a, webm, etc.)

### Response Format

Server-Sent Events (SSE) streaming transcript:

```
data: {"type":"transcript-chunk","content":"Hello"}
data: {"type":"transcript-chunk","content":" world"}
data: {"type":"transcript-complete","content":"Hello world"}
data: [DONE]
```

**Chunk types:**

| Type | Description |
|------|-------------|
| `transcript-chunk` | Partial transcript segment (~50 chars) |
| `transcript-complete` | Full transcript (sent when finished) |
| `[DONE]` | Stream termination signal |

### Response Headers

```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

### Error Responses

**No audio file (400):**

```json
{ "error": "No audio file provided" }
```

**Transcription failure (500):**

```json
{ "error": "Transcription failed: <error message>" }
```

### Environment Variables

```bash
GROQ_API_KEY=your-groq-api-key
```

---

## Process Document API (`/api/process-document`)

**Location:** `src/app/api/process-document/route.ts`

PDF and image OCR using Mistral via Vercel AI SDK.

### Request Format

```
POST /api/process-document
Content-Type: multipart/form-data
```

**Body (FormData):**

| Field | Type | Description |
|-------|------|-------------|
| `file` | File | PDF or image file (required) |

**Supported file types:**
- PDFs: `application/pdf`
- Images: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/heic`, `image/heif`

### Response

**Success (200):**

```json
{ "text": "Extracted text from document..." }
```

**No file provided (400):**

```json
{ "error": "No file provided" }
```

**File too large (400):**

```json
{ "error": "File exceeds 50MB limit" }
```

**Unsupported type (400):**

```json
{ "error": "Unsupported file type for OCR: video/mp4" }
```

**API key not configured (500):**

```json
{ "error": "Mistral API key not configured" }
```

**OCR failure (500):**

```json
{ "error": "OCR failed: <error message>" }
```

### File Size Limit

**50MB maximum** — enforced before OCR processing.

### Environment Variables

```bash
MISTRAL_API_KEY=your-mistral-api-key
```

---

## Rate Limiting

All API routes enforce rate limiting via Upstash Redis.

### Rate Limit Headers

All responses include rate limit information:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1740000000000
```

### Limits by Endpoint

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/chat/stream` | 10 requests | 1 minute |
| `/api/contact` | 5 requests | 1 minute |
| `/api/transcribe` | No limit | — |
| `/api/process-document` | No limit | — |

### 429 Response Format

**Chat API:**

```json
{
  "error": "Too many requests. Please try again later."
}
```

With headers: `Retry-After: <seconds>`

**Contact API:**

```json
{
  "error": "Too many submissions. Try again after 3:45 PM."
}
```

---

## Error Handling

### HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 400 | Bad request / validation error |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

### Error Response Format

All errors return JSON with an `error` field:

```json
{ "error": "Human-readable error message" }
```

For validation errors, the response includes field-level detail:

```json
{
  "error": {
    "fieldErrors": {
      "email": ["Please enter a valid email address."],
      "message": ["Message must be at least 10 characters."]
    }
  }
}
```

### Chat-Specific Errors

| Error | Status | Description |
|-------|--------|-------------|
| `No messages provided` | 400 | Empty request body |
| `No valid messages provided` | 400 | Messages failed validation |
| `Invalid message payload` | 400 | AI SDK message validation failed |
| `Too many requests` | 429 | Rate limit exceeded |
| `Internal server error` | 500 | Unexpected error in chat handler |

---

## Type Safety

All API responses are fully typed. Example TypeScript usage:

```typescript
// Contact form
type ContactInput = {
  name: string;
  companyName: string;
  email: string;
  subject: string;
  message: string;
};

const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

if (!response.ok) {
  const error = await response.json();
  console.error(error.error);
}

// Chat streaming
const response = await fetch('/api/chat/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [{ role: 'user', parts: [{ type: 'text', text: query }] }] }),
});

const reader = response.body!.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') return;
      console.log(JSON.parse(data));
    }
  }
}
```

---

For more information, see:
- [Developer Guide](./DEVELOPER_GUIDE.md) - Development workflow
- [Architecture](./ARCHITECTURE.md) - System architecture
- [Component Library](./COMPONENTS.md) - UI components