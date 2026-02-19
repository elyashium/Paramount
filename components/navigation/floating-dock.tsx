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
  { href: '/test-series', label: 'Test Series', icon: FileText },
  { href: '/free-test', label: 'Free Test', icon: TestTube },
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
              'flex items-center justify-between px-5 py-2 shadow-lg',
              'rounded-[2rem]',
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
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Paramount Merchant Navy"
                width={52}
                height={52}
                className="object-contain"
                priority
              />
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="sm"
                      className={cn(
                        'relative transition-all',
                        isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}

              {/* More Menu — align="center" prevents rightward shift */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4 mr-2" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/free-courses" className="cursor-pointer">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Free Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/previous-papers" className="cursor-pointer">
                      <FileText className="w-4 h-4 mr-2" />
                      Previous Papers
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/current-affairs" className="cursor-pointer">
                      <FileText className="w-4 h-4 mr-2" />
                      Current Affairs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/quiz" className="cursor-pointer">
                      <TestTube className="w-4 h-4 mr-2" />
                      Quiz
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/syllabus" className="cursor-pointer">
                      <FileText className="w-4 h-4 mr-2" />
                      Syllabus
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/ebooks" className="cursor-pointer">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ebooks
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCommandPalette}
                className="hidden sm:flex"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
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
                    <Button variant="ghost" size="icon" className="rounded-full">
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

                    {/* Purchases — only shown when signed in */}
                    <DropdownMenuItem asChild>
                      <Link href="/purchases" className="cursor-pointer">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        My Purchases
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
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
