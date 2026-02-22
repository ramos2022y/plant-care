import { LoginForm } from '@/components'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#292524]">Plant Care</h1>
          <p className="text-[#78716C] mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E7E5E4]">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
