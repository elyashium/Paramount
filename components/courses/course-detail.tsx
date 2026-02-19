'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    Users,
    Clock,
    Award,
    CheckCircle2,
    BookOpen,
    FileText,
    PlayCircle,
    Video,
    Download,
    Share2,
    Phone,
    ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Course } from '@/lib/data/courses'

interface CourseDetailProps {
    course: Course
}

export function CourseDetail({ course }: CourseDetailProps) {
    const { scrollY } = useScroll()
    const headerOpacity = useTransform(scrollY, [0, 200], [0, 1])
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-[#E8B84B]/30 pb-20">

            {/* ── STICKY HEADER ─────────────────────────────────────────────────── */}
            <motion.header
                style={{ opacity: headerOpacity }}
                className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/10"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="font-bold text-lg">{course.title}</span>
                    <Button size="sm" className="bg-[#E8B84B] text-black hover:bg-[#cfa23d] font-bold rounded-full">
                        Enroll Now
                    </Button>
                </div>
            </motion.header>

            {/* ── HERO SECTION ───────────────────────────────────────────────────── */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent z-10" />

                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />

                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-20 max-w-7xl mx-auto"
                >
                    <div className="max-w-3xl space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-[#E8B84B] border-[#E8B84B] uppercase tracking-wider">
                                {course.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-[#E8B84B]">
                                <Award className="w-4 h-4" />
                                <span className="text-sm font-bold">Best Seller</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            {course.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-300 font-medium">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-[#E8B84B]" />
                                <span>{course.students.toLocaleString()} Students Enrolled</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#E8B84B]" />
                                <span>{course.duration} Duration</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-[#E8B84B]" />
                                <span>Certified Course</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── CONTENT GRID ───────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Features Info */}
                        <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6">What you&apos;ll get</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {course.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#E8B84B] mt-0.5 shrink-0" />
                                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Curriculum */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
                            <div className="space-y-4">
                                {course.curriculum ? (
                                    course.curriculum.map((item, idx) => (
                                        <div key={idx} className="bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden">
                                            <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-[#E8B84B]/10 flex items-center justify-center text-[#E8B84B] font-bold text-sm">
                                                        {idx + 1}
                                                    </div>
                                                    <span className="font-semibold text-gray-200">{item.title}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium">
                                                    {item.duration} • {item.lessons} Lessons
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500 italic">Curriculum details coming soon.</div>
                                )}
                            </div>
                        </div>

                        {/* Instructors */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Your Instructors</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Placeholder Intructors (Reuse image logic later) */}
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
                                        <div className="w-16 h-16 bg-gray-700 rounded-full flex-shrink-0 relative overflow-hidden">
                                            <Image
                                                src={`/teachers/teacher-${i}.jpg`}
                                                alt="Instructor"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">Captain &quot;Name&quot;</div>
                                            <div className="text-xs text-[#E8B84B] uppercase tracking-wide mb-1">Navigation Expert</div>
                                            <p className="text-xs text-gray-400">10+ Years of experience in merchant navy coaching.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar (Right) */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-6">

                            {/* Pricing Card */}
                            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 shadow-2xl shadow-black/50">
                                <div className="mb-6">
                                    <span className="text-gray-400 text-sm">Total Price</span>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-black text-white">{course.price}</span>
                                        <span className="text-gray-500 line-through text-lg mb-1">₹35,000</span>
                                    </div>
                                    <span className="text-[#E8B84B] text-xs font-bold uppercase tracking-wider">28% Off for limited time</span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <Button size="lg" className="w-full bg-[#E8B84B] text-black hover:bg-[#cfa23d] font-bold text-lg h-12 rounded-xl">
                                        Enroll Now
                                    </Button>
                                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white rounded-xl">
                                        Download Brochure <Download className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <h3 className="font-bold text-white text-sm">This course includes:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm text-gray-400">
                                            <Video className="w-4 h-4 text-[#E8B84B]" /> 120+ Hours Video Lectures
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-400">
                                            <FileText className="w-4 h-4 text-[#E8B84B]" /> 15+ Mock Tests
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-400">
                                            <Download className="w-4 h-4 text-[#E8B84B]" /> Downloadable Resources
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-400">
                                            <Phone className="w-4 h-4 text-[#E8B84B]" /> Mobile Access
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Need Help */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 text-center">
                                <h3 className="font-bold text-white mb-2">Need help deciding?</h3>
                                <p className="text-sm text-gray-400 mb-4">Call our academic counsellors for a free consultation.</p>
                                <div className="flex justify-center gap-3">
                                    <Button variant="secondary" size="sm" className="rounded-full">
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
