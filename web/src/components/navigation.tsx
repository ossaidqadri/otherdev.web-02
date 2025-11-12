"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("mobileMenuOpen") === "true"
    }
    return false
  })
  const pathname = usePathname()

  useEffect(() => {
    sessionStorage.setItem("mobileMenuOpen", isOpen.toString())
  }, [isOpen])

  return (
    <nav className="fixed top-[15px] left-0 right-0 z-50 px-3 pointer-events-none">
      {/* Mobile Navigation */}
      <div className="sm:hidden flex items-center gap-[6px] w-full pointer-events-auto relative z-50">
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="otherdev-pill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/"
                className={cn(
                  "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
                  "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
                  pathname === "/" ? "text-black" : "text-[#686868]"
                )}
              >
                otherdev
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="menu-open"
              className="flex items-center gap-1.5 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Link
                  href="/work"
                  className={cn(
                    "h-[27px] w-[52px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
                    "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
                    pathname?.startsWith("/work") ? "text-black" : "text-[#686868]"
                  )}
                >
                  work
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <Link
                  href="/audio"
                  className={cn(
                    "h-[27px] w-[52px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
                    "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
                    pathname?.startsWith("/audio") ? "text-black" : "text-[#686868]"
                  )}
                >
                  audio
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Link
                  href="/about"
                  className={cn(
                    "h-[27px] w-[52px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
                    "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
                    pathname?.startsWith("/about") ? "text-black" : "text-[#686868]"
                  )}
                >
                  about
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <button
                  className={cn(
                    "h-[27px] w-[62px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
                    "text-[11px] font-normal leading-[14px] text-[#686868] transition-colors hover:text-black"
                  )}
                >
                  contact
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hamburger/X Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-[27px] w-[27px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center ml-auto",
            "text-black transition-colors"
          )}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x-icon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={16} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={16} strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Tablet/Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-[6px] pointer-events-auto">
        <Link
          href="/"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
            pathname === "/" ? "text-black" : "text-[#686868]"
          )}
        >
          otherdev
        </Link>
        <Link
          href="/work"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
            pathname?.startsWith("/work") ? "text-black" : "text-[#686868]"
          )}
        >
          work
        </Link>
        <Link
          href="/audio"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
            pathname?.startsWith("/audio") ? "text-black" : "text-[#686868]"
          )}
        >
          audio
        </Link>
        <Link
          href="/about"
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] transition-colors hover:text-black",
            pathname?.startsWith("/about") ? "text-black" : "text-[#686868]"
          )}
        >
          about
        </Link>
        <button
          className={cn(
            "h-[27px] w-[75px] rounded-[5px] backdrop-blur-[1px] bg-[rgba(227,227,227,0.93)] flex items-center justify-center",
            "text-[11px] font-normal leading-[14px] text-[#686868] transition-colors hover:text-black"
          )}
        >
          contact
        </button>
      </div>


      {/* Backdrop */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-30 pointer-events-none"
        />
      )}
    </nav>
  )
}
