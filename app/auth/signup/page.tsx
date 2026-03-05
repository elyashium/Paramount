'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const EASE = [0.22, 1, 0.36, 1] as const

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email, password, options: { data: { full_name: fullName, username } },
      })
      if (error) throw error
      toast({ title: 'Account created!', description: 'You can now sign in to your account.' })
      router.push('/auth/login')
    } catch (error: any) {
      toast({ title: 'Sign up failed', description: error.message || 'Failed to create account', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to sign up with Google', variant: 'destructive' })
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-[#0a0a0a]">

      {/* ── LEFT PANEL — branding ──────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(232,184,75,0.12) 0%, transparent 65%)' }} />
        <div className="absolute right-[-3rem] bottom-[-3rem] text-[18rem] opacity-[0.04] select-none pointer-events-none leading-none">⚓</div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image src="/logo.png" alt="Paramount Merchant Navy" width={40} height={40} className="object-cover w-full h-full" />
          </div>
          <div>
            <div className="font-black text-white text-sm leading-tight">Paramount</div>
            <div className="text-[#E8B84B] text-xs font-semibold tracking-wide">Merchant Navy Institute</div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-4xl font-black text-white leading-tight mb-4"
          >
            Begin your{' '}
            <span style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              maritime journey.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="text-sm text-gray-400 leading-relaxed"
          >
            Create your account and access India&apos;s best IMU-CET coaching, live classes, mock tests, and more.
          </motion.p>
        </div>

        {/* Perks list */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="space-y-3 relative z-10"
        >
          {['Access all IMU-CET courses', 'Free mock tests & PYQs', 'Live + recorded classes', 'Expert faculty support'].map((perk) => (
            <li key={perk} className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#E8B84B]/15 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8B84B]" />
              </div>
              {perk}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* ── RIGHT PANEL — form ────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-6 bg-[#0d0d0d] lg:bg-black/40 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <Image src="/logo.png" alt="Paramount Merchant Navy" width={36} height={36} className="object-cover w-full h-full" />
            </div>
            <div>
              <div className="font-black text-white text-sm">Paramount</div>
              <div className="text-[#E8B84B] text-[10px] font-semibold tracking-wide">Merchant Navy Institute</div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-1">Create an account</h2>
          <p className="text-sm text-gray-500 mb-6">Join Paramount Merchant Navy Institute today</p>

          <form onSubmit={handleSignup} className="space-y-3">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <Input
                  id="fullName" type="text" placeholder="John Doe"
                  value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E8B84B]/60 h-10"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <Input
                  id="username" type="text" placeholder="johndoe"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E8B84B]/60 h-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <Input
                  id="email" type="email" placeholder="your@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E8B84B]/60 h-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <Input
                  id="password" type="password" placeholder="Min. 6 characters"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#E8B84B]/60 h-10"
                  required minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit" disabled={loading}
              className="w-full h-11 font-bold text-sm rounded-xl mt-1"
              style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0d0d0d] lg:bg-black px-3 text-gray-600">or continue with</span>
            </div>
          </div>

          {/* Google */}
          <Button
            type="button" variant="outline" onClick={handleGoogleSignup}
            className="w-full h-10 font-semibold text-sm border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#E8B84B] hover:text-[#c9922a] font-semibold transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
