'use client'

import React, { forwardRef } from 'react'
import { ChatSession } from '@/types/chat'
import { cn } from '@/lib/utils'

interface ChatSidebarProps {
  sessions: ChatSession[]
  currentSession: ChatSession
  onSelectSession: (session: ChatSession) => void
  onNewChat: () => void
  isOpen: boolean
  onToggle: () => void
  width?: number
}

export const ChatSidebar = forwardRef<HTMLDivElement, ChatSidebarProps>(function ChatSidebar({ 
  sessions, 
  currentSession, 
  onSelectSession, 
  onNewChat, 
  isOpen,
  onToggle,
  width = 320
}, ref) {

  const handleNewChat = () => {
    onNewChat();
    if (window.innerWidth < 1024) {
      onToggle();
    }
  }

  const handleSelectSession = (session: ChatSession) => {
    onSelectSession(session);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return (
    <>
      {/* Mobile overlay - Only show when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div 
        ref={ref}
        className={cn(
          'fixed inset-y-0 left-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-20 flex flex-col flex-shrink-0 border-r border-gray-100/50 dark:border-gray-800/50',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0'
        )}
        style={{ 
          width: isOpen ? `${width}px` : '0px',
          minWidth: isOpen ? `${width}px` : '0px'
        }}
      >
        {/* Only render sidebar content when it's open */}
        {isOpen && (
          <div className="flex flex-col h-full w-full">
            {/* Header - Minimal */}
            <div className="p-6 flex-shrink-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      QanoonAI
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-all duration-200 lg:hidden"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* New Chat Button - Clean */}
              <button
                onClick={handleNewChat}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-gray-900 dark:text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
              >
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Chat
              </button>
            </div>

            {/* Sessions list - Clean */}
            <div className="flex-1 overflow-y-auto px-3">
              <div className="space-y-1">
                {sessions.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No conversations yet</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Start by creating a new chat</p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectSession(session)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg transition-all duration-200 group',
                        currentSession.id === session.id
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className={cn(
                            'text-sm font-medium truncate mb-1',
                            currentSession.id === session.id
                              ? 'text-blue-700 dark:text-blue-300'
                              : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                          )}>
                            {session.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={cn(
                              currentSession.id === session.id
                                ? 'text-blue-600/70 dark:text-blue-400/70'
                                : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                            )}>
                              {(session.messageCount || 0)} messages
                            </span>
                            <span className={cn(
                              'text-xs',
                              currentSession.id === session.id
                                ? 'text-blue-600/60 dark:text-blue-400/60'
                                : 'text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-500'
                            )}>
                              •
                            </span>
                            <span className={cn(
                              currentSession.id === session.id
                                ? 'text-blue-600/70 dark:text-blue-400/70'
                                : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                            )}>
                              {formatDate(session.updatedAt)}
                            </span>
                          </div>
                        </div>
                        {currentSession.id === session.id && (
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2 ml-2" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Footer - Minimal */}
            <div className="p-4 border-t border-gray-100/50 dark:border-gray-800/50 flex-shrink-0">
              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-400 dark:text-gray-500">
                  QanoonAI • Professional
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-gray-400 dark:text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
})