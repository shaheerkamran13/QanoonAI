'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ChatSidebar } from '@/components/chat/ChatSidebar'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatSession, ChatMessage as ChatMessageType } from '@/types/chat'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Mock data - replace with actual API calls
const mockSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Property Dispute Case',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),

  },
  {
    id: '2',
    title: 'Contract Review Query',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),

  },
  {
    id: '3',
    title: 'Legal Documentation Help',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),

  }
]

const mockMessages: ChatMessageType[] = [
  {
    id: '1',
    content: 'Hello! I need help with a property dispute case.',
    role: 'user',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    content: 'I understand you need help with a property dispute. Could you please provide more details about your case? What type of property is involved and what is the nature of the dispute?',
    role: 'assistant',
    timestamp: new Date('2024-01-15T10:31:00')
  }
]

// This is the main chat content component
function ChatPageContent() {
  const { theme } = useTheme()
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions)
  const [currentSession, setCurrentSession] = useState<ChatSession>(mockSessions[0])
  const [messages, setMessages] = useState<ChatMessageType[]>(mockMessages)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(320) // Default width in pixels
  const [isResizing, setIsResizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle sidebar resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX
      // Set min and max width constraints
      if (newWidth >= 280 && newWidth <= 600) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessageType = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message. I am analyzing your legal query and will provide you with comprehensive assistance based on Pakistani law.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Legal Query',
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0
    }
    setSessions(prev => [newSession, ...prev])
    setCurrentSession(newSession)
    setMessages([])
  }

  const handleSelectSession = (session: ChatSession) => {
    setCurrentSession(session)
    // In a real app, you would fetch messages for this session
    setMessages(mockMessages)
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <ChatSidebar
        ref={sidebarRef}
        sessions={sessions}
        currentSession={currentSession}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        width={sidebarWidth}
      />
      
      {/* Resize handle - Only show when sidebar is open */}
      {isSidebarOpen && (
        <div
          className={`w-2 bg-transparent hover:bg-blue-300 dark:hover:bg-blue-600 cursor-col-resize transition-colors z-40 relative ${
            isResizing ? 'bg-blue-400 dark:bg-blue-500' : ''
          }`}
          onMouseDown={handleResizeStart}
          style={{
            cursor: isResizing ? 'col-resize' : 'default',
          }}
        >
          <div className="w-1 h-full bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-400 mx-auto transition-colors" />
        </div>
      )}
      
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          onNewChat={handleNewChat}
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to QanoonAI
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Your AI-powered legal assistant. Ask me anything about Pakistani law, 
                  legal procedures, documentation, or get guidance on legal matters.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

// This is the default export that wraps the content with ProtectedRoute
export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  )
}