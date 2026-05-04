import { QdrantClient } from '@qdrant/js-client-rest'
import { createHash } from 'node:crypto'
import { rerankDocuments } from './embeddings'

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

export interface SearchFilter {
  type?: string
  category?: string
  subtype?: string
  project?: string
  year?: string
}

/**
 * Computes a deterministic SHA-256-based point ID from document content and metadata.
 * Using a stable ID makes upsert idempotent — re-running ingest updates existing
 * points instead of creating duplicates.
 */
export function computePointId(
  content: string,
  metadata: { title: string; source: string }
): string {
  const normalized = `${metadata.source}::${metadata.title}::${content}`.trim()
  return createHash('sha256').update(normalized).digest('hex').slice(0, 32)
}

/**
 * Checks whether the collection exists in Qdrant.
 */
export async function collectionExists(): Promise<boolean> {
  try {
    const info = await qdrant.getCollection('otherdev_documents')
    return info !== null
  } catch {
    return false
  }
}

// Cache document search per-request to avoid duplicate Qdrant queries
// for the same embedding within a single request
export async function searchSimilarDocuments(
  queryText: string,
  queryEmbedding: number[],
  matchThreshold: number = 0.1,
  matchCount: number = 5,
  filter?: SearchFilter
): Promise<MatchedDocument[]> {
  const qdrantFilter = filter
    ? {
        should: [
          filter.type ? { key: 'metadata.type', match: { value: filter.type } } : null,
          filter.category ? { key: 'metadata.category', match: { value: filter.category } } : null,
          filter.subtype ? { key: 'metadata.subtype', match: { value: filter.subtype } } : null,
          filter.project ? { key: 'metadata.project', match: { value: filter.project } } : null,
          filter.year ? { key: 'metadata.year', match: { value: filter.year } } : null,
        ].filter(Boolean),
      }
    : undefined

  const results = await qdrant.search('otherdev_documents', {
    vector: queryEmbedding,
    limit: matchCount * 3,
    score_threshold: matchThreshold,
    filter: qdrantFilter,
    with_vector: false,
  })

  const mapped = results
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

  if (mapped.length === 0) return mapped

  // Always-on reranking — re-scores top results using cross-encoder attention
  return rerankDocuments({
    query: queryText,
    documents: mapped,
    topN: matchCount,
  })
}

/**
 * Destroys and recreates the collection (payload indexes included).
 * WARNING: Deletes ALL points AND destroys payload indexes and HNSW config.
 * Use only in ingest/reset scripts — never on a live system.
 */
export async function resetCollection(): Promise<void> {
  try {
    await qdrant.deleteCollection('otherdev_documents')
  } catch {
    /* collection may not exist */
  }
  await qdrant.createCollection('otherdev_documents', {
    vectors: { size: 1536, distance: 'Cosine' },
  })
  // Create payload indexes after collection creation (not part of createCollection API)
  await qdrant.createPayloadIndex('otherdev_documents', {
    field_name: 'metadata.type',
    field_schema: 'keyword',
    wait: true,
  })
  await qdrant.createPayloadIndex('otherdev_documents', {
    field_name: 'metadata.category',
    field_schema: 'keyword',
    wait: true,
  })
  await qdrant.createPayloadIndex('otherdev_documents', {
    field_name: 'metadata.subtype',
    field_schema: 'keyword',
    wait: true,
  })
  await qdrant.createPayloadIndex('otherdev_documents', {
    field_name: 'metadata.project',
    field_schema: 'keyword',
    wait: true,
  })
}

/**
 * Deletes all points from the collection by scrolling through all IDs
 * and deleting them in batches, WITHOUT dropping the collection.
 * Preserves payload indexes and HNSW config. Use for incremental re-ingest.
 */
export async function deletePointsByFilter(): Promise<void> {
  const BATCH_SIZE = 500
  let offset: string | undefined

  do {
    const result = await qdrant.scroll('otherdev_documents', {
      limit: BATCH_SIZE,
      offset,
      with_payload: false,
      with_vector: false,
    })

    const ids = result.points.map(p => p.id as string)
    if (ids.length === 0) break

    await qdrant.delete('otherdev_documents', {
      wait: true,
      points: ids,
    })

    offset = typeof result.next_page_offset === 'string' ? result.next_page_offset : undefined
  } while (offset !== undefined)
}

/**
 * Upserts a batch of documents with deterministic point IDs and parallel execution.
 * Uses 64 points per batch and runs multiple batches concurrently.
 */
export async function upsertDocumentBatch(
  docs: Array<{
    content: string
    metadata: MatchedDocument['metadata']
    embedding: number[]
  }>
): Promise<void> {
  const BATCH_SIZE = 64
  const batches: typeof docs[] = []
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    batches.push(docs.slice(i, i + BATCH_SIZE))
  }

  await Promise.all(
    batches.map(batch =>
      qdrant.upsert('otherdev_documents', {
        points: batch.map(doc => ({
          id: computePointId(doc.content, doc.metadata),
          vector: doc.embedding,
          payload: { content: doc.content, metadata: doc.metadata },
        })),
      })
    )
  )
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
  const id = computePointId(content, metadata)
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
