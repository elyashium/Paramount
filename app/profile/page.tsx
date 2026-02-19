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
import { Upload, User, Mail, Shield, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, profile, refreshProfile, loading } = useAuth()
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

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
      const filePath = `${user.id}-${Math.random()}.${fileExt}`

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal details and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="text-2xl">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg hover:border-primary transition-colors w-fit">
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Upload new photo</span>
                        </>
                      )}
                    </div>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="pl-10 bg-muted"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Your account information and role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Role</span>
                </div>
                <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'}>
                  {profile?.role === 'admin' ? 'Administrator' : 'Student'}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-medium">Account Created</span>
                <span className="text-muted-foreground">
                  {new Date(profile?.created_at || '').toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
