'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, Filter, BookOpen, Clock, Users, Star, ChevronRight, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

import { COURSES } from '@/lib/data/courses'

const CATEGORIES = ['All', 'Entrance Exam', 'Sponsorship', 'Engineering', 'Rating', 'Electrical', 'Advanced']

const EASE = [0.22, 1, 0.36, 1] as const

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const FADE_LEFT: Variants = {
    hidden: { opacity: 0, x: -44 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

const STAGGER: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    return (
        <motion.div
            ref={ref}
            variants={STAGGER}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function CoursesPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentSlide, setCurrentSlide] = useState(0)

    // Filter logic
    const filteredCourses = COURSES.filter(course => {
        const matchesCategory = activeCategory === 'All' || course.category === activeCategory
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Hero Slider Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen bg-[#f7f7f5] dark:bg-gray-950 text-gray-900 dark:text-white font-sans selection:bg-[#E8B84B]/30 transition-colors duration-300">

            {/* ── HERO SLIDER ─────────────────────────────────────────────────── */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        {/* Background Image with Dark Overlay */}
                        <div className="absolute inset-0 bg-black/60 z-10" />
                        <Image
                            src={COURSES[currentSlide].image}
                            alt={COURSES[currentSlide].title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />

                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                            <div className="max-w-4xl space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Badge
                                        variant="outline"
                                        className="text-[#E8B84B] border-[#E8B84B] uppercase tracking-[0.2em] px-4 py-1.5 mb-4 bg-black/50 backdrop-blur-sm"
                                    >
                                        Featured Course
                                    </Badge>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4"
                                >
                                    {COURSES[currentSlide].title}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                                >
                                    {COURSES[currentSlide].description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-8"
                                >
                                    <Link href={`/courses/${COURSES[currentSlide].id}`}>
                                        <Button
                                            size="lg"
                                            className="rounded-full px-10 h-14 text-base font-bold transition-all hover:scale-105"
                                            style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
                                        >
                                            View Course Details
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Indicators */}
                <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
                    {[0, 1, 2].map((idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={cn(
                                "h-2.5 rounded-full transition-all duration-300",
                                currentSlide === idx ? "bg-[#E8B84B] w-8" : "bg-white/40 hover:bg-white/60 w-2.5"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* ── SEARCH & FILTER SECTION ─────────────────────────────────────── */}
            <div className="sticky top-0 z-40 bg-[#f7f7f5]/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 py-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        <Filter className="w-5 h-5 text-[#E8B84B] shrink-0 mr-2" />
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                                    activeCategory === cat
                                        ? "bg-[#E8B84B] text-black border-[#E8B84B]"
                                        : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-[320px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#E8B84B]/50 focus:ring-1 focus:ring-[#E8B84B]/50 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* ── COURSE GRID ─────────────────────────────────────────────────── */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <ScrollReveal className="flex items-center justify-between mb-12">
                    <motion.h2 variants={FADE_LEFT} className="text-3xl font-bold text-gray-900 dark:text-white">
                        Available <span className="text-[#E8B84B]">Courses</span>
                    </motion.h2>
                    <motion.span variants={FADE_UP} className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                        Showing {filteredCourses.length} results
                    </motion.span>
                </ScrollReveal>

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, i) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                            >
                                <Link href={`/courses/${course.id}`} className="block h-full">
                                    <CardContainer className="inter-var h-full w-full">
                                        <CardBody className="bg-white dark:bg-[#1a1a1a] relative group/card border-gray-100 dark:border-white/5 w-auto sm:w-full h-auto rounded-xl p-6 border hover:border-[#E8B84B]/30 hover:shadow-2xl hover:shadow-[#E8B84B]/5 transition-all duration-300 flex flex-col justify-between">
                                            <div>
                                                {/* Image */}
                                                <CardItem translateZ="50" className="w-full">
                                                    <div className="relative h-56 w-full overflow-hidden rounded-xl">
                                                        <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/0 transition-all z-10" />
                                                        <Image
                                                            src={course.image}
                                                            alt={course.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                                            {course.category}
                                                        </div>
                                                    </div>
                                                </CardItem>

                                                {/* Stats */}
                                                <div className="flex items-center justify-between mt-6 mb-3">
                                                    <CardItem translateZ="40" className="flex items-center gap-1.5 text-[#E8B84B]">
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{course.rating}</span>
                                                    </CardItem>
                                                    <CardItem translateZ="40" className="flex items-center gap-1.5 text-gray-400">
                                                        <Users className="w-3.5 h-3.5" />
                                                        <span className="text-xs">{course.students.toLocaleString()} Students</span>
                                                    </CardItem>
                                                </div>

                                                {/* Title & Desc */}
                                                <CardItem
                                                    translateZ="50"
                                                    className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover/card:text-[#E8B84B] transition-colors"
                                                >
                                                    {course.title}
                                                </CardItem>
                                                <CardItem
                                                    as="p"
                                                    translateZ="60"
                                                    className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2"
                                                >
                                                    {course.description}
                                                </CardItem>

                                                {/* Features */}
                                                <CardItem translateZ="40" className="space-y-3 mb-6">
                                                    {course.features.slice(0, 2).map((feature, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                            <PlayCircle className="w-4 h-4 text-[#E8B84B]" />
                                                            <span>{feature}</span>
                                                        </div>
                                                    ))}
                                                </CardItem>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 mt-auto">
                                                <CardItem translateZ="30" className="flex flex-col">
                                                    <span className="text-xs text-gray-400 uppercase tracking-wider">Price</span>
                                                    <span className="text-lg font-bold text-gray-900 dark:text-white">{course.price}</span>
                                                </CardItem>
                                                <CardItem translateZ="30">
                                                    <Button variant="ghost" className="text-[#E8B84B] hover:text-[#cfa23d] hover:bg-[#E8B84B]/10 p-0 h-auto font-semibold">
                                                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                                                    </Button>
                                                </CardItem>
                                            </div>
                                        </CardBody>
                                    </CardContainer>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                        <Button
                            variant="outline"
                            className="mt-6 border-[#E8B84B] text-[#E8B84B] hover:bg-[#E8B84B] hover:text-black"
                            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </section>

        </div>
    )
}
