'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: string;
  title: string;
  sectionId: string;
}

const timelineItems: TimelineItem[] = [
  { id: '1', title: 'WHAT WE DO', sectionId: 'services-section' },
  { id: '2', title: 'WORKS', sectionId: 'works-section' },
  { id: '3', title: 'SHOWCASE', sectionId: 'showcase-section' },
  { id: '4', title: 'ABOUT', sectionId: 'about-section' },
];

export default function Timeline() {
  const [activeSection, setActiveSection] = useState<string>('services-section');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if hero section is still in view
      const heroSection = document.getElementById('hero-section');
      const bookCallSection = document.getElementById('book-call-section');
      
      // Hide timeline if book-call section is in view or below
      if (bookCallSection) {
        const bookCallRect = bookCallSection.getBoundingClientRect();
        const isBookCallVisible = bookCallRect.top < window.innerHeight * 0.7;
        if (isBookCallVisible) {
          setIsVisible(false);
          return;
        }
      }
      
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > window.innerHeight * 0.3;
        setIsVisible(!isHeroVisible);
      } else {
        // If hero section not found, show timeline
        setIsVisible(true);
      }

      const sections = timelineItems.map(item => {
        const element = document.getElementById(item.sectionId);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the section is visible
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const sectionHeight = rect.height;
        
        // Check if section is in viewport
        const isInViewport = sectionTop < viewportHeight && sectionBottom > 0;
        
        // Calculate visibility percentage
        const visibleTop = Math.max(0, -sectionTop);
        const visibleBottom = Math.min(sectionHeight, viewportHeight - sectionTop);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityPercentage = isInViewport ? visibleHeight / sectionHeight : 0;
        
        // Calculate distance from viewport center
        const viewportCenter = viewportHeight / 2;
        const sectionCenter = sectionTop + sectionHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
        
        return {
          id: item.sectionId,
          element,
          top: sectionTop,
          visibilityPercentage,
          distanceFromCenter,
          isInViewport,
        };
      }).filter(Boolean) as Array<{
        id: string;
        element: HTMLElement;
        top: number;
        visibilityPercentage: number;
        distanceFromCenter: number;
        isInViewport: boolean;
      }>;

      // Find the section with highest visibility, or closest to viewport center
      let currentSection = sections[0];
      
      if (sections.length > 0) {
        // First, try to find a section that's significantly visible
        const visibleSections = sections.filter(s => s.visibilityPercentage > 0.3);
        
        if (visibleSections.length > 0) {
          // Among visible sections, pick the one closest to viewport center
          currentSection = visibleSections.reduce((prev, curr) => 
            curr.distanceFromCenter < prev.distanceFromCenter ? curr : prev
          );
        } else {
          // If no section is significantly visible, find the one closest to viewport center
          currentSection = sections.reduce((prev, curr) => 
            curr.distanceFromCenter < prev.distanceFromCenter ? curr : prev
          );
        }
      }

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Immediately set active section for instant feedback
      setActiveSection(sectionId);
      
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update after scroll animation completes (smooth scroll typically takes ~500ms)
      setTimeout(() => {
        // Re-run scroll handler to ensure proper detection
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      }, 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-8 top-3/5 -translate-y-1/2 z-50 hidden lg:block ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Background with blur */}
      <div className="absolute inset-0 -left-4 -right-4 -top-4 -bottom-4 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10" />
      
      <div className="relative flex flex-col items-start gap-12 px-6 py-8">
        {/* Timeline Line - connects all dots */}
        {/* Positioned to connect center of first dot to center of last dot */}
        <div className="absolute left-[40px] top-[44px] h-[204px] w-0.5 bg-white/20" />
        
        {timelineItems.map((item, index) => {
          const isActive = activeSection === item.sectionId;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-center gap-6 cursor-pointer group"
              onClick={() => handleClick(item.sectionId)}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 ml-2">
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-white scale-125'
                      : 'bg-transparent border-white/30 group-hover:border-white/60'
                  }`}
                  animate={{
                    scale: isActive ? 1.25 : 1,
                  }}
                />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 w-4 h-4 rounded-full bg-white"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  )}
              </div>
              
              {/* Title */}
              <motion.div
                className={`font-[var(--font-geist-sans)] text-base font-thin uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-white/40 group-hover:text-white/70'
                }`}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                {item.title}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

