"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const thinkingSteps = [
  { text: "Analyzing your query...", icon: "analyze" },
  { text: "Searching legal database...", icon: "search" },
  { text: "Reviewing Pakistani law...", icon: "law" },
  { text: "Preparing response...", icon: "prepare" },
]

function AnimatedIcon({ type }: { type: string }) {
  const iconVariants: Record<string, React.ReactNode> = {
    analyze: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    search: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    law: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    prepare: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  }

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Animated background rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-ping" />
      <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 animate-pulse" />

      {/* Icon container */}
      <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
        <div className="animate-pulse">{iconVariants[type] || iconVariants.analyze}</div>
      </div>
    </div>
  )
}

export function ThinkingIndicator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % thinkingSteps.length)
    }, 2000)

    return () => clearInterval(stepInterval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / thinkingSteps.length) * 100
        if (prev < target) {
          return Math.min(prev + 1, target)
        }
        return prev
      })
    }, 40)

    return () => clearInterval(progressInterval)
  }, [currentStep])

  return (
    <div className="flex gap-4 mb-6 max-w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Avatar with pulsing effect */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
        </div>
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-2xl bg-blue-500/30 animate-ping" />
      </div>

      {/* Thinking Content */}
      <div className="flex flex-col items-start flex-1 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">QanoonAI</span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">thinking</span>
          </div>
        </div>

        {/* Animated thinking box */}
        <div className="w-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl rounded-tl-md p-5 shadow-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl rounded-tl-md overflow-hidden pointer-events-none">
            <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-20 animate-pulse" />
          </div>

          <div className="relative flex items-center gap-4">
            {/* Animated Icon */}
            <div className="flex-shrink-0">
              <AnimatedIcon type={thinkingSteps[currentStep].icon} />
            </div>

            {/* Current step text with fade animation */}
            <div className="flex-1 min-w-0">
              <span
                key={currentStep}
                className="text-sm font-medium text-gray-700 dark:text-gray-200 animate-in fade-in-0 slide-in-from-right-2 duration-300 block"
              >
                {thinkingSteps[currentStep].text}
              </span>

              {/* Step indicators */}
              <div className="flex items-center gap-1.5 mt-2">
                {thinkingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      index === currentStep
                        ? "w-6 bg-gradient-to-r from-blue-500 to-indigo-500"
                        : index < currentStep
                          ? "w-1.5 bg-blue-400/50"
                          : "w-1.5 bg-gray-200 dark:bg-gray-700",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
