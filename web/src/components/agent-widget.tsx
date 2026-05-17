'use client'

import { MessageCircle, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Z_INDEX } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface AgentWidgetProps {
  agentId?: string
  avatarUrl?: string
  className?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-id'?: string
          'avatar-image-url'?: string
          'dynamic-variables'?: string
        },
        HTMLElement
      >
    }
  }
}

export function AgentWidget({ agentId, avatarUrl, className }: AgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [_isLoaded, setIsLoaded] = useState(false)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (isOpen && !scriptLoaded.current) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
      script.async = true
      script.type = 'text/javascript'
      script.onload = () => {
        scriptLoaded.current = true
        setIsLoaded(true)
      }
      document.body.appendChild(script)
      return () => {
        // cleanup not needed — script persists across renders
      }
    }
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8',
            'h-14 w-14 md:h-12 md:w-12',
            'flex items-center justify-center rounded-full shadow-md',
            'bg-primary text-primary-foreground',
            'hover:opacity-90 hover:motion-scale-in-110 active:motion-scale-out-95',
            'transition-all focus:outline-none motion-duration-200',
            className
          )}
          style={{ zIndex: Z_INDEX.chatButton }}
          aria-label="Open sales assistant"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={2} />
        </button>
      )}

      {/* Widget overlay when open */}
      {isOpen && (
        <div
          className={cn(
            'fixed inset-0 sm:inset-4 sm:rounded-2xl sm:max-w-[90vw] sm:max-h-[calc(100vh-2rem)]',
            'md:inset-[unset] md:bottom-8 md:right-8 md:w-[420px] md:h-[600px] md:max-h-[calc(100vh-4rem)]',
            'bg-background border rounded-none sm:rounded-2xl shadow-2xl',
            'flex flex-col overflow-hidden',
            'animate-[slideInFromBottom_0.3s_ease-out_forwards]',
            'z-[60]'
          )}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Agent" className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-foreground">Sales Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="bg-transparent border-none hover:opacity-80 transition-opacity cursor-pointer p-1"
              aria-label="Close assistant"
            >
              <X className="h-5 w-5 text-foreground" strokeWidth={2} />
            </button>
          </div>

          {/* ElevenLabs widget embed */}
          <div className="flex-1 overflow-hidden">
            {isOpen && agentId && (
              <elevenlabs-convai
                agent-id={agentId}
                avatar-image-url={avatarUrl ?? ''}
                dynamic-variables={JSON.stringify({
                  source: 'website',
                  timestamp: new Date().toISOString(),
                })}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            )}
            {isOpen && !agentId && (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm p-8 text-center">
                Agent ID not configured.
                <br />
                Set{' '}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  NEXT_PUBLIC_ELEVENLABS_AGENT_ID
                </code>{' '}
                in your environment.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
