'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

// User Icon
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
      fill="#57534E"
    />
    <path
      d="M10 12C4.99 12 1 14.99 1 18.5V20H19V18.5C19 14.99 15.01 12 10 12Z"
      fill="#57534E"
    />
  </svg>
)

// Logout Icon
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M11 11L14 8M14 8L11 5M14 8H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setShowMenu(false)
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="w-[40px] h-[36px] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#E7E5E4] border-t-[#22C55E] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 bg-[#22C55E] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#16A34A] transition-colors"
      >
        <UserIcon />
        <span>Sign In</span>
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-lg hover:border-[#22C55E] transition-colors"
      >
        <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-white font-medium">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="text-sm text-[#292524] max-w-[120px] truncate">
          {user.email}
        </span>
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E7E5E4] py-1 z-50">
          <div className="px-4 py-2 border-b border-[#E7E5E4]">
            <p className="text-sm font-medium text-[#292524] truncate">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#57534E] hover:bg-[#FAFAF9] transition-colors"
          >
            <LogoutIcon />
            <span>Sign out</span>
          </button>
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}
