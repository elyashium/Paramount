'use client'

import React, { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'

const Globe3DClient = dynamic(
    () => import('@/components/ui/globe-3d').then((m) => m.Globe3D),
    { ssr: false, loading: () => <div className="h-full w-full" /> }
)
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { contactFormSchema } from '@/lib/validations/contact'

const EASE = [0.22, 1, 0.36, 1] as const

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const STAGGER: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-20px' })
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

const WhatsappIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
)

const globeMarkers = [
    { lat: 26.2121, lng: 78.1697, src: '/logo.png', size: 0.08, label: 'Gwalior' },
]

const INSTITUTE_LAT = 26.2121
const INSTITUTE_LNG = 78.1697
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.420482470752!2d78.20246891025837!3d26.215523689609803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c1ab3928064b%3A0xa860b2126c08c75!2sPARAMOUNT%20ACADEMY(Best%20Coaching%20for%20NDA%2FCDS%2FIMU%20CET%2FMERCHANT%20NAVY)Best%20NDA%20coaching%20in%20gwalior!5e0!3m2!1sen!2sin!4v1771696424429!5m2!1sen!2sin'

export function ContactPage() {
    const supabase = createClient()
    const [submitting, setSubmitting] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const fd = new FormData(e.currentTarget)
            const raw = {
                firstName: fd.get('firstName') as string,
                lastName: fd.get('lastName') as string,
                email: fd.get('email') as string,
                mobile: fd.get('mobile') as string,
                fatherMobile: fd.get('fatherMobile') as string,
                dob: fd.get('dob') as string,
                gender: fd.get('gender') as string,
                schoolName: fd.get('schoolName') as string,
                board: fd.get('board') as string,
                currentClass: fd.get('currentClass') as string,
                address: fd.get('address') as string,
                city: fd.get('city') as string,
                pincode: fd.get('pincode') as string,
                course: fd.get('course') as string,
            }

            // ─── Zod Validation ───────────────────────────────────────
            const result = contactFormSchema.safeParse(raw)
            if (!result.success) {
                const firstError = result.error.errors[0]
                toast.error(`${firstError.path[0]}: ${firstError.message}`)
                setSubmitting(false)
                return
            }

            const data = result.data

            // Format into a readable message string
            const message = [
                `Course Target: ${data.course}`,
                `DOB: ${data.dob}`,
                `Gender: ${data.gender}`,
                `School: ${data.schoolName}`,
                `Board: ${data.board}`,
                `Class: ${data.currentClass}`,
                `Father's Mobile: ${data.fatherMobile}`,
                `Address: ${data.address}, ${data.city}, ${data.pincode}`
            ].join('\n')

            const { error } = await supabase.from('contact_messages').insert([{
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.mobile,
                subject: data.course,
                message,
            }])

            if (error) throw error

            toast.success("Application submitted! We'll contact you within 24 hours.")
                ; (e.target as HTMLFormElement).reset()
        } catch (error: any) {
            console.error('Submission error:', error)
            toast.error(error.message || "Failed to submit application. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f7f7f5] dark:bg-gray-950 text-gray-900 dark:text-white font-sans selection:bg-[#E8B84B]/30 transition-colors duration-300 relative overflow-x-hidden pb-16">

            {/* ── BACKGROUND GLOW LAYER ─────────────────────────────────────── */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30 dark:opacity-40">
                <div className="w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E8B84B]/20 via-[#E8B84B]/0 to-transparent blur-3xl rounded-full" />
            </div>

            {/* ── VERTICAL FLOATING SOCIAL DOCK ─────────────────────────────── */}
            <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 p-3 rounded-[2rem] border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <a href="https://youtube.com/@paramountmerchantnavy?si=Iy15i9xc1LhWCNOE" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-all group relative">
                    <Youtube className="w-5 h-5" />
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">YouTube</span>
                </a>
                <a href="https://whatsapp.com/channel/0029Va4uagf3QxS4ZymMrc2u" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-all group relative">
                    <WhatsappIcon className="w-5 h-5" />
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">WhatsApp</span>
                </a>
                <a href="https://t.me/Paramountimu" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-all group relative">
                    <Send className="w-5 h-5" />
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Telegram</span>
                </a>
                <a href="https://www.instagram.com/paramountmerchantnavy?igsh=ajgwdXY1cHAxNWp5" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-all group relative">
                    <Instagram className="w-5 h-5" />
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Instagram</span>
                </a>
            </div>

            <div className="relative z-10 w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-24 pt-28 pb-10">
                <ScrollReveal className="w-full flex justify-between items-end mb-6">
                    <div>
                        <motion.h1 variants={FADE_UP} className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-4">
                            Join <span style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Paramount</span>
                        </motion.h1>
                        <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#E8B84B]" /> +91 98765 43210</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700 hidden sm:block" />
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#E8B84B]" /> info@paramountmn.com</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700 hidden sm:block" />
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#E8B84B]" /> Mon – Sat: 8AM – 8PM</span>
                        </motion.div>
                    </div>
                </ScrollReveal>

                {/* ── MEGA FORM (FULL WIDTH GRID, NO BORDERS) ─────────────────── */}
                <ScrollReveal className="w-full mb-16">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 w-full shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/50 dark:border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">

                                {/* Row 1: Student Details */}
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="firstName" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">First Name *</Label>
                                    <Input id="firstName" name="firstName" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="lastName" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Last Name *</Label>
                                    <Input id="lastName" name="lastName" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="dob" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">DOB *</Label>
                                    <Input id="dob" name="dob" type="date" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B] text-gray-500 dark:text-gray-400" required />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="gender" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Gender *</Label>
                                    <select id="gender" name="gender" defaultValue="" className="w-full h-11 rounded-md bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B] shadow-inner text-gray-900 dark:text-gray-300" required>
                                        <option value="" disabled>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                {/* Row 2: School & Board Details */}
                                <div className="space-y-1 col-span-1 lg:col-span-2">
                                    <Label htmlFor="schoolName" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">School Name *</Label>
                                    <Input id="schoolName" name="schoolName" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="board" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Board *</Label>
                                    <select id="board" name="board" defaultValue="" className="w-full h-11 rounded-md bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B] shadow-inner text-gray-900 dark:text-gray-300" required>
                                        <option value="" disabled>Select Board</option>
                                        <option value="cbse">CBSE</option>
                                        <option value="icse">ICSE</option>
                                        <option value="state">State</option>
                                    </select>
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="currentClass" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Class *</Label>
                                    <select id="currentClass" name="currentClass" defaultValue="" className="w-full h-11 rounded-md bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B] shadow-inner text-gray-900 dark:text-gray-300" required>
                                        <option value="" disabled>Current Class</option>
                                        <option value="11">11th Std</option>
                                        <option value="12">12th Std</option>
                                        <option value="passed">12th Passed</option>
                                    </select>
                                </div>

                                {/* Row 3: Contact & Parents */}
                                <div className="space-y-1 col-span-1 lg:col-span-2">
                                    <Label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Email Address *</Label>
                                    <Input id="email" name="email" type="email" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="mobile" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Mobile *</Label>
                                    <Input id="mobile" name="mobile" type="tel" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="fatherMobile" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Father's Mobile *</Label>
                                    <Input id="fatherMobile" name="fatherMobile" type="tel" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>

                                {/* Row 4: Address */}
                                <div className="space-y-1 col-span-1 lg:col-span-4">
                                    <Label htmlFor="address" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Full Address *</Label>
                                    <Input id="address" name="address" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>

                                {/* Row 5: Address Parts & Course Validation */}
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="city" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">City *</Label>
                                    <Input id="city" name="city" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>
                                <div className="space-y-1 col-span-1">
                                    <Label htmlFor="pincode" className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">Pincode *</Label>
                                    <Input id="pincode" name="pincode" className="bg-white/50 dark:bg-black/40 border-0 ring-1 ring-gray-200 dark:ring-white/10 h-11 shadow-inner focus-visible:ring-[#E8B84B]" required />
                                </div>
                                <div className="space-y-1 col-span-1 lg:col-span-2">
                                    <Label htmlFor="course" className="text-xs uppercase tracking-wider text-[#E8B84B] font-black ml-1">Course Target *</Label>
                                    <select id="course" name="course" defaultValue="" className="w-full h-11 rounded-md bg-[#E8B84B]/10 dark:bg-[#E8B84B]/5 border-0 ring-1 ring-[#E8B84B]/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B] font-semibold text-gray-900 dark:text-white" required>
                                        <option value="" disabled>Select Target Program</option>
                                        <option value="imu_cet">IMU-CET Coaching</option>
                                        <option value="sponsorship">Sponsorship Preparation</option>
                                        <option value="english">Spoken English</option>
                                        <option value="combo">IMU-CET + Sponsorship Combo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <p className="text-xs text-gray-500 hidden md:block">By submitting, you agree to our terms and conditions. We typically respond within 24 hours.</p>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={submitting}
                                    className="w-full md:w-auto rounded-full px-12 h-12 text-sm uppercase tracking-wider font-extrabold hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(232,184,75,0.4)]"
                                    style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </ScrollReveal>

                {/* ── MAP & GLOBE (Seamless integrated layout underneath) ──────── */}
                <ScrollReveal className="w-full mt-4 flex justify-between items-end mb-6">
                    <div>
                        <motion.h2 variants={FADE_UP} className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-2">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300">Headquarters</span>
                        </motion.h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full" style={{ minHeight: '400px' }}>

                    {/* Map Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="relative overflow-hidden rounded-[2rem] w-full"
                        style={{ minHeight: '380px' }}
                    >
                        <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
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
                            <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
                                <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">Paramount Institute</p>
                                <p className="text-xs text-gray-500 leading-tight flex items-center gap-1 mt-1"><MapPin className="w-3 h-3 text-[#E8B84B]" /> Gwalior, MP</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Globe Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                        className="relative overflow-hidden rounded-[2rem] block h-full min-h-[400px]"
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                            <div className="w-[300px] h-[300px] rounded-full bg-[#E8B84B]/10 blur-[60px]" />
                        </div>
                        <div className="absolute inset-0 z-10 scale-[1.1]">
                            <Globe3DClient
                                markers={globeMarkers}
                                className="h-full w-full"
                                config={{ radius: 2.2, autoRotateSpeed: 0.4, showAtmosphere: false, enableZoom: false, enablePan: false, ambientIntensity: 0.8, pointLightIntensity: 1.5, backgroundColor: null }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}
