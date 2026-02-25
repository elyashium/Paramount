export default function CoursesLoading() {
    return (
        <main className="min-h-screen bg-[#f7f7f5] dark:bg-black pt-28 pb-20">
            {/* Hero Skeleton */}
            <div className="w-full h-[60vh] relative bg-gray-200 dark:bg-neutral-900 animate-pulse mb-12" />

            {/* Cards Skeleton */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex gap-3 mb-10">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 w-24 rounded-full bg-gray-200 dark:bg-neutral-800 animate-pulse" />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 animate-pulse">
                            <div className="h-56 bg-gray-200 dark:bg-neutral-800" />
                            <div className="p-6 space-y-3">
                                <div className="h-5 rounded-full bg-gray-200 dark:bg-neutral-800 w-3/4" />
                                <div className="h-4 rounded-full bg-gray-200 dark:bg-neutral-800 w-full" />
                                <div className="h-4 rounded-full bg-gray-200 dark:bg-neutral-800 w-2/3" />
                                <div className="h-10 rounded-xl bg-gray-200 dark:bg-neutral-800 mt-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
