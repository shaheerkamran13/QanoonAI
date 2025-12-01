"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTitleProps {
  title: string
  isGenerating?: boolean
  className?: string
}

export function AnimatedTitle({ title, isGenerating = false, className }: AnimatedTitleProps) {
  const [displayedTitle, setDisplayedTitle] = useState(title)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevTitleRef = useRef(title)
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only animate if title actually changed from previous value
    if (title !== prevTitleRef.current) {
      // Clear any existing animation
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }

      setIsAnimating(true)
      prevTitleRef.current = title

      // Typewriter effect for new title
      let currentIndex = 0
      const targetTitle = title

      animationRef.current = setInterval(() => {
        if (currentIndex <= targetTitle.length) {
          setDisplayedTitle(targetTitle.slice(0, currentIndex))
          currentIndex++
        } else {
          if (animationRef.current) {
            clearInterval(animationRef.current)
            animationRef.current = null
          }
          setIsAnimating(false)
        }
      }, 30)

      return () => {
        if (animationRef.current) {
          clearInterval(animationRef.current)
          animationRef.current = null
        }
      }
    }
  }, [title]) // Remove displayedTitle from dependencies

  useEffect(() => {
    if (!isAnimating && displayedTitle !== title) {
      setDisplayedTitle(title)
    }
  }, []) // Only run on mount

  if (isGenerating) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <span className="text-gray-400 dark:text-gray-500 italic text-sm">Generating title</span>
        <span className="flex gap-0.5">
          <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
    )
  }

  return (
    <span className={cn("transition-all duration-300", isAnimating && "text-blue-600 dark:text-blue-400", className)}>
      {displayedTitle}
      {isAnimating && <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse" />}
    </span>
  )
}
