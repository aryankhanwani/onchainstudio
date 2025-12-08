'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ShimmerButton from './ShimmerButton';
import { RandomLetterSwapForward, RandomLetterSwapRef, RandomLetterSwapPingPong } from './RandomLetterSwap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const letterSwapRef = useRef<RandomLetterSwapRef>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Hide navbar after scrolling starts (after one scroll)
      setIsVisible(scrollY === 0);
      
      // Change background when scrolled a bit
      setScrolled(scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
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
            className="brand-name text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[0.15em] font-coolvetica uppercase cursor-pointer inline-block"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <RandomLetterSwapPingPong 
              label="ONCHAIN STUDIO" 
              reverse={false}
              className="brand-name font-coolvetica tracking-[0.05em] uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            />
          </motion.a>

          {/* Navigation Links and CTA - Right Side */}
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
            <motion.div
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
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

