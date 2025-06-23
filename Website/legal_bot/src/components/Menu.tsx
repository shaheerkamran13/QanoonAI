'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {User, ShoppingBag, ChevronLeft, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const isLoggedIn = true // Temp auth state

  const menuLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/aboutUs' },
    { name: 'Contact', href: '/contact' },
  ]

  // Example search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement your search logic here
    console.log('Searching for:', searchQuery)
    // Redirect to search results page or filter content
  }

  return (
    <div className="md:hidden">
      {/* Menu Trigger */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {/* Header with Close Button */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Prizecho"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-semibold text-myColor">QanoonAI</span>
                </Link>
                <div className="w-6"></div> {/* Spacer for alignment */}
              </div>

              {/* Search Bar */}
              <div className='bg-white'>
              <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-myColor focus:ring-2 focus:ring-myColor/50 transition-colors"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </form>
              </div>
              

              {/* User Section */}
              <div className="p-4 border-t bg-white border-gray-100">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-myColor/5">
                      <div className="w-8 h-8 rounded-full bg-myColor text-white flex items-center justify-center">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-medium">Welcome Back!</p>
                        <p className="text-sm text-gray-500">Premium Member</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                      >
                        <User size={18} className="text-myColor" />
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                      >
                        <ShoppingBag size={18} className="text-myColor" />
                        My Orders
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="block w-full p-3 text-center rounded-lg bg-myColor text-white hover:bg-pink-600 transition-colors"
                    >
                      Sign In
                    </Link>
                    <p className="text-sm text-center text-gray-500">
                      New customer?{' '}
                      <Link href="/register" className="text-myColor hover:underline">
                        Start here
                      </Link>
                    </p>
                  </div>
                )}
              </div>

              

              {/* Menu Content */}
              <div className="h-[calc(100vh-56px)] overflow-y-auto bg-white">
                {/* Main Navigation */}
                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-myColor/5 text-gray-700 hover:text-myColor transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}