'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const EBOOKS_DATA = [
    {
        id: 1,
        title: 'Reasoning Booklet with mcqs',
        category: 'PYQ',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2800&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Maths',
        category: 'E-Books',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2800&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'World Geography',
        category: 'E-Books',
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2800&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Indian Geography English',
        category: 'E-Books',
        image: 'https://images.unsplash.com/photo-1587394676137-773dfceea00b?q=80&w=2800&auto=format&fit=crop',
    },
    {
        id: 5,
        title: 'ENGLISH GRAMMER BOOK',
        category: 'Syllabus',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2800&auto=format&fit=crop',
    },
    {
        id: 6,
        title: 'English Vocabulary',
        category: 'E-Books',
        image: 'https://images.unsplash.com/photo-1546410531-bea5aaaa2103?q=80&w=2800&auto=format&fit=crop',
    },
]

const CATEGORIES = ['All', 'PYQ', 'Syllabus', 'E-Books']

export function EbooksPage({ initialEbooks = [] }: { initialEbooks?: any[] }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredEbooks = initialEbooks.filter((ebook) => {
        const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = activeCategory === 'All' || ebook.category === activeCategory
        return matchesSearch && matchesCategory
    })

    return (
        <main className="min-h-screen bg-[#f7f7f5] dark:bg-black pt-28 pb-20">
            {/* Header / Hero Section matching the dark aesthetic */}
            <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 rounded-[2rem] p-10 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8B84B]/10 rounded-full blur-[80px] pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE }}
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tight mb-4 select-none">
                                Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B84B] to-[#F3D37A]">Materials</span>
                            </h1>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-sm font-semibold text-black dark:text-white mb-6">
                                <BookOpen className="w-4 h-4 text-[#E8B84B]" />
                                E-Books & Resources
                            </div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
                                Access our exhaustive digital library including syllabus, previous year question papers, and comprehensive e-books.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6">

                {/* Search Bar */}
                <div className="mb-8 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Type here and press enter to search.."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/50 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(activeCategory === cat ? 'All' : cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
                                activeCategory === cat
                                    ? "bg-[#E8B84B] text-black border-[#E8B84B] shadow-[0_0_15px_rgba(232,184,75,0.3)]"
                                    : "bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-[#E8B84B]/50 hover:text-black dark:hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* E-Books Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    {filteredEbooks.map((ebook, index) => (
                        <motion.div
                            key={ebook.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                        >
                            <CardContainer className="inter-var w-full h-full">
                                <CardBody className="bg-white dark:bg-neutral-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-black/[0.1] dark:border-white/[0.2] border w-full rounded-2xl p-6 h-full transition-all flex flex-col justify-between hover:border-[#E8B84B]/50">

                                    <div className="w-full mb-6">
                                        <CardItem translateZ="50" className="w-full h-48 sm:h-56 relative rounded-xl overflow-hidden mb-4 border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-neutral-800">
                                            <Image
                                                src={ebook.cover_url || ebook.image_url || '/placeholder.png'}
                                                alt={ebook.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                            />
                                        </CardItem>

                                        <CardItem
                                            translateZ="40"
                                            className="text-lg font-bold text-neutral-900 dark:text-white leading-tight min-h-[3.5rem] group-hover/card:text-[#E8B84B] transition-colors line-clamp-2"
                                        >
                                            {ebook.title}
                                        </CardItem>
                                    </div>

                                    <div className="flex justify-between items-center w-full mt-auto">
                                        <CardItem
                                            translateZ="30"
                                            as="a"
                                            href={ebook.pdf_url || '#'}
                                            target="_blank"
                                            className="w-full text-center px-6 py-3 rounded-xl bg-[#0052cc] hover:bg-[#0047b3] dark:bg-[#0052cc] dark:hover:bg-[#0047b3] text-white text-sm font-bold shadow-lg transition-all active:scale-95"
                                        >
                                            Download / Read
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </motion.div>
                    ))}
                </div>

                {filteredEbooks.length === 0 && (
                    <div className="w-full py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <FileText className="w-16 h-16 mb-4 text-gray-400" />
                        <h3 className="text-xl font-bold dark:text-white">No materials found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
