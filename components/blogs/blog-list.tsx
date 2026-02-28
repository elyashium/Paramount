'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Search, Tag, Clock, Share2, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Blog {
    id: string
    title: string
    slug: string
    excerpt: string
    thumbnail_url: string
    created_at: string
    profiles: {
        full_name: string
    }
}

export function BlogList() {
    const supabase = createClient()
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        async function fetchBlogs() {
            const { data, error } = await supabase
                .from('blogs')
                .select('*, profiles(full_name)')
                .eq('is_published', true)
                .order('created_at', { ascending: false })

            if (data) {
                setBlogs(data as any)
            }
            setLoading(false)
        }

        fetchBlogs()
    }, [])

    if (loading) return <LoadingSpinner />

    // Dynamically derive categories from actual blog data
    const categories = ['All', ...Array.from(new Set(
        blogs.map(b => (b as any).category).filter(Boolean)
    ))]

    const filteredBlogs = blogs.filter(blog => {
        const blogCategory = (blog as any).category
        const matchesCategory = activeCategory === 'All' || blogCategory === activeCategory
        const matchesSearch = !searchQuery ||
            blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const featuredBlog = blogs[0]
    const remainingBlogs = filteredBlogs.filter(b => b.id !== featuredBlog?.id)

    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#f7f7f5] dark:bg-gray-950 transition-colors duration-500">
            {/* Mesh Gradient Hero Section */}
            <div className="relative pt-20 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#E8B84B]/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] dark:opacity-[0.05]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8B84B]/10 border border-[#E8B84B]/20 text-[#E8B84B] text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <Tag className="w-3 h-3" />
                        Academy Journal
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter"
                    >
                        Maritime{' '}
                        <span className="text-[#E8B84B] italic">Insights</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        Navigating your career path with expert guidance, academy updates, and the latest news from the high seas.
                    </motion.p>

                    {/* Search & Filters */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#E8B84B] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:border-[#E8B84B] outline-none transition-all shadow-sm dark:shadow-none font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border",
                                        activeCategory === cat
                                            ? "bg-[#E8B84B] text-black border-[#E8B84B] shadow-lg shadow-[#E8B84B]/20"
                                            : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-black/5 dark:border-white/10 hover:border-[#E8B84B]/30"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-8">
                {/* Featured Blog - Spotlight */}
                {featuredBlog && activeCategory === 'All' && !searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <Link href={`/blogs/${featuredBlog.slug}`} className="group relative block rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900 border border-black/5 dark:border-white/5 shadow-2xl hover:border-[#E8B84B]/40 transition-all duration-700">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                                    <Image
                                        src={featuredBlog.thumbnail_url || '/placeholder-blog.jpg'}
                                        alt={featuredBlog.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-10 lg:p-16 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 text-[#E8B84B] font-bold text-xs uppercase tracking-widest mb-6">
                                        <span className="px-3 py-1 bg-[#E8B84B]/10 rounded-full border border-[#E8B84B]/20">Featured</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            5 min read
                                        </div>
                                    </div>
                                    <h2 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1] transition-colors group-hover:text-[#E8B84B]">
                                        {featuredBlog.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 line-clamp-3 font-medium">
                                        {featuredBlog.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E8B84B]/20">
                                                <Image src="/logo.png" alt="Admin" width={48} height={48} className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-gray-900 dark:text-white">{featuredBlog.profiles?.full_name || 'Paramount Academy'}</div>
                                                <div className="text-xs text-gray-500">{new Date(featuredBlog.created_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:translate-x-2 transition-transform">
                                            Read Article <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Grid Header */}
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        Latest <span className="text-[#E8B84B]">Articles</span>
                        <div className="h-0.5 w-12 bg-[#E8B84B]/30 rounded-full" />
                    </h3>
                    <div className="text-sm text-gray-500 font-bold">
                        {filteredBlogs.length} Stories found
                    </div>
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-gray-900/50 rounded-[3rem] border-2 border-dashed border-black/5 dark:border-white/5">
                        <BookOpen className="w-20 h-20 text-[#E8B84B]/20 mx-auto mb-6" />
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">No articles found</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">We couldn't find any blogs matching your current filters. Try searching for something else!</p>
                        <Button
                            variant="outline"
                            className="mt-10 rounded-2xl border-[#E8B84B]/20 hover:bg-[#E8B84B]/10 hover:text-[#E8B84B]"
                            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                        >
                            Reset All Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {remainingBlogs.map((blog, index) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <Link href={`/blogs/${blog.slug}`} className="block">
                                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-xl shadow-black/5 dark:shadow-none">
                                        <Image
                                            src={blog.thumbnail_url || '/placeholder-blog.jpg'}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                                                Article
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />

                                        <div className="absolute bottom-6 left-6 right-6 z-20 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#E8B84B] mb-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </div>
                                            <h4 className="text-xl font-bold leading-tight line-clamp-2">
                                                {blog.title}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="px-2">
                                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed font-medium">
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center font-bold text-xs">
                                                    {blog.profiles?.full_name?.charAt(0) || 'P'}
                                                </div>
                                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                                    By {blog.profiles?.full_name || 'Admin'}
                                                </span>
                                            </div>
                                            <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 group-hover:bg-[#E8B84B] group-hover:text-black transition-colors duration-300">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
