"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/axios"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// --- ICONS ---
function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
// --- END ICONS ---

export default function UserDropdown() {
  const [user, setUser] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const res = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUser(res.data)
      } catch (err) {
        console.error("Profile fetch error:", err)
      }
    }

    fetchProfile()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token")
      setUser(null)
      router.push("/login")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full flex items-center justify-center"
        onClick={toggleDropdown}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="/placeholder-user.jpg"
            alt={user?.username || "user"}
          />
          <AvatarFallback>
            {user?.username?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
          <div className="py-1">
            <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
              {user ? `Hello, ${user.username}` : "My Account"}
            </div>
            
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => {
                setIsOpen(false)
                router.push("/profile")
              }}
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </button>

            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => {
                setIsOpen(false)
                router.push("/change-password")
              }}
            >
              <LockIcon className="mr-2 h-4 w-4" />
              Change Password
            </button>

            <div className="border-t my-1"></div>

            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
              onClick={handleLogout}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
