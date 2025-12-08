'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DynamicFrameLayout } from './ui/dynamic-frame-layout';

// Placeholder frames - using gradient backgrounds as placeholders
// You can replace these with actual video URLs
const immersiveFrames = [
  {
    id: 1,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 2,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 3,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 4,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 5,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 6,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 7,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 8,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
  {
    id: 9,
    video: 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4',
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: '',
    edgeHorizontal: '',
    edgeVertical: '',
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 100,
    isHovered: false,
  },
];

export default function ImmersiveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Blending gradient from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none" />
      
      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-0 w-full h-screen"
      >
        <DynamicFrameLayout
          frames={immersiveFrames}
          className="w-full h-full"
          hoverSize={6}
          gapSize={4}
          showFrames={false}
        />
      </motion.div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

