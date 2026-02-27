'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Users,
    Clock,
    CheckCircle2,
    PlayCircle,
    Download,
    Phone,
    ChevronDown,
    Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { Course } from '@/lib/data/courses'
import { cn } from '@/lib/utils'

interface CourseDetailProps {
    course: Course
}

export function CourseDetail({ course }: CourseDetailProps) {
    const [currency, setCurrency] = useState('INR')

    return (
        <div className="min-h-screen bg-[#f7f7f5] dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 font-sans selection:bg-[#E8B84B]/30 pb-20">

            {/* ── TOP NAV BAR SPACING ── */}
            <div className="h-20 lg:h-24 bg-transparent"></div>

            {/* ── HEADER OVERLAY / HERO SECTION ───────────────────────────────────── */}
            <div className="relative w-full overflow-hidden bg-gray-900 py-20 md:py-32 px-6">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={course?.image_url || '/placeholder.png'}
                        alt="Background"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline" className="text-[#E8B84B] border-[#E8B84B] uppercase tracking-wider backdrop-blur-sm bg-black/30">
                            {course.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-[#E8B84B]">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-bold">Best Seller</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl">
                        {course?.title}
                    </h1>
                </div>
            </div>

            {/* ── CONTENT GRID ───────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-8 lg:space-y-12">

                        {/* Tabs Container (Overview) */}
                        <div className="flex border-b border-gray-200 dark:border-white/10">
                            <button className="px-8 py-4 font-semibold text-[#E8B84B] border-b-2 border-[#E8B84B] transition-colors">
                                Overview
                            </button>
                        </div>

                        {/* Description / Features */}
                        <div className="space-y-8">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {course?.description}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold dark:text-white">What you&apos;ll learn</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {(course?.features || []).map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 hover:border-[#E8B84B]/50 transition-colors shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-[#E8B84B] mt-0.5 shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-medium leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Sidebar (Right) - 3D Card Pricing Section */}
                    <div className="relative z-20">
                        <div className="sticky top-32 space-y-6 lg:mt-[-160px]">

                            <CardContainer className="inter-var w-full">
                                <CardBody className="bg-white dark:bg-neutral-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#E8B84B]/[0.1] border-gray-200 dark:border-white/[0.2] border w-full rounded-3xl p-6 h-auto transition-all shadow-xl dark:shadow-none hover:border-[#E8B84B]/50">

                                    {/* Image Area */}
                                    <CardItem translateZ="50" className="w-full">
                                        <div className="relative h-48 md:h-56 w-full overflow-hidden rounded-2xl mb-6">
                                            <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/0 transition-all z-10" />
                                            <Image
                                                src={course?.image_url || '/placeholder.png'}
                                                alt={course?.title || 'Course Image'}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                priority
                                            />
                                        </div>
                                    </CardItem>

                                    {/* Price Area */}
                                    <div className="space-y-4">
                                        <CardItem translateZ="30">
                                            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Price</span>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-3xl font-black text-gray-900 dark:text-white">₹{course?.price || '0'}</span>
                                                <span className="text-gray-400 dark:text-gray-500 line-through text-lg font-medium">₹14,000</span>
                                                <div className="ml-auto bg-[#E8B84B]/10 text-[#cfa23d] dark:text-[#E8B84B] text-xs font-bold px-3 py-1 rounded-full border border-[#E8B84B]/20">
                                                    57% OFF
                                                </div>
                                            </div>
                                        </CardItem>

                                        {/* Currency Selector */}
                                        <CardItem translateZ="40" className="space-y-2 pt-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Currency</label>
                                            <div className="relative">
                                                <select
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                    className="w-full appearance-none bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E8B84B] focus:border-[#E8B84B] cursor-pointer font-medium transition-all"
                                                >
                                                    <option value="INR" className="dark:bg-neutral-900">INR - Indian Rupee</option>
                                                    <option value="USD" className="dark:bg-neutral-900">USD - US Dollar</option>
                                                    <option value="EUR" className="dark:bg-neutral-900">EUR - Euro</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </CardItem>

                                        {/* Action Buttons */}
                                        <CardItem translateZ="60" className="pt-4 w-full">
                                            {course?.enroll_link ? (
                                                <a href={course.enroll_link} target="_blank" rel="noopener noreferrer">
                                                    <Button size="lg" className="w-full rounded-xl h-14 text-base font-bold transition-all hover:scale-[1.02] shadow-lg shadow-[#E8B84B]/20" style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}>
                                                        Enroll Now
                                                    </Button>
                                                </a>
                                            ) : (
                                                <Button size="lg" className="w-full rounded-xl h-14 text-base font-bold transition-all hover:scale-[1.02] shadow-lg shadow-[#E8B84B]/20" style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}>
                                                    Enroll Now
                                                </Button>
                                            )}
                                        </CardItem>
                                    </div>

                                </CardBody>
                            </CardContainer>

                            {/* Need Help */}
                            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10 text-center shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Need help deciding?</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Call our academic counsellors for a free consultation.</p>
                                <div className="flex justify-center gap-3">
                                    <Button variant="outline" size="sm" className="rounded-full border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#E8B84B] dark:hover:text-[#E8B84B]">
                                        <Phone className="w-3 h-3 mr-2" /> Call Now
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
