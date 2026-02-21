'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion'
import {
    CheckCircle2,
    Phone,
    Mail,
    Globe,
    Clock,
    Users,
    Trophy,
    BookOpen,
    Star,
    Anchor,
    Compass,
    ShieldCheck,
    ArrowRight,
    Quote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { Carousel, Card, type Card as CardType } from '@/components/ui/apple-cards-carousel'

/* ─── Animation Variants ─────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const FADE_LEFT: Variants = {
    hidden: { opacity: 0, x: -44 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

const FADE_RIGHT: Variants = {
    hidden: { opacity: 0, x: 44 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

const SCALE_IN: Variants = {
    hidden: { opacity: 0, scale: 0.86 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
}

const STAGGER: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
}

/* ─── Animated Counter ───────────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const motionVal = useMotionValue(0)
    const spring = useSpring(motionVal, { stiffness: 55, damping: 16, restDelta: 0.5 })
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (inView) motionVal.set(value)
    }, [inView, motionVal, value])

    useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring])

    return (
        <span ref={ref}>
            {display >= 1000 ? display.toLocaleString() : display}
            {suffix}
        </span>
    )
}

/* ─── Label Chip ─────────────────────────────────────────────────────── */
function Chip({ children }: { children: React.ReactNode }) {
    return (
        <motion.span
            variants={FADE_UP}
            className="inline-block tracking-[0.2em] uppercase text-xs font-bold text-[#E8B84B] mb-4 border border-[#E8B84B]/40 px-3 py-1 rounded-full"
        >
            {children}
        </motion.span>
    )
}

/* ─── Scroll reveal wrapper ──────────────────────────────────────────── */
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

/* ─── Data ───────────────────────────────────────────────────────────── */
const STATS = [
    { icon: Users, value: 10000, suffix: '+', label: 'Students Enrolled' },
    { icon: Trophy, value: 95, suffix: '%', label: 'Success Rate' },
    { icon: Users, value: 15, suffix: '+', label: 'Expert Faculty' },
    { icon: Star, value: 8, suffix: '+', label: 'Years of Excellence' },
]

const FEATURES = [
    {
        icon: Anchor,
        title: 'IMU-CET Specialists',
        desc: "India's most focused faculty team dedicated exclusively to IMU-CET preparation — from DNS to Marine Engineering.",
    },
    {
        icon: Compass,
        title: 'Complete PYQs Coverage',
        desc: 'Exhaustive previous year question coverage in the final sessions to maximise your score and boost confidence.',
    },
    {
        icon: ShieldCheck,
        title: 'Proven Methodology',
        desc: 'A battle-tested teaching system refined over 8+ years that produces consistent first-attempt successes.',
    },
    {
        icon: BookOpen,
        title: 'Live + Recorded Classes',
        desc: 'Attend live sessions or catch up on recordings at your own pace — never miss a concept, ever.',
    },
    {
        icon: CheckCircle2,
        title: 'Full Test Series',
        desc: 'Mock exams modelled on the latest IMU-CET pattern with detailed solutions and performance analytics.',
    },
    {
        icon: Trophy,
        title: 'Toppers Every Year',
        desc: "Our students consistently rank in the top 10 at IMU-CET — a legacy we're proud to continue.",
    },
]

/* ─── Teacher Data ───────────────────────────────────────────────────── */
const TEACHERS: CardType[] = [
    {
        src: '/teacher3.png',
        title: 'Malket Singh',
        category: 'General Knowledge | 8 Years Exp.',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>An expert in General Knowledge with 8 years of invaluable teaching experience.</p>
                <p>Specializes in comprehensive Current Affairs and Maritime GK coverage, ensuring students are unfazed by even the most obscure exam questions.</p>
            </div>
        ),
    },
    {
        src: '/teacher4.png',
        title: 'Goutam Pandey',
        category: 'Aptitude | 8 Years Exp.',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Adept Aptitude faculty bringing 8 years of experience in sharpening students' reasoning and analytical skills.</p>
                <p>Renowned for his time-saving techniques and shortcut methods that give aspirants a critical edge during the exam.</p>
            </div>
        ),
    },
    {
        src: '/teacher5.png',
        title: 'Prashant Nagarch',
        category: 'Communication Skills | 7 Years Exp.',
        className: 'object-[75%_top]',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>A seasoned educator with 7 years of experience specializing in English and Communication Skills.</p>
                <p>Focuses not just on exam grammar and comprehension, but on building the confident communication needed for a successful maritime career and interviews.</p>
            </div>
        ),
    },
    {
        src: '/teacher6.png',
        title: 'Faizan Mansuri',
        category: 'Physics | 5 Years Exp.',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Dedicated Physics expert with 5 years of experience uncomplicating core scientific principles.</p>
                <p>His intuitive breakdown of complex topics empowers students to tackle numerical problems with confidence and precision.</p>
            </div>
        ),
    },
    {
        src: '/teacher7.png',
        title: 'Hirdesh Vyas',
        category: 'English | 5 Years Exp.',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Dynamic English faculty with 5 years of experience helping students master vocabulary, syntax, and comprehension.</p>
                <p>Employs engaging methods that turn language learning into a strategic advantage for maximizing overall scores.</p>
            </div>
        ),
    },
    {
        src: '/teacher8.png',
        title: 'Anand Bhadoriya',
        category: 'Mathematics | 12 Years Exp.',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Veteran Mathematics mentor bringing an impressive 12 years of teaching expertise to the team.</p>
                <p>Masterfully simplifies calculus, algebra, and geometry, establishing strong foundational skills that translate directly into top rankings.</p>
            </div>
        ),
    },
]
export function AboutPage() {


    /* Build carousel items */
    const carouselItems = TEACHERS.map((teacher, i) => (
        <Card key={i} card={teacher} index={i} layout />
    ))

    return (
        <div className="overflow-x-hidden bg-[#f7f7f5] dark:bg-gray-950">

            {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
            <div className="pt-32 pb-12 px-4 text-center">
                <ScrollReveal className="max-w-4xl mx-auto">
                    <Chip>India's Premier IMU-CET Coaching</Chip>
                    <motion.h1
                        variants={FADE_UP}
                        className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1]"
                    >
                        About{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Paramount
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={FADE_UP}
                        className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Seven expert educators. One singular focus — crack IMU-CET in your{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">very first attempt.</span>
                    </motion.p>
                </ScrollReveal>
            </div>

            {/* ── STATS BAR ─────────────────────────────────────────────────── */}
            <div className="bg-gray-900 dark:bg-black py-16 px-4">
                <ScrollReveal className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map(({ icon: Icon, value, suffix, label }) => (
                        <motion.div
                            key={label}
                            variants={SCALE_IN}
                            className="flex flex-col items-center text-center"
                        >
                            <Icon className="w-7 h-7 mb-3 text-[#E8B84B]" aria-hidden="true" />
                            <div className="text-4xl sm:text-5xl font-black text-white tabular-nums">
                                <AnimatedCounter value={value} suffix={suffix} />
                            </div>
                            <div className="mt-2 text-xs text-gray-400 tracking-widest uppercase">{label}</div>
                        </motion.div>
                    ))}
                </ScrollReveal>
            </div>

            {/* ── MEET THE CEO ──────────────────────────────────────────────── */}
            <section className="py-24" aria-labelledby="ceo-heading">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Image Left Column */}
                        <ScrollReveal className="lg:col-span-5 relative">
                            <motion.div variants={FADE_LEFT} className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
                                <Image
                                    src="/teacher2.png"
                                    alt="Ajay Singh Rajput - Founder & CEO"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Bottom Gradient for blending */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 dark:from-gray-950 dark:via-gray-950/20 to-transparent" />
                            </motion.div>
                        </ScrollReveal>

                        {/* Content Right Column */}
                        <ScrollReveal className="lg:col-span-7">
                            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8B84B]/30 bg-[#E8B84B]/10 mb-6">
                                <Trophy className="w-4 h-4 text-[#E8B84B]" />
                                <span className="text-xs font-bold uppercase tracking-widest text-[#E8B84B]">Founder & CEO</span>
                            </motion.div>

                            <motion.h2 variants={FADE_UP} id="ceo-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
                                Meet{' '}
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Ajay Singh Rajput
                                </span>
                            </motion.h2>

                            <motion.p variants={FADE_UP} className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed mb-10">
                                Visionary leader with 15+ years of experience in transforming maritime education. Ajay Singh Rajput founded Paramount with a mission to make precise, high-quality IMU-CET education accessible to every student across India.
                            </motion.p>



                            {/* Quote Block */}
                            <motion.div variants={FADE_UP} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 shadow-xl dark:shadow-none rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                                <Quote className="w-10 h-10 text-[#E8B84B]/30 mb-4" />
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6 italic relative z-10">
                                    "Education is not just about passing exams; it's about building character, fostering discipline, and preparing cadets for life's challenges at sea. At Paramount, we don't just teach syllabus — we shape the future captains and chief engineers of tomorrow."
                                </p>
                                <div className="flex items-center gap-4 z-10 relative">
                                    <div className="w-10 h-10 rounded-full shrink-0" style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)' }} />
                                    <div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Ajay Singh Rajput</div>
                                        <div className="text-xs text-gray-500">Founder & CEO</div>
                                    </div>
                                </div>
                                {/* Abstract gradient glow behind quote */}
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[60px] pointer-events-none" style={{ background: 'rgba(232, 184, 75, 0.1)' }} />
                            </motion.div>

                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── MEET THE TEAM ─────────────────────────────────────────────── */}
            <section className="py-24" aria-labelledby="team-heading">
                <div className="max-w-7xl mx-auto px-4">
                    <ScrollReveal className="text-center mb-4">
                        <Chip>Our Faculty</Chip>
                        <motion.h2
                            id="team-heading"
                            variants={FADE_UP}
                            className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
                        >
                            Meet the{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Team
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={FADE_UP}
                            className="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
                        >
                            Click on any card to learn more about their expertise and background.
                        </motion.p>
                    </ScrollReveal>
                </div>

                {/* Full-width carousel — intentionally bleeds outside padding */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <Carousel items={carouselItems} />
                </motion.div>
            </section>

            {/* ── WHY PARAMOUNT ────────────────────────────────────────────── */}
            <section className="py-24 px-4 bg-black" aria-labelledby="why-heading">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal className="text-center mb-14">
                        <Chip>Why Choose Us</Chip>
                        <motion.h2
                            id="why-heading"
                            variants={FADE_UP}
                            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
                        >
                            The Paramount{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Difference
                            </span>
                        </motion.h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
                            >
                                <CardSpotlight className="h-full rounded-2xl p-7">
                                    <div className="relative z-10">
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#E8B84B]/15 mb-5">
                                            <Icon className="w-5 h-5 text-[#E8B84B]" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-base sm:text-lg font-black text-white mb-3">{title}</h3>
                                        <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
                                    </div>
                                </CardSpotlight>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MARQUEE TICKER ───────────────────────────────────────────── */}
            <div className="py-5 bg-[#E8B84B] overflow-hidden" aria-hidden="true">
                <motion.div
                    className="flex gap-14 whitespace-nowrap"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                >
                    {[0, 1].map((i) => (
                        <span key={i} className="flex gap-14 shrink-0">
                            {[
                                '✦ IMU-CET Specialists',
                                '✦ Complete PYQs Coverage',
                                '✦ 10,000+ Students',
                                '✦ 95% Success Rate',
                                '✦ Expert IMU-CET Faculty',
                                '✦ Live & Recorded Classes',
                            ].map((text) => (
                                <span key={text} className="text-sm font-black uppercase tracking-widest text-gray-900">
                                    {text}
                                </span>
                            ))}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* ── CTA BANNER ───────────────────────────────────────────────── */}
            <section className="py-28 px-4" aria-labelledby="cta-heading">
                <ScrollReveal className="max-w-4xl mx-auto text-center">
                    <Chip>Ready to Begin?</Chip>
                    <motion.h2
                        id="cta-heading"
                        variants={FADE_UP}
                        className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6"
                    >
                        Your IMU-CET journey{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            starts here.
                        </span>
                    </motion.h2>
                    <motion.p
                        variants={FADE_UP}
                        className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
                    >
                        {"Join 10,000+ students who trusted Paramount to crack India's most competitive maritime entrance exam."}
                    </motion.p>
                    <motion.div
                        variants={FADE_UP}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/courses">
                            <Button
                                size="lg"
                                className="text-base px-10 py-6 rounded-full font-bold"
                                style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
                            >
                                Explore Courses
                                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                            </Button>
                        </Link>
                        <Link href="/test-series">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-base px-10 py-6 rounded-full font-bold border-2 border-[#E8B84B]/60 hover:border-[#E8B84B] hover:bg-[#E8B84B]/5"
                            >
                                Free Test Series
                            </Button>
                        </Link>
                    </motion.div>
                </ScrollReveal>
            </section>



        </div>
    )
}
