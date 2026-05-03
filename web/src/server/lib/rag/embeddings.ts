import { cohere } from '@ai-sdk/cohere'
import { embed, embedMany, rerank } from 'ai'

// embed-english-v4.0 is the newer model with 1536 dims
// AI SDK's CohereEmbeddingModelId type uses string & {} union so it accepts any model ID
const embeddingModel = cohere.embeddingModel('embed-english-v4.0')
const rerankingModel = cohere.reranking('rerank-v4.0-fast')

// Simple memo cache for embeddings — works in all JS environments
const embeddingCache = new Map<string, Promise<number[]>>()

function cacheKey(text: string, inputType: string): string {
  return `${inputType}:${text}`
}

export async function generateEmbedding(
  text: string,
  _inputType: 'query' | 'document' = 'query'
): Promise<number[]> {
  const key = cacheKey(text, 'query')

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

// Rerank documents using Cohere rerank-v4.0-fast after initial vector search
export async function rerankDocuments({
  query,
  documents,
  topN = 5,
}: {
  query: string
  documents: Array<{ id: string; content: string; metadata: object; similarity: number }>
  topN?: number
}): Promise<Array<{ id: string; content: string; metadata: object; similarity: number }>> {
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