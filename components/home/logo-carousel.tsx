'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const LOGOS = [
    { src: '/companylogo1.jpeg', alt: 'Company 1' },
    { src: '/companylogo2.jpeg', alt: 'Company 2' },
    { src: '/companylogo3.jpeg', alt: 'Company 3' },
    { src: '/companylogo4.jpeg', alt: 'Company 4' },
    { src: '/companylogo5.jpeg', alt: 'Company 5' },
    { src: '/companylogo6.jpeg', alt: 'Company 6' },
    { src: '/companylogo7.jpeg', alt: 'Company 7' },
    { src: '/companylogo8.jpeg', alt: 'Company 8' },
    { src: '/companylogo9.jpeg', alt: 'Company 9' },
    { src: '/companylogo10.jpeg', alt: 'Company 10' },
]

export function LogoCarousel() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section className="py-20 bg-[#f7f7f5] dark:bg-gray-950 overflow-hidden select-none border-t border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block tracking-[0.2em] uppercase text-[10px] font-bold text-[#E8B84B] mb-4 border border-[#E8B84B]/40 px-3 py-1 rounded-full"
                >
                    Placement Partners
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight"
                >
                    Trusted by Top{' '}
                    <span style={{ background: 'linear-gradient(135deg, #E8B84B 0%, #c9922a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Maritime Companies
                    </span>
                </motion.h2>
            </div>

            <div
                className="relative flex items-center group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <style jsx>{`
          @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-slide-loop {
            display: flex;
            width: max-content;
            animation: slide 40s linear infinite;
            animation-play-state: ${isHovered ? 'paused' : 'running'};
          }
        `}</style>

                <div className="animate-slide-loop flex gap-12 sm:gap-20 items-center whitespace-nowrap px-10">
                    {/* Multiply logos for seamless loop */}
                    {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
                        <div
                            key={`${logo.src}-${index}`}
                            className="relative w-32 h-16 sm:w-40 sm:h-20 transition-all duration-500 hover:scale-110 flex items-center justify-center p-2"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-y-0 left-0 w-24 sm:w-64 bg-gradient-to-r from-[#f7f7f5] dark:from-gray-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 sm:w-64 bg-gradient-to-l from-[#f7f7f5] dark:from-gray-950 to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    )
}
