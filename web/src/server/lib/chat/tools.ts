import { tavily } from '@tavily/core'
import { tool } from 'ai'
import { z } from 'zod'

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY })

/**
 * Web search tool using Tavily — grounded general chat.
 * Works with any provider (Groq, MiniMax, etc.) routed through AI Gateway.
 */
export const tavilySearchTool = tool({
  description:
    'Search the web for current information, news, and facts. Use this when you need real-time or up-to-date information. Returns all results immediately in a single response. Do NOT call more than twice per conversation. Do NOT pass id, cursor, or pagination parameters — only the query field is accepted.',
  inputSchema: z.object({
    query: z
      .string()
      .describe('The plain text search query. No id, cursor, or pagination fields — query only.'),
  }),
  execute: async ({ query }: { query: string }) => {
    type SearchResult = { id: number; title: string; url: string; snippet: string; score: number }
    type WebSearchResult = {
      query: string
      results: SearchResult[]
      answer: string | null
      error?: string
    }

    try {
      console.log(`[WebSearch] Searching for: ${query}`)
      const response = await tavilyClient.search(query, {
        searchDepth: 'basic',
        maxResults: 3,
        includeAnswer: false,
        includeRawContent: false,
      })

      const results: SearchResult[] = response.results.map((result, i) => ({
        id: i + 1,
        title: result.title,
        url: result.url,
        snippet: result.content.slice(0, 300),
        score: result.score,
      }))

      console.log(`[WebSearch] Found ${results.length} results for: ${query}`)
      return {
        query,
        results,
        answer: response.answer ?? null,
      } as WebSearchResult
    } catch (error) {
      console.error('[WebSearch] Tavily error:', error instanceof Error ? error.message : error)
      return {
        query,
        results: [] as SearchResult[],
        answer: null,
        error: 'Web search failed',
      } as WebSearchResult
    }
  },
})

/**
 * Artifact creation tool — generates complete, self-contained web content
 * that renders in a live preview panel.
 * Server-side execute function returns the artifact data directly.
 */
export const createArtifactTool = tool({
  description:
    'Create an interactive web artifact that will be displayed in a live preview panel. Supports vanilla HTML/CSS/JS or modern frameworks (React, Vue, Tailwind CSS) via CDN. Use this when the user asks to create, build, make, or generate interactive content like websites, apps, games, visualizations, calculators, forms, dashboards, or any web-based UI. The artifact should be complete, self-contained, and visually polished.',
  inputSchema: z.object({
    title: z.string().max(100).describe('A short, descriptive title for the artifact'),
    code: z
      .string()
      .max(51200)
      .describe(
        'Complete HTML code. Can use modern frameworks via CDN: React, Tailwind CSS, Vue, etc. Include CSS in <style> tags and JavaScript in <script> tags. Must be self-contained and work in a sandboxed iframe.'
      ),
    description: z
      .string()
      .max(500)
      .describe('A brief explanation of what this artifact does and how to use it'),
  }),
})
