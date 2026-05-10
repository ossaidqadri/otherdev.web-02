/**
 * Migrate about page content from static data to Payload About collection
 *
 * Run AFTER:
 *   - migrate-about-media.ts (uploads images to R2)
 *   - migrate-projects.ts (if clients already exist from projects)
 *
 * This script populates the Clients collection and About collection
 * with the content that was previously hardcoded in the about page.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import fs from 'fs'

const ABOUT_DIR = 'public/images/about-page'
const MEDIA_MAP_FILE = 'scripts/about-media-map.json'

interface MediaMap {
  [originalPath: string]: {
    id: string
    filename: string
    url: string
  }
}

const CLIENTS_DATA = [
  { name: 'Narkins Builders', slug: 'narkins-builders' },
  { name: 'Groovy Pakistan', slug: 'groovy-pakistan' },
  { name: 'Olly Shinder', slug: 'olly-shinder' },
  { name: 'Bin Yousuf Group', slug: 'bin-yousuf-group' },
  { name: 'Parcheh81', slug: 'parcheh81' },
  { name: 'Tiny Footprint Coffee', slug: 'tiny-footprint-coffee' },
  { name: 'Lexa', slug: 'lexa' },
  { name: 'Finlit', slug: 'finlit' },
  { name: 'Ek Qadam Aur', slug: 'ek-qadam-aur' },
  { name: 'Wish Apparels', slug: 'wish-apparels' },
  { name: 'Kiswa Noir', slug: 'kiswa-noir' },
  { name: 'BLVD', slug: 'blvd' },
  { name: 'CLTRD Legacy', slug: 'cltrd-legacy' },
]

// Client order for desktop grid (3 columns)
const desktopOrder = [
  'Narkins Builders', 'Groovy Pakistan', 'Olly Shinder',
  'Bin Yousuf Group', 'Parcheh81', 'Tiny Footprint Coffee',
  'Lexa', 'Finlit', 'Ek Qadam Aur',
  'Wish Apparels', 'Kiswa Noir', 'BLVD',
  'CLTRD Legacy',
]

// Client order for mobile grid (2 columns)
const mobileOrder = [
  'Narkins Builders', 'Parcheh81',
  'Bin Yousuf Group', 'Tiny Footprint Coffee',
  'Lexa', 'Ek Qadam Aur',
  'Olly Shinder', 'Groovy Pakistan',
  'Wish Apparels', 'Finlit',
  'Kiswa Noir', 'BLVD',
  'CLTRD Legacy',
]

async function main() {
  const payload = await getPayload({ config: configPromise })

  // Load media map for hero image
  let mediaMap: MediaMap = {}
  if (fs.existsSync(MEDIA_MAP_FILE)) {
    mediaMap = JSON.parse(fs.readFileSync(MEDIA_MAP_FILE, 'utf-8'))
    console.log(`Loaded about media map with ${Object.keys(mediaMap).length} entries`)
  } else {
    console.warn(`Warning: ${MEDIA_MAP_FILE} not found. Hero image will not be linked.`)
  }

  const heroMedia = mediaMap['/images/about-page/about-team-new.png']
  if (!heroMedia) {
    console.error('Error: about-team-new.png not found in media map')
    process.exit(1)
  }

  console.log(`\n--- Migrating Clients ---\n`)

  const clientIds: { desktop: string[], mobile: string[] } = { desktop: [], mobile: [] }

  for (const clientData of CLIENTS_DATA) {
    try {
      const existing = await payload.find({
        collection: 'clients',
        where: { slug: { equals: clientData.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`✓ Already exists: ${clientData.name}`)
        clientIds.desktop.push(existing.docs[0].id as string)
        clientIds.mobile.push(existing.docs[0].id as string)
      } else {
        const created = await payload.create({
          collection: 'clients',
          data: clientData,
        })
        console.log(`✓ Created: ${clientData.name}`)
        const id = (created as { id: string }).id
        clientIds.desktop.push(id)
        clientIds.mobile.push(id)
      }
    } catch (error) {
      console.error(`✗ Failed: ${clientData.name}`, error instanceof Error ? error.message : error)
    }
  }

  // Re-order clientIds to match desktopOrder and mobileOrder
  const allClients = await payload.find({
    collection: 'clients',
    where: {
      slug: { in: CLIENTS_DATA.map(c => c.slug) }
    },
    limit: 20,
  })

  const clientMap = new Map(
    allClients.docs.map(c => [(c as unknown as { name: string }).name, c.id as string])
  )

  const desktopClientIds = desktopOrder
    .map(name => clientMap.get(name))
    .filter(Boolean) as string[]

  const mobileClientIds = mobileOrder
    .map(name => clientMap.get(name))
    .filter(Boolean) as string[]

  console.log('\n--- Migrating About Content ---\n')

  try {
    const aboutData = {
      heroImage: heroMedia.id,
      heroImageAlt: 'The members of otherdev',
      aboutLabel: 'About',
      aboutTextPlain: `Other Dev produces digital platforms for pioneering creatives. Based in Karachi City,
we are a full-service web development and design studio specializing in the fashion
and design fields, with a focus on bringing ideas to life through thoughtful design.
Our team consists of Kabeer Jaffri and Ossaid Qadri, who met while studying at Habib
Public School.`,
      clientsLabel: 'Clients',
      clientsDesktop: desktopClientIds,
      clientsMobile: mobileClientIds,
      foundingDate: '2021-01-01',
      foundingYear: '2021',
      founders: [
        { name: 'Kabeer Jaffri' },
        { name: 'Ossaid Qadri' },
      ],
      metaTitle: 'About | Other Dev',
      metaDescription:
        "Learn about Other Dev, a full-service web development and design studio based in Karachi. Discover our team, mission, and the clients we've worked with.",
      ogImage: mediaMap['/images/about-page/about-team-og.png']?.id,
    }

    await payload.updateGlobal({
      global: 'about',
      data: aboutData,
    })
    console.log('✓ Updated About global')
  } catch (error) {
    console.error('✗ Failed to migrate About:', error instanceof Error ? error.message : error)
  }

  console.log('\n✓ About migration complete')
}

main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})