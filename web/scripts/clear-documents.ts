import { collectionExists, deletePointsByFilter, resetCollection } from '../src/server/lib/rag/vector-search'

async function main() {
  try {
    // If collection doesn't exist at all, create it fresh with payload indexes
    if (!(await collectionExists())) {
      console.log('  Collection does not exist — creating with payload indexes...')
      await resetCollection()
    } else {
      // Collection exists — clear all points but preserve it (keeps payload indexes intact)
      console.log('  Clearing all documents (preserving collection + indexes)...')
      await deletePointsByFilter()
    }
    console.log('  Done.')
  } catch (error) {
    console.error('Failed to clear documents:', error)
    process.exit(1)
  }
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
