import Link from "next/link"
import { cn } from "@/lib/utils"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-3 px-3">
      <div className="flex items-center gap-2">
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
    </nav>
  )
}
