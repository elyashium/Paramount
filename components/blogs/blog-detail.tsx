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
    User,
    ArrowLeft,
    Share2,
    Bookmark,
    MessageCircle,
    Twitter,
    Facebook,
    Linkedin,
    Clock,
    ChevronRight,
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

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,800px)_1fr] gap-12">

                    {/* Left Side: Sticky Nav */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32 space-y-12">
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-3 text-sm font-black text-gray-400 hover:text-[#E8B84B] transition-colors group"
                            >
                                <div className="p-2 rounded-xl border border-black/5 dark:border-white/10 group-hover:border-[#E8B84B]/40">
                                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                </div>
                                Back to Journal
                            </Link>

                            <div className="space-y-6 pt-10 border-t border-black/5 dark:border-white/5">
                                <div className="text-[10px] uppercase font-black tracking-widest text-[#E8B84B]">Share This</div>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { icon: Twitter, label: 'Twitter', color: 'bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20' },
                                        { icon: Linkedin, label: 'LinkedIn', color: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20' },
                                        { icon: Facebook, label: 'Facebook', color: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20' },
                                        { icon: Share2, label: 'Copy Link', color: 'bg-gray-100 dark:bg-white/5 text-gray-500' },
                                    ].map((social) => (
                                        <button
                                            key={social.label}
                                            className={cn("p-4 rounded-2xl border transition-all hover:scale-105 flex items-center justify-center", social.color)}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Center: Content */}
                    <article className="relative">
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

                        {/* Article Footer */}
                        <div className="mt-20 pt-10 border-t border-black/5 dark:border-white/10">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-[#E8B84B]" />
                                    <div className="flex gap-2">
                                        {['Maritime', 'Training', 'Career'].map(tag => (
                                            <span key={tag} className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#E8B84B] transition-colors">
                                        <Bookmark className="w-5 h-5" /> Save
                                    </button>
                                    <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#E8B84B] transition-colors">
                                        <MessageCircle className="w-5 h-5" /> 12 Comments
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Right Side: Quick Links / Ads / ToC */}
                    <aside className="hidden xl:block">
                        <div className="sticky top-32 space-y-10">
                            <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8">
                                <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6 tracking-tight">Ready to Enroll?</h4>
                                <p className="text-sm text-gray-500 mb-8 leading-relaxed">Join India's most trusted Merchant Navy Academy and set sail towards a promising future.</p>
                                <Button asChild className="w-full bg-[#E8B84B] text-black hover:bg-[#F3D37A] rounded-2xl h-14 font-black">
                                    <Link href="/courses">Explore Courses</Link>
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="text-[10px] uppercase font-black tracking-widest text-[#E8B84B]">Related Stories</div>
                                {[1, 2].map((i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <h5 className="text-sm font-black text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-[#E8B84B] transition-colors">How to choose the right shipping company for GME</h5>
                                        <p className="text-[11px] text-gray-500 flex items-center gap-2 font-bold uppercase tracking-wider">
                                            Oct 12, 2023 <ChevronRight className="w-3 h-3" />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
