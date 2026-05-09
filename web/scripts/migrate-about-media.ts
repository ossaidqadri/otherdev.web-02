/**
 * Migrate about page images to Payload Media collection
 *
 * Uploads images from public/images/about-page/ to Payload via Local API
 * (goes to Cloudflare R2 via storage adapter), and outputs a mapping of
 * original paths to Payload media IDs.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'

const ABOUT_DIR = 'public/images/about-page'
const OUTPUT_FILE = 'scripts/about-media-map.json'

interface AboutMediaMap {
  [originalPath: string]: {
    id: string
    filename: string
    url: string
  }
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  const mediaMap: AboutMediaMap = {}

  const imageFiles = fs.readdirSync(ABOUT_DIR).filter(f =>
    /\.(webp|jpg|jpeg|png|gif|svg)$/i.test(f)
  )

  console.log(`Found ${imageFiles.length} about page images`)

  for (const imageFile of imageFiles) {
    const originalPath = `/images/about-page/${imageFile}`
    const filePath = path.join(ABOUT_DIR, imageFile)
    const altText = imageFile
      .replace(/[-_]/g, ' ')
      .replace(/\.[^.]+$/, '')
      .replace(/\s+\d+$/, '')

    try {
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

      console.log(`  ✓ ${imageFile} → ${media.id} (${media.url})`)
    } catch (error) {
      console.error(`  ✗ Failed to upload ${imageFile}:`, error instanceof Error ? error.message : error)
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mediaMap, null, 2))
  console.log(`\n✓ About media map written to ${OUTPUT_FILE}`)
  console.log(`Total images migrated: ${Object.keys(mediaMap).length}`)
}

main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})