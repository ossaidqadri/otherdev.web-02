import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Settings',
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200,
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
    useAPIKey: true,
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Shown in the admin sidebar and account page.',
      },
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      access: {
        update: () => false,
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        placeholder: 'A short description about yourself...',
        description: 'Optional. Shown on your author profile if applicable.',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        placeholder: '+1 (555) 000-0000',
        description: 'Optional. Used only for urgent CMS notifications.',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      defaultValue: 'viewer',
      required: true,
      admin: {
        description: 'Viewer = read-only. Editor = create/edit. Admin = full access.',
      },
      access: {
        update: ({ req }) => req.user?.role === 'admin',
        read: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
  hooks: {
    beforeRegister: [
      ({ req }) => {
        if (req.user?.role !== 'admin') {
          throw new Error('Public registration is disabled. Ask an admin to create your account.')
        }
      },
    ],
    afterLogin: [
      async ({ req, user }) => {
        console.log(`Login: ${user.email} from ${req.headers.get('x-forwarded-for')}`)
      },
    ],
    afterForgotPassword: [
      async ({ args }) => {
        console.log(`Password reset requested for: ${args.data.email}`)
      },
    ],
  },
}
