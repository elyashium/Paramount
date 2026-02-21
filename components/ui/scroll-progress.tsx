'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8B84B] to-[#F3D37A] origin-left z-[100] shadow-[0_0_10px_rgba(232,184,75,0.7)]"
            style={{ scaleX }}
        />
    )
}
