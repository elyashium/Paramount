'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth/context'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Upload, User, Mail, Shield, Loader2, LayoutDashboard, Calendar, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const { user, profile, refreshProfile, loading, signOut } = useAuth()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [username, setUsername] = useState(profile?.username || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setUsername(profile.username || '')
    } else if (user) {
      refreshProfile()
    }
  }, [profile, user, refreshProfile])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#E8B84B] animate-spin" />
      </div>
    )
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      await refreshProfile()

      toast({
        title: 'Success!',
        description: 'Profile picture updated successfully.',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload avatar',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: username,
        })
        .eq('id', user.id)

      if (error) throw error

      await refreshProfile()

      toast({
        title: 'Success!',
        description: 'Profile updated successfully.',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-[#E8B84B]/30 transition-colors duration-300 relative overflow-hidden pb-24">
      {/* ── BACKGROUND GLOW LAYER ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40">
        <div className="w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E8B84B]/10 via-transparent to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block tracking-[0.2em] uppercase text-xs font-bold text-[#E8B84B] mb-4 border border-[#E8B84B]/40 px-3 py-1 rounded-full"
              >
                Account Center
              </motion.span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B84B] to-[#c9922a]">Profile</span>
              </h1>
            </div>

            <Button
              onClick={() => {
                signOut().then(() => router.push('/'))
              }}
              className="rounded-full border border-[#E8B84B]/20 bg-transparent hover:bg-[#E8B84B]/10 text-gray-400 hover:text-[#E8B84B] transition-all flex items-center gap-2 group"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Quick Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                <CardContent className="pt-10 pb-8 flex flex-col items-center">
                  <div className="relative group mb-6">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E8B84B] to-[#c9922a] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <Avatar className="w-32 h-32 border-4 border-white/10 relative z-10">
                      <AvatarImage src={profile?.avatar_url || undefined} className="object-cover" />
                      <AvatarFallback className="text-4xl font-bold bg-neutral-900 text-[#E8B84B]">
                        {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 z-20 p-2 bg-[#E8B84B] text-black rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-lg">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>

                  <h2 className="text-2xl font-black tracking-tight mb-1">{profile?.full_name || 'Set your name'}</h2>
                  <p className="text-gray-400 text-sm mb-4">@{profile?.username || 'username'}</p>

                  <div className="flex gap-2">
                    <Badge className={cn(
                      "rounded-full px-3 py-1 font-bold tracking-wider text-[10px] uppercase",
                      profile?.role === 'admin'
                        ? "bg-[#E8B84B] text-black hover:bg-[#E8B84B]/90"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    )}>
                      {profile?.role === 'admin' ? 'Administrator' : 'Student'}
                    </Badge>
                  </div>
                </CardContent>

                <Separator className="bg-white/5" />

                <CardContent className="py-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail className="w-4 h-4 text-[#E8B84B]/60" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Calendar className="w-4 h-4 text-[#E8B84B]/60" />
                    <span>Joined {new Date(profile?.created_at || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Access Section */}
              {profile?.role === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-[#E8B84B]/20 to-transparent border-[#E8B84B]/30 backdrop-blur-xl rounded-[2rem] overflow-hidden group hover:border-[#E8B84B]/50 transition-all duration-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#E8B84B]">
                        <Shield className="w-5 h-5" />
                        Admin Access
                      </CardTitle>
                      <CardDescription className="text-[#E8B84B]/60">
                        Manage courses, users, and content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/admin">
                        <Button className="w-full rounded-xl bg-[#E8B84B] hover:bg-[#c9922a] text-black font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Panel
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Right Column: Settings Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-[2rem]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-black tracking-tight">Personal Details</CardTitle>
                  <CardDescription className="text-gray-400">Update your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-xs uppercase tracking-widest text-[#E8B84B] font-bold ml-1">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#E8B84B] transition-colors" />
                        <Input
                          id="fullName"
                          placeholder="What's your name?"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-black/40 border-white/10 rounded-xl pl-12 h-12 focus-visible:ring-[#E8B84B]/50 focus-visible:border-[#E8B84B]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-xs uppercase tracking-widest text-[#E8B84B] font-bold ml-1">Username</Label>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E8B84B] transition-colors">@</span>
                        <Input
                          id="username"
                          placeholder="Your unique handle"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="bg-black/40 border-white/10 rounded-xl pl-10 h-12 focus-visible:ring-[#E8B84B]/50 focus-visible:border-[#E8B84B]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 opacity-60">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Email (Primary)</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <Input
                        id="email"
                        value={user.email || ''}
                        disabled
                        className="bg-neutral-900/50 border-white/5 rounded-xl pl-12 h-12 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 italic px-1">Registered email address cannot be modified via profile settings.</p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="rounded-full px-10 h-12 bg-gradient-to-r from-[#E8B84B] to-[#c9922a] text-black font-extrabold uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(232,184,75,0.2)]"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences or Other Settings placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-[2rem] p-8 border-dashed flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-300">Privacy & Security</h3>
                  <p className="text-gray-500 text-sm max-w-sm">We take your data seriously. Your profile information is only visible to you and authorized staff members.</p>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
