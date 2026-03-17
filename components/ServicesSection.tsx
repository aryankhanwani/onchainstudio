'use client';

import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ── Strategy & Growth: animated growth chart with connecting nodes ── */
function StrategyVisual() {
  const chartPath = 'M 30 140 Q 60 130, 90 110 T 150 80 T 210 50 T 270 25';
  const nodes = [
    { cx: 90, cy: 110 },
    { cx: 150, cy: 80 },
    { cx: 210, cy: 50 },
    { cx: 270, cy: 25 },
  ];
  const connectionLines = [
    { x1: 90, y1: 110, x2: 150, y2: 80 },
    { x1: 150, y1: 80, x2: 270, y2: 25 },
    { x1: 210, y1: 50, x2: 150, y2: 80 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 300 170" className="w-[85%] h-[85%]" fill="none">
        {/* Grid lines */}
        {[40, 70, 100, 130].map((y) => (
          <motion.line
            key={y}
            x1="20" y1={y} x2="280" y2={y}
            stroke="rgba(16,185,129,0.08)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
        ))}

        {/* Dashed connection lines between nodes */}
        {connectionLines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="rgba(16,185,129,0.15)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 + i * 0.3 }}
          />
        ))}

        {/* Growth line */}
        <motion.path
          d={chartPath}
          stroke="rgb(16,185,129)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Glow under the line */}
        <motion.path
          d={`${chartPath} L 270 150 L 30 150 Z`}
          fill="url(#strategyGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />
        <defs>
          <linearGradient id="strategyGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Data nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.cx} cy={node.cy} r="14"
              fill="rgba(16,185,129,0.08)"
              stroke="rgba(16,185,129,0.2)"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
            />
            <motion.circle
              cx={node.cx} cy={node.cy} r="4"
              fill="rgb(16,185,129)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.2 }}
            />
            <motion.circle
              cx={node.cx} cy={node.cy} r="4"
              fill="rgb(16,185,129)"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2, delay: 1.5 + i * 0.4, repeat: Infinity, repeatDelay: 2 }}
            />
          </g>
        ))}

        {/* Arrow at the end */}
        <motion.polygon
          points="268,18 280,24 270,32"
          fill="rgb(16,185,129)"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        />
      </svg>
    </div>
  );
}

/* ── Performance Marketing: animated targeting with pulse rings and metrics ── */
function MarketingVisual() {
  const rings = [28, 50, 72, 94];
  const dataPoints = [
    { x: 85, y: 45, label: '3.2x' },
    { x: 195, y: 60, label: 'CTR' },
    { x: 60, y: 120, label: 'CPA' },
    { x: 230, y: 110, label: 'ROI' },
  ];
  const particles = [
    { from: { x: 20, y: 30 }, to: { x: 150, y: 85 } },
    { from: { x: 280, y: 50 }, to: { x: 150, y: 85 } },
    { from: { x: 40, y: 150 }, to: { x: 150, y: 85 } },
    { from: { x: 260, y: 140 }, to: { x: 150, y: 85 } },
    { from: { x: 150, y: 10 }, to: { x: 150, y: 85 } },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 300 170" className="w-[85%] h-[85%]" fill="none">
        {/* Target rings */}
        {rings.map((r, i) => (
          <g key={i}>
            <motion.circle
              cx="150" cy="85" r={r}
              stroke="rgba(139,92,246,0.15)"
              strokeWidth="0.8"
              fill="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            />
            <motion.circle
              cx="150" cy="85" r={r}
              stroke="rgba(139,92,246,0.3)"
              strokeWidth="1"
              fill="none"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 2.5, delay: 1 + i * 0.5, repeat: Infinity, repeatDelay: 1.5 }}
            />
          </g>
        ))}

        {/* Center bullseye */}
        <motion.circle
          cx="150" cy="85" r="6"
          fill="rgb(139,92,246)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        />
        <motion.circle
          cx="150" cy="85" r="6"
          fill="rgb(139,92,246)"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Incoming particle trails */}
        {particles.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.from.x} cy={p.from.y} r="2.5"
            fill="rgb(139,92,246)"
            animate={{
              cx: [p.from.x, p.to.x],
              cy: [p.from.y, p.to.y],
              opacity: [0.8, 0],
              r: [2.5, 1],
            }}
            transition={{
              duration: 2,
              delay: 1.5 + i * 0.6,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeIn',
            }}
          />
        ))}

        {/* Metric labels floating around */}
        {dataPoints.map((pt, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 + i * 0.2 }}
          >
            <rect
              x={pt.x - 18} y={pt.y - 9}
              width="36" height="18" rx="4"
              fill="rgba(139,92,246,0.12)"
              stroke="rgba(139,92,246,0.25)"
              strokeWidth="0.5"
            />
            <text
              x={pt.x} y={pt.y + 4}
              textAnchor="middle"
              fill="rgba(139,92,246,0.7)"
              fontSize="8"
              fontFamily="var(--font-geist-sans), system-ui, sans-serif"
              fontWeight="500"
            >
              {pt.label}
            </text>
          </motion.g>
        ))}

        {/* Crosshair lines */}
        <motion.line
          x1="150" y1="40" x2="150" y2="130"
          stroke="rgba(139,92,246,0.1)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.line
          x1="100" y1="85" x2="200" y2="85"
          stroke="rgba(139,92,246,0.1)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </svg>
    </div>
  );
}

/* ── Video Production: animated clapperboard, timeline, and play ── */
function VideoVisual() {
  const timelineBars = [
    { x: 55, w: 80, color: 'rgba(249,115,22,0.4)', delay: 0 },
    { x: 55, w: 60, color: 'rgba(249,115,22,0.25)', delay: 0.15 },
    { x: 55, w: 95, color: 'rgba(249,115,22,0.35)', delay: 0.3 },
    { x: 55, w: 45, color: 'rgba(249,115,22,0.2)', delay: 0.45 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 300 170" className="w-[85%] h-[85%]" fill="none">

        {/* Film strip perforations — left side */}
        {[20, 40, 60, 80, 100, 120, 140].map((y, i) => (
          <motion.rect
            key={`l-${i}`}
            x="15" y={y} width="6" height="10" rx="1.5"
            fill="rgba(249,115,22,0.1)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
          />
        ))}
        {/* Film strip perforations — right side */}
        {[20, 40, 60, 80, 100, 120, 140].map((y, i) => (
          <motion.rect
            key={`r-${i}`}
            x="279" y={y} width="6" height="10" rx="1.5"
            fill="rgba(249,115,22,0.1)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
          />
        ))}

        {/* Play button — center */}
        <motion.circle
          cx="190" cy="65" r="30"
          fill="rgba(249,115,22,0.08)"
          stroke="rgba(249,115,22,0.3)"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        <motion.polygon
          points="182,50 182,80 207,65"
          fill="rgb(249,115,22)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        />
        {/* Play ripple */}
        <motion.circle
          cx="190" cy="65" r="30"
          stroke="rgba(249,115,22,0.4)"
          strokeWidth="1.5"
          fill="none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        />

        {/* Timeline tracks */}
        <motion.line
          x1="50" y1="115" x2="260" y2="115"
          stroke="rgba(249,115,22,0.1)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        {timelineBars.map((bar, i) => (
          <motion.rect
            key={i}
            x={bar.x} y={122 + i * 10}
            width={bar.w} height="5" rx="2.5"
            fill={bar.color}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 + bar.delay }}
            style={{ originX: 0 }}
          />
        ))}

        {/* Playhead on timeline */}
        <motion.line
          x1="100" y1="112" x2="100" y2="162"
          stroke="rgb(249,115,22)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1],
            x1: [0, 0, 120],
            x2: [0, 0, 120],
          }}
          transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          cx="100" cy="112" r="3"
          fill="rgb(249,115,22)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1],
            cx: [100, 100, 220],
          }}
          transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Clapperboard top-left */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <rect x="40" y="25" width="55" height="40" rx="3" fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.2)" strokeWidth="0.8" />
          {/* Clapper stripes */}
          <motion.line x1="40" y1="25" x2="55" y2="18" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" strokeLinecap="round"
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatDelay: 3 }}
            style={{ originX: '40px', originY: '25px' }}
          />
          <line x1="46" y1="35" x2="89" y2="35" stroke="rgba(249,115,22,0.15)" strokeWidth="0.5" />
          <line x1="46" y1="42" x2="89" y2="42" stroke="rgba(249,115,22,0.15)" strokeWidth="0.5" />
          <line x1="46" y1="49" x2="75" y2="49" stroke="rgba(249,115,22,0.15)" strokeWidth="0.5" />
        </motion.g>
      </svg>
    </div>
  );
}

const visualComponents = [StrategyVisual, MarketingVisual, VideoVisual];

const serviceData = [
  {
    id: 1,
    title: 'Strategy & Growth',
    description: 'Design GTM strategy, token launch plans, and ecosystem growth systems.',
    accent: 'rgb(16, 185, 129)',
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
  },
  {
    id: 2,
    title: 'Performance Marketing',
    description: 'Paid acquisition campaigns across crypto-native and mainstream channels.',
    accent: 'rgb(139, 92, 246)',
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
  },
  {
    id: 3,
    title: 'Video Production',
    description: 'High-impact videos designed for Web3 distribution.',
    accent: 'rgb(249, 115, 22)',
    gradient: 'from-orange-500/20 via-rose-500/10 to-transparent',
  },
];

export default function ServicesSection() {
  return (
    <section id="services-section" className="relative bg-black py-20 md:py-32 lg:py-40">
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50 z-10" />

      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-[var(--font-geist-sans)] text-2xl sm:text-3xl md:text-5xl font-medium text-white leading-[1.1] tracking-tight mb-12 md:mb-20"
        >
          WHAT WE DO
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {serviceData.map((service, index) => {
            const Visual = visualComponents[index];

            return (
              <motion.div
                key={service.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
                className="group relative"
              >
                <div className="relative h-full border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/25 aspect-square flex flex-col">
                  {/* Animated visual area */}
                  <div className="relative flex-1 min-h-0 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />

                    <Visual />

                    {/* Bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  {/* Content area */}
                  <div className="relative bg-black/60 backdrop-blur-sm px-6 sm:px-7 md:px-8 pb-7 sm:pb-8 md:pb-9 pt-4 sm:pt-5">
                    <motion.div
                      className="h-[2px] w-10 mb-5 rounded-full group-hover:w-16 transition-all duration-500"
                      style={{ background: service.accent }}
                    />

                    <h3 className="font-[var(--font-geist-sans)] text-xl sm:text-2xl md:text-3xl font-light text-white leading-tight mb-3 sm:mb-4">
                      {service.title}
                    </h3>

                    <p className="font-[var(--font-geist-sans)] text-sm sm:text-base md:text-lg text-white/50 font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
