'use client'

import { Streamdown } from 'streamdown'
import { code } from '@streamdown/code'
import { cn } from '@/lib/utils'

export type MarkdownProps = {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <Streamdown
      plugins={{ code }}
      className={cn('text-foreground', className)}
      components={{
        inlineCode: ({ children }) => (
          <code className="bg-muted/50 px-1.5 py-0.5 rounded text-[0.875em] font-mono border border-border/50">
            {children}
          </code>
        ),
      }}
    >
      {children}
    </Streamdown>
  )
}