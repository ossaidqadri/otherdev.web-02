/**
 * Migrate existing project images to Payload Media collection
 *
 * Iterates over public/images/projects/* directories, uploads each image
 * to Payload via Local API (goes to Vercel Blob via storage adapter),
 * and outputs a mapping of original paths to Payload media IDs.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'

const PROJECTS_DIR = 'public/images/projects'
const OUTPUT_FILE = 'scripts/media-map.json'

interface MediaMap {
  [originalPath: string]: {
    id: string
    filename: string
    url: string
  }
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  const mediaMap: MediaMap = {}

  // Get all project directories
  const projectDirs = fs.readdirSync(PROJECTS_DIR)
  console.log(`Found ${projectDirs.length} project folders`)

  for (const projectSlug of projectDirs) {
    const projectPath = path.join(PROJECTS_DIR, projectSlug)

    // Skip if not a directory
    if (!fs.statSync(projectPath).isDirectory()) continue

    // Get all image files in this project folder
    const imageFiles = fs.readdirSync(projectPath).filter(f =>
      /\.(webp|jpg|jpeg|png|gif|svg)$/i.test(f)
    )

    console.log(`\nProject: ${projectSlug} (${imageFiles.length} images)`)

    for (const imageFile of imageFiles) {
      const originalPath = `/images/projects/${projectSlug}/${imageFile}`
      const filePath = path.join(projectPath, imageFile)
      const altText = imageFile
        .replace(/[-_]/g, ' ')
        .replace(/\.[^.]+$/, '')
        .replace(/\s+\d+$/, '')

      try {
        // Upload to Payload Media — storage adapter handles Vercel Blob upload
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: altText,
          },
          filePath: path.resolve(filePath),
        })

        mediaMap[originalPath] = {
          id: media.id,
          filename: media.filename || imageFile,
          url: media.url || '',
        }

        console.log(`  ✓ ${imageFile} → ${media.id}`)
      } catch (error) {
        console.error(`  ✗ Failed to upload ${imageFile}:`, error instanceof Error ? error.message : error)
      }
    }
  }

  // Write mapping to JSON for use in project migration
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mediaMap, null, 2))
  console.log(`\n✓ Media map written to ${OUTPUT_FILE}`)
  console.log(`Total images migrated: ${Object.keys(mediaMap).length}`)
}

main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})