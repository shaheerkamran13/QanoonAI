// components/NavIcons.tsx
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const router = useRouter()

  // TEMPORARY LOGIN ATTEMPT, AUTH WILL BE IMPLEMENTED LATER
  const isLoggedIn = false

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push('/login')
    }
    setIsProfileOpen((prev) => !prev)
  }



  return (
    <div className="flex items-center gap-6 xl:gap-8">
      {/* PROFILE COMPONENT */}
      <div
        className="relative"
        onMouseEnter={() => setIsProfileOpen(true)}
        onMouseLeave={() => setIsProfileOpen(false)}
      >
        <Image
          src={'/profile.png'}
          alt="profile"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleProfile}
          aria-label="Profile"
        />

        {/* PROFILE DROPDOWN */}
        {isProfileOpen && (
          <div
            className="absolute p-4 rounded-md top-8 -left-4 bg-white shadow-lg z-50 min-w-[160px] animate-popup transition-opacity duration-500 delay-500"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
            role="menu"
            aria-labelledby="profile-menu"
          >
            <Link
              href={'/profile'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              role="menuitem"
            >
              Profile
            </Link>
            <Link
              href={'/orders'}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              role="menuitem"
            >
              Orders
            </Link>
            <div className="mt-2 border-t pt-2">
              <button
                onClick={() => console.log('Logout')}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CART COMPONENT */}
      <div
        className="relative"
        onMouseEnter={() => setIsCartOpen(true)}
        onMouseLeave={() => setIsCartOpen(false)}
      >
        <div className="cursor-pointer">
          <Image
            src={'/cart.png'}
            alt="cart"
            width={22}
            height={22}
            className="cursor-pointer"
            aria-label="Cart"
          />
         
        </div>

        {/* CART DROPDOWN */}
        {isCartOpen && (
          <div
            className="absolute p-4 rounded-md right-0 bg-white shadow-lg min-w-[300px] animate-popup transition-opacity duration-500 delay-200"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
            role="menu"
            aria-labelledby="cart-menu"
          >
          </div>
        )}
      </div>
    </div>
  )
}