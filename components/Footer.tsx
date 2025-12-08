"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { RandomLetterSwapPingPong } from "./RandomLetterSwap"

const Footer: React.FC = () => {
  const handleScrollToStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!process.env.NEXT_PUBLIC_CALENDLY_URL) {
      e.preventDefault()
      const targetElement = document.querySelector('#start-project') as HTMLElement
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }
  }

  return (
    <footer className="relative w-full z-10 py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-14 lg:p-20 border border-white/10 shadow-2xl relative overflow-hidden"
          style={{ 
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
          }}
          whileHover={{ 
            scale: 1.005,
            transition: { duration: 0.3 }
          }}
        >
          {/* Inner shadow overlay */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.05), inset 0 -2px 4px rgba(0, 0, 0, 0.1)'
          }} />

          {/* Main Footer Content - Grid Layout */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-12 md:mb-16">
            {/* Column 1 - Brand */}
            <motion.div 
              className="flex flex-col gap-6 md:gap-8 items-start"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                x: 4,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              <motion.a 
                href="/" 
                className="brand-name text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[0.1em] font-coolvetica uppercase cursor-pointer inline-block"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <RandomLetterSwapPingPong
                  label="ONCHAIN STUDIO"
                  reverse={false}
                  className="brand-name font-coolvetica tracking-[0.05em] uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                />
              </motion.a>
              <motion.p 
                className="text-white/50 text-sm md:text-base font-light font-sans leading-relaxed"
                whileHover={{ 
                  x: 2,
                  transition: { duration: 0.2 }
                }}
              >
                Bringing creativity onchain.
              </motion.p>
            </motion.div>

            {/* Column 2 - Contact & Social */}
            <motion.div 
              className="flex flex-col gap-6 md:gap-8"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                x: 4,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              <h3 className="text-white text-sm md:text-base font-semibold uppercase tracking-wider font-sans">
                Connect
              </h3>
              <div className="flex flex-col gap-4 md:gap-5">
                <motion.a 
                  href="mailto:hello@onchainstudio.com"
                  className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base font-light font-sans relative"
                  whileHover={{ 
                    x: 4,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white/80 transition-colors duration-300"
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 5,
                      transition: { duration: 0.2 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <svg
                      className="w-full h-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <span>hello@onchainstudio.com</span>
                </motion.a>
                <motion.a 
                  href="https://x.com/onchainstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base font-light font-sans relative"
                  whileHover={{ 
                    x: 4,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white/80 transition-colors duration-300"
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 5,
                      transition: { duration: 0.2 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <svg
                      className="w-full h-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.div>
                  <span>@onchainstudio</span>
                </motion.a>
              </div>
              <div className="flex items-center gap-3 md:gap-4 pt-2">
                <motion.a
                  href="https://t.me/onchainstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 relative"
                  aria-label="Telegram"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    rotateX: 5,
                    y: -2,
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://x.com/onchainstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 relative"
                  aria-label="Twitter"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    rotateX: 5,
                    y: -2,
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="mailto:hello@onchainstudio.com"
                  className="group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 relative"
                  aria-label="Email"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    rotateX: 5,
                    y: -2,
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Column 3 - CTA */}
            <motion.div 
              className="flex flex-col gap-6 md:gap-8"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                x: 4,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              <h3 className="text-white text-sm md:text-base font-semibold uppercase tracking-wider font-sans">
                Get Started
              </h3>
              <div className="flex flex-col gap-4">
                <p className="text-white/60 text-sm md:text-base font-light font-sans leading-relaxed">
                  Ready to bring your vision to life? Let's discuss your next project.
                </p>
                <motion.a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#start-project"}
                  target={process.env.NEXT_PUBLIC_CALENDLY_URL ? "_blank" : undefined}
                  rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? "noopener noreferrer" : undefined}
                  onClick={handleScrollToStart}
                  whileHover={{ 
                    scale: 1.05,
                    y: -4,
                    rotateX: 5,
                    rotateY: 2,
                    boxShadow: '0 20px 40px rgba(255, 255, 255, 0.15)',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold text-sm md:text-base uppercase tracking-wider font-sans hover:bg-white/95 transition-all duration-300 shadow-lg relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span>Book a Meeting</span>
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                    whileHover={{ 
                      x: 2,
                      rotate: 45,
                      transition: { duration: 0.2 }
                    }}
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
              </div>
            </motion.div>
          </div>

          {/* Enhanced Bottom Section - Copyright */}
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 pt-2">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02] rounded-lg -mx-2 -my-1" />
            
            <motion.div
              className="relative flex items-center justify-center gap-2"
              whileHover={{ 
                x: 4,
                transition: { duration: 0.2 }
              }}
            >
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <p className="text-white/50 text-xs md:text-sm font-light font-sans tracking-wide">
                © {new Date().getFullYear()} <span className="text-white/70 font-medium">OnChain Studio</span>
              </p>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30 ml-2" />
              <p className="hidden sm:block text-white/40 text-xs md:text-sm font-light font-sans tracking-wide">
                All rights reserved
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export { Footer }
