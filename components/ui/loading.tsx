import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
    return (
        <div className="flex h-[50vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute h-full w-full rounded-full border-4 border-black/10 dark:border-white/10" />
                    <div className="absolute h-full w-full rounded-full border-4 border-[#E8B84B] border-t-transparent animate-spin" />
                    <Loader2 className="absolute h-6 w-6 animate-pulse text-[#E8B84B]" />
                </div>
                <div className="text-sm font-bold tracking-widest text-gray-500 uppercase animate-pulse">Loading...</div>
            </div>
        </div>
    )
}
