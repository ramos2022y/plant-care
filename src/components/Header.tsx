'use client'

import React from 'react'

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

// Bell Icon
const BellIcon = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.9 20 8 20ZM14 14V9C14 5.93 12.37 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.64 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z"
      fill="#57534E"
    />
  </svg>
)

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-[1280px] mx-auto px-10 h-[73px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <LeafIcon />
          <h1 className="text-xl font-bold text-[#292524]">Plant Care</h1>
        </div>

        {/* Search & Notification */}
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

          {/* Notification Button */}
          <button className="relative w-[40px] h-[36px] flex items-center justify-center">
            <BellIcon />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
