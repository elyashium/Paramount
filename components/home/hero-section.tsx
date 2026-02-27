'use client'

import { cn } from '@/lib/utils'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  Variants,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import Image from 'next/image'
import {
  Search,
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  Star,
  CheckCircle2,
  Anchor,
  Compass,
  ShieldCheck,
  MapPin,
  Ship,
  Waves,
  GraduationCap,
  Target,
  Quote,
} from 'lucide-react'
import Link from 'next/link'
import { useUIStore } from '@/lib/store/ui-store'
import dynamic from 'next/dynamic'
import type { GlobeMarker } from '@/components/ui/globe-3d'
import { LogoCarousel } from './logo-carousel'

const Globe3DClient = dynamic(
  () => import('@/components/ui/globe-3d').then((m) => m.Globe3D),
  { ssr: false, loading: () => <div className="h-full w-full" /> }
)

// ─── Animation Variants ────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
const FADE_LEFT: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
}
const FADE_RIGHT: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
}
const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
}
const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

// ─── Scroll reveal wrapper ──────────────────────────────────────────────────
function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} variants={STAGGER} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 55, damping: 16, restDelta: 0.5 })
  const [display, setDisplay] = useState(0)
  useEffect(() => { if (inView) motionVal.set(value) }, [inView, motionVal, value])
  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring])
  return <span ref={ref}>{display >= 1000 ? display.toLocaleString() : display}{suffix}</span>
}

// ─── Label Chip ───────────────────────────────────────────────────────────────
function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      variants={FADE_UP}
      className={cn("inline-block tracking-[0.2em] uppercase text-xs font-bold text-[#E8B84B] mb-4 border border-[#E8B84B]/40 px-3 py-1 rounded-full", className)}
    >
      {children}
    </motion.span>
  )
}

// ─── Section heading helper ───────────────────────────────────────────────────
function SectionHeading({ chip, left, gold, sub }: { chip: string; left: string; gold: string; sub?: string }) {
  return (
    <ScrollReveal className="text-center mb-14">
      <Chip>{chip}</Chip>
      <motion.h2 variants={FADE_UP} className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
        {left}{' '}
        <span style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {gold}
        </span>
      </motion.h2>
      {sub && <motion.p variants={FADE_UP} className="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{sub}</motion.p>}
    </ScrollReveal>
  )
}

// ─── Globe & Map config ──────────────────────────────────────────────────────
const INSTITUTE_LAT = 26.2121
const INSTITUTE_LNG = 78.1697
const MAPS_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.420482470752!2d78.20246891025837!3d26.215523689609803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c1ab3928064b%3A0xa860b2126c08c75!2sPARAMOUNT%20ACADEMY(Best%20Coaching%20for%20NDA%2FCDS%2FIMU%20CET%2FMERCHANT%20NAVY)Best%20NDA%20coaching%20in%20gwalior!5e0!3m2!1sen!2sin!4v1771696424429!5m2!1sen!2sin`
const globeMarkers: GlobeMarker[] = [
  { lat: INSTITUTE_LAT, lng: INSTITUTE_LNG, src: 'https://api.dicebear.com/7.x/shapes/svg?seed=institute&backgroundColor=E8B84B', label: 'Paramount Coaching – Gwalior' },
]

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Users, value: 50000, suffix: '+', label: 'Students Enrolled' },
  { icon: Trophy, value: 95, suffix: '%', label: 'Success Rate' },
  { icon: BookOpen, value: 200, suffix: '+', label: 'Expert Courses' },
  { icon: GraduationCap, value: 8, suffix: '+', label: 'Years of Excellence' },
]

const FEATURES = [
  { icon: Anchor, title: 'IMU-CET Specialists', desc: "India's most focused faculty dedicated exclusively to IMU-CET — DNS, Marine Engineering, GP Rating and more." },
  { icon: Compass, title: 'Complete PYQs Coverage', desc: 'Exhaustive previous year paper sessions to maximise your score and build real exam confidence.' },
  { icon: ShieldCheck, title: 'Proven Methodology', desc: 'A battle-tested 8+ year system that produces consistent first-attempt IMU-CET clearances.' },
  { icon: BookOpen, title: 'Live + Recorded Classes', desc: 'Attend live sessions or revisit recordings — never miss a concept on your journey to the sea.' },
  { icon: CheckCircle2, title: 'Full Mock Test Series', desc: 'IMU-CET pattern mocks with detailed solutions, performance analytics and rank predictions.' },
  { icon: Trophy, title: 'Toppers Every Year', desc: 'Our cadets rank in the national top-10 at IMU-CET consistently — a legacy we are proud of.' },
]

const TESTIMONIALS = [
  { name: 'Arjun M.', rank: 'DNS – BTech', air: 'AIR 3', text: "Paramount's structured IMU-CET program and faculty support helped me achieve AIR 3. Every session felt like sailing with a compass!" },
  { name: 'Priya S.', rank: 'Marine Engg', air: 'AIR 7', text: 'The recorded classes and PYQ drill sessions built my confidence for every section of IMU-CET. Best coaching for merchant navy.' },
  { name: 'Rohit K.', rank: 'GP Rating', air: 'AIR 12', text: 'The personal attention and mock-test analytics were extraordinary. Paramount truly charts the right course for maritime aspirants.' },
]

const MARQUEE_ITEMS = [
  '⚓ IMU-CET Specialists', '🚢 DNS & Marine Engineering', '✦ 50,000+ Students',
  '✦ 95% Success Rate', '⚓ GP Rating Prep', '🧭 Live & Recorded Classes',
  '✦ Toppers Every Year', '🌊 Full Mock Test Series',
]

const COURSE_HIGHLIGHTS = [
  { icon: Ship, label: 'DNS (Deck)', desc: 'Diploma in Nautical Science entry-level prep' },
  { icon: Anchor, label: 'Marine Engineering', desc: 'B.E. Marine Engineering entrance coaching' },
  { icon: Waves, label: 'GP Rating', desc: 'General Purpose Rating fast-track program' },
  { icon: GraduationCap, label: 'IMU-CET', desc: 'Common Entrance Test specialization' },
  { icon: Target, label: 'Sponsorship', desc: 'Company-sponsored cadetship preparation' },
  { icon: Compass, label: 'Personal Guidance', desc: 'One-on-one mentorship for success' },
]

export function HeroSection() {
  const toggleCommandPalette = useUIStore((state) => state.toggleCommandPalette)

  return (
    <div className="overflow-x-hidden bg-[#f7f7f5] dark:bg-gray-950 pb-16 md:pb-0">

      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-[#f7f7f5] dark:bg-gray-950 transition-colors duration-300" />
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(ellipse at 15% 40%, rgba(232,184,75,0.09) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(232,184,75,0.05) 0%, transparent 50%)` }}
        />
        {/* Anchor watermark */}
        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 opacity-[0.025] dark:opacity-[0.04] pointer-events-none select-none text-[20rem] leading-none hidden lg:block">
          ⚓
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 sm:pb-20">

          {/* Mobile Logo */}
          <div className="flex justify-center md:hidden mb-6">
            <ScrollReveal>
              <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex items-center justify-center bg-white/10 p-1 shadow-lg border border-white/20">
                <Image
                  src="/logo.png"
                  alt="Paramount Merchant Navy"
                  width={110}
                  height={110}
                  className="object-cover w-full h-full rounded-full"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-6 sm:mb-10 text-center">
            <ScrollReveal>
              <Chip className="mx-auto">India&apos;s Premier IMU-CET Coaching Institute</Chip>
            </ScrollReveal>
          </div>

          {/* Headline */}
          <div className="text-center max-w-5xl mx-auto mb-5 sm:mb-6 px-2">
            <ScrollReveal>
              <motion.h1
                variants={FADE_UP}
                className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.08] sm:leading-[1.02]"
              >
                Set Sail Towards{' '}
                <br className="hidden sm:block" />
                <span style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Your Maritime Career
                </span>
              </motion.h1>
              <motion.p
                variants={FADE_UP}
                className="mt-5 sm:mt-7 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 text-center"
              >
                India&apos;s most trusted coaching for{' '}
                <span className="font-semibold text-gray-900 dark:text-white">IMU-CET</span> — the gateway to Merchant Navy.
                Expert faculty, proven methodology, and an unmatched{' '}
                <span className="font-semibold text-[#E8B84B]">95% first-attempt success rate</span>.
              </motion.p>
            </ScrollReveal>
          </div>

          {/* CTA Buttons */}
          <ScrollReveal className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-20 px-4 sm:px-0">
            <motion.div variants={FADE_LEFT} className="flex justify-center">
              <Button
                size="lg"
                onClick={toggleCommandPalette}
                className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-bold"
                style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Courses
                <kbd className="ml-3 hidden sm:inline-flex items-center gap-1 rounded border border-black/20 bg-black/10 px-2 py-0.5 text-xs">⌘K</kbd>
              </Button>
            </motion.div>
            <motion.div variants={FADE_RIGHT} className="flex justify-center">
              <Link href="/courses" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-bold border-2 border-[#E8B84B]/60 text-gray-900 dark:text-gray-100 hover:border-[#E8B84B] hover:bg-[#E8B84B]/5"
                >
                  Browse All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </ScrollReveal>

          {/* Course Highlights Grid */}
          <ScrollReveal className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {COURSE_HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={FADE_UP}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center gap-2 rounded-2xl p-3 sm:p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-[#E8B84B]/40 transition-all duration-300 cursor-default group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-[#E8B84B]/10 group-hover:bg-[#E8B84B]/20 transition-colors">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8B84B]" />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-gray-900 dark:text-white leading-tight">{label}</span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 leading-tight hidden sm:block">{desc}</span>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────────── */}
      <div className="bg-gray-900 dark:bg-black py-12 sm:py-16 px-4">
        <ScrollReveal className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map(({ icon: Icon, value, suffix, label }) => (
            <motion.div key={label} variants={SCALE_IN} className="flex flex-col items-center text-center">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 mb-3 text-[#E8B84B]" aria-hidden="true" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tabular-nums">
                <AnimatedCounter value={value} suffix={suffix} />
              </div>
              <div className="mt-2 text-xs text-gray-400 tracking-widest uppercase">{label}</div>
            </motion.div>
          ))}
        </ScrollReveal>
      </div>

      {/* ── MARQUEE TICKER ────────────────────────────────────────────────────── */}
      <div className="py-4 sm:py-5 bg-[#E8B84B] overflow-hidden" aria-hidden="true">
        <motion.div className="flex gap-10 sm:gap-14 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}>
          {[0, 1].map((i) => (
            <span key={i} className="flex gap-10 sm:gap-14 shrink-0">
              {MARQUEE_ITEMS.map((text) => (
                <span key={text} className="text-xs sm:text-sm font-black uppercase tracking-widest text-gray-900">{text}</span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      <LogoCarousel />

      {/* ── WHY PARAMOUNT — CardSpotlight ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 bg-black" aria-labelledby="why-heading">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            chip="Why Choose Us"
            left="The Paramount"
            gold="Difference"
            sub="Everything you need to crack IMU-CET and begin your Merchant Navy career."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
              >
                <CardSpotlight className="h-full rounded-2xl p-7 sm:p-8">
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

      {/* ── TESTIMONIALS — CardSpotlight ──────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 bg-[#0a0a0a]" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto">
          <SectionHeading chip="Cadet Success Stories" left="Hear from our" gold="Top Cadets" />
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map(({ name, rank, air, text }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              >
                <CardSpotlight className="h-full rounded-2xl p-7 sm:p-8 flex flex-col">
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-[#E8B84B] fill-current" />
                      ))}
                    </div>
                    {/* Quote icon */}
                    <Quote className="w-6 h-6 text-[#E8B84B]/40 mb-2" />
                    {/* Text */}
                    <p className="text-sm text-neutral-300 leading-relaxed flex-1 italic">{text}</p>
                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-neutral-800">
                      <div>
                        <span className="text-sm font-black text-white block">{name}</span>
                        <span className="text-xs text-neutral-500">{rank}</span>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
                      >
                        {air}
                      </span>
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER REMOVED ────────────────────────────────────────────── */}

      {/* ── GLOBE + MAP — FULL WIDTH, SEAMLESS, ABOVE FOOTER ─────────────────── */}
      <section className="bg-[#f7f7f5] dark:bg-gray-950 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
          <ScrollReveal>
            <Chip>Find Us</Chip>
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

        {/* Full-width two-panel — NO background, NO border */}
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
            <Globe3DClient
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

            {/* Map embed — right margin added, no outer border */}
            <div className="flex-1 relative overflow-hidden rounded-2xl mx-4 mr-4 sm:mr-6 lg:mr-8 mb-4">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full opacity-90"
                style={{ border: 0, filter: 'invert(0.85) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
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
      </section>

    </div>
  )
}