/**
 * Admin Theme Plugin for Payload CMS
 *
 * Wires your design system tokens (fonts, colors, scrollbars, spacing)
 * into the Payload admin UI via the providers injection point.
 *
 * @example
 * import { adminThemePlugin } from './src/plugins'
 * buildConfig({
 *   plugins: [
 *     // ... other plugins
 *     adminThemePlugin(),
 *   ],
 * })
 */

import type { Plugin } from 'payload'

export const adminThemePlugin = (): Plugin =>
  (incomingConfig) => ({
    ...incomingConfig,
    admin: {
      ...incomingConfig.admin,
      components: {
        ...incomingConfig.admin?.components,
        providers: [
          ...(incomingConfig.admin?.components?.providers ?? []),
          './src/plugins/ThemeProvider#ThemeProvider',
        ],
        logout: {
          Button: './src/plugins/LogoutButton#LogoutButton',
        },
      },
    },
  })