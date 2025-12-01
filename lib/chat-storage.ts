import type { ChatSession, ChatMessage } from "@/types/chat"

const CHAT_STORAGE_KEY = "qanoonai_chat_sessions"
const USER_ID_KEY = "qanoonai_user_id"

// Generate a unique session ID
export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get all sessions from localStorage
export function getSessions(): ChatSession[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY)
    if (!stored) return []

    const sessions = JSON.parse(stored)
    return sessions.map((session: ChatSession) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages.map((msg: ChatMessage) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }))
  } catch (error) {
    console.error("Failed to load sessions from localStorage:", error)
    return []
  }
}

// Save sessions to localStorage
export function saveSessions(sessions: ChatSession[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sessions))
  } catch (error) {
    console.error("Failed to save sessions to localStorage:", error)
  }
}

// Get or create a user ID for API requests
export function getUserId(): string {
  if (typeof window === "undefined") return "anonymous"

  let userId = localStorage.getItem(USER_ID_KEY)
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem(USER_ID_KEY, userId)
  }
  return userId
}

// Get user email from JWT token
export function getUserEmail(): string {
  if (typeof window === "undefined") return "user@example.com"

  try {
    const token = localStorage.getItem("token")
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload.email || `${payload.username || payload.sub || "user"}@example.com`
    }
  } catch (error) {
    console.error("Failed to decode token:", error)
  }
  return "user@example.com"
}

// Clear all chat data (on logout)
export function clearChatData(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CHAT_STORAGE_KEY)
}

export function generateProfessionalTitle(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Legal topic patterns for professional titles
  const topicPatterns: { pattern: RegExp; titles: string[] }[] = [
    {
      pattern: /fundamental rights?|basic rights?|constitutional rights?/i,
      titles: ["Fundamental Rights Inquiry", "Constitutional Rights Analysis", "Rights & Freedoms Discussion"],
    },
    {
      pattern: /property|land|real estate|inheritance/i,
      titles: ["Property Law Consultation", "Land & Estate Matters", "Property Rights Analysis"],
    },
    {
      pattern: /divorce|marriage|family|custody|nikah/i,
      titles: ["Family Law Consultation", "Matrimonial Matters", "Family & Custody Discussion"],
    },
    {
      pattern: /criminal|crime|arrest|bail|fir/i,
      titles: ["Criminal Law Inquiry", "Criminal Proceedings Guide", "Legal Defense Consultation"],
    },
    {
      pattern: /business|company|corporate|partnership/i,
      titles: ["Corporate Law Consultation", "Business Legal Matters", "Commercial Law Inquiry"],
    },
    {
      pattern: /contract|agreement|deed/i,
      titles: ["Contract Law Analysis", "Legal Agreement Review", "Contractual Matters"],
    },
    {
      pattern: /tax|taxation|income tax|sales tax/i,
      titles: ["Taxation Law Inquiry", "Tax Compliance Guide", "Fiscal Law Consultation"],
    },
    {
      pattern: /employment|labor|workplace|job/i,
      titles: ["Employment Law Consultation", "Workplace Rights Inquiry", "Labor Law Analysis"],
    },
    {
      pattern: /consumer|refund|warranty|complaint/i,
      titles: ["Consumer Rights Inquiry", "Consumer Protection Guide", "Product Dispute Consultation"],
    },
    {
      pattern: /cyber|online|digital|internet/i,
      titles: ["Cyber Law Consultation", "Digital Rights Analysis", "Online Legal Matters"],
    },
    {
      pattern: /constitution|article|amendment/i,
      titles: ["Constitutional Analysis", "Legal Framework Inquiry", "Constitutional Provisions"],
    },
    {
      pattern: /court|case|lawsuit|litigation/i,
      titles: ["Litigation Guidance", "Court Proceedings Inquiry", "Legal Case Consultation"],
    },
    {
      pattern: /lawyer|advocate|legal help/i,
      titles: ["Legal Assistance Inquiry", "Professional Guidance", "Legal Representation"],
    },
  ]

  // Find matching pattern
  for (const { pattern, titles } of topicPatterns) {
    if (pattern.test(lowerMessage)) {
      return titles[Math.floor(Math.random() * titles.length)]
    }
  }

  // Generic professional titles if no pattern matches
  const genericTitles = [
    "Legal Consultation",
    "Legal Query Analysis",
    "Pakistani Law Inquiry",
    "Legal Guidance Session",
    "Law & Regulation Query",
  ]

  return genericTitles[Math.floor(Math.random() * genericTitles.length)]
}

// Legacy function for backwards compatibility
export function generateTitleFromMessage(message: string): string {
  return "Generating title..."
}
