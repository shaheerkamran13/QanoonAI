"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { ChatSidebar } from "@/components/chat/ChatSidebar"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatMessage } from "@/components/chat/ChatMessage"
import { ChatInput } from "@/components/chat/ChatInput"
import { ThinkingIndicator } from "@/components/chat/ThinkingIndicator"
import type { ChatSession, ChatMessage as ChatMessageType, ChatApiRequest, ChatApiResponse } from "@/types/chat"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import {
  getSessions,
  saveSessions,
  generateSessionId,
  getUserId,
  getUserEmail,
  generateProfessionalTitle,
} from "@/lib/chat-storage"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://UmarAhmed-34133.portmap.host:34133"

function ChatPageContent() {
  const { theme } = useTheme()
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadedSessions = getSessions()
    if (loadedSessions.length > 0) {
      setSessions(loadedSessions)
      setCurrentSession(loadedSessions[0])
      setMessages(loadedSessions[0].messages)
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized && sessions.length > 0) {
      saveSessions(sessions)
    }
  }, [sessions, isInitialized])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = e.clientX
      if (newWidth >= 280 && newWidth <= 600) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = "default"
      document.body.style.userSelect = "auto"
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const updateSessionMessages = useCallback((sessionId: string, newMessages: ChatMessageType[]) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            messages: newMessages,
            messageCount: newMessages.length,
            updatedAt: new Date(),
          }
        }
        return session
      }),
    )
  }, [])

  const updateSessionTitle = useCallback((sessionId: string, title: string, isGenerating = false) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId) {
          return {
            ...session,
            title,
            isGeneratingTitle: isGenerating,
          }
        }
        return session
      }),
    )
  }, [])

  const handleSendMessage = async (content: string) => {
    let activeSession = currentSession

    if (!activeSession) {
      const newSession: ChatSession = {
        id: generateSessionId(),
        title: "Generating title...",
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0,
        messages: [],
        isGeneratingTitle: true,
      }
      activeSession = newSession
      setSessions((prev) => [newSession, ...prev])
      setCurrentSession(newSession)
    }

    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      content,
      role: "user",
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    if (messages.length === 0) {
      updateSessionTitle(activeSession.id, "Generating title...", true)

      setTimeout(() => {
        const professionalTitle = generateProfessionalTitle(content)
        updateSessionTitle(activeSession!.id, professionalTitle, false)
      }, 1500)
    }

    setIsLoading(true)

    try {
      const requestBody: ChatApiRequest = {
        message: content,
        session_id: activeSession.id,
        user_id: getUserId(),
        email: getUserEmail(),
      }

      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: ChatApiResponse = await response.json()

      const assistantMessage: ChatMessageType = {
        id: `msg-${Date.now() + 1}`,
        content: data.response,
        role: "assistant",
        timestamp: new Date(data.timestamp),
        agentType: data.agent_type,
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)
      updateSessionMessages(activeSession.id, finalMessages)
    } catch (error) {
      console.error("Failed to send message:", error)

      const errorMessage: ChatMessageType = {
        id: `msg-${Date.now() + 1}`,
        content: "I apologize, but I encountered an error while processing your request. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }

      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
      updateSessionMessages(activeSession.id, finalMessages)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: generateSessionId(),
      title: "New Legal Query",
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
      messages: [],
    }
    setSessions((prev) => [newSession, ...prev])
    setCurrentSession(newSession)
    setMessages([])
  }

  const handleSelectSession = (session: ChatSession) => {
    setCurrentSession(session)
    setMessages(session.messages)
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessionId)

      if (currentSession?.id === sessionId) {
        if (filtered.length > 0) {
          setCurrentSession(filtered[0])
          setMessages(filtered[0].messages)
        } else {
          setCurrentSession(null)
          setMessages([])
        }
      }

      return filtered
    })
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <ChatSidebar
        ref={sidebarRef}
        sessions={sessions}
        currentSession={currentSession}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        width={sidebarWidth}
      />

      {/* Resize handle */}
      {isSidebarOpen && (
        <div
          className={`w-1.5 bg-transparent hover:bg-blue-400/50 cursor-col-resize transition-colors z-40 relative ${
            isResizing ? "bg-blue-500/50" : ""
          }`}
          onMouseDown={handleResizeStart}
        >
          <div className="w-px h-full bg-gray-200 dark:bg-gray-800 mx-auto" />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onNewChat={handleNewChat} />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.02] pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6 relative">
            {messages.length === 0 && !isLoading ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-float">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to QanoonAI</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed text-lg">
                  Your AI-powered legal assistant for Pakistani law. Ask about constitutional rights, family law,
                  property matters, or any legal query.
                </p>

                <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                  {[
                    { text: "What are fundamental rights?", icon: "shield" },
                    { text: "Property transfer process", icon: "home" },
                    { text: "Family court procedures", icon: "users" },
                    { text: "Business registration", icon: "briefcase" },
                  ].map((suggestion) => (
                    <button
                      key={suggestion.text}
                      onClick={() => handleSendMessage(suggestion.text)}
                      className="group px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                        {suggestion.icon === "shield" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        )}
                        {suggestion.icon === "home" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                        )}
                        {suggestion.icon === "users" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        )}
                        {suggestion.icon === "briefcase" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </span>
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} isNew={index === messages.length - 1} />
                ))}
                {isLoading && <ThinkingIndicator />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-200/80 dark:border-gray-800/80 p-4 md:p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
              QanoonAI provides general legal information, not professional legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  )
}
