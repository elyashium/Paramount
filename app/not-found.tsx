import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 text-center">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8B84B]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-md">
                <h1 className="text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 dark:from-white dark:to-gray-600">
                    404
                </h1>

                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Page not found
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                </div>

                <div className="pt-4">
                    <Link href="/">
                        <Button
                            className="rounded-full px-8 h-12 text-sm font-bold uppercase tracking-wider bg-[#E8B84B] text-black hover:bg-[#F3D37A] hover:scale-105 transition-all w-full sm:w-auto flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
