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
    title: 'Motion Graphics',
    videoSrc: '/1080horizontal.m3u8',
    description: 'A stunning showcase of creative excellence',
  },
  {
    id: 2,
    title: 'All in One Ecosystem',
    videoSrc: '/yellow-allinone-ecosystem-v3-portrait.m3u8',
    description: 'Innovative design meets cutting-edge technology',
  },
  {
    id: 3,
    title: 'TOKEN 2049',
    videoSrc: '/IMG_0330-1.m3u8',
    description: 'Pushing boundaries in digital storytelling',
  },
  {
    id: 4,
    title: '1Inch x Yellow Media',
    videoSrc: '/1Inch-x-Yellow-Media.m3u8',
    description: 'Where creativity and strategy converge',
  },
];

const MOBILE_CARD_GAP = 16;
const MOBILE_CARD_INSET = 80; // 5rem total horizontal inset (pl-4 pr-4 + visual padding)

export default function ShowcaseSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const animationSpeed = 2.0;

  const duplicatedProjects = [...showcaseProjects, ...showcaseProjects, ...showcaseProjects];

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsPaused(true);
        baseX.set(0);
        setMobileIndex(0);
      } else {
        setIsPaused(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getItemWidth = () => {
    if (!carouselRef.current) return 0;
    return carouselRef.current.scrollWidth / 3;
  };

  const normalizeX = (x: number) => {
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return x;
    let normalized = x;
    while (normalized > 0) normalized -= itemWidth;
    while (Math.abs(normalized) >= itemWidth) normalized += itemWidth;
    return normalized;
  };

  useAnimationFrame((t, delta) => {
    if (isMobile) return;
    if (isPaused || isDragging || !carouselRef.current) return;
    const moveBy = animationSpeed * (delta / 16);
    const currentX = baseX.get();
    const itemWidth = getItemWidth();
    if (itemWidth === 0) return;
    let newX = normalizeX(currentX - moveBy);
    baseX.set(newX);
  });

  const getMobileCardWidth = () => {
    if (!isMobile) return 0;
    return window.innerWidth - MOBILE_CARD_INSET;
  };

  const getMobileStep = () => {
    return getMobileCardWidth() + MOBILE_CARD_GAP;
  };

  const handlePrev = () => {
    if (!isMobile) return;
    const step = getMobileStep();
    const currentX = baseX.get();
    const itemWidth = getItemWidth();
    if (itemWidth === 0 || step === 0) return;
    let newX = Math.min(0, currentX + step);
    baseX.set(newX);
    setMobileIndex((i) => (i <= 0 ? showcaseProjects.length - 1 : i - 1));
  };

  const handleNext = () => {
    if (!isMobile) return;
    const step = getMobileStep();
    const currentX = baseX.get();
    const itemWidth = getItemWidth();
    if (itemWidth === 0 || step === 0) return;
    let newX = currentX - step;
    newX = normalizeX(newX);
    if (newX > 0) newX = 0;
    baseX.set(newX);
    setMobileIndex((i) => (i >= showcaseProjects.length - 1 ? 0 : i + 1));
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
    const currentX = baseX.get();
    baseX.set(normalizeX(currentX));
    if (isMobile) {
      const step = getMobileStep();
      if (step > 0) {
        const idx = Math.round(-currentX / step) % showcaseProjects.length;
        setMobileIndex((idx + showcaseProjects.length) % showcaseProjects.length);
      }
    }
    setTimeout(() => setIsPaused(false), 100);
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
            {/* Desktop gradient fades */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none" />
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none" />

            {/* Mobile: carousel with padded track so content doesn't sit under buttons */}
            <motion.div
              ref={carouselRef}
              className={`flex scrollbar-hide select-none ${
                isMobile ? 'gap-4 pl-4 pr-4' : 'cursor-grab active:cursor-grabbing gap-6 md:gap-8'
              }`}
              style={{ width: 'max-content', x: baseX }}
              drag={isMobile ? false : 'x'}
              dragConstraints={{ left: -Infinity, right: 0 }}
              dragElastic={0.05}
              dragMomentum={false}
              dragPropagation={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => !isMobile && !isDragging && setIsPaused(true)}
              onMouseLeave={() => !isMobile && !isDragging && setIsPaused(false)}
            >
              {duplicatedProjects.map((project, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group shrink-0 w-[calc(100vw-5rem)] sm:w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[35vw]"
                >
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
                      <HoverVideoPlayer
                        videoSrc={project.videoSrc}
                        className="w-full h-full"
                        muted
                        loop
                        preload="metadata"
                      />
                    </div>
                    <div className="px-1">
                      <h3 className="font-[var(--font-geist-sans)] text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile: controls below carousel */}
            {isMobile && (
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={handlePrev}
                  type="button"
                  className="shrink-0 min-h-[48px] min-w-[48px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 flex items-center justify-center transition-all duration-200 touch-manipulation"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <div className="flex items-center gap-2">
                  {showcaseProjects.map((_, i) => (
                    <span
                      key={i}
                      className={`block rounded-full transition-all duration-200 ${
                        i === mobileIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30'
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  type="button"
                  className="shrink-0 min-h-[48px] min-w-[48px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 flex items-center justify-center transition-all duration-200 touch-manipulation"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

