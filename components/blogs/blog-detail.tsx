'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/ui/loading'
import { Button } from '@/components/ui/button'
import {
    Calendar,
    ArrowLeft,
    Clock,
    UserCheck,
    Tag
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Blog {
    id: string
    title: string
    slug: string
    content: string
    thumbnail_url: string
    created_at: string
    profiles: {
        full_name: string
    }
}

export function BlogDetail({ slug }: { slug: string }) {
    const supabase = createClient()
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight
            const currentScroll = window.scrollY
            setScrollProgress((currentScroll / totalScroll) * 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        async function fetchBlog() {
            const { data, error } = await supabase
                .from('blogs')
                .select('*, profiles(full_name)')
                .eq('slug', slug)
                .single()

            if (data) {
                setBlog(data as any)
            }
            setLoading(false)
        }

        fetchBlog()
    }, [slug])

    if (loading) return <LoadingSpinner />
    if (!blog) return (
        <div className="pt-40 pb-20 px-4 text-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
            <Link href="/blogs">
                <Button variant="outline">Back to Blogs</Button>
            </Link>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#f7f7f5] dark:bg-gray-950 transition-colors duration-500">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#E8B84B] z-[100] origin-left"
                style={{ scaleX: scrollProgress / 100 }}
            />

            {/* Immersive Hero Header */}
            <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
                <Image
                    src={blog.thumbnail_url || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-gray-950" />

                <div className="absolute inset-0 flex flex-col justify-end pb-20 px-4">
                    <div className="max-w-4xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-4 text-white font-bold text-xs uppercase tracking-[0.2em] mb-8"
                        >
                            <span className="px-3 py-1 bg-[#E8B84B] text-black rounded-full">Maritime News</span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#E8B84B]" />
                                6 min read
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#E8B84B]" />
                                {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter"
                        >
                            {blog.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-14 h-14 rounded-full border-2 border-[#E8B84B] p-0.5 overflow-hidden">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-black">
                                    {blog.profiles?.full_name?.charAt(0) || 'P'}
                                </div>
                            </div>
                            <div className="text-white">
                                <div className="text-base font-black flex items-center gap-2">
                                    {blog.profiles?.full_name || 'Paramount Admin'}
                                    <UserCheck className="w-4 h-4 text-[#E8B84B]" />
                                </div>
                                <div className="text-xs text-white/60 font-medium">Head of Admissions & Training</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 py-20">

                {/* Back Link */}
                <div className="mb-12">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-3 text-sm font-black text-gray-400 hover:text-[#E8B84B] transition-colors group"
                    >
                        <div className="p-2 rounded-xl border border-black/5 dark:border-white/10 group-hover:border-[#E8B84B]/40">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        </div>
                        Back to Journal
                    </Link>
                </div>

                {/* Center: Content */}
                <article>
                    <div className="prose prose-xl dark:prose-invert max-w-none
                        prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-8 font-medium
                        prose-blockquote:border-l-[#E8B84B] prose-blockquote:bg-[#E8B84B]/5 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:font-black
                        prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                        prose-strong:text-gray-900 dark:prose-strong:text-white
                        prose-a:text-[#E8B84B] prose-a:no-underline hover:prose-a:underline
                    ">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                </article>

            </div>
        </div>
    )
}
