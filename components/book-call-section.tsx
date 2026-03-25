"use client"

import * as React from "react"
import { motion } from "framer-motion"

function GridBeamBackground() {
  const cols = 20;
  const rows = 12;
  const cellSize = 60;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base: dark navy / deep indigo instead of pure black */}
      <div className="absolute inset-0 bg-[#06081a]" />

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cta-beam-grid" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
            <path d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} fill="none" stroke="rgba(139,92,246,0.07)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="cta-glow-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.12)" />
            <stop offset="60%" stopColor="rgba(139,92,246,0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-beam-grid)" />
        <rect width="100%" height="100%" fill="url(#cta-glow-center)" />
      </svg>

      {/* Animated horizontal beams */}
      {[0.2, 0.45, 0.7].map((pos, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 h-px"
          style={{
            top: `${pos * 100}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 30%, rgba(16,185,129,0.3) 70%, transparent 100%)',
            width: '40%',
          }}
          animate={{ x: ['-40%', '140%'] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'linear', delay: i * 2 }}
        />
      ))}

      {/* Animated vertical beams */}
      {[0.3, 0.6, 0.85].map((pos, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 w-px"
          style={{
            left: `${pos * 100}%`,
            background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.3) 30%, rgba(249,115,22,0.2) 70%, transparent 100%)',
            height: '35%',
          }}
          animate={{ y: ['-35%', '135%'] }}
          transition={{ duration: 6 + i * 1.2, repeat: Infinity, ease: 'linear', delay: 1 + i * 1.8 }}
        />
      ))}

      {/* Glowing intersection nodes */}
      {[
        { x: '25%', y: '30%' }, { x: '50%', y: '50%' }, { x: '75%', y: '35%' },
        { x: '35%', y: '70%' }, { x: '65%', y: '65%' },
      ].map((pos, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ left: pos.x, top: pos.y, background: 'rgb(139,92,246)' }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.5, 1],
            boxShadow: ['0 0 4px rgba(139,92,246,0.2)', '0 0 16px rgba(139,92,246,0.5)', '0 0 4px rgba(139,92,246,0.2)'],
          }}
          transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Vignette — softer so grid stays visible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,8,26,0.6)_100%)]" />
    </div>
  );
}

const BookCallSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden">
      <GridBeamBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-violet-400/60 text-xs sm:text-sm uppercase tracking-[0.3em] font-light mb-6 sm:mb-8"
          >
            Let&apos;s work together
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-5 sm:mb-7 font-sans leading-tight tracking-tight"
          >
            Looking for a Web3
            <br />
            Marketing Team?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-base sm:text-lg md:text-xl text-white/45 font-light mb-10 sm:mb-12 font-sans max-w-2xl mx-auto"
          >
            Six years in Web3. We&apos;ve helped launch and scale some of the most ambitious projects in the space.
          </motion.p>

          <motion.a
            href="https://calendly.com/rohaan-web3-marketer/30min"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-full font-bold text-base sm:text-lg uppercase tracking-wider font-sans transition-all duration-300 hover:shadow-[0_0_50px_rgba(139,92,246,0.25)]"
          >
            <span>Book a Strategy Call</span>
            <motion.svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M5 15L15 5M15 5H5M15 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export { BookCallSection, GridBeamBackground }
