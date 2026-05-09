import type { CollectionConfig } from 'payload'

export const About: CollectionConfig = {
  slug: 'about',
  admin: {
    useAsTitle: 'metaTitle',
    defaultColumns: ['metaTitle', 'updatedAt'],
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroImageAlt',
      type: 'text',
      required: true,
    },
    {
      name: 'aboutLabel',
      type: 'text',
      defaultValue: 'About',
    },
    {
      name: 'aboutText',
      type: 'richText',
    },
    {
      name: 'aboutTextPlain',
      type: 'textarea',
    },
    {
      name: 'clientsLabel',
      type: 'text',
      defaultValue: 'Clients',
    },
    {
      name: 'clientsDesktop',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
    },
    {
      name: 'clientsMobile',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
    },
    {
      name: 'foundingDate',
      type: 'date',
    },
    {
      name: 'foundingYear',
      type: 'text',
    },
    {
      name: 'founders',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'metaTitle',
      type: 'text',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}