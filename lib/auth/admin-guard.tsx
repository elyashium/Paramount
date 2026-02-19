'use client'

import { useAuth } from './context'
import { ReactNode } from 'react'

interface AdminGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AdminGuard({ children, fallback = null }: AdminGuardProps) {
  const { profile } = useAuth()

  if (profile?.role !== 'admin') {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export function useIsAdmin() {
  const { profile } = useAuth()
  return profile?.role === 'admin'
}
