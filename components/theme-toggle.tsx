"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  )
}
