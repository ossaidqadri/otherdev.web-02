'use client'

import { Streamdown } from 'streamdown'
import { code } from '@streamdown/code'

interface MarkdownRendererProps {
  children: string
  /** Set to true while streaming to enable per-word animation */
  isAnimating?: boolean
}

export function MarkdownRenderer({ children, isAnimating = false }: MarkdownRendererProps) {
  return (
    <Streamdown
      plugins={{ code }}
      isAnimating={isAnimating}
      components={{
        inlineCode: ({ children }) => (
          <code className="bg-muted/50 px-1.5 py-0.5 rounded text-[0.875em] font-mono border border-border/50">
            {children}
          </code>
        ),
        p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
        h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="ml-4">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-muted-foreground/30 pl-4 my-3 italic">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => {
          const isTelLink = href?.startsWith('tel:')
          return (
            <a
              href={href}
              target={isTelLink ? undefined : '_blank'}
              rel={isTelLink ? undefined : 'noopener noreferrer'}
              className={isTelLink ? 'text-foreground hover:underline' : undefined}
            >
              {children}
            </a>
          )
        },
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="my-4 border-border" />,
        br: () => <br />,
        table: ({ children }) => (
          <div className="my-4 w-full overflow-hidden rounded-lg border border-border">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-foreground">{children}</table>
            </div>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-muted/50 text-left font-medium text-muted-foreground [&_tr]:border-b">
            {children}
          </thead>
        ),
        tbody: ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>,
        tr: ({ children }) => (
          <tr className="border-b border-border transition-colors hover:bg-muted/50">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-left border-r border-border last:border-r-0">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="p-4 align-middle text-foreground border-r border-border last:border-r-0">
            {children}
          </td>
        ),
      }}
    >
      {children}
    </Streamdown>
  )
}