'use client'

import React, { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Globe3D } from '@/components/ui/globe-3d'

const EASE = [0.22, 1, 0.36, 1] as const

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const STAGGER: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
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

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <motion.div variants={FADE_UP} className="inline-block mb-4">
            <Badge variant="outline" className="text-[#E8B84B] border-[#E8B84B] uppercase tracking-[0.2em] px-4 py-1.5 bg-[#E8B84B]/10 backdrop-blur-sm">
                {children}
            </Badge>
        </motion.div>
    )
}

const WhatsappIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
)

const globeMarkers = [
    { location: [26.2183, 78.1828], size: 0.08 }, // Gwalior
]
const INSTITUTE_LAT = 26.2183
const INSTITUTE_LNG = 78.1828
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114534.6146051759!2d78.10657159740523!3d26.216399127606304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c5d1792291bf%3A0x5d562b7e9238ebcf!2sGwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710915354972!5m2!1sen!2sin'

export function ContactPage() {
    return (
        <div className="min-h-screen bg-[#f7f7f5] dark:bg-gray-950 text-gray-900 dark:text-white font-sans selection:bg-[#E8B84B]/30 transition-colors duration-300 pt-32 pb-16">

            {/* ── HEADER ──────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <ScrollReveal>
                    <Chip>Contact Us</Chip>
                    <motion.h1
                        variants={FADE_UP}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6"
                    >
                        Get in Touch with{' '}
                        <span style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Paramount
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={FADE_UP}
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Ready to start your Merchant Navy journey? Fill out the admission form below or reach out to our counseling team directly.
                    </motion.p>
                </ScrollReveal>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">

                    {/* ── LEFT: FORM ────────────────────────────────────────────── */}
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <motion.div variants={FADE_UP} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl dark:shadow-none relative overflow-hidden">
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 -tr-translate-x-1/2 -tr-translate-y-1/2 w-96 h-96 bg-[#E8B84B]/5 rounded-full blur-[80px] pointer-events-none" />

                                <h2 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">Join Paramount</h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Fill out the form below to begin your journey with us. All fields marked with * are required.</p>

                                <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>

                                    {/* Section 1: Student Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8B84B] border-b border-gray-100 dark:border-gray-800 pb-2">Student Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input id="firstName" placeholder="Enter your first name" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input id="lastName" placeholder="Enter your last name" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="dob">Date of Birth *</Label>
                                                <Input id="dob" type="date" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="gender">Gender *</Label>
                                                <select id="gender" defaultValue="" className="w-full h-10 rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/50 transition-colors text-gray-900 dark:text-white text-gray-500 dark:text-gray-300" required>
                                                    <option value="" disabled>Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: School Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8B84B] border-b border-gray-100 dark:border-gray-800 pb-2">School Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5 sm:col-span-2">
                                                <Label htmlFor="schoolName">School Name *</Label>
                                                <Input id="schoolName" placeholder="Enter your school name" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="board">Board *</Label>
                                                <select id="board" defaultValue="" className="w-full h-10 rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/50 transition-colors text-gray-900 dark:text-white text-gray-500 dark:text-gray-300" required>
                                                    <option value="" disabled>Select Board</option>
                                                    <option value="cbse">CBSE</option>
                                                    <option value="icse">ICSE</option>
                                                    <option value="state">State Board</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="currentClass">Current Class *</Label>
                                                <select id="currentClass" defaultValue="" className="w-full h-10 rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/50 transition-colors text-gray-900 dark:text-white text-gray-500 dark:text-gray-300" required>
                                                    <option value="" disabled>Select Current Class</option>
                                                    <option value="11">11th Standard</option>
                                                    <option value="12">12th Standard</option>
                                                    <option value="passed">12th Passed / Dropper</option>
                                                    <option value="graduating">Graduating</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5 sm:col-span-2">
                                                <Label htmlFor="previousClass">Previous Class</Label>
                                                <select id="previousClass" defaultValue="" className="w-full h-10 rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/50 transition-colors text-gray-900 dark:text-white text-gray-500 dark:text-gray-300">
                                                    <option value="" disabled>Select Previous Class</option>
                                                    <option value="10">10th Standard</option>
                                                    <option value="11">11th Standard</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Contact Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8B84B] border-b border-gray-100 dark:border-gray-800 pb-2">Contact Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5 sm:col-span-2">
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input id="email" type="email" placeholder="Enter your email address" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="mobile">Mobile Number *</Label>
                                                <Input id="mobile" type="tel" placeholder="Enter your mobile number" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="altMobile">Alternate Mobile Number</Label>
                                                <Input id="altMobile" type="tel" placeholder="Enter alternate mobile number" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 4: Parent Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8B84B] border-b border-gray-100 dark:border-gray-800 pb-2">Parent Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="fatherName">Father's Name *</Label>
                                                <Input id="fatherName" placeholder="Enter father's name" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="fatherMobile">Father's Mobile *</Label>
                                                <Input id="fatherMobile" type="tel" placeholder="Enter father's mobile number" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 5: Address Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8B84B] border-b border-gray-100 dark:border-gray-800 pb-2">Address Details</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5 sm:col-span-2">
                                                <Label htmlFor="address">Address *</Label>
                                                <Input id="address" placeholder="Enter your complete address" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="city">City *</Label>
                                                <Input id="city" placeholder="Enter city" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="state">State *</Label>
                                                <Input id="state" placeholder="Enter state" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                            <div className="space-y-1.5 sm:col-span-2">
                                                <Label htmlFor="pincode">Pincode *</Label>
                                                <Input id="pincode" placeholder="Enter pincode" className="bg-gray-50 dark:bg-black/50 border-gray-200 dark:border-white/10" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 6: Course Selection */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8B84B] border-b border-gray-100 dark:border-gray-800 pb-2">Course Selection</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="course">Select Course *</Label>
                                                <select id="course" defaultValue="" className="w-full h-10 rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/50 transition-colors text-gray-900 dark:text-white text-gray-500 dark:text-gray-300" required>
                                                    <option value="" disabled>Select Course</option>
                                                    <option value="imu_cet">IMU-CET Coaching</option>
                                                    <option value="sponsorship">Sponsorship Preparation</option>
                                                    <option value="english">Spoken English</option>
                                                    <option value="combo">IMU-CET + Sponsorship Combo</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="batch">Preferred Batch</Label>
                                                <select id="batch" defaultValue="" className="w-full h-10 rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/50 transition-colors text-gray-900 dark:text-white text-gray-500 dark:text-gray-300">
                                                    <option value="" disabled>Select Batch</option>
                                                    <option value="morning">Morning Batch</option>
                                                    <option value="evening">Evening Batch</option>
                                                    <option value="weekend">Weekend Batch</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full md:w-auto mt-6 rounded-full px-10 h-14 text-base font-bold transition-all hover:scale-[1.02]"
                                        style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
                                    >
                                        Submit Application
                                    </Button>

                                </form>
                            </motion.div>
                        </ScrollReveal>
                    </div>

                    {/* ── RIGHT: SOCIALS & INFO ──────────────────────────────────── */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Contact Info Card */}
                        <ScrollReveal>
                            <motion.div variants={FADE_UP} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl dark:shadow-none">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                                        <div className="w-10 h-10 rounded-full bg-[#E8B84B]/10 flex items-center justify-center shrink-0">
                                            <Phone className="w-4 h-4 text-[#E8B84B]" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white mb-1">Call Us</p>
                                            <p className="text-sm">+91 98765 43210</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                                        <div className="w-10 h-10 rounded-full bg-[#E8B84B]/10 flex items-center justify-center shrink-0">
                                            <Mail className="w-4 h-4 text-[#E8B84B]" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</p>
                                            <p className="text-sm">info@paramountmn.com</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                                        <div className="w-10 h-10 rounded-full bg-[#E8B84B]/10 flex items-center justify-center shrink-0">
                                            <Clock className="w-4 h-4 text-[#E8B84B]" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white mb-1">Working Hours</p>
                                            <p className="text-sm">Mon – Sat: 8AM – 8PM</p>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>
                        </ScrollReveal>

                        {/* Social Links Card */}
                        <ScrollReveal>
                            <motion.div variants={FADE_UP} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl dark:shadow-none">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Connect With Us</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Follow us on social media for daily updates, IMU-CET tips, and success stories.</p>

                                <div className="grid grid-cols-2 gap-3">
                                    <a
                                        href="https://youtube.com/@paramountmerchantnavy?si=Iy15i9xc1LhWCNOE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-[#E8B84B]/50 hover:bg-[#E8B84B]/10 transition-all group"
                                    >
                                        <Youtube className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white">YouTube</span>
                                    </a>

                                    <a
                                        href="https://whatsapp.com/channel/0029Va4uagf3QxS4ZymMrc2u"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-[#E8B84B]/50 hover:bg-[#E8B84B]/10 transition-all group"
                                    >
                                        <WhatsappIcon className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white">WhatsApp</span>
                                    </a>

                                    <a
                                        href="https://t.me/Paramountimu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-[#E8B84B]/50 hover:bg-[#E8B84B]/10 transition-all group"
                                    >
                                        <Send className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white">Telegram</span>
                                    </a>

                                    <a
                                        href="https://www.instagram.com/paramountmerchantnavy?igsh=ajgwdXY1cHAxNWp5"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-[#E8B84B]/50 hover:bg-[#E8B84B]/10 transition-all group"
                                    >
                                        <Instagram className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white">Instagram</span>
                                    </a>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>

            {/* ── GLOBE + MAP SECTION (Re-used from Homepage layout style) ────── */}
            <div className="mt-24 sm:mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
                    <ScrollReveal>
                        <Chip>Our Location</Chip>
                        <motion.h2
                            variants={FADE_UP}
                            className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight"
                        >
                            Navigate to{' '}
                            <span style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Paramount
                            </span>
                        </motion.h2>
                        <motion.p variants={FADE_UP} className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                            Located in Gwalior, Madhya Pradesh — shaping India&apos;s next generation of Merchant Navy officers.
                        </motion.p>
                    </ScrollReveal>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch" style={{ minHeight: '480px' }}>
                        {/* LEFT — 3D Globe */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className="relative flex items-center justify-center overflow-hidden"
                            style={{ minHeight: '380px' }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[400px] h-[400px] rounded-full bg-[#E8B84B]/8 blur-[80px]" />
                            </div>
                            <Globe3D
                                markers={globeMarkers}
                                className="h-full w-full"
                                config={{ radius: 2, autoRotateSpeed: 0.35, showAtmosphere: false, enableZoom: false, enablePan: false, ambientIntensity: 0.7, pointLightIntensity: 1.4, backgroundColor: null }}
                            />
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 px-3 py-1.5 pointer-events-none">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#E8B84B] animate-pulse" />
                                Drag to explore — we&apos;re in Gwalior, India
                            </div>
                        </motion.div>

                        {/* RIGHT — Google Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className="relative flex flex-col overflow-hidden"
                            style={{ minHeight: '380px' }}
                        >
                            {/* Map header */}
                            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 shrink-0">
                                <div className="w-8 h-8 rounded-full bg-[#E8B84B]/15 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-[#E8B84B]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">Paramount Coaching Institute</p>
                                    <p className="text-xs text-gray-500 leading-tight">Gwalior, Madhya Pradesh, India</p>
                                </div>
                            </div>

                            {/* Map embed */}
                            <div className="flex-1 relative overflow-hidden rounded-2xl mx-4 mr-4 sm:mr-6 lg:mr-8 mb-4 shadow-xl dark:shadow-none border border-gray-200 dark:border-white/10">
                                <iframe
                                    src={MAPS_EMBED_URL}
                                    width="100%"
                                    height="100%"
                                    className="absolute inset-0 w-full h-full dark:invert-[0.85] dark:hue-rotate-180 dark:saturate-[0.8] dark:brightness-[0.85]"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Paramount Coaching Institute Location"
                                />
                                <a
                                    href={`https://www.google.com/maps?q=${INSTITUTE_LAT},${INSTITUTE_LNG}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                                >
                                    <MapPin className="w-3 h-3 text-[#E8B84B]" />
                                    Open in Maps
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    )
}
