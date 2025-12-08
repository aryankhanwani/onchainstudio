'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShimmerButton from './ShimmerButton';
import { RandomLetterSwapForward, RandomLetterSwapRef, RandomLetterSwapPingPong } from './RandomLetterSwap';
import { useLenis } from './SmoothScroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const letterSwapRef = useRef<RandomLetterSwapRef>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      // Hide navbar after scrolling starts (after one scroll)
      setIsVisible(scroll === 0);
      
      // Change background when scrolled a bit
      setScrolled(scroll > 20);
    };
    
    lenis.on('scroll', handleScroll);
    
    // Initial check
    handleScroll({ scroll: lenis.scroll, limit: lenis.limit });
    
    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);

  const navItems = [
    { label: 'Work', href: '#works-section' },
    { label: 'About', href: '#about-section' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all rounded-full duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.a
            href="/"
            className="brand-name text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-[0.15em] font-coolvetica uppercase cursor-pointer inline-block"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <RandomLetterSwapPingPong 
              label="ONCHAIN STUDIO" 
              reverse={false}
              className="brand-name font-coolvetica tracking-[0.15em] uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            />
          </motion.a>

          {/* Navigation Links and CTA - Right Side (Desktop) */}
          <div className="hidden md:flex items-center gap-12">
            {/* Navigation Links */}
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative text-white/60 hover:text-white/90 text-base sm:text-lg font-light tracking-wider transition-colors uppercase group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            
            {/* Shimmer CTA Button */}
            <motion.a
              href="https://calendly.com/rohaan-web3-marketer/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <ShimmerButton
                shimmerColor="#00D9FF"
                background="rgba(255, 255, 255, 1)"
                borderRadius="100px"
                className="px-10 py-4"
                onMouseEnter={() => letterSwapRef.current?.hoverStart()}
                onMouseLeave={() => letterSwapRef.current?.hoverEnd()}
              >
                <span className="relative z-10 tracking-wider uppercase text-base sm:text-lg font-light">
                  <RandomLetterSwapForward ref={letterSwapRef} label="Let's Talk" reverse={false} />
                </span>
              </ShimmerButton>
            </motion.a>
          </div>

          {/* Hamburger Menu Button (Mobile & Tablet) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 z-50 relative"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-px bg-white transition-all"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-white transition-all"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-white transition-all"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Centered Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Centered Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center gap-8 px-6">
                {/* Navigation Links */}
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="text-white text-2xl sm:text-3xl font-light tracking-wider uppercase hover:text-white/80 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* CTA Button */}
                <motion.a
                  href="https://calendly.com/rohaan-web3-marketer/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                  className="mt-4"
                >
                  <ShimmerButton
                    shimmerColor="#00D9FF"
                    background="rgba(255, 255, 255, 1)"
                    borderRadius="100px"
                    className="px-10 py-4"
                  >
                    <span className="relative z-10 tracking-wider uppercase text-base sm:text-lg font-light">
                      Let's Talk
                    </span>
                  </ShimmerButton>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

