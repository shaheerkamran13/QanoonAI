"use client"

import { useState, useEffect, useRef } from "react"
import type { ChatMessage as ChatMessageType } from "@/types/chat"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: ChatMessageType
  isNew?: boolean
}

export function ChatMessage({ message, isNew = false }: ChatMessageProps) {
  const isUser = message.role === "user"
  const [isVisible, setIsVisible] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isNew) {
      setIsVisible(true)

      if (!isUser) {
        const timer = setTimeout(() => {
          if (messageRef.current) {
            messageRef.current.style.animation = "typing 0.5s ease-in-out"
          }
        }, 100)

        return () => clearTimeout(timer)
      }
    } else {
      setIsVisible(true)
    }
  }, [isNew, isUser])

  return (
    <div
      ref={messageRef}
      className={cn(
        "flex gap-4 mb-6 max-w-full group",
        isUser ? "flex-row-reverse" : "flex-row",
        isNew && "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
        isNew && isUser && "animate-in fade-in-0 slide-in-from-right-4 duration-500",
      )}
      style={{
        animationDelay: isNew ? "0.1s" : "0s",
        animationFillMode: "both",
      }}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-lg",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/25"
            : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-indigo-500/25",
          isNew && "animate-in zoom-in-50 duration-300",
        )}
      >
        {isUser ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
        )}
      </div>

      {/* Message Content */}
      <div className={cn("flex flex-col max-w-[75%]", isUser ? "items-end" : "items-start")}>
        <div className="flex items-center gap-2 mb-2">
          <span
            className={cn(
              "text-sm font-semibold",
              isUser ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300",
            )}
          >
            {isUser ? "You" : "QanoonAI"}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {!isUser && message.agentType && (
            <span className="px-2.5 py-0.5 text-xs font-medium bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-800/50">
              {message.agentType}
            </span>
          )}
        </div>

        <div
          className={cn(
            "px-5 py-4 text-[15px] leading-relaxed break-words whitespace-pre-wrap transition-all duration-300",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
              : "text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800/80 rounded-2xl rounded-tl-md shadow-md border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm",
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}
