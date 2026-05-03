import { QdrantClient } from '@qdrant/js-client-rest'

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL ?? '',
  apiKey: process.env.QDRANT_API_KEY ?? '',
})

export interface MatchedDocument {
  id: string
  content: string
  metadata: {
    source: string
    title: string
    type: string
    category?: string
    subtype?: string
    project?: string
    year?: string
  }
  similarity: number
}

// Cache document search per-request to avoid duplicate Qdrant queries
// for the same embedding within a single request
export const searchSimilarDocuments = async function searchSimilarDocuments(
  queryEmbedding: number[],
  matchThreshold: number = 0.1,
  matchCount: number = 5
): Promise<MatchedDocument[]> {
  const results = await qdrant.search('otherdev_documents', {
    vector: queryEmbedding,
    limit: matchCount,
    score_threshold: 1 - matchThreshold,
  })

  return results
    .map(r => {
      if (!r.payload) return null
      return {
        id: r.id as string,
        content: r.payload.content as string,
        metadata: r.payload.metadata as MatchedDocument['metadata'],
        similarity: r.score,
      }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
}

export async function deleteAllDocuments(): Promise<void> {
  try {
    await qdrant.deleteCollection('otherdev_documents')
  } catch {
    /* collection may not exist */
  }
  await qdrant.createCollection('otherdev_documents', {
    vectors: { size: 1536, distance: 'Cosine' },
  })
}

export async function insertDocument(
  content: string,
  metadata: {
    source: string
    title: string
    type: string
    category?: string
    subtype?: string
    project?: string
    year?: string
  },
  embedding: number[]
): Promise<string> {
  const id = crypto.randomUUID()
  await qdrant.upsert('otherdev_documents', {
    points: [
      {
        id,
        vector: embedding,
        payload: { content, metadata },
      },
    ],
  })
  return id
}
