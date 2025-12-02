"use client"

import { cn } from "@/lib/utils"
import { Mic, MicOff } from "lucide-react"

interface VoiceButtonProps {
  isRecording: boolean
  isSupported: boolean
  disabled?: boolean
  onClick: () => void
}

export function VoiceButton({ isRecording, isSupported, disabled = false, onClick }: VoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !isSupported}
      className={cn(
        "p-3.5 rounded-xl transition-all duration-200 flex items-center justify-center group relative",
        isRecording
          ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 animate-pulse"
          : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95",
        (disabled || !isSupported) && "opacity-50 cursor-not-allowed"
      )}
      aria-label={isRecording ? "Stop recording" : "Start voice recording"}
      title={!isSupported ? "Speech recognition not supported in your browser" : ""}
    >
      {isRecording ? (
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          <MicOff className="w-5 h-5 relative" />
        </div>
      ) : (
        <Mic className="w-5 h-5" />
      )}
      {!isSupported && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
      )}
      <span className="sr-only">{isRecording ? "Stop recording" : "Start voice recording"}</span>
    </button>
  )
}