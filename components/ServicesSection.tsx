'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidEther from './LiquidEther';

interface Service {
  id: number;
  name: string;
  description: string;
  details: string;
  image: string; // Placeholder - you can replace with actual image URLs
}

const services: Service[] = [
  {
    id: 1,
    name: 'Founder Story & Brand Films',
    description: 'A cinematic introduction to your story, your journey, and your mission. We bring out the clarity, confidence, and authenticity that only a well-crafted founder narrative can deliver.',
    details: '',
    image: '/IMG_6276.PNG', // Replace with actual image
  },
  {
    id: 2,
    name: 'Podcast Production',
    description: 'From multi-camera setups to studio-grade audio and thoughtful editing, we handle your entire podcast experience end-to-end. You speak. We shape it into content that feels polished and effortless.',
    details: '',
    image: '/bitget-podcast.png', // Replace with actual image
  },
  {
    id: 3,
    name: 'Event Glimpses',
    description: 'Moments matter. We capture the energy, emotion, and essence of your event with elegance and speed. Your community should feel like they were there.',
    details: '',
    image: '/IMG_6276.PNG', // Replace with actual image
  },
  {
    id: 4,
    name: 'Explainers and Motion Graphics',
    description: 'Complex products deserve simple, beautiful storytelling. We use clean visuals, human-focused motion design, and refined narration to make your technology easy to understand.',
    details: '',
    image: '/IMG_6276.PNG', // Replace with actual image
  },
  {
    id: 5,
    name: 'Talking Heads and Interviews',
    description: 'Honest, sharp, founder-led videos that communicate updates, insights, and product messages with authority and personality.',
    details: '',
    image: '/IMG_6276.PNG', // Replace with actual image
  },
  {
    id: 6,
    name: 'Social-First Editing',
    description: 'Short-form content designed to stop the scroll. Premium formatting, platform-specific cuts, and sharp pacing that drives attention across X, Instagram, TikTok, and YouTube Shorts.',
    details: '',
    image: '/IMG_6276.PNG', // Replace with actual image
  },
];

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<string>(services[0].image);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleServiceHover = useCallback((serviceId: number) => {
    // Clear any pending timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    setHoveredService(serviceId);
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setCurrentImage(service.image);
    }
  }, []);

  const handleServiceLeave = useCallback(() => {
    // Debounce the leave handler to prevent rapid state changes
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredService(null);
      setCurrentImage(services[0].image);
    }, 50);
  }, []);

  return (
    <section id="services-section" className="relative min-h-screen bg-black pt-16 md:pt-24 lg:pt-32">
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* LiquidEther Background */}
        <div className="absolute inset-0 w-full h-full z-0" style={{ willChange: 'transform' }}>
          <LiquidEther
            colors={['#ffffff', '#ffffff', '#ffffff']}
            mouseForce={hoveredService ? 10 : 20}
            cursorSize={hoveredService ? 80 : 100}
            isViscous={false}
            viscous={30}
            iterationsViscous={hoveredService ? 24 : 32}
            iterationsPoisson={hoveredService ? 24 : 32}
            resolution={hoveredService ? 0.4 : 0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={hoveredService ? 0.3 : 0.5}
            autoIntensity={hoveredService ? 1.5 : 2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 min-h-screen flex flex-col md:flex-row">
          {/* Left Side - Title and Image (Top Left) */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 pt-12 md:pt-16">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-geist-sans)] text-3xl sm:text-4xl md:text-5xl font-thin text-white leading-[1.1] tracking-tight mb-6 md:mb-8"
            >
              WHAT WE DO
            </motion.h2>

            {/* Image Container */}
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10">
              <AnimatePresence>
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt="Service"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    // Hide image on error, gradient background will show
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Services List */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col items-start px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => handleServiceHover(service.id)}
                onMouseLeave={handleServiceLeave}
                className="group cursor-pointer w-full"
                style={{ willChange: 'transform' }}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 pb-8 md:pb-12 pt-8 md:pt-12 border-b border-white/20 transition-all duration-300 group-hover:border-white/40 items-start">
                  {/* Left Column - Service Title */}
                  <div className="w-full md:w-2/5 lg:w-2/5 flex-shrink-0">
                    <h3 className="font-[var(--font-geist-sans)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
                      {service.name}
                    </h3>
                  </div>
                  
                  {/* Right Column - Service Description */}
                  <div className="w-full md:w-3/5 lg:w-3/5">
                    <p className="font-[var(--font-geist-sans)] text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

