'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center space-y-4">
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">
          <p className="font-medium">Registration successful!</p>
          <p className="text-sm mt-1">Please check your email to verify your account.</p>
        </div>
        <button
          onClick={() => router.push('/login')}
          className="text-[#22C55E] hover:underline"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#44403C] mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-[#E7E5E4] rounded-lg bg-white text-[#292524] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#44403C] mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-[#E7E5E4] rounded-lg bg-white text-[#292524] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#44403C] mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-[#E7E5E4] rounded-lg bg-white text-[#292524] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#22C55E] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#16A34A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>

      <p className="text-center text-sm text-[#78716C]">
        Already have an account?{' '}
        <a href="/login" className="text-[#22C55E] hover:underline">
          Sign in
        </a>
      </p>
    </form>
  )
}
