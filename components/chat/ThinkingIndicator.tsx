"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const thinkingSteps = [
  { text: "Analyzing your query...", icon: "analyze", duration: 2000 },
  { text: "Searching legal database...", icon: "search", duration: 2200 },
  { text: "Reviewing Pakistani law...", icon: "law", duration: 2400 },
  { text: "Preparing response...", icon: "prepare", duration: 2000 },
]

function AnimatedIcon({ type }: { type: string }) {
  const iconVariants: Record<string, React.ReactNode> = {
    analyze: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    search: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    law: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    prepare: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  }

  return (
    <div className="relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-indigo-400/10 animate-pulse" />
      
      {/* Icon container */}
      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100/80 dark:border-blue-800/30 flex items-center justify-center backdrop-blur-sm">
        <div className="text-blue-600 dark:text-blue-400">
          {iconVariants[type] || iconVariants.analyze}
        </div>
      </div>
    </div>
  )
}

export function ThinkingIndicator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true
    let stepTimer: NodeJS.Timeout

    const runStep = (stepIndex: number) => {
      if (!mounted) return
      
      setCurrentStep(stepIndex)
      
      const stepDuration = thinkingSteps[stepIndex]?.duration || 2000
      stepTimer = setTimeout(() => {
        if (mounted) {
          runStep((stepIndex + 1) % thinkingSteps.length)
        }
      }, stepDuration)
    }

    runStep(0)

    return () => {
      mounted = false
      clearTimeout(stepTimer)
    }
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / thinkingSteps.length) * 100
        if (prev < target) {
          return Math.min(prev + 0.5, target)
        }
        return prev
      })
    }, 30)

    return () => clearInterval(progressInterval)
  }, [currentStep])

  return (
    <div className="flex gap-4 mb-6 max-w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Avatar with subtle gradient */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
        </div>
      </div>

      {/* Thinking Content */}
      <div className="flex flex-col items-start flex-1 max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">QanoonAI</span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Thinking</span>
            </div>
          </div>
        </div>

        {/* Professional thinking container */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center gap-4">
            {/* Animated Icon */}
            <div className="flex-shrink-0">
              <AnimatedIcon type={thinkingSteps[currentStep].icon} />
            </div>

            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2">
                {/* Current step with smooth transition */}
                <span
                  key={currentStep}
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 animate-in fade-in-0 slide-in-from-right-3 duration-300 block"
                >
                  {thinkingSteps[currentStep].text}
                </span>

                {/* Progress indicators */}
                <div className="flex items-center justify-between">
                  {/* Dots indicator */}
                  <div className="flex items-center gap-1.5">
                    {thinkingSteps.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          index === currentStep
                            ? "w-8 bg-gradient-to-r from-blue-500 to-indigo-500"
                            : index < currentStep
                              ? "w-2 bg-blue-400/40"
                              : "w-2 bg-gray-300/50 dark:bg-gray-600/50",
                        )}
                      />
                    ))}
                  </div>
                  
                  {/* Step counter */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span className="text-blue-600 dark:text-blue-400">{currentStep + 1}</span>
                    <span className="mx-1">/</span>
                    <span>{thinkingSteps.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant progress bar */}
          <div className="mt-4 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Subtle status message */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Processing your legal inquiry...
              </span>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Contextual tip */}
        <div className="mt-3 px-3 py-2 rounded-lg bg-blue-50/60 dark:bg-blue-900/15 border border-blue-100/60 dark:border-blue-800/25">
          <div className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              Processing your request, may take a moment
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}