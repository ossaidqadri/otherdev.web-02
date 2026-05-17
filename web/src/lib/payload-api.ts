/**
 * Payload CMS Local API Client
 * Queries MongoDB via Payload's local API (server-side only)
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getProjects() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    sort: '-year',
    depth: 1,
    limit: 100,
  })
  return docs
}

export async function getProjectBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return docs[0] || null
}

export async function getBlogPosts() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
  })
  return docs
}

export async function getBlogPostBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 1,
    limit: 1,
  })
  return docs[0] || null
}

export async function getAboutContent() {
  const payload = await getPayload({ config: configPromise })
  const about = await payload.findGlobal({
    slug: 'about',
    depth: 2,
  })
  return about ?? null
}

export async function searchContent(query: string) {
  if (!query?.trim()) return []
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'search',
    where: {
      title: { like: query },
    },
    sort: '-priority',
    depth: 2,
    limit: 20,
  })
  return docs
}