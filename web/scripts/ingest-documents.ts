import { knowledgeBase } from '../src/lib/knowledge-base'
import {
  collectionExists,
  resetCollection,
  deletePointsByFilter,
  upsertDocumentBatch,
  type MatchedDocument,
} from '../src/server/lib/rag/vector-search'
import { generateEmbeddingBatch } from '../src/server/lib/rag/embeddings'

async function main() {
  // Step A: Ensure collection exists with payload indexes (run once to set up)
  if (!(await collectionExists())) {
    console.log('  Collection does not exist — creating with payload indexes...')
    await resetCollection()
  }

  // Step B: Clear existing points (preserves collection + indexes)
  console.log('  Clearing existing documents...')
  await deletePointsByFilter()

  const totalDocs = knowledgeBase.length
  console.log(`  Ingesting ${totalDocs} documents\n`)

  try {
    // Step C: Generate all embeddings concurrently
    const texts = knowledgeBase.map(doc => doc.content)
    const allEmbeddings = await generateEmbeddingBatch(texts, 'document')

    // Step D: Build doc objects and batch upsert
    const docsWithEmbeddings: Array<{
      content: string
      metadata: MatchedDocument['metadata']
      embedding: number[]
    }> = knowledgeBase.map((doc, i) => ({
      content: doc.content,
      metadata: doc.metadata,
      embedding: allEmbeddings[i],
    }))

    // Validate all embeddings before any upsert
    for (let i = 0; i < allEmbeddings.length; i++) {
      const embedding = allEmbeddings[i]
      if (!embedding || embedding.length !== 1536) {
        throw new Error(
          `Invalid embedding dim at index ${i}: ${embedding?.length ?? 0} (expected 1536)`
        )
      }
    }

    // Upsert in parallel batches — no sequential sleeps
    await upsertDocumentBatch(docsWithEmbeddings)

    console.log(`\n  Done: ${totalDocs} documents ingested`)
  } catch (error) {
    console.error(`\n  Fatal error: ${error instanceof Error ? error.message : error}`)
    process.exit(1)
  }
}

main().catch(error => {
  console.error('Fatal error during ingestion:', error)
  process.exit(1)
})
