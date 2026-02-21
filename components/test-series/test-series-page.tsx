'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Button } from '@/components/ui/button'
import { Search, ChevronDown, Check, Clock, FileText, Database } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const TESTS = [
    { id: 1, title: 'Indian Geography Mock Test 01', questions: 41, marks: 41, minutes: 30 },
    { id: 2, title: 'Physics Mock Test 01', questions: 18, marks: 18, minutes: 30 },
    { id: 3, title: 'English Mock Test 01', questions: 10, marks: 10, minutes: 30 },
    { id: 4, title: 'Analogy Mock Test 01', questions: 50, marks: 50, minutes: 30 },
]

export function TestSeriesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState('Tests')

    const filteredTests = TESTS.filter(test => test.title.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <main className="min-h-screen bg-[#f7f7f5] dark:bg-black pt-28 pb-20">
            {/* Header / Hero Section matching the dark aesthetic of courses */}
            <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Left side details */}
                    <div className="flex-1 rounded-[2rem] p-10 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8B84B]/10 rounded-full blur-[80px] pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE }}
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tight mb-4 select-none">
                                IMU-CET <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B84B] to-[#F3D37A]">Test Series</span>
                            </h1>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-sm font-semibold text-black dark:text-white mb-6">
                                <Clock className="w-4 h-4 text-[#E8B84B]" />
                                Validity: Lifetime
                            </div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
                                Prepare for your merchant navy journey with our comprehensive mock tests, pdf materials, and subjective practices.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right side checkout card (Floating 3D style) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                        className="lg:w-[400px] shrink-0"
                    >
                        <div className="rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 shadow-2xl p-8 sticky top-32">
                            {/* Dummy Image Holder similar to reference image */}
                            <div className="w-full h-32 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-6 border border-black/5 dark:border-white/5">
                                <div className="text-gray-400 dark:text-gray-500">
                                    <Database className="w-10 h-10 opacity-50" />
                                </div>
                            </div>

                            <div className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Pricing</div>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-4xl font-black text-black dark:text-white">₹0</span>
                                <span className="text-lg text-gray-400 line-through mb-1">₹1,999</span>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md mb-2 ml-auto">100% OFF</span>
                            </div>

                            <div className="mb-6 space-y-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Choose Currency:</label>
                                <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 cursor-pointer text-sm font-medium">
                                    <span>INR</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </div>
                            </div>

                            <Button className="w-full h-14 rounded-xl font-bold text-lg bg-[#E8B84B] text-black hover:bg-[#F3D37A] hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(232,184,75,0.3)] hover:shadow-[0_0_30px_rgba(232,184,75,0.5)]">
                                Buy Now
                            </Button>
                        </div>
                    </motion.div>
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

                {/* Tabs */}
                <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
                    {['Tests', 'Pdfs', 'Test Subjectives'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
                                activeTab === tab
                                    ? "bg-[#E8B84B] text-black border-[#E8B84B] shadow-[0_0_15px_rgba(232,184,75,0.3)]"
                                    : "bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 border-black/10 dark:border-white/10 hover:border-[#E8B84B]/50 hover:text-black dark:hover:text-white"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Test Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTests.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                        >
                            <CardContainer className="inter-var w-full h-full">
                                <CardBody className="bg-white dark:bg-neutral-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-black/[0.1] dark:border-white/[0.2] border w-full rounded-2xl p-6 h-full transition-all flex flex-col justify-between hover:border-[#E8B84B]/50">

                                    <div>
                                        <CardItem
                                            translateZ="50"
                                            className="text-lg font-bold text-neutral-900 dark:text-white leading-tight mb-8 group-hover/card:text-[#E8B84B] transition-colors line-clamp-2 md:h-14 lg:h-auto"
                                        >
                                            {test.title}
                                        </CardItem>

                                        <CardItem translateZ="30" className="flex items-center justify-between w-full mb-8">
                                            {/* Questions */}
                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex-1 mx-1">
                                                <span className="text-xl font-black text-blue-600 dark:text-blue-400">{test.questions}</span>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Que</span>
                                            </div>
                                            {/* Marks */}
                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex-1 mx-1">
                                                <span className="text-xl font-black text-blue-600 dark:text-blue-400">{test.marks}</span>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Mar</span>
                                            </div>
                                            {/* Minutes */}
                                            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex-1 mx-1">
                                                <span className="text-xl font-black text-blue-600 dark:text-blue-400">{test.minutes}</span>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Min</span>
                                            </div>
                                        </CardItem>
                                    </div>

                                    <div className="flex justify-between items-center w-full">
                                        <CardItem
                                            translateZ="40"
                                            as="button"
                                            className="w-full px-6 py-3 rounded-xl bg-[#0052cc] hover:bg-[#0047b3] dark:bg-[#0052cc] dark:hover:bg-[#0047b3] text-white text-sm font-bold shadow-lg transition-all active:scale-95"
                                        >
                                            Attempt
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </motion.div>
                    ))}
                </div>

                {filteredTests.length === 0 && (
                    <div className="w-full py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <FileText className="w-16 h-16 mb-4 text-gray-400" />
                        <h3 className="text-xl font-bold dark:text-white">No tests found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search query.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
