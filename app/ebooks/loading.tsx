export default function EbooksLoading() {
    return (
        <main className="min-h-screen bg-[#f7f7f5] dark:bg-black pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Skeleton */}
                <div className="mb-12">
                    <div className="rounded-[2rem] p-10 bg-gray-200 dark:bg-neutral-900 animate-pulse h-48" />
                </div>

                {/* Search + Filter Skeleton */}
                <div className="h-12 max-w-xl rounded-xl bg-gray-200 dark:bg-neutral-800 animate-pulse mb-8" />
                <div className="flex gap-3 mb-10">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 w-24 rounded-full bg-gray-200 dark:bg-neutral-800 animate-pulse" />
                    ))}
                </div>

                {/* Cards Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 p-6 animate-pulse">
                            <div className="h-48 rounded-xl bg-gray-200 dark:bg-neutral-800 mb-4" />
                            <div className="h-5 rounded-full bg-gray-200 dark:bg-neutral-800 w-3/4 mb-3" />
                            <div className="h-10 rounded-xl bg-gray-200 dark:bg-neutral-800" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
