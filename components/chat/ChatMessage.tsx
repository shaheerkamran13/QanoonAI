'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChatMessage as ChatMessageType } from '@/types/chat'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: ChatMessageType
  isNew?: boolean
}

export function ChatMessage({ message, isNew = false }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const [isVisible, setIsVisible] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isNew) {
      // Trigger animation for new messages
      setIsVisible(true)
      
      // Add a subtle typing animation for AI messages
      if (!isUser) {
        const timer = setTimeout(() => {
          if (messageRef.current) {
            messageRef.current.style.animation = 'typing 0.5s ease-in-out'
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
        'flex gap-3 mb-6 max-w-full group',
        isUser ? 'flex-row-reverse' : 'flex-row',
        isNew && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
        isNew && isUser && 'animate-in fade-in-0 slide-in-from-right-4 duration-500'
      )}
      style={{
        animationDelay: isNew ? '0.1s' : '0s',
        animationFillMode: 'both'
      }}
    >
      {/* Avatar with animation */}
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm' 
          : 'bg-gradient-to-br from-gray-400 to-gray-500 text-white shadow-sm',
        isNew && 'animate-in zoom-in-50 duration-300'
      )}>
        {isUser ? (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      
      {/* Message Content */}
      <div className={cn(
        'flex flex-col max-w-[75%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        {/* Sender Name and Time */}
        <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className={cn(
            'text-xs font-medium',
            isUser ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
          )}>
            {isUser ? 'You' : 'QanoonAI'}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {/* Message Bubble with animation */}
        <div className={cn(
          'px-4 py-3 text-[15px] leading-relaxed break-words whitespace-pre-wrap transition-all duration-300',
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md shadow-sm hover:shadow-md animate-in fade-in-0 zoom-in-95 duration-500' 
            : 'text-gray-800 dark:text-gray-200 bg-transparent animate-in fade-in-0 slide-in-from-left-4 duration-500'
        )}>
          {message.content}
        </div>
      </div>
    </div>
  )
}