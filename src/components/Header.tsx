'use client'

import React from 'react'
import Link from 'next/link'
import AuthButton from './Auth/AuthButton'

// Leaf Icon
const LeafIcon = () => (
  <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.5 0C10.5 0 0 2 0 12C0 22 10.5 25 10.5 25C10.5 25 21 22 21 12C21 2 10.5 0 10.5 0ZM10.5 22C8.5 21 3 18 3 12C3 6 8.5 3 10.5 2C12.5 3 18 6 18 12C18 18 12.5 21 10.5 22Z"
      fill="#22C55E"
    />
    <path d="M10.5 5V20" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 10C8 8 10.5 8 10.5 8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 10C13 8 10.5 8 10.5 8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// Search Icon
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="6.5" r="5.5" stroke="#78716C" strokeWidth="1.5" fill="none"/>
    <path d="M10.5 10.5L13.5 13.5" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-[1280px] mx-auto px-10 h-[73px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <LeafIcon />
          <h1 className="text-xl font-bold text-[#292524]">Plant Care</h1>
        </Link>

        {/* Search & Auth */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-[320px]">
            <div className="flex items-center bg-[#FAFAF9] rounded-lg h-[38px] px-4">
              <input
                type="text"
                placeholder="Search plants..."
                className="w-full bg-transparent text-sm text-[#78716C] placeholder:text-[#78716C] outline-none"
              />
              <SearchIcon />
            </div>
          </div>

          {/* Auth Button */}
          <AuthButton />
        </div>
      </div>
    </header>
  )
}

export default Header
