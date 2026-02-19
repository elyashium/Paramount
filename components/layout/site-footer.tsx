'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Phone, Mail, Globe, Clock, Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const QUICK_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
    { href: '/test-series', label: 'Test Series' },
    { href: '/free-test', label: 'Free Test' },
]

const COURSE_LINKS = [
    { href: '/courses', label: 'IMU-CET Preparation' },
    { href: '/courses', label: 'DNS Programme' },
    { href: '/courses', label: 'Marine Engineering' },
    { href: '/courses', label: 'GP Rating' },
    { href: '/courses', label: 'ETO Course' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function SiteFooter() {
    /* Parallax for team photo */
    const photoRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: photoScrollY } = useScroll({
        target: photoRef,
        offset: ['start end', 'end start'],
    })
    const photoParallax = useTransform(photoScrollY, [0, 1], ['-6%', '6%'])

    return (
        <>
            {/* ── TEAM PHOTO (full-width, at bottom, no dim overlays) ──────── */}
            <div ref={photoRef} className="relative overflow-hidden bg-[#f7f7f5] dark:bg-gray-950">
                <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#E8B84B] to-transparent" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: EASE }}
                >
                    <motion.div style={{ y: photoParallax }}>
                        <Image
                            src="/team.png"
                            alt="Paramount Merchant Navy — IMU-CET Faculty Team"
                            width={1920}
                            height={860}
                            className="w-full object-cover object-center"
                            sizes="100vw"
                            priority={false}
                        />
                    </motion.div>
                </motion.div>
                <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#E8B84B] to-transparent" />
            </div>

            {/* ── FOOTER ───────────────────────────────────────────────────── */}
            <footer className="bg-[#0d0d0d] text-gray-300">
                <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

                        {/* Branding */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src="/logo.png"
                                    alt="Paramount Merchant Navy logo"
                                    width={44}
                                    height={44}
                                    className="object-contain"
                                />
                                <div>
                                    <div className="font-black text-white text-sm leading-tight">Paramount</div>
                                    <div className="text-[#E8B84B] text-xs font-semibold tracking-wide">Merchant Navy</div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                {"India's top IMU-CET coaching institute providing comprehensive courses, test series, and expert guidance."}
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { icon: Phone, href: 'tel:+911234567890', label: 'Call us' },
                                    { icon: Mail, href: 'mailto:info@paramountmn.com', label: 'Email us' },
                                    { icon: Globe, href: '#', label: 'Website' },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-[#E8B84B]/20 hover:text-[#E8B84B] transition-colors duration-200"
                                    >
                                        <Icon className="w-4 h-4" aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h2 className="text-white font-black text-sm uppercase tracking-widest mb-5">Quick Links</h2>
                            <ul className="space-y-3">
                                {QUICK_LINKS.map(({ href, label }) => (
                                    <li key={label}>
                                        <Link href={href} className="text-sm text-gray-400 hover:text-[#E8B84B] transition-colors duration-200">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Courses */}
                        <div>
                            <h2 className="text-white font-black text-sm uppercase tracking-widest mb-5">Courses</h2>
                            <ul className="space-y-3">
                                {COURSE_LINKS.map(({ label }) => (
                                    <li key={label}>
                                        <Link href="/courses" className="text-sm text-gray-400 hover:text-[#E8B84B] transition-colors duration-200">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h2 className="text-white font-black text-sm uppercase tracking-widest mb-5">Contact Info</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-gray-400">
                                    <Phone className="w-4 h-4 mt-0.5 text-[#E8B84B] shrink-0" aria-hidden="true" />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-400">
                                    <Mail className="w-4 h-4 mt-0.5 text-[#E8B84B] shrink-0" aria-hidden="true" />
                                    <span>info@paramountmn.com</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-400">
                                    <Clock className="w-4 h-4 mt-0.5 text-[#E8B84B] shrink-0" aria-hidden="true" />
                                    <span>Mon – Sat: 8AM – 8PM</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                        <span>© 2026 Paramount Merchant Navy Academy. All rights reserved.</span>
                        <span className="text-[#E8B84B]/60 font-semibold tracking-wide uppercase text-[10px]">
                            Excellence in Maritime Education
                        </span>
                    </div>
                </div>
            </footer>
        </>
    )
}
