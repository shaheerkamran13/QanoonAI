"use client"

import type React from "react"
import { forwardRef } from "react"
import type { ChatSession } from "@/types/chat"
import { cn } from "@/lib/utils"
import { AnimatedTitle } from "./AnimatedTitle"

interface ChatSidebarProps {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  onSelectSession: (session: ChatSession) => void
  onNewChat: () => void
  onDeleteSession?: (sessionId: string) => void
  isOpen: boolean
  onToggle: () => void
  width?: number
}

export const ChatSidebar = forwardRef<HTMLDivElement, ChatSidebarProps>(function ChatSidebar(
  { sessions, currentSession, onSelectSession, onNewChat, onDeleteSession, isOpen, onToggle, width = 320 },
  ref,
) {
  const handleNewChat = () => {
    onNewChat()
    if (window.innerWidth < 1024) {
      onToggle()
    }
  }

  const handleSelectSession = (session: ChatSession) => {
    onSelectSession(session)
    if (window.innerWidth < 1024) {
      onToggle()
    }
  }

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation()
    if (onDeleteSession) {
      onDeleteSession(sessionId)
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays < 7) return `${diffDays - 1}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getSessionIcon = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes("property") || lowerTitle.includes("land")) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      )
    }
    if (lowerTitle.includes("family") || lowerTitle.includes("matrimonial") || lowerTitle.includes("custody")) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      )
    }
    if (lowerTitle.includes("criminal") || lowerTitle.includes("defense")) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      )
    }
    if (lowerTitle.includes("corporate") || lowerTitle.includes("business") || lowerTitle.includes("commercial")) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      )
    }
    if (lowerTitle.includes("constitution") || lowerTitle.includes("rights") || lowerTitle.includes("fundamental")) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )
    }
    // Default icon
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-30 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-20 flex flex-col flex-shrink-0 border-r border-gray-200/80 dark:border-gray-800/80",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0",
        )}
        style={{
          width: isOpen ? `${width}px` : "0px",
          minWidth: isOpen ? `${width}px` : "0px",
        }}
      >
        {isOpen && (
          <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="p-5 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">QanoonAI</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Legal Assistant</p>
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 lg:hidden"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleNewChat}
                className="w-full px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Consultation
              </button>
            </div>

            {/* Sessions list */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <p className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Recent Consultations
              </p>
              <div className="space-y-1.5">
                {sessions.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-300 dark:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">No consultations yet</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Start a new consultation above</p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectSession(session)}
                      className={cn(
                        "w-full text-left p-3.5 rounded-xl transition-all duration-200 group relative",
                        currentSession?.id === session.id
                          ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 shadow-sm"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-transparent",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                            currentSession?.id === session.id
                              ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700",
                          )}
                        >
                          {getSessionIcon(session.title)}
                        </div>

                        <div className="flex-1 min-w-0 pr-6">
                          <h4
                            className={cn(
                              "text-sm font-semibold truncate mb-1",
                              currentSession?.id === session.id
                                ? "text-blue-700 dark:text-blue-300"
                                : "text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white",
                            )}
                          >
                            <AnimatedTitle title={session.title} isGenerating={session.isGeneratingTitle} />
                          </h4>
                          <div className="flex items-center gap-2 text-xs">
                            <span
                              className={cn(
                                "font-medium",
                                currentSession?.id === session.id
                                  ? "text-blue-600/70 dark:text-blue-400/70"
                                  : "text-gray-500 dark:text-gray-500",
                              )}
                            >
                              {session.messageCount || session.messages?.length || 0} messages
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                            <span
                              className={cn(
                                currentSession?.id === session.id
                                  ? "text-blue-600/60 dark:text-blue-400/60"
                                  : "text-gray-400 dark:text-gray-600",
                              )}
                            >
                              {formatDate(session.updatedAt)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleDeleteSession(e, session.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all"
                          title="Delete consultation"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gray-50/50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">AI Online</span>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">v2.0 Pro</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
})
