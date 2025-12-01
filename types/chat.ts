export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export interface ChatSession {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messageCount?: number
}