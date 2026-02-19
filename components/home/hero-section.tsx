'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Search, ArrowRight, BookOpen, Users, Award, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useUIStore } from '@/lib/store/ui-store'
import { Globe3D, GlobeMarker } from '@/components/ui/globe-3d' // adjust path to wherever you placed the Globe3D component

// ─── Your institute's coordinates ──────────────────────────────────────────
// Replace with the actual lat/lng of your coaching institute
const INSTITUTE_LAT = 28.6139
const INSTITUTE_LNG = 77.209

// Google Maps embed URL — replace the `q=` param with your institute's address or coordinates
// Get your embed URL from: https://www.google.com/maps/embed → Share → Embed a map
const MAPS_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.524984931472!2d78.1672573102582!3d26.21212628975241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c586ef751279%3A0xda135f145876a6f6!2sParamount%20Coaching%7C%7C%20Best%20Coaching%20in%20Gwalior%20for%20SSC%2FBANK%2FRAILWAY%2FNDA%2FDEFENCE.%20BEST%20CUET%20COACHING%20GWALIOR.!5e0!3m2!1sen!2sin!4v1771532189502!5m2!1sen!2sin`

// The marker shown on the globe — pointing to India
const globeMarkers: GlobeMarker[] = [
  {
    lat: INSTITUTE_LAT,
    lng: INSTITUTE_LNG,
    // Using a simple colored dot as the marker image.
    // Replace with your institute's logo URL if you have one.
    src: 'https://api.dicebear.com/7.x/shapes/svg?seed=institute&backgroundColor=ef4444',
    label: 'Our Institute',
  },
]

export function HeroSection() {
  const toggleCommandPalette = useUIStore((state) => state.toggleCommandPalette)

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

      {/* Subtle star-like noise texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        {/* Badge */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium tracking-wide">
            <Award className="w-3.5 h-3.5" />
            India&apos;s Premier Coaching Institute
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-center text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Excellence in{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Education
          </span>
        </motion.h1>

        <motion.p
          className="text-center text-lg text-slate-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Achieve your dreams with our comprehensive courses, expert faculty, and
          proven teaching methodology. Join thousands of successful students.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={toggleCommandPalette}
            className="rounded-full px-8 py-6 text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Courses
            <kbd className="ml-3 hidden sm:inline-flex items-center gap-1 rounded border border-white/20 bg-white/10 px-2 py-0.5 text-xs">
              ⌘K
            </kbd>
          </Button>
          <Link href="/courses">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base border-slate-600 text-slate-200 hover:bg-slate-800"
            >
              Browse All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* ── Two-panel visual section ─────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* LEFT — 3-D Globe */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center min-h-[380px] lg:min-h-[460px]">
            {/* Subtle glow behind the globe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-indigo-600/10 blur-3xl" />
            </div>

            <Globe3D
              markers={globeMarkers}
              className="h-full w-full"
              config={{
                radius: 2,
                autoRotateSpeed: 0.4,
                showAtmosphere: true,
                atmosphereColor: '#6366f1',
                atmosphereIntensity: 0.6,
                atmosphereBlur: 2.5,
                enableZoom: false,
                enablePan: false,
                ambientIntensity: 0.7,
                pointLightIntensity: 1.4,
                backgroundColor: null,
              }}
            />

            {/* Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-700/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Drag to explore the globe
            </div>
          </div>

          {/* RIGHT — Google Maps cutout */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm min-h-[380px] lg:min-h-[460px] flex flex-col">
            {/* Header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm shrink-0">
              <MapPin className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-200 leading-tight">Find Us</p>
                <p className="text-xs text-slate-500 leading-tight">New Delhi, India</p>
              </div>
            </div>

            {/* Map embed — replace MAPS_EMBED_URL with your actual embed URL from Google Maps */}
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              className="flex-1 min-h-0 grayscale contrast-[1.1] opacity-90"
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
              className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 border border-slate-700/60 rounded-full px-3 py-1.5 backdrop-blur-sm hover:bg-slate-800 transition-colors"
            >
              <MapPin className="w-3 h-3 text-red-400" />
              Open in Maps
            </a>
          </div>
        </motion.div>

        {/* ── Stats row ─────────────────────────────────────────────────────── */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { icon: Users, color: 'text-indigo-400', value: '50,000+', label: 'Active Students' },
            { icon: BookOpen, color: 'text-purple-400', value: '200+', label: 'Expert Courses' },
            { icon: Award, color: 'text-emerald-400', value: '95%', label: 'Success Rate' },
          ].map(({ icon: Icon, color, value, label }) => (
            <div
              key={label}
              className="bg-slate-900/50 border border-slate-700/40 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4"
            >
              <div className={`p-2.5 rounded-xl bg-slate-800 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white leading-tight">{value}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}