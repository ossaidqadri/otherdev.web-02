"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-3 px-3">
      {/* Mobile Navigation - otherdev pill + hamburger */}
      <div className="md:hidden flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] text-[#686868] transition-colors hover:text-black"
          )}
        >
          otherdev
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-[27px] w-[27px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-black transition-colors"
          )}
          aria-label="Toggle menu"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4h12M2 8h12M2 12h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Tablet/Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        <Link
          href="/"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] text-[#686868] transition-colors hover:text-black"
          )}
        >
          otherdev
        </Link>
        <Link
          href="/work"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] text-black transition-colors hover:text-black"
          )}
        >
          work
        </Link>
        <Link
          href="/audio"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] text-[#686868] transition-colors hover:text-black"
          )}
        >
          audio
        </Link>
        <Link
          href="/about"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] text-[#686868] transition-colors hover:text-black"
          )}
        >
          about
        </Link>
      </div>


      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[42px] bg-neutral-100 z-40">
          <div className="flex flex-col gap-2 p-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={cn(
                "h-[40px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center px-4",
                "text-[14px] font-normal text-[#686868] transition-colors hover:text-black"
              )}
            >
              otherdev
            </Link>
            <Link
              href="/work"
              onClick={() => setIsOpen(false)}
              className={cn(
                "h-[40px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center px-4",
                "text-[14px] font-normal text-black transition-colors hover:text-black"
              )}
            >
              work
            </Link>
            <Link
              href="/audio"
              onClick={() => setIsOpen(false)}
              className={cn(
                "h-[40px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center px-4",
                "text-[14px] font-normal text-[#686868] transition-colors hover:text-black"
              )}
            >
              audio
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={cn(
                "h-[40px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center px-4",
                "text-[14px] font-normal text-[#686868] transition-colors hover:text-black"
              )}
            >
              about
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
