'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function CoursesError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Courses page error:', error)
    }, [error])

    return (
        <main className="min-h-screen bg-[#f7f7f5] dark:bg-black flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                </div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                    Couldn't Load Courses
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    There was a problem connecting to the database. Please try again in a moment.
                </p>
                <Button
                    onClick={reset}
                    className="rounded-full px-8"
                    style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
                >
                    Try Again
                </Button>
            </div>
        </main>
    )
}
