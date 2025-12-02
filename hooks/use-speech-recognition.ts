"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

interface UseSpeechRecognitionReturn {
  transcript: string
  isRecording: boolean
  isSupported: boolean
  recordingTime: number
  startRecording: () => void
  stopRecording: () => void
  resetTranscript: () => void
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognitionAPI) {
        try {
          const recognitionInstance = new SpeechRecognitionAPI()
          
          recognitionInstance.continuous = false
          recognitionInstance.interimResults = false
          recognitionInstance.lang = 'en-US'
          recognitionInstance.maxAlternatives = 1

          recognitionInstance.onresult = (event: any) => {
            const newTranscript = Array.from(event.results)
              .map((result: any) => result[0])
              .map((result: any) => result.transcript)
              .join('')
            setTranscript(prev => prev + newTranscript)
          }

          recognitionInstance.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error)
            stopRecording()
          }

          recognitionInstance.onend = () => {
            stopRecording()
          }

          recognitionRef.current = recognitionInstance
          setIsSupported(true)
        } catch (error) {
          console.error('Failed to initialize speech recognition:', error)
          setIsSupported(false)
        }
      } else {
        setIsSupported(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = useCallback(() => {
    if (!recognitionRef.current || !isSupported) return
    
    setIsRecording(true)
    setRecordingTime(0)
    setTranscript("")
    
    try {
      recognitionRef.current.start()
      
      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Failed to start recording:', error)
      setIsRecording(false)
    }
  }, [isSupported])

  const stopRecording = useCallback(() => {
    if (!recognitionRef.current || !isRecording) return
    
    setIsRecording(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    try {
      recognitionRef.current.stop()
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }, [isRecording])

  const resetTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
    transcript,
    isRecording,
    isSupported,
    recordingTime,
    startRecording,
    stopRecording,
    resetTranscript
  }
}