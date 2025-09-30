"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image src="/clean-mark.jpg" alt="QanoonAI" width={24} height={24} className="rounded" />
          <Link href="/" className="font-semibold tracking-tight text-pretty">
            QanoonAI
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden md:inline-flex">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/register">
            <Button>Start free</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
