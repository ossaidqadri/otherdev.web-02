'use client'
/**
 * ThemeProvider — injects admin theme CSS into Payload admin
 *
 * Loaded via admin.components.providers in adminThemePlugin.
 * The CSS overrides Payload's base elevation tokens to match your design system.
 */

import type { PayloadComponent } from 'payload'

import './admin-theme.css'

export const ThemeProvider: PayloadComponent = ({ children }) => {
  return <>{children}</>
}