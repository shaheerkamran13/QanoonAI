"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { RecordingIndicator } from "@/components/chat/Recording-indicator"
import { VoiceButton } from "@/components/chat/Voice-button"
import { SendButton } from "@/components/chat/Send-button"
import { formatTime } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Use the speech recognition hook
  const {
    transcript,
    isRecording,
    isSupported,
    recordingTime,
    startRecording,
    stopRecording,
    resetTranscript
  } = useSpeechRecognition()

  // Sync speech recognition transcript with message state
  useEffect(() => {
    if (transcript) {
      setMessage(transcript)
    }
  }, [transcript])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
      resetTranscript()
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

  const handleVoiceButtonClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Recording Indicator */}
      {isRecording && (
        <RecordingIndicator 
          recordingTime={recordingTime}
          onStopRecording={stopRecording}
        />
      )}

      <div
        className={cn(
          "relative flex items-end gap-3 p-4 bg-white dark:bg-gray-800/90 backdrop-blur-xl border-2 rounded-2xl shadow-lg transition-all duration-300",
          isFocused
            ? "border-blue-400/50 dark:border-blue-500/50 shadow-blue-500/10 ring-4 ring-blue-500/5"
            : "border-gray-200/80 dark:border-gray-700/80",
          isRecording && "border-red-400/50 dark:border-red-500/50 shadow-red-500/10 ring-4 ring-red-500/5",
          disabled && "opacity-60 cursor-not-allowed",
        )}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            disabled 
              ? "Waiting for response..." 
              : "Ask about Pakistani law, constitutional rights, legal procedures..."
          }
          disabled={disabled || isRecording}
          className="flex-1 min-h-[48px] max-h-36 py-3 px-2 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-[15px] leading-relaxed disabled:cursor-not-allowed"
          rows={1}
        />

        <div className="flex items-center gap-2">
          {/* Voice Recording Button */}
          <VoiceButton
            isRecording={isRecording}
            isSupported={isSupported}
            disabled={disabled}
            onClick={handleVoiceButtonClick}
          />

          {/* Send Message Button */}
          <SendButton
            hasMessage={!!message.trim()}
            disabled={disabled || isRecording}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-1 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Voice input {isSupported ? "available" : "unavailable"}
          </span>
          {!isSupported && (
            <span className="text-xs text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded">
              Voice feature not supported
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {isRecording && (
            <div className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400 animate-pulse bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Recording: {formatTime(recordingTime)}
            </div>
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-500 dark:text-gray-400 font-mono text-[10px] border border-gray-200 dark:border-gray-700">
              Enter
            </kbd>{" "}
            to send,{" "}
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-500 dark:text-gray-400 font-mono text-[10px] border border-gray-200 dark:border-gray-700">
              Shift + Enter
            </kbd>{" "}
            for new line
          </span>
        </div>
      </div>

      {/* Voice Recording Tips */}
      {isRecording && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Speak clearly for better transcription accuracy
          </div>
        </div>
      )}
    </form>
  )
}