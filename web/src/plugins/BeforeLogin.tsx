'use client'
import type { PayloadComponent } from 'payload'
import { Logo } from './Logo'

export const BeforeLogin: PayloadComponent = () => (
  <div className="login-brand-panel">
    <div className="login-brand-panel__inner">
      <Logo />
      <span className="login-brand-panel__label">OD-Canvas</span>
      <p className="login-brand-panel__sub">Content management</p>
    </div>
  </div>
)
