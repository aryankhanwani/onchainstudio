"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { RandomLetterSwapPingPong } from "./RandomLetterSwap"

const Footer: React.FC = () => {

  return (
    <footer className="relative w-full z-10 py-20 md:py-28 lg:py-32 px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Brand & Tagline */}
        <motion.div 
          className="mb-16 md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a 
            href="/" 
            className="inline-block mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <RandomLetterSwapPingPong
              label="ONCHAIN STUDIO"
              reverse={false}
              className="brand-name font-coolvetica tracking-[0.15em] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
            />
          </motion.a>
          <motion.p 
            className="text-white/60 text-base md:text-lg font-light font-[var(--font-geist-sans)] max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bringing creativity onchain. We transform founders, products, and ideas into beautiful, cinematic stories.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 mb-16 md:mb-20">
          {/* Column 1 - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white text-xs md:text-sm font-medium uppercase tracking-[0.2em] font-[var(--font-geist-sans)] mb-6 md:mb-8">
              Navigation
            </h3>
            <div className="flex flex-col gap-4">
              <motion.a
                href="#works-section"
                className="text-white/70 hover:text-white text-base md:text-lg font-light font-[var(--font-geist-sans)] uppercase tracking-wider transition-colors duration-300 group relative inline-block w-fit"
                whileHover={{ x: 4 }}
              >
                <span className="relative">
                  Work
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </motion.a>
              <motion.a
                href="#about-section"
                className="text-white/70 hover:text-white text-base md:text-lg font-light font-[var(--font-geist-sans)] uppercase tracking-wider transition-colors duration-300 group relative inline-block w-fit"
                whileHover={{ x: 4 }}
              >
                <span className="relative">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </motion.a>
              <motion.a
                href="#services-section"
                className="text-white/70 hover:text-white text-base md:text-lg font-light font-[var(--font-geist-sans)] uppercase tracking-wider transition-colors duration-300 group relative inline-block w-fit"
                whileHover={{ x: 4 }}
              >
                <span className="relative">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2 - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white text-xs md:text-sm font-medium uppercase tracking-[0.2em] font-[var(--font-geist-sans)] mb-6 md:mb-8">
              Connect
            </h3>
            <div className="flex flex-col gap-5 md:gap-6">
              <motion.a
                href="mailto:hello@onchainstudio.com"
                className="text-white/70 hover:text-white text-base md:text-lg font-light font-[var(--font-geist-sans)] transition-colors duration-300 group relative inline-block w-fit"
                whileHover={{ x: 4 }}
              >
                <span className="relative">
                  hello@onchainstudio.com
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </motion.a>
              <motion.a
                href="https://x.com/0xonchainstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white text-base md:text-lg font-light font-[var(--font-geist-sans)] transition-colors duration-300 group relative inline-block w-fit"
                whileHover={{ x: 4 }}
              >
                <span className="relative">
                  @0xonchainstudio
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Column 3 - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-white text-xs md:text-sm font-medium uppercase tracking-[0.2em] font-[var(--font-geist-sans)] mb-6 md:mb-8">
              Let's Talk
            </h3>
            <motion.a
              href="https://calendly.com/rohaan-web3-marketer/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.02,
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-white text-black rounded-full font-medium text-sm md:text-base uppercase tracking-wider font-[var(--font-geist-sans)] hover:bg-white/95 transition-all duration-300 group"
            >
              <span>Book a Meeting</span>
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M5 15L15 5M15 5H5M15 5V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 md:mb-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bottom Section - Social & Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="https://x.com/0xonchainstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://t.me/onchainstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Telegram"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </motion.a>
            <motion.a
              href="mailto:hello@onchainstudio.com"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-white/40 text-xs md:text-sm font-light font-[var(--font-geist-sans)] tracking-wide">
              © {new Date().getFullYear()} OnChain Studio
            </p>
            <span className="hidden md:inline text-white/20">•</span>
            <p className="text-white/40 text-xs md:text-sm font-light font-[var(--font-geist-sans)] tracking-wide">
              All rights reserved
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
