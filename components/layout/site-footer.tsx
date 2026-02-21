'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Phone, Mail, Globe, Clock, Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const QUICK_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
    { href: '/test-series', label: 'Test Series' },
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

    // Hide footer on auth pages
    const pathname = usePathname()
    if (pathname?.startsWith('/auth')) return null

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

                            {/* Google Play Store */}
                            <div className="mt-6">
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Download App</p>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.picsbt.jlpzik"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-black border border-white/20 hover:border-[#E8B84B]/50 transition-colors rounded-xl px-4 py-2.5 group"
                                    aria-label="Get it on Google Play"
                                >
                                    {/* Play Store icon */}
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.18 1.09C2.47 1.48 2 2.22 2 3.08v17.84c0 .86.47 1.6 1.18 1.99l.1.06 9.99-9.99v-.24L3.28 1.03l-.1.06z" fill="url(#a)" />
                                        <path d="M16.6 15.4l-3.33-3.33v-.24l3.33-3.33.08.04 3.94 2.24c1.13.64 1.13 1.69 0 2.33l-3.94 2.24-.08.05z" fill="url(#b)" />
                                        <path d="M16.68 15.35L13.27 12 3.18 22.09c.37.4.97.45 1.64.07l11.86-6.81" fill="url(#c)" />
                                        <path d="M16.68 8.65L4.82 1.84C4.15 1.46 3.55 1.51 3.18 1.91L13.27 12l3.41-3.35z" fill="url(#d)" />
                                        <defs>
                                            <linearGradient id="a" x1="12.27" y1="2.31" x2="-4.1" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#00A0FF" /><stop offset="0.007" stopColor="#00A1FF" /><stop offset="0.26" stopColor="#00BEFF" /><stop offset="0.512" stopColor="#00D2FF" /><stop offset="0.76" stopColor="#00DFFF" /><stop offset="1" stopColor="#00E3FF" /></linearGradient>
                                            <linearGradient id="b" x1="21.8" y1="12" x2="1.54" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE000" /><stop offset="0.409" stopColor="#FFBD00" /><stop offset="0.775" stopColor="#FFA500" /><stop offset="1" stopColor="#FF9C00" /></linearGradient>
                                            <linearGradient id="c" x1="14.83" y1="13.69" x2="-4.78" y2="33.3" gradientUnits="userSpaceOnUse"><stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" /></linearGradient>
                                            <linearGradient id="d" x1="1.3" y1="-6.45" x2="9.77" y2="2.01" gradientUnits="userSpaceOnUse"><stop stopColor="#32A071" /><stop offset="0.069" stopColor="#2DA771" /><stop offset="0.476" stopColor="#15CF74" /><stop offset="0.801" stopColor="#06E775" /><stop offset="1" stopColor="#00F076" /></linearGradient>
                                        </defs>
                                    </svg>
                                    <div>
                                        <div className="text-[10px] text-gray-400 leading-tight">GET IT ON</div>
                                        <div className="text-sm font-bold text-white leading-tight group-hover:text-[#E8B84B] transition-colors">Google Play</div>
                                    </div>
                                </a>
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
