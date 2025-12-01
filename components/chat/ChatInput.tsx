"use client"

import type React from "react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={cn(
          "flex items-end gap-3 p-4 bg-white dark:bg-gray-800/80 backdrop-blur-sm border rounded-2xl shadow-lg transition-all duration-300",
          isFocused
            ? "border-blue-400 dark:border-blue-500 shadow-blue-500/10 ring-4 ring-blue-500/10"
            : "border-gray-200 dark:border-gray-700",
          disabled && "opacity-60 cursor-not-allowed",
        )}
      >
        <button
          type="button"
          disabled={disabled}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            disabled ? "Waiting for response..." : "Ask about Pakistani law, constitutional rights, legal procedures..."
          }
          disabled={disabled}
          className="flex-1 min-h-[44px] max-h-36 py-3 px-1 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-[15px] leading-relaxed disabled:cursor-not-allowed"
          rows={1}
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={cn(
              "p-3 rounded-xl transition-all duration-200 flex items-center justify-center",
              message.trim() && !disabled
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed",
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end mt-2 px-1">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-500 dark:text-gray-400 font-mono text-[10px]">
            Enter
          </kbd>{" "}
          to send
        </span>
      </div>
    </form>
  )
}
