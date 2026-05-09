/**
 * Migrate about page content from static data to Payload About collection
 *
 * Run AFTER:
 *   - migrate-media.ts (if media needs mapping)
 *   - migrate-projects.ts (if clients already exist from projects)
 *
 * This script populates the Clients collection and About collection
 * with the content that was previously hardcoded in the about page.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

const ABOUT_DATA = {
  heroImageAlt: 'The members of otherdev',
  aboutLabel: 'About',
  aboutTextPlain: `Other Dev produces digital platforms for pioneering creatives. Based in Karachi City,
we are a full-service web development and design studio specializing in the fashion
and design fields, with a focus on bringing ideas to life through thoughtful design.
Our team consists of Kabeer Jaffri and Ossaid Qadri, who met while studying at Habib
Public School.`,
  clientsLabel: 'Clients',
  foundingDate: '2021-01-01',
  foundingYear: '2021',
  founders: [
    { name: 'Kabeer Jaffri' },
    { name: 'Ossaid Qadri' },
  ],
  metaTitle: 'About | Other Dev',
  metaDescription:
    'Learn about Other Dev, a full-service web development and design studio based in Karachi. Discover our team, mission, and the clients we\'ve worked with.',
}

async function main() {
  const payload = await getPayload({ config: configPromise })

  console.log('\n--- Migrating Clients ---\n')

  const clientIds: { desktop: string[], mobile: string[] } = { desktop: [], mobile: [] }

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

  for (const clientData of CLIENTS_DATA) {
    try {
      const existing = await payload.find({
        collection: 'clients',
        where: { slug: { equals: clientData.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`✓ Already exists: ${clientData.name}`)
        const id = existing.docs[0].id as string

        if (desktopOrder.includes(clientData.name)) {
          clientIds.desktop.push(id)
        }
        if (mobileOrder.includes(clientData.name)) {
          clientIds.mobile.push(id)
        }
      } else {
        const created = await payload.create({
          collection: 'clients',
          data: clientData,
        })
        console.log(`✓ Created: ${clientData.name}`)
        const id = (created as { id: string }).id

        if (desktopOrder.includes(clientData.name)) {
          clientIds.desktop.push(id)
        }
        if (mobileOrder.includes(clientData.name)) {
          clientIds.mobile.push(id)
        }
      }
    } catch (error) {
      console.error(`✗ Failed: ${clientData.name}`, error instanceof Error ? error.message : error)
    }
  }

  // Sort clientIds by desktopOrder
  clientIds.desktop = desktopOrder
    .map(name => CLIENTS_DATA.find(c => c.name === name)?.slug)
    .map(slug => {
      const existing = CLIENTS_DATA.map((c, i) => ({ ...c, index: i }))
        .find(c => c.slug === slug)
      return existing ? undefined : undefined
    })
    .filter(Boolean) as string[]

  // Actually fetch the IDs in the correct order
  const desktopClients = await payload.find({
    collection: 'clients',
    where: {
      slug: {
        in: desktopOrder.map(name => CLIENTS_DATA.find(c => c.name === name)?.slug).filter(Boolean) as string[]
      }
    },
    limit: 20,
  })

  const desktopClientIds = desktopOrder
    .map(name => {
      const found = desktopClients.docs.find(c => (c as unknown as { name: string }).name === name)
      return found ? (found as unknown as { id: string }).id : null
    })
    .filter(Boolean) as string[]

  const mobileClients = await payload.find({
    collection: 'clients',
    where: {
      slug: {
        in: mobileOrder.map(name => CLIENTS_DATA.find(c => c.name === name)?.slug).filter(Boolean) as string[]
      }
    },
    limit: 20,
  })

  const mobileClientIds = mobileOrder
    .map(name => {
      const found = mobileClients.docs.find(c => (c as unknown as { name: string }).name === name)
      return found ? (found as unknown as { id: string }).id : null
    })
    .filter(Boolean) as string[]

  console.log('\n--- Migrating About Content ---\n')

  try {
    const existingAbout = await payload.find({
      collection: 'about',
      limit: 1,
    })

    const aboutData = {
      ...ABOUT_DATA,
      clientsDesktop: desktopClientIds,
      clientsMobile: mobileClientIds,
    }

    if (existingAbout.docs.length > 0) {
      await payload.update({
        collection: 'about',
        id: existingAbout.docs[0].id,
        data: aboutData,
      })
      console.log('✓ Updated About document')
    } else {
      await payload.create({
        collection: 'about',
        data: aboutData,
      })
      console.log('✓ Created About document')
    }
  } catch (error) {
    console.error('✗ Failed to migrate About:', error instanceof Error ? error.message : error)
  }

  console.log('\n✓ About migration complete')
  console.log('\nNote: You still need to manually upload the hero image in Payload admin.')
  console.log('      The heroImage field requires a media upload, not a URL string.\n')
}

main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})