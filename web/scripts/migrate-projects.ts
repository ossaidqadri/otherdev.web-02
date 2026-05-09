/**
 * Migrate projects from src/lib/projects.ts to Payload Projects collection
 *
 * Requires media-map.json from migrate-media.ts to link images to Payload Media.
 * Run migrate-media.ts FIRST before running this script.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { projects } from '../src/lib/projects'
import fs from 'fs'
import path from 'path'

const MEDIA_MAP_FILE = 'scripts/media-map.json'

interface MediaMap {
  [originalPath: string]: {
    id: string
    filename: string
    url: string
  }
}

async function main() {
  const payload = await getPayload({ config: configPromise })

  // Load media mapping from migrate-media.ts output
  let mediaMap: MediaMap = {}
  if (fs.existsSync(MEDIA_MAP_FILE)) {
    mediaMap = JSON.parse(fs.readFileSync(MEDIA_MAP_FILE, 'utf-8'))
    console.log(`Loaded media map with ${Object.keys(mediaMap).length} entries`)
  } else {
    console.warn(`Warning: ${MEDIA_MAP_FILE} not found. Images will not be linked.`)
  }

  console.log(`\nMigrating ${projects.length} projects to Payload...\n`)

  for (const project of projects) {
    // Map main image
    const mainImageMedia = mediaMap[project.image]

    // Map gallery media
    const mediaArray = project.media
      ? project.media.map((originalPath: string) => {
          const mediaEntry = mediaMap[originalPath]
          return mediaEntry ? { image: mediaEntry.id } : null
        }).filter(Boolean)
      : []

    try {
      // Check if project already exists
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
        limit: 1,
      })

      const projectData = {
        title: project.title,
        slug: project.slug,
        description: project.description,
        url: project.url || '',
        downloadUrl: project.downloadUrl || '',
        year: project.year,
        image: mainImageMedia?.id || '',
        media: mediaArray,
      }

      if (existing.docs.length > 0) {
        // Update existing
        await payload.update({
          collection: 'projects',
          id: existing.docs[0].id,
          data: projectData,
        })
        console.log(`✓ Updated: ${project.title}`)
      } else {
        // Create new
        await payload.create({
          collection: 'projects',
          data: projectData,
        })
        console.log(`✓ Created: ${project.title}`)
      }
    } catch (error) {
      console.error(`✗ Failed: ${project.title}`, error instanceof Error ? error.message : error)
    }
  }

  console.log('\n✓ Projects migration complete')
}

main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})