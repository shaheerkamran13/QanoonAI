"use client"

import { Mic, StopCircle } from "lucide-react"
import { formatTime } from "@/lib/utils"

interface RecordingIndicatorProps {
  recordingTime: number
  onStopRecording: () => void
}

export function RecordingIndicator({ recordingTime, onStopRecording }: RecordingIndicatorProps) {
  return (
    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-50">
      <div className="bg-red-500/10 dark:bg-red-500/20 backdrop-blur-xl border border-red-500/30 dark:border-red-500/40 rounded-2xl p-4 shadow-lg animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-red-500 rounded-full p-2">
                <Mic className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <div className="font-medium text-red-600 dark:text-red-400">Recording voice...</div>
              <div className="text-sm text-red-500/70 dark:text-red-400/70">
                {formatTime(recordingTime)} • Click to stop
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onStopRecording}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Stop recording"
          >
            <StopCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}