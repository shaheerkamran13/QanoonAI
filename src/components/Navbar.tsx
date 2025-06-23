'use client'

import Link from 'next/link';
import MobileMenu from './Menu';
import NavIcons from './Navicons';
import { ScrollHandler } from './ScrollHandler';

export default function Navbar() {
  return (
    <ScrollHandler>
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* MOBILE SCREENS */}
        <div className="h-full flex items-center justify-between md:hidden">
          <MobileMenu />
          
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold text-myColor">QanoonAI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <NavIcons />
          </div>
        </div>

        {/* BIGGER SCREENS */}
        <div className="hidden md:flex items-center justify-between h-full">
          {/* LEFT - Only show on xl screens */}
          <div className="hidden xl:flex gap-4">
            <Link href={'/'} className="hover:text-myColor transition-colors">
              Home
            </Link>
            {/* Add other links here if needed */}
          </div>

          {/* CENTER - QanoonAI logo and text */}
          <div className="flex-1 flex justify-center">
            <Link href={'/'} className="flex items-center gap-3">
              <div className="text-2xl tracking-wide">QanoonAI</div>
            </Link>
          </div>

          {/* RIGHT - NavIcons and Chat button */}
          <div className="flex items-center gap-6">
            <NavIcons />
            <Link href="/login">
              <button className="bg-black text-white rounded-full px-5 py-2 font-medium hover:bg-gray-800 transition-colors duration-200">
                Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ScrollHandler>
  );
}