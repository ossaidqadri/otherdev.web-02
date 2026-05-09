import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'url'],
    listSearchableFields: ['title', 'slug'],
    preview: (doc) => doc.slug ? `/projects/${doc.slug}` : false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'URL-friendly identifier for project pages.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        placeholder: 'One or two sentences about the project.',
        position: 'sidebar',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        placeholder: 'https://...',
        description: 'Live URL of the project (e.g. https://example.com)',
        position: 'sidebar',
      },
    },
    {
      name: 'downloadUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'media',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
