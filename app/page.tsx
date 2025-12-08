'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WorksSection from '@/components/WorksSection';
import { AboutSection } from '@/components/about-section';
import { BookCallSection } from '@/components/book-call-section';
import Preloader from '@/components/Preloader';
import Timeline from '@/components/Timeline';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <main className="relative overflow-hidden">
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={() => {
            setPreloaderComplete(true);
            setShowPreloader(false);
          }} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {preloaderComplete && (
          <>
            <Navbar />
            <motion.div
              initial={{ y: '100%', borderRadius: '40px 40px 0 0' }}
              animate={{ y: 0, borderRadius: '0px' }}
              exit={{ y: '-100%' }}
              transition={{ 
                duration: 1, 
                ease: [0.22, 1, 0.36, 1],
                borderRadius: { duration: 0.8, delay: 0.2 }
              }}
              className="relative bg-black overflow-hidden"
              style={{ 
                boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Timeline />
              <HeroSection />
              <ServicesSection />
              <WorksSection />
              <section id="about-section" className="relative bg-black">
                <AboutSection />
              </section>
              <section id="book-call-section" className="relative bg-black">
                <BookCallSection />
              </section>
              <section className="relative bg-black">
                <Footer />
              </section>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
