import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  access: {
    create: ({ req }) => ['admin', 'editor'].includes(req.user?.role),
    update: ({ req }) => ['admin', 'editor'].includes(req.user?.role),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. Frontend Tools',
      },
    },
    slugField({
      name: 'slug',
      useAsSlug: 'name',
    }),
    {
      name: 'description',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
