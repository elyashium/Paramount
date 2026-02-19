'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/lib/auth/context'
import { QueryProvider } from '@/lib/query/provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
