'use client';

import { motion } from 'framer-motion';
import LiquidEther from './LiquidEther';

export default function HeroSection() {

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen bg-black"
    >
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* LiquidEther Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <LiquidEther
            colors={['#ffffff', '#ffffff', '#ffffff']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50 z-10" />
        
        {/* Mobile Layout - Flex Column */}
        <div className="relative z-20 min-h-screen flex flex-col justify-center px-4 py-8 md:hidden">
          {/* Hero Text - First */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <h1 className="font-[var(--font-geist-sans)] text-4xl sm:text-5xl font-thin text-white leading-[1.1] tracking-tight flex flex-col items-start">
              <span className="block uppercase">
                BRINGING
              </span>
              <span className="block uppercase">
                THE CREATIVITY
              </span>
              <span className="block uppercase">
                ONCHAIN
              </span>
            </h1>
          </motion.div>

          {/* Subtext - Second */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="font-[var(--font-geist-sans)] text-sm text-white/80 font-light leading-relaxed text-left">
              We transform founders, products, and ideas into beautiful, cinematic stories that inspire trust, elevate brand presence, and make complex concepts unmistakably clear
            </p>
          </motion.div>

          {/* Video - Third */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xs mx-auto overflow-hidden rounded-2xl"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            >
              <source src="/IMG_0330-1.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

        {/* Desktop Layout - Absolute Positioning */}
        <div className="hidden md:block relative h-screen w-full">
          {/* Subtext - Right Side, Slightly Above Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-8 sm:right-12 lg:right-16 top-[30%] z-20 max-w-lg text-right"
          >
            <p className="font-[var(--font-geist-sans)] text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
              We transform founders, products, and ideas into beautiful, cinematic stories that inspire trust, elevate brand presence, and make complex concepts unmistakably clear
            </p>
          </motion.div>
          
          {/* Hero Content - Left Aligned */}
          <div className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-8 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl"
            >
              {/* Main Heading - Bold, Uppercase, Left Aligned */}
              <h1 className="font-[var(--font-geist-sans)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[1.1] tracking-tight flex flex-col items-start">
                <span className="block uppercase">
                  BRINGING
                </span>
                <span className="block uppercase">
                  THE CREATIVITY
                </span>
                <span className="block uppercase">
                  ONCHAIN
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Video Container - Bottom Right - Responsive Sizes */}
          <div className="absolute bottom-8 right-8 z-30 w-64 h-40 sm:w-80 sm:h-48 md:w-96 md:h-56 lg:w-[28rem] lg:h-[18rem] xl:w-[32rem] xl:h-[20rem] 2xl:w-[40rem] 2xl:h-[25rem] overflow-hidden rounded-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/IMG_0330-1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        
        {/* Scroll Down Indicator - Hidden on mobile */}
        <motion.div
          className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex-col items-center gap-3"
        >
          <motion.p
            className="text-white/60 text-sm font-light tracking-wider uppercase"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-6 h-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
