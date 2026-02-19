'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  Variants,
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Search,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  MapPin,
  Trophy,
  Star,
  CheckCircle2,
  Anchor,
  Compass,
  ShieldCheck,
  PlayCircle,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useUIStore } from '@/lib/store/ui-store'
import { Globe3D, GlobeMarker } from '@/components/ui/globe-3d'

// ─── Animation Variants ────────────────────────────────────────────────────
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

// ─── Scroll reveal wrapper ──────────────────────────────────────────────────
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

// ─── Animated Counter ────────────────────────────────────────────────────────
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

// ─── Label Chip ───────────────────────────────────────────────────────────────
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

// ─── Institute coordinates ──────────────────────────────────────────────────
const INSTITUTE_LAT = 26.2121
const INSTITUTE_LNG = 78.1697

const MAPS_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.524984931472!2d78.1672573102582!3d26.21212628975241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c586ef751279%3A0xda135f145876a6f6!2sParamount%20Coaching%7C%7C%20Best%20Coaching%20in%20Gwalior%20for%20SSC%2FBANK%2FRAILWAY%2FNDA%2FDEFENCE.%20BEST%20CUET%20COACHING%20GWALIOR.!5e0!3m2!1sen!2sin!4v1771532189502!5m2!1sen!2sin`

const globeMarkers: GlobeMarker[] = [
  {
    lat: INSTITUTE_LAT,
    lng: INSTITUTE_LNG,
    src: 'https://api.dicebear.com/7.x/shapes/svg?seed=institute&backgroundColor=E8B84B',
    label: 'Our Institute',
  },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Users, value: 50000, suffix: '+', label: 'Students Enrolled' },
  { icon: Trophy, value: 95, suffix: '%', label: 'Success Rate' },
  { icon: BookOpen, value: 200, suffix: '+', label: 'Expert Courses' },
  { icon: Star, value: 8, suffix: '+', label: 'Years of Excellence' },
]

// ─── Features ────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Anchor, title: 'IMU-CET Specialists', desc: "India's most focused faculty team dedicated exclusively to IMU-CET preparation." },
  { icon: Compass, title: 'Complete PYQs', desc: 'Exhaustive previous year question coverage to maximise your score and confidence.' },
  { icon: ShieldCheck, title: 'Proven Methodology', desc: 'A battle-tested teaching system refined over 8+ years producing first-attempt successes.' },
  { icon: BookOpen, title: 'Live + Recorded Classes', desc: 'Attend live sessions or catch up on recordings — never miss a concept.' },
  { icon: CheckCircle2, title: 'Full Test Series', desc: 'Mock exams modelled on the latest IMU-CET pattern with detailed analytics.' },
  { icon: Trophy, title: 'Toppers Every Year', desc: 'Our students consistently rank in the top 10 at IMU-CET year after year.' },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Arjun M.', score: 'AIR 3', text: "Paramount's faculty and test series were game-changers. I cracked IMU-CET on my very first attempt!" },
  { name: 'Priya S.', score: 'AIR 7', text: 'The recorded classes and PYQ sessions helped me master every section with confidence.' },
  { name: 'Rohit K.', score: 'AIR 12', text: 'The structured approach and personal attention from faculty made all the difference.' },
]

// ─── Marquee items ────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  '✦ IMU-CET Specialists',
  '✦ Complete PYQs Coverage',
  '✦ 50,000+ Students',
  '✦ 95% Success Rate',
  '✦ Expert IMU-CET Faculty',
  '✦ Live & Recorded Classes',
  '✦ Toppers Every Year',
  '✦ Full Mock Test Series',
]

export function HeroSection() {
  const toggleCommandPalette = useUIStore((state) => state.toggleCommandPalette)

  return (
    <div className="overflow-x-hidden bg-[#f7f7f5] dark:bg-gray-950">

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Dark mode background gradients */}
        <div className="absolute inset-0 bg-[#f7f7f5] dark:bg-gray-950 transition-colors duration-300" />
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(232,184,75,0.07) 0%, transparent 60%),
                              radial-gradient(ellipse at 80% 20%, rgba(232,184,75,0.04) 0%, transparent 50%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

          {/* Badge */}
          <ScrollReveal className="flex justify-center mb-10">
            <Chip>India's Premier IMU-CET Coaching</Chip>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal className="text-center max-w-4xl mx-auto mb-6">
            <motion.h1
              variants={FADE_UP}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05]"
            >
              Excellence in{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Education
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

          {/* CTA Buttons */}
          <ScrollReveal className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <motion.div variants={FADE_LEFT}>
              <Button
                size="lg"
                onClick={toggleCommandPalette}
                className="rounded-full px-8 py-6 text-base font-bold"
                style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Courses
                <kbd className="ml-3 hidden sm:inline-flex items-center gap-1 rounded border border-black/20 bg-black/10 px-2 py-0.5 text-xs">
                  ⌘K
                </kbd>
              </Button>
            </motion.div>
            <motion.div variants={FADE_RIGHT}>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-bold border-2 border-[#E8B84B]/60 text-gray-900 dark:text-gray-100 hover:border-[#E8B84B] hover:bg-[#E8B84B]/5"
                >
                  Browse All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </ScrollReveal>

          {/* Two-panel visual section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            {/* LEFT — 3D Globe (no border) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900/60 flex items-center justify-center min-h-[380px] lg:min-h-[460px]"
            >
              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full bg-[#E8B84B]/10 blur-3xl" />
              </div>

              <Globe3D
                markers={globeMarkers}
                className="h-full w-full"
                config={{
                  radius: 2,
                  autoRotateSpeed: 0.4,
                  showAtmosphere: true,
                  atmosphereColor: '#E8B84B',
                  atmosphereIntensity: 0.5,
                  atmosphereBlur: 2.5,
                  enableZoom: false,
                  enablePan: false,
                  ambientIntensity: 0.7,
                  pointLightIntensity: 1.4,
                  backgroundColor: null,
                }}
              />

              {/* Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8B84B] animate-pulse" />
                Drag to explore the globe
              </div>
            </motion.div>

            {/* RIGHT — Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900/60 min-h-[380px] lg:min-h-[460px] flex flex-col"
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shrink-0">
                <MapPin className="w-4 h-4 text-[#E8B84B] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">Find Us</p>
                  <p className="text-xs text-gray-500 leading-tight">Gwalior, Madhya Pradesh</p>
                </div>
              </div>

              {/* Map embed */}
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                className="flex-1 min-h-0 opacity-90"
                style={{ border: 0, filter: 'invert(0.85) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Institute Location"
              />

              {/* Open in Maps link */}
              <a
                href={`https://www.google.com/maps?q=${INSTITUTE_LAT},${INSTITUTE_LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700/60 rounded-full px-3 py-1.5 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <MapPin className="w-3 h-3 text-[#E8B84B]" />
                Open in Maps
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────────── */}
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

      {/* ── MARQUEE TICKER ────────────────────────────────────────────────────── */}
      <div className="py-5 bg-[#E8B84B] overflow-hidden" aria-hidden="true">
        <motion.div
          className="flex gap-14 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map((i) => (
            <span key={i} className="flex gap-14 shrink-0">
              {MARQUEE_ITEMS.map((text) => (
                <span key={text} className="text-sm font-black uppercase tracking-widest text-gray-900">
                  {text}
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── WHY PARAMOUNT ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900" aria-labelledby="why-heading">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <Chip>Why Choose Us</Chip>
            <motion.h2
              id="why-heading"
              variants={FADE_UP}
              className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
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

          <ScrollReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={i % 2 === 0 ? FADE_LEFT : FADE_RIGHT}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group rounded-2xl p-8 border border-gray-100 dark:border-gray-800 bg-[#f7f7f5] dark:bg-gray-800 hover:border-[#E8B84B]/50 hover:bg-white dark:hover:bg-gray-750 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#E8B84B]/10 group-hover:bg-[#E8B84B]/20 mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-[#E8B84B]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#f7f7f5] dark:bg-gray-950" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <Chip>Student Success Stories</Chip>
            <motion.h2
              id="testimonials-heading"
              variants={FADE_UP}
              className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
            >
              Hear from our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Toppers
              </span>
            </motion.h2>
          </ScrollReveal>

          <ScrollReveal className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, score, text }, i) => (
              <motion.div
                key={name}
                variants={FADE_UP}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl p-8 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#E8B84B]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#E8B84B] fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-gray-900 dark:text-white">{name}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', color: '#1a1a1a' }}
                  >
                    {score}
                  </span>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 bg-white dark:bg-gray-900" aria-labelledby="cta-heading">
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
                className="text-base px-10 py-6 rounded-full font-bold border-2 border-[#E8B84B]/60 text-gray-900 dark:text-white hover:border-[#E8B84B] hover:bg-[#E8B84B]/5"
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