# ElevenLabs Agent Setup Guide

Complete guide to set up the Other Dev voice-enabled sales agent on ElevenLabs.

---

## Prerequisites

- ElevenLabs account (pro plan recommended for agent features)
- Cal.com account (free tier works)
- Google account for Sheets
- MongoDB Atlas (already configured — no new infra needed)

---

## Step 1: Get ElevenLabs API Key

1. Log in to [ElevenLabs](https://elevenlabs.io)
2. Go to **Profile** → **API Keys**
3. Copy your API key
4. Add to `web/.env.local`:

```env
ELEVENLABS_API_KEY=your-elevenlabs-api-key
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your-agent-id  # You'll fill this after creating the agent
ELEVENLABS_ENVIRONMENT=production
```

---

## Step 2: Set Up Cal.com

Run the setup script:

```bash
cd web
bun run scripts/setup-calcom.ts
```

This creates a **"Sales Discovery Call"** event type (30 min, Google Meet) and outputs:

- `CALCOM_EVENT_TYPE_ID`
- Booking link

Add to `web/.env.local`:

```env
CALCOM_API_KEY=your-calcom-api-key
CALCOM_USER_ID=your-calcom-username
CALCOM_EVENT_TYPE_ID=the-event-type-id-from-step-2
```

---

## Step 3: Set Up Google Sheets Lead Capture

Follow `web/scripts/google-sheets-setup.md` to:

1. Create the **"Other Dev Leads"** Google Sheet
2. Enable Google Sheets API + create a service account
3. Share the sheet with the service account
4. Add credentials to `web/.env.local`:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_LEADS_SHEET_ID=your-sheet-id
```

---

## Step 4: Create the ElevenLabs Agent

### Option A: Via CLI (Recommended)

```bash
# Install CLI
npm install -g @elevenlabs/cli

# Authenticate
elevenlabs auth login

# Initialize project
cd web
elevenlabs agents init

# The CLI creates agents.json — use the config from:
# web/src/lib/elevenlabs-agent-config.ts
# as the source of truth for your agent configuration
```

### Option B: Via SDK

Use the config from `web/src/lib/elevenlabs-agent-config.ts` to create the agent via the ElevenLabs dashboard or API.

Key config values:
- **Model**: `gemini-2.5-flash`
- **Voice**: `JBFqnCBsd6RMkjVDRZzb` (George)
- **Language**: `en`
- **First message**: "Hi there! I'm the Other Dev sales assistant..."

---

## Step 5: Configure Tools in ElevenLabs Dashboard

### 5a. Cal.com Integration

1. Go to **Integrations** → **Cal.com** → **Connect**
2. Authenticate with your Cal.com API key
3. After connecting, note the `tool_id` for:
   - `get_availability` → add to `agent_config.conversation_config.tools`
   - `book_meeting` → add to `agent_config.conversation_config.tools`

### 5b. Knowledge Base (RAG)

The agent uses your existing Qdrant RAG via `knowledge_base_rag`. In the ElevenLabs dashboard:

1. Go to **Knowledge** → **Add Knowledge**
2. Connect your Qdrant collection OR
3. Create documents from URLs pointing to your site docs

**Important**: Since you already have a robust Qdrant RAG with ~100 documents about your projects and services, you can connect it directly. Contact ElevenLabs support to ask about custom RAG connector for Qdrant, or use a webhook tool that calls your existing `/api/chat/stream` endpoint.

### 5c. Lead Capture Webhook

In the agent config, the `capture_lead` webhook is already configured to call `/api/lead-capture`. Make sure your `NEXT_PUBLIC_SITE_URL` is set correctly.

---

## Step 6: Add Agent ID to Environment

After creating the agent in ElevenLabs, get the `agent_id` (looks like `agent_xxxx`) and add:

```env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=agent_xxxx
```

---

## Step 7: Test

### Test the Lead Capture API

```bash
curl -X POST http://localhost:3000/api/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Chen",
    "email": "sarah@example.com",
    "role": "Marketing Director",
    "company": "Acme Corp",
    "pain_point": "Need a complete rebrand and new website",
    "timeline": "3-6 months",
    "source": "agent-widget-test"
  }'
```

Check your Google Sheet — a new row should appear.

### Test the Signed URL Endpoint

```bash
curl http://localhost:3000/api/elevenlabs/signed-url?agent_id=YOUR_AGENT_ID
```

Should return `{ signed_url: "https://..." }`.

### Run ElevenLabs Tests

```bash
# Via CLI
elevenlabs agents test --agent YOUR_AGENT_ID --type llm
elevenlabs agents test --agent YOUR_AGENT_ID --type tool
elevenlabs agents test --agent YOUR_AGENT_ID --type simulation
```

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    Website Visitor                       │
└─────────────────────┬───────────────────────────────────┘
                      │
         ┌────────────▼────────────┐
         │   Floating AgentWidget  │  (bottom-right, all pages)
         │   <elevenlabs-convai>   │
         └────────────┬────────────┘
                      │ ElevenLabs Web SDK
         ┌────────────▼────────────┐
         │   ElevenLabs Agent      │
         │   - gemini-2.5-flash    │
         │   - George voice        │
         │   - Semi-structured     │
         └────────────┬────────────┘
                      │
      ┌───────────────┼───────────────┐
      │               │               │
┌─────▼─────┐  ┌──────▼──────┐  ┌────▼────────┐
│ Qdrant RAG │  │  Cal.com    │  │ Lead Capture │
│ (existing) │  │  (book call)│  │ /api/lead    │
└───────────┘  └─────────────┘  └──────┬────────┘
                                        │
                               ┌────────▼────────┐
                               │  Google Sheets  │
                               │  "Other Dev     │
                               │   Leads"        │
                               └─────────────────┘
```

---

## Key Files

| File | Purpose |
|---|---|
| `src/components/agent-widget.tsx` | React wrapper for ElevenLabs web component |
| `src/app/(app)/api/lead-capture/route.ts` | Writes leads to Google Sheets |
| `src/app/(app)/api/elevenlabs/signed-url/route.ts` | Gets signed URL for widget |
| `src/lib/elevenlabs-agent-config.ts` | Full agent configuration (system prompt, tools, guardrails) |
| `scripts/setup-calcom.ts` | Creates Cal.com event type |
| `scripts/google-sheets-setup.md` | Google Sheets setup instructions |
| `scripts/elevenlabs-setup.md` | This file |

---

## Guardrails (What's Protected)

| Rule | Behavior |
|---|---|
| No pricing specifics | "Our team will provide a tailored quote" |
| No timeline commitments | "Our team will give you an accurate timeline" |
| Hot lead escalation | Budget >$50k OR timeline <2 weeks → prioritize booking |
| Prompt injection | Blocked by ElevenLabs built-in |
| Off-topic | Focus guardrail keeps agent on domain |

---

## Troubleshooting

**Widget not appearing**: Check `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is set and valid.

**Agent not answering questions**: Verify `knowledge_base_rag` is configured and connected to your Qdrant or ElevenLabs knowledge base.

**Cal.com not working**: Make sure the Cal.com integration is connected in ElevenLabs dashboard and tool IDs are added to `tool_ids`.

**Lead not appearing in Sheets**: Check `GOOGLE_LEADS_SHEET_ID`, `GOOGLE_CLIENT_EMAIL` has Editor access to the sheet, and `GOOGLE_PRIVATE_KEY` is formatted with `\n` for newlines.

---

## Next Steps After Setup

1. **Test with yourself**: Open your site, click the widget, have a full conversation
2. **Run simulation tests**: Use the ElevenLabs testing suite with a "prospect persona"
3. **Monitor**: Check ElevenLabs dashboard for conversation quality, drop-off points
4. **Iterate**: Adjust system prompt, guardrails, and tool configurations based on real conversations