import type { GlobalConfig } from 'payload'

import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export const About: GlobalConfig = {
  slug: 'about',
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
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            const data = siblingData.aboutText
            if (!data) return ''
            return convertLexicalToPlaintext({ data })
          },
        ],
      },
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
