import { cohere } from '@ai-sdk/cohere'
import { gateway } from '@ai-sdk/gateway'
import { embed, embedMany, rerank } from 'ai'
import type { MatchedDocument } from './vector-search'

// Embedding via direct Cohere provider — embed-v4.0 with 1536 dims
const embeddingModel = cohere.embedding('embed-v4.0')
// Reranking via Vercel AI Gateway — rerank-v4-fast is only available through gateway
const rerankingModel = gateway.rerankingModel('cohere/rerank-v4-fast')

// Simple memo cache for embeddings — works in all JS environments
const embeddingCache = new Map<string, Promise<number[]>>()

function cacheKey(text: string, inputType: string): string {
  return `${inputType}:${text}`
}

export async function generateEmbedding(
  text: string,
  _inputType: 'query' | 'document' = 'query'
): Promise<number[]> {
  const key = cacheKey(text, _inputType)

  const cached = embeddingCache.get(key)
  if (cached) return cached

  const promise = doGenerateEmbedding(text)
  embeddingCache.set(key, promise)

  return promise
}

async function doGenerateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: embeddingModel,
    value: text,
    providerOptions: {
      cohere: { inputType: 'search_query' },
    },
  })
  return embedding
}

// Batch embedding — sends multiple texts in one API call
export async function generateEmbeddingBatch(
  texts: string[],
  _inputType: 'query' | 'document' = 'document'
): Promise<number[][]> {
  if (texts.length === 0) return []

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: texts,
    providerOptions: {
      cohere: { inputType: 'search_document' },
    },
  })
  return embeddings
}

// Rerank documents using Cohere rerank-v4-fast after initial vector search
export async function rerankDocuments({
  query,
  documents,
  topN = 5,
}: {
  query: string
  documents: MatchedDocument[]
  topN?: number
}): Promise<MatchedDocument[]> {
  if (documents.length === 0) return []

  const { ranking } = await rerank({
    model: rerankingModel,
    documents: documents.map(d => d.content),
    query,
    topN,
  })

  // Map reranked results back to original documents with new scores
  return ranking.map(r => ({
    ...documents[r.originalIndex],
    similarity: r.score,
  }))
}