'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowcaseProject {
  id: number;
  title: string;
  videoSrc: string;
  thumbnailSrc?: string;
  description?: string;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 1,
    title: 'Project One',
    videoSrc: '/1080horizontal.mp4',
    thumbnailSrc: '/IMG_6276.PNG',
    description: 'A stunning showcase of creative excellence',
  },
  {
    id: 2,
    title: 'Project Two',
    videoSrc: '/yellow-allinone-ecosystem-v3-portrait.mp4',
    thumbnailSrc: '/IMG_6276.PNG',
    description: 'Innovative design meets cutting-edge technology',
  },
  {
    id: 3,
    title: 'Project Three',
    videoSrc: '/IMG_0330-1.mp4',
    thumbnailSrc: '/IMG_6276.PNG',
    description: 'Pushing boundaries in digital storytelling',
  },
  {
    id: 4,
    title: 'Project Four',
    videoSrc: '/1Inch x Yellow Media.mp4',
    thumbnailSrc: '/IMG_6276.PNG',
    description: 'Where creativity and strategy converge',
  },
];

export default function ShowcaseSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const animationSpeed = 2.0; // Faster speed - pixels per frame
  
  // Duplicate items for seamless infinite loop
  const duplicatedProjects = [...showcaseProjects, ...showcaseProjects, ...showcaseProjects];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // On mobile, ensure carousel doesn't auto-scroll by resetting position if needed
      if (isMobileView) {
        setIsPaused(true);
        // Reset to start position on mobile
        baseX.set(0);
      } else {
        setIsPaused(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculate the width of one set of items
  const getItemWidth = () => {
    if (!carouselRef.current) return 0;
    return carouselRef.current.scrollWidth / 3;
  };

  // Normalize X position to stay within one set width for seamless looping
  const normalizeX = (x: number) => {
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return x;
    
    // Keep X negative (moving left) and within one set width
    let normalized = x;
    while (normalized > 0) {
      normalized -= itemWidth;
    }
    while (Math.abs(normalized) >= itemWidth) {
      normalized += itemWidth;
    }
    return normalized;
  };

  // Animation frame for continuous scrolling (desktop only)
  useAnimationFrame((t, delta) => {
    // Completely disable auto-scroll on mobile
    if (isMobile) return;
    if (isPaused || isDragging || !carouselRef.current) return;
    
    const moveBy = animationSpeed * (delta / 16); // Normalize to 60fps
    const currentX = baseX.get();
    const itemWidth = getItemWidth();
    
    if (itemWidth === 0) return;
    
    let newX = currentX - moveBy;
    newX = normalizeX(newX);
    
    baseX.set(newX);
  });

  // Get single card width for mobile navigation
  const getCardWidth = () => {
    if (!carouselRef.current || !isMobile) return 0;
    const container = carouselRef.current.parentElement;
    if (!container) return 0;
    // Calculate based on viewport width (90vw + gap)
    return window.innerWidth * 0.9 + 24; // 90vw + gap-6 (24px)
  };

  // Handle arrow navigation (mobile only)
  const handlePrev = () => {
    if (!isMobile) return;
    const cardWidth = getCardWidth();
    const currentX = baseX.get();
    const itemWidth = getItemWidth();
    
    if (itemWidth === 0 || cardWidth === 0) return;
    
    let newX = currentX + cardWidth;
    newX = normalizeX(newX);
    
    // Prevent going beyond start
    if (newX > 0) {
      newX = 0;
    }
    
    baseX.set(newX);
  };

  const handleNext = () => {
    if (!isMobile) return;
    const cardWidth = getCardWidth();
    const currentX = baseX.get();
    const itemWidth = getItemWidth();
    
    if (itemWidth === 0 || cardWidth === 0) return;
    
    let newX = currentX - cardWidth;
    newX = normalizeX(newX);
    
    baseX.set(newX);
  };

  // Handle drag
  const handleDragStart = () => {
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleDrag = (event: any, info: any) => {
    const currentX = baseX.get();
    const itemWidth = getItemWidth();
    
    if (itemWidth === 0) return;
    
    // Normalize current position
    const normalizedCurrentX = normalizeX(currentX);
    
    // Only allow dragging left (negative direction)
    // If trying to drag right (positive delta.x), check if we're at the start
    if (info.delta.x > 0) {
      // If we're at or near the start (x >= -10 for small tolerance), prevent right drag
      if (normalizedCurrentX >= -10) {
        return; // Prevent dragging right at start
      }
    }
    
    // Smooth drag by directly updating with delta
    let newX = currentX + info.delta.x;
    
    // Normalize to maintain seamless loop
    newX = normalizeX(newX);
    
    // Prevent dragging beyond the start (x > 0)
    if (newX > 0) {
      newX = 0;
    }
    
    baseX.set(newX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Normalize position after drag
    const currentX = baseX.get();
    baseX.set(normalizeX(currentX));
    // Resume auto-scroll
    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  };

  return (
    <section id="showcase-section" className="relative bg-black">
      <div className="relative w-full overflow-hidden bg-black">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          {/* Title Section */}
          <div className="w-full mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-geist-sans)] text-2xl sm:text-3xl md:text-5xl font-medium text-white leading-[1.1] tracking-tight mb-6 md:mb-8"
            >
              SHOWCASE
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-geist-sans)] text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl"
            >
              Explore our portfolio of exceptional projects that demonstrate our creative vision and technical expertise.
            </motion.p>
          </div>

          {/* Infinite Carousel */}
          <div className="relative w-full overflow-hidden mb-12 md:mb-16">
            {/* Left gradient fade - hidden on mobile */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none" />
            
            {/* Right gradient fade - hidden on mobile */}
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none" />
            
            {/* Mobile Arrow Buttons */}
            {isMobile && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
            
            <motion.div
              ref={carouselRef}
              className={`flex gap-6 md:gap-8 scrollbar-hide select-none ${
                isMobile ? '' : 'cursor-grab active:cursor-grabbing'
              }`}
              style={{ 
                width: 'max-content',
                x: baseX,
              }}
              drag={isMobile ? false : "x"}
              dragConstraints={{ left: -Infinity, right: 0 }}
              dragElastic={0.05}
              dragMomentum={false}
              dragPropagation={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => {
                if (!isMobile && !isDragging) {
                  setIsPaused(true);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile && !isDragging) {
                  setIsPaused(false);
                }
              }}
            >
              {duplicatedProjects.map((project, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex-shrink-0 w-[90vw] sm:w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[35vw]"
                >
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
                      <HoverVideoPlayer
                        videoSrc={project.videoSrc}
                        thumbnailSrc={project.thumbnailSrc}
                        className="w-full h-full"
                        muted
                        loop
                        preload="metadata"
                      />
                    </div>
                    <div className="px-1">
                      <h3 className="font-[var(--font-geist-sans)] text-xl md:text-2xl lg:text-3xl font-light text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

