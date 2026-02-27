'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Home,
  ShoppingBag,
  BookOpen,
  FileText,
  TestTube,
  MoreHorizontal,
  User,
  LogOut,
  Search,
  Moon,
  Sun,
  Info,
  Phone,
} from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { useTheme } from 'next-themes'
import { useUIStore } from '@/lib/store/ui-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/blogs', label: 'Blogs', icon: FileText },
  { href: '/ebooks', label: 'E-Books', icon: BookOpen },
  { href: '/contact', label: 'Contact Us', icon: Phone },
]

export function FloatingDock() {
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth()
  const { resolvedTheme, setTheme } = useTheme()
  const toggleCommandPalette = useUIStore((state) => state.toggleCommandPalette)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Before mount, resolvedTheme is undefined (SSR) — default to light to avoid hydration mismatch
  const isDark = mounted && resolvedTheme === 'dark'

  // Hide on auth pages
  if (pathname?.startsWith('/auth')) return null

  // Hide on admin panel pages
  if (pathname?.startsWith('/admin')) return null

  return (
    <>
      {/* SVG Filter for Glassmorphism displacement */}
      <svg style={{ display: 'none' }} aria-hidden="true">
        <filter id="glassDisplacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <nav className="relative">
          <div
            className={cn(
              'flex items-center justify-between px-2 md:px-5 py-2 shadow-lg overflow-hidden',
              'border',
              isDark
                ? 'border-white/10 bg-black/40'
                : 'border-white/30 bg-white/40',
              'backdrop-blur-2xl',
            )}
            style={{
              boxShadow: '0 8px 32px 0 rgb(0 0 0 / 0.37)',
            }}
          >
            {/* Logo */}
            <Link href="/" className="hidden md:flex items-center shrink-0">
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Paramount Merchant Navy"
                  width={52}
                  height={52}
                  className="object-cover w-full h-full"
                  style={{ height: 'auto' }}
                  priority
                />
              </div>
            </Link>

            {/* ── RESPONSIVE MENU (Show Labels on Desktop, Icons on Mobile) ── */}
            <div className="flex items-center md:space-x-1 gap-0.5 overflow-x-auto no-scrollbar px-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={(isActive ? 'secondary' : 'ghost') as any}
                      size={"sm" as any}
                      className={cn(
                        'relative transition-all px-2 md:px-3 h-8 md:h-9',
                        isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                      )}
                    >
                      <Icon className={cn('w-4 h-4', isActive ? 'text-[#E8B84B]' : '')} />
                      <span className="hidden md:inline-block ml-2">{link.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Right Actions (Desktop & Mobile) */}
            <div className="flex items-center space-x-0.5 md:space-x-2 shrink-0">
              {/* Search */}
              <Button
                variant={"ghost" as any}
                size={"icon" as any}
                onClick={toggleCommandPalette}
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant={"ghost" as any}
                size={"icon" as any}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 transition-all" />
                ) : (
                  <Moon className="h-4 w-4 transition-all" />
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost" as any} size={"icon" as any} className="rounded-full">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback>
                          {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {/* User info header */}
                    <div className="flex items-center justify-start gap-2 p-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback>
                          {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {profile?.full_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />

                    {/* Profile */}
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>


                    {/* Admin */}
                    {profile?.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <FileText className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button size={"sm" as any}>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
