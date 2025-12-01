export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  agentType?: string
}

export interface ChatSession {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messageCount?: number
  messages: ChatMessage[]
  isGeneratingTitle?: boolean
}

export interface ChatApiRequest {
  message: string
  session_id: string
  user_id: string
  email: string
}

export interface ChatApiResponse {
  session_id: string
  response: string
  agent_type: string
  timestamp: string
}
