'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BGPattern } from './ui/bg-pattern';

const NODES = [
  { x: 250, y: 250, label: '', r: 5 },
  { x: 170, y: 160, label: 'Strategy', r: 4 },
  { x: 340, y: 140, label: 'Growth', r: 4 },
  { x: 380, y: 270, label: 'Launch', r: 4 },
  { x: 300, y: 380, label: 'Video', r: 4 },
  { x: 130, y: 350, label: 'Community', r: 4 },
  { x: 100, y: 240, label: '', r: 3 },
  { x: 250, y: 110, label: 'Scale', r: 3 },
  { x: 410, y: 180, label: '', r: 3 },
  { x: 420, y: 350, label: '', r: 3 },
  { x: 200, y: 410, label: '', r: 3 },
  { x: 70, y: 300, label: '', r: 2.5 },
  { x: 180, y: 80, label: '', r: 2.5 },
  { x: 400, y: 100, label: '', r: 2.5 },
  { x: 450, y: 290, label: '', r: 2.5 },
  { x: 350, y: 430, label: '', r: 2.5 },
  { x: 90, y: 400, label: '', r: 2.5 },
  { x: 60, y: 170, label: '', r: 2 },
  { x: 300, y: 60, label: '', r: 2 },
  { x: 460, y: 200, label: '', r: 2 },
];

const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 6], [1, 7], [2, 7], [2, 8], [3, 8], [3, 9],
  [4, 9], [4, 10], [5, 10], [5, 6], [5, 11],
  [6, 11], [6, 17], [7, 12], [7, 18], [8, 13], [8, 19],
  [9, 14], [9, 15], [10, 15], [10, 16], [11, 16], [11, 17],
  [1, 2], [2, 3], [3, 4], [4, 5], [12, 7], [13, 2],
];

function Web3NetworkVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 250, y: 250 });
  const rafRef = useRef<number>(0);
  const targetMouse = useRef({ x: 250, y: 250 });
  const currentMouse = useRef({ x: 250, y: 250 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = 500 / rect.width;
    const scaleY = 500 / rect.height;
    targetMouse.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;
      setMouse({ ...currentMouse.current });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const getNodeGlow = (node: typeof NODES[0]) => {
    const dx = mouse.x - node.x;
    const dy = mouse.y - node.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.max(0, 1 - dist / 150);
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[420px] sm:max-w-[520px] md:max-w-[680px] lg:max-w-[760px] mx-auto pointer-events-auto min-h-[280px] md:min-h-0">
      <svg viewBox="0 0 500 500" className="w-full h-full" aria-hidden>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {EDGES.map(([a, b], i) => {
          const na = NODES[a];
          const nb = NODES[b];
          const midGlow = Math.max(getNodeGlow(na), getNodeGlow(nb));
          return (
            <line key={`e-${i}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={`rgba(139,92,246,${0.12 + midGlow * 0.25})`} strokeWidth={1 + midGlow * 1.5} strokeLinecap="round" />
          );
        })}

        {[0, 3, 7, 12, 20, 25].map((edgeIdx, i) => {
          const [a, b] = EDGES[edgeIdx % EDGES.length];
          const na = NODES[a];
          const nb = NODES[b];
          const colors = ['#8B5CF6', '#10B981', '#F97316', '#8B5CF6', '#3B82F6', '#10B981'];
          return (
            <motion.circle key={`packet-${i}`} r={3} fill={colors[i]} filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{ cx: [na.x, nb.x, na.x], cy: [na.y, nb.y, na.y], opacity: [0, 0.95, 0] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2, repeatDelay: 1 + i * 0.5 }}
            />
          );
        })}

        {NODES.map((node, i) => {
          const glow = getNodeGlow(node);
          const r = node.r + glow * 4;
          const baseColor = i <= 5 ? '#8B5CF6' : '#6D5ACD';
          return (
            <g key={`n-${i}`}>
              <circle cx={node.x} cy={node.y} r={r + 10 + glow * 14} fill="none" stroke={baseColor} strokeWidth={0.5} opacity={0.08 + glow * 0.2} />
              <circle cx={node.x} cy={node.y} r={r + 5 + glow * 8} fill={baseColor} opacity={0.06 + glow * 0.12} />
              <circle cx={node.x} cy={node.y} r={r} fill={baseColor} opacity={0.55 + glow * 0.45} filter={glow > 0.25 ? 'url(#glow)' : undefined} />
            </g>
          );
        })}

        {NODES.filter(n => n.label).map((node, i) => {
          const glow = getNodeGlow(node);
          return (
            <text key={`label-${i}`} x={node.x} y={node.y - node.r - 12} textAnchor="middle" fill="white"
              fontSize="11" fontWeight="400" letterSpacing="0.12em" opacity={0.4 + glow * 0.55}
              style={{ textTransform: 'uppercase', fontFamily: 'var(--font-geist-sans), sans-serif' }}>
              {node.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero-section" className="relative min-h-screen">
      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Grid background with fade-edges mask */}
        <BGPattern variant="grid" mask="fade-edges" size={48} fill="rgba(139,92,246,0.18)" className="!z-0" />

        {/* Mobile — visual on TOP, text below */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-5 py-10 md:hidden">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mb-6 relative">
            <div className="absolute inset-0 -m-8 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,rgba(139,92,246,0.05)_40%,transparent_70%)]" />
            <Web3NetworkVisual />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="mb-4">
            <h1 className="text-[1.75rem] sm:text-[2rem] font-bold text-white leading-[1.12] tracking-tight">
              Your Web3 Marketing Team — Without Hiring One
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45 }} className="text-sm text-white/55 font-light leading-relaxed mb-6">
            We work as an embedded marketing partner helping Web3 projects launch, grow, and scale adoption.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-col gap-3">
            <a href="https://calendly.com/rohaan-web3-marketer/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap px-6 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-wider">Book a Strategy Call</a>
            <a href="/services" className="inline-flex items-center justify-center whitespace-nowrap px-6 py-3 border border-white/20 text-white/70 rounded-full font-light text-xs uppercase tracking-wider">View Services</a>
          </motion.div>
        </div>

        {/* Desktop — text left, visual right */}
        <div className="hidden md:flex relative h-screen w-full items-center">
          <div className="relative z-10 w-full flex items-center px-6 lg:px-8 xl:px-12">
            <div className="w-1/2 pr-6 lg:pr-12 xl:pr-16">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                <h1 className="text-[2.5rem] lg:text-[3.2rem] xl:text-[3.8rem] 2xl:text-[4.5rem] font-bold text-white leading-[1.08] tracking-tight mb-5 lg:mb-7">
                  Your Web3 Marketing Team — Without Hiring One
                </h1>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25 }} className="text-sm lg:text-base xl:text-lg text-white/50 font-light leading-relaxed max-w-md mb-7 lg:mb-9">
                We work as an embedded marketing partner helping Web3 projects launch, grow, and scale adoption.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="flex items-center gap-3">
                <motion.a href="https://calendly.com/rohaan-web3-marketer/30min" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center whitespace-nowrap gap-2 px-6 py-3 lg:px-7 lg:py-3.5 bg-white text-black rounded-full font-bold text-xs lg:text-sm uppercase tracking-wider transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  Book a Strategy Call
                  <motion.svg width="16" height="16" viewBox="0 0 20 20" fill="none" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                    <path d="M5 15L15 5M15 5H5M15 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.a>
                <a href="/services" className="inline-flex items-center whitespace-nowrap px-6 py-3 lg:px-7 lg:py-3.5 border border-white/20 text-white/60 rounded-full font-light text-xs lg:text-sm uppercase tracking-wider hover:border-white/40 hover:text-white transition-all duration-300">View Services</a>
              </motion.div>
            </div>

            <motion.div className="w-1/2 pl-4 lg:pl-8 relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <div className="absolute inset-0 -m-12 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,rgba(139,92,246,0.06)_40%,transparent_70%)]" />
              <Web3NetworkVisual />
            </motion.div>
          </div>
        </div>

        <motion.div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-3">
          <motion.p className="text-white/40 text-xs font-light tracking-wider uppercase" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>Scroll</motion.p>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
