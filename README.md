# otherdev-v2

> Digital platforms for pioneering creatives

Monorepo containing multiple web applications built by [otherdev](https://otherdev.com) — a full-service web development and design studio based in Karachi City.

## Projects

### [`web/`](web/README.md) — Main Portfolio Website

Next.js 16 application serving as otherdev's primary portfolio site.

**Stack:** Next.js 16 · React 19 · TypeScript 5.9 · Tailwind CSS 4 · Bun

**Highlights:**
- ~17 portfolio projects showcasing work for fashion, design, and enterprise clients
- AI-powered chat assistant (Loom) with Cohere RAG capabilities (embed-v4 + rerank-v4 via Vercel AI Gateway)
- Vercel AI Gateway with model fallback chains
- Radix UI + Tailwind component system
- SEO-optimized with OG images and structured data

**Start:** `cd web && bun install && bun dev`

---

### [`qwik-app/`](qwik-app/README.md) — Qwik City Exploration

Experimental Qwik implementation for performance-focused rendering.

**Stack:** Qwik · Qwik City · Tailwind CSS 4 · TypeScript

**Highlights:**
- Resumable hydration for near-instant interactivity
- 21 pre-built headless UI components via `@qwik-ui`
- File-based routing with layouts and loaders
- Server-side rendering with zero JS by default

**Start:** `cd qwik-app && bun install && bun dev`

## Quick Start

```bash
# Install all dependencies
bun install

# Run web (Next.js)
cd web && bun dev

# Or run qwik-app in another terminal
cd qwik-app && bun dev
```

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frameworks | Next.js 16, Qwik City |
| Languages | TypeScript 5.9, CSS |
| Runtime | Bun |
| UI | Radix UI, Tailwind CSS 4, Framer Motion |
| AI | Vercel AI Gateway, Groq, Mistral, Cohere (embed + rerank) |
| Vector Search | Qdrant (1536-dim, cosine similarity) |
| API | Next.js API Routes, TanStack Query, Zod |
| Cache/Rate Limit | Upstash Redis |
| Email | Nodemailer, Google APIs |
| Infrastructure | Vercel |

## Repository Structure

```
otherdev-v2/
├── web/                    # Next.js portfolio (main production app)
│   ├── src/
│   │   ├── app/           # App Router pages + API routes
│   │   ├── components/    # React components
│   │   ├── server/lib/    # Server utilities (rate limit, RAG, chat)
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities, projects data
│   ├── public/            # Static assets
│   └── package.json
├── qwik-app/              # Qwik City (experimental)
│   ├── src/
│   │   ├── routes/       # File-based routing
│   │   ├── components/    # Qwik components
│   │   └── entry.*.tsx    # Entry points
│   └── package.json
├── qwik-app-backup/       # Backup of previous qwik-app state
├── docs/                  # Project documentation
├── graphify-out/          # Knowledge graph analysis
├── AGENTS.md             # AI agent instructions
└── CLAUDE.md             # Claude Code guidance
```

## Documentation

- [`web/README.md`](web/README.md) — Full web app documentation
- [`qwik-app/CLAUDE.md`](qwik-app/CLAUDE.md) — Qwik project guidance
- [`AGENTS.md`](AGENTS.md) — AI agent configuration
- [`docs/`](docs/) — Additional project docs

## Contact

- **Website:** [otherdev.com](https://otherdev.com)
- **Location:** Karachi City, Pakistan
- **Instagram:** [@otherdev](https://instagram.com/other.dev)
- **LinkedIn:** [otherdev](https://linkedin.com/company/theotherdev)

---

© otherdev — All Rights Reserved