/**
 * ElevenLabs Conversational Agent — Lead Qualification Agent
 *
 * Full configuration for the Other Dev sales agent that:
 * 1. Qualifies prospective customers via semi-structured conversation
 * 2. Answers product/project questions via existing Qdrant RAG
 * 3. Captures qualified leads to Google Sheets
 * 4. Schedules human hand-off via Cal.com
 */

export const agentConfig = {
  name: 'otherdev-sales-agent',
  enable_versioning: true,

  conversation_config: {
    agent: {
      first_message:
        "Hi there! I'm the Other Dev sales assistant. I'm here to help you find what you're looking for — whether that's a new website, digital marketing, or a full digital platform. What brings you to the site today?",
      language: 'en',
      prompt: {
        prompt: `# Personality
You are a helpful, consultative sales assistant for Other Dev — a digital agency that builds web platforms, runs digital marketing campaigns, and creates brands for pioneering creatives and ambitious companies.

You are warm but never pushy. You ask questions to understand, not to pressure. You listen more than you talk.

# Environment
You are speaking with a prospective customer who visited otherdev.com. They may have come through a Google search, a referral, or a direct visit. They are evaluating whether Other Dev is the right partner for their project.

# Tone
- Professional but approachable
- Curious and attentive
- Confident but not arrogant
- Helpful at every stage — even if they're not ready to buy

# Important Context
Other Dev has built platforms for clients across:
- Construction & real estate (Narkins Builders, Bin Yousuf Group)
- Fashion & apparel (Wish Apparels, Olly Shinder, Kiswa Noire)
- Coffee & lifestyle (Tiny Footprint Coffee)
- Finance & fintech (Finlit, NTL Exchange)
- NGOs and social enterprise (Ek Qadam Aur, Cultured Legacy)

Services: Web development, digital marketing, branding.

# Qualification Goal — 5-step flow
Your job is to qualify whether the prospect is a good fit and capture their details for human follow-up. Work through these steps naturally, not as a rigid checklist:

1. **Greeting + Discovery**: "What brings you to the site today?" — understand their broad goal
2. **Role & Company**: "What do you do?" / "Who do you work for?" — understand their context
3. **Pain Point**: "What's the main challenge you're facing?" — understand their problem
4. **Timeline**: "When are you looking to get started?" / "Is there a deadline?" — understand urgency
5. **Handoff**: If they seem like a real project (budget, timeline, clear need):
   - Offer to schedule a free discovery call with the team
   - If they agree, use the Cal.com tool to show available slots
   - If not ready, offer to stay in touch or answer any questions

# Tool Usage
- **knowledge_base_rag**: For ANY question about Other Dev's services, past projects, process, pricing, or capabilities — use this tool to retrieve accurate info. Do not make up details.
- **calcom**: When the prospect is qualified and wants to book a call. Use get_availability to show slots, then book_meeting to confirm.
- **Webhook (lead-capture)**: After the conversation — if they provided contact info but didn't book, POST to /api/lead-capture with their details.
- **end_call**: When the prospect is done and their needs have been addressed.

# Guardrails (critical!)
- NEVER share specific pricing — say "our team will provide a tailored quote based on your needs"
- NEVER commit to timelines — say "our team will give you an accurate timeline after discussing the scope"
- If they ask about legal/contractual terms — "our team handles that in the discovery call"
- If the conversation becomes hostile or abusive — end the call immediately
- If they mention a budget over $50k or a timeline under 2 weeks — this is a HOT LEAD — prioritize booking them and flag it in the booking_ref

# What NOT to do
- Don't pitch aggressively
- Don't dismiss competitor questions ("we're definitely better") — be balanced
- Don't answer questions outside Other Dev's domain (general news, sports, etc.)
- Don't repeat the same question if they've already answered it

# Success
A qualified lead is someone who:
- Has a real project or need
- Has budget (explicit or implicit)
- Has a timeline (even if loose)
- Wants to talk to a human

A great conversation ends with either a booked call or a captured lead with enough context for the team to follow up effectively.`,
        llm: 'gemini-2.5-flash',
        temperature: 0.7,
        tools: [
          // Custom webhook for lead capture
          {
            type: 'webhook',
            name: 'capture_lead',
            description: 'Capture a qualified lead with their contact info and qualification data',
            api_schema: {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/lead-capture`,
              method: 'POST',
              request_body_schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', description: "Prospect's full name" },
                  email: { type: 'string', description: "Prospect's email address" },
                  role: { type: 'string', description: "Prospect's job title or role" },
                  company: { type: 'string', description: "Prospect's company name" },
                  pain_point: { type: 'string', description: 'Primary challenge or need' },
                  timeline: { type: 'string', description: 'Expected project timeline' },
                  booking_ref: {
                    type: 'string',
                    description: 'Cal.com booking reference if they scheduled a call',
                  },
                  source: {
                    type: 'string',
                    description: 'Where the lead came from',
                    default: 'agent-widget',
                  },
                },
                required: ['name', 'email', 'role', 'company', 'pain_point', 'timeline'],
              },
            },
          },
        ],
        built_in_tools: {
          end_call: {},
          language_detection: {},
          transfer_to_number: {},
        },
        tool_ids: [], // Cal.com tool IDs go here after connecting the integration
        knowledge_base: {
          system_tool_type: 'knowledge_base_rag',
        },
      },
    },
    tools: {
      // Cal.com integration — tool IDs filled in after connecting Cal.com in ElevenLabs dashboard
    },
    tts: {
      voice_id: 'JBFqnCBsd6RMkjVDRZzb', // George — professional male voice
      model_version: 'eleven_v2_flash',
      latency_optimize: true,
    },
    conversation覑ession: {
      mode: 'voice', // voice + text (web widget supports both)
      max_duration_seconds: 1200, // 20 min max
      end_call_on_disconnect: true,
      background_sound: 'office',
      disable_greeting: false,
    },
  },

  platform_settings: {
    guardrails: {
      version: '1',
      focus: { is_enabled: true },
      prompt_injection: { is_enabled: true },
      content: {
        config: {
          harassment: { is_enabled: true, threshold: 0.3 },
          profanity: { is_enabled: true, threshold: 0.3 },
        },
      },
      custom: {
        config: {
          configs: [
            {
              is_enabled: true,
              name: 'No pricing specifics',
              prompt:
                'Block the agent from sharing specific prices, quotes, or cost figures. When asked about pricing, the response must be: "Our team will provide a tailored quote after we understand your full scope." Do not deviate from this.',
              execution_mode: 'blocking',
              trigger_action: {
                type: 'retry',
                feedback:
                  'For exact pricing, our team will prepare a tailored quote after a quick discovery call — would you like to schedule one?',
              },
            },
            {
              is_enabled: true,
              name: 'No timeline commitments',
              prompt:
                'Block the agent from committing to specific project timelines. When asked about timelines, say "Our team will give you an accurate timeline after discussing the scope in detail."',
              execution_mode: 'blocking',
              trigger_action: {
                type: 'retry',
                feedback:
                  "Every project is unique — our team will give you a precise timeline after understanding what you're building. Want to schedule a call to discuss?",
              },
            },
            {
              is_enabled: true,
              name: 'Hot lead escalation',
              prompt:
                'Flag as a hot lead if: budget mentioned is over $50k, or timeline is under 2 weeks. These prospects should be offered a call immediately and the booking should be prioritized.',
              execution_mode: 'blocking',
              trigger_action: {
                type: 'retry',
                feedback:
                  "This sounds like a great fit — I'd love to get you on a call with our team right away. Let me show you available times.",
              },
            },
          ],
        },
      },
    },
    routing: {
      initial_seQUENCE: 'agent',
    },
  },
} as const

export type AgentConfig = typeof agentConfig

/**
 * Fields to capture for each lead
 */
export const leadFields = [
  { key: 'name', label: 'Full Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'role', label: 'Job Title / Role', required: true },
  { key: 'company', label: 'Company', required: true },
  { key: 'pain_point', label: 'Primary Challenge', required: true },
  { key: 'timeline', label: 'Expected Timeline', required: true },
  { key: 'booking_ref', label: 'Booking Reference', required: false },
] as const

export type LeadField = (typeof leadFields)[number]['key']
