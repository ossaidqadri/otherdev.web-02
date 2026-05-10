import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'createdAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    preview: (doc) => doc.slug ? `/blog/${doc.slug}` : false,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
    },
  },
  access: {
    read: ({ req }) =>
      req.user ? true : { _status: { equals: 'published' } },
    create: ({ req }) => ['admin', 'editor'].includes(req.user?.role),
    update: ({ req }) => ['admin', 'editor'].includes(req.user?.role),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. How to Build a CMS with Payload',
      },
    },
    slugField({
      name: 'slug',
      useAsSlug: 'title',
    }),
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        placeholder: 'A brief summary for listings and SEO...',
        description: 'Short summary shown in listings and social previews.',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      admin: {
        description: 'Draft is only visible to editors. Published is live.',
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      many: true,
      filterOptions: {},
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'Leave blank to publish immediately on save.',
        position: 'sidebar',
      },
    },
  ],
}
