# Other Dev Documentation

> Complete documentation for the Other Dev Next.js application

## Overview

This directory contains comprehensive documentation for developers working on the Other Dev portfolio and agency website. The application is built with Next.js 16.2.1, React 19.2.4, TypeScript, and direct API routes for type-safe API communication.

## Documentation Structure

### Core Documentation

| Document | Description |
|----------|-------------|
| [Developer Guide](./DEVELOPER_GUIDE.md) | Getting started, workflow, common tasks, and best practices |
| [API Reference](./API_REFERENCE.md) | Complete API route documentation with examples |
| [Architecture](./ARCHITECTURE.md) | System architecture, data flow, and technical design |
| [Component Library](./COMPONENTS.md) | UI component documentation with usage examples |

### Quick Links

- **Project README**: [../README.md](../README.md) - Project overview and quick start
- **Environment Setup**: See [Developer Guide - Getting Started](./DEVELOPER_GUIDE.md#getting-started)
- **API Endpoints**: See [API Reference - API Routers](./API_REFERENCE.md#api-routers)
- **Component Catalog**: See [Component Library - UI Primitives](./COMPONENTS.md#ui-primitives)

## Getting Started

### For New Developers

1. Read the [Developer Guide](./DEVELOPER_GUIDE.md) for setup instructions
2. Review the [Architecture](./ARCHITECTURE.md) to understand the system design
3. Explore the [Component Library](./COMPONENTS.md) to see available UI components
4. Reference the [API Documentation](./API_REFERENCE.md) when working with data

### For Designers

- [Component Library](./COMPONENTS.md) - UI components with visual examples
- [Design System](./COMPONENTS.md#design-system) - Colors, typography, spacing

### For DevOps

- [Deployment](./DEVELOPER_GUIDE.md#deployment) - Vercel and Docker deployment guides
- [Environment Variables](./DEVELOPER_GUIDE.md#getting-started) - Required configuration
- [Architecture](./ARCHITECTURE.md#deployment-architecture) - Production infrastructure

## Tech Stack

### Core Technologies

- **Next.js 16.2.1** - React framework with App Router
- **React 19.2.4** - UI library with Server Components
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Bun** - JavaScript runtime and package manager

### API & Data

- **Next.js API Routes** - Server-side API endpoints
- **React Query** - Data fetching and caching
- **Zod** - Schema validation

### UI Components

- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Component library pattern
- **Class Variance Authority** - Variant management
- **Framer Motion** - Animation library
- **next-themes** - Dark mode support

### RAG Chat System

- **Vercel AI SDK** - Unified AI SDK for LLM integration
- **Vercel AI Gateway** - Unified API with model fallback chains
- **Groq** - LLM API (llama-3.3-70b, scout)
- **Mistral** - OCR and additional AI features
- **Cohere** - Embeddings (embed-v4.0) and reranking (rerank-v4-fast)
- **Qdrant** - Vector search database (1536-dim, cosine similarity)
- **Upstash Redis** - Rate limiting and chat message caching
- **Tavily** - Web search for general chat queries
- **Streamdown** - Progressive markdown streaming with blurIn animation
- **Shiki** - Code syntax highlighting

### Cross-Platform

- **Flutter** - Desktop (macOS, Windows, Linux) + mobile companion app
- **GoRouter** - Flutter navigation
- **Riverpod** - Flutter state management

### Chat UX Features

- **Inline bubble editing** — Click pencil icon → textarea in bubble, Enter to regenerate
- **Branch navigation** — `<`/`>` to switch between edited versions
- **Suggestion pills** — Follow-up questions shown above prompt bar (via `messageMetadata`)
- **Progressive streaming** — blurIn word-by-word animation via Streamdown

### Development Tools

- **Biome** - Fast linter and formatter
- **React Compiler** - Automatic optimization

## Architecture Highlights

### Application Architecture

```
┌─────────────────────────────────────────┐
│           Client (Browser)              │
│  ┌─────────────┐  ┌──────────────┐     │
│  │   Server    │  │   Client     │     │
│  │ Components  │  │ Components   │     │
│  └──────┬──────┘  └──────┬───────┘     │
└─────────┼─────────────────┼─────────────┘
          │                 │
          ▼                 ▼
┌─────────────────────────────────────────┐
│       Next.js 16 App Router             │
│  ┌──────────────────────────────────┐   │
│  │       API Routes              │   │
│  │  ┌──────────┐  ┌──────────┐     │   │
│  │  │ Contact  │  │  Chat    │     │   │
│  │  │  Route   │  │  Stream  │     │   │
│  │  └──────────┘  └──────────┘     │   │
│  │  ┌──────────┐  ┌──────────┐     │   │
│  │  │Transcribe│  │ Process  │     │   │
│  │  │  Route   │  │ Document │     │   │
│  │  └──────────┘  └──────────┘     │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
          │                 │
          ▼                 ▼
┌─────────────────────────────────────────┐
│          External Services              │
│  ┌──────────┐  ┌──────────┐            │
│  │  Qdrant  │  │ Upstash  │            │
│  │ (vector) │  │ (Redis)  │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │ AI      │  │ Google   │            │
│  │ Gateway │  │ Sheets   │            │
│  └──────────┘  └──────────┘            │
└─────────────────────────────────────────┘
```

### Key Features

- **Multi-Tenant Architecture**: Domain-based context for serving multiple sites
- **RAG Chat System**: AI-powered chat with vector search and semantic retrieval
- **API Routes**: Full TypeScript inference from server to client
- **Server Components**: Optimal performance with minimal client JavaScript
- **Contact System**: Dual integration with Google Sheets and Gmail
- **Dark Mode**: System-wide theme support

## Common Tasks

### Development

```bash
# Start dev server
bun dev

# Format code
bun format

# Run linter
bun lint

# Build for production
bun build
```

### Adding Features

```bash
# Add a new page
touch src/app/new-page/page.tsx

# Add a new component
touch src/components/new-component.tsx

# Add a new API router
touch src/server/routers/new-router.ts
```

### Working with Data

```bash
# Ingest knowledge base for RAG chat
bun ingest

# Add new project to portfolio
# Edit: src/lib/projects.ts
```

## Environment Variables

Required environment variables for full functionality:

### Contact Form

```bash
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n"
GOOGLE_SHEET_ID=your-sheet-id
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

### RAG Chat System

```bash
GROQ_API_KEY=your-groq-api-key
QDRANT_URL=https://your-qdrant.cloud
QDRANT_API_KEY=your-qdrant-key
TAVILY_API_KEY=your-tavily-key
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

### RAG Configuration

```bash
RAG_SIMILARITY_THRESHOLD=0.1                    # Vector search threshold
RAG_MATCH_COUNT=5                               # Documents to retrieve
RAG_MAX_MESSAGE_LENGTH=500                      # Max message length
CHAT_HISTORY_TTL_SECONDS=1209600                # 14-day chat history cache
RAG_RETRIEVAL_CACHE_TTL_SECONDS=21600           # 6-hour retrieval cache
CHAT_RESPONSE_CACHE_TTL_SECONDS=86400           # 24-hour response cache
```

See [Developer Guide - Getting Started](./DEVELOPER_GUIDE.md#getting-started) for detailed setup.

## API Overview

### Available API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/stream` | RAG-powered AI chat with streaming |
| POST | `/api/contact` | Submit contact form (Google Sheets + Gmail) |
| POST | `/api/transcribe` | Audio transcription via Groq Whisper |
| POST | `/api/process-document` | PDF/image OCR via Mistral |

### Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/chat/stream` | 10 requests | 1 minute |
| `/api/contact` | 5 requests | 1 minute |
| `/api/transcribe` | No limit | — |
| `/api/process-document` | No limit | — |

See [API Reference](./API_REFERENCE.md) for complete documentation.

## Component Catalog

### UI Primitives (56 components)

- **Layout**: Card, Separator, Scroll Area, Resizable
- **Navigation**: Tabs, Breadcrumb, Pagination, Navigation Menu
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider
- **Buttons**: Button, Toggle, Toggle Group
- **Overlays**: Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton, Spinner
- **Data Display**: Table, Calendar, Chart, Badge, Avatar
- **Advanced**: Command, Context Menu, Dropdown Menu, Menubar

### Application Components

- **Navigation**: Main site navigation with mobile menu
- **Footer**: Site footer with social links
- **Project Card**: Portfolio project display
- **Contact Dialog**: Two-step contact form
- **Chat Widget**: RAG-powered AI assistant

See [Component Library](./COMPONENTS.md) for usage examples.

## Contributing

### Code Style

- **Formatting**: Biome (run `bun format`)
- **Linting**: Biome (run `bun lint`)
- **Naming**: PascalCase components, camelCase functions
- **Commits**: Conventional commits (feat, fix, docs, etc.)

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and test locally
3. Format and lint code
4. Commit with conventional commit messages
5. Push and create Pull Request
6. Wait for review and CI checks

See [Developer Guide - Development Workflow](./DEVELOPER_GUIDE.md#development-workflow) for details.

## Troubleshooting

Common issues and solutions:

- **Port conflicts**: See [Troubleshooting - Port Already in Use](./DEVELOPER_GUIDE.md#port-already-in-use)
- **TypeScript errors**: See [Troubleshooting - TypeScript Errors](./DEVELOPER_GUIDE.md#typescript-errors-after-adding-dependency)
- **Rate limiting**: See [Troubleshooting - Rate Limit Errors](./DEVELOPER_GUIDE.md#rate-limit-errors)
- **Vector search**: See [Troubleshooting - Vector Search](./DEVELOPER_GUIDE.md#vector-search-not-working)

## Support

For questions or issues:

1. Check the documentation in this directory
2. Review the [Troubleshooting](./DEVELOPER_GUIDE.md#troubleshooting) section
3. Search existing GitHub issues
4. Create a new issue with reproduction steps

## License

© Other Dev - All Rights Reserved

This is proprietary software for Other Dev's portfolio. Unauthorized copying, modification, or distribution is prohibited.

---

**Last Updated**: May 2026
