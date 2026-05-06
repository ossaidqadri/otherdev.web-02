'use client'

import { Streamdown } from 'streamdown'
import { code } from '@streamdown/code'
import { math } from '@streamdown/math'
import { mermaid } from '@streamdown/mermaid'
import 'katex/dist/katex.min.css'

export type MarkdownProps = {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <Streamdown
      plugins={{ code, math, mermaid }}
      shikiTheme={['github-light', 'github-dark']}
      controls={{
        code: { copy: true, download: true },
        mermaid: { copy: true, download: true, fullscreen: true },
        table: { copy: true, download: true },
      }}
      className={className}
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