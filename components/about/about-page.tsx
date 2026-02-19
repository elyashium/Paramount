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
    { icon: Users, value: 50000, suffix: '+', label: 'Students Enrolled' },
    { icon: Trophy, value: 95, suffix: '%', label: 'Success Rate' },
    { icon: BookOpen, value: 200, suffix: '+', label: 'Expert Courses' },
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

/* ─── Teacher Data (images to be filled in later) ───────────────────── */
const TEACHERS: CardType[] = [
    {
        src: '/teachers/teacher-1.jpg',
        title: 'Rahul Sharma',
        category: 'Navigation & Seamanship',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Expert in Navigation and Seamanship with over 10 years of teaching experience for IMU-CET aspirants.</p>
                <p>Specialises in helping students master celestial navigation, chart work, and Rule of the Road topics that feature heavily in the exam.</p>
            </div>
        ),
    },
    {
        src: '/teachers/teacher-2.jpg',
        title: 'Amit Verma',
        category: 'Marine Engineering',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Marine Engineering faculty with deep expertise in thermodynamics, fluid mechanics, and marine diesel engines.</p>
                <p>Known for simplifying complex engineering concepts into easy-to-remember frameworks for exam success.</p>
            </div>
        ),
    },
    {
        src: '/teachers/teacher-3.jpg',
        title: 'Priya Singh',
        category: 'English & Aptitude',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Dedicated English and Aptitude faculty who has helped thousands of students improve their verbal and reasoning scores.</p>
                <p>Her signature speed-techniques for comprehension and vocabulary have become a Paramount trademark.</p>
            </div>
        ),
    },
    {
        src: '/teachers/teacher-4.jpg',
        title: 'Vikram Nair',
        category: 'Physics & Mathematics',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Physics and Mathematics expert who makes problem-solving intuitive for every student regardless of their background.</p>
                <p>Specialises in building strong foundations that consistently translate to high scores in the science section.</p>
            </div>
        ),
    },
    {
        src: '/teachers/teacher-5.jpg',
        title: 'Gurpreet Singh',
        category: 'General Knowledge',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Covers Current Affairs, Maritime GK, and logical reasoning — sections that are often underestimated but crucial for a top score.</p>
                <p>His daily capsule sessions are among the most popular among Paramount students.</p>
            </div>
        ),
    },
    {
        src: '/teachers/teacher-6.jpg',
        title: 'Deepak Yadav',
        category: 'Chemistry & Biology',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Chemistry and Biology faculty who brings 8+ years of coaching experience to the Paramount team.</p>
                <p>Known for memory-based techniques that help students retain large amounts of factual information under exam pressure.</p>
            </div>
        ),
    },
    {
        src: '/teachers/teacher-7.jpg',
        title: 'Maninder Kaur',
        category: 'Quantitative Ability',
        content: (
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                <p>Quantitative Ability coach focused on building speed and accuracy in arithmetic, algebra, and data interpretation.</p>
                <p>Her shortcut-heavy approach has shaved precious minutes off students&apos; paper-solving time, boosting overall scores.</p>
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
                                '✦ 50,000+ Students',
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
                        {"Join 50,000+ students who trusted Paramount to crack India's most competitive maritime entrance exam."}
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
