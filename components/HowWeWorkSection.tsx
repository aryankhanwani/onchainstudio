'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Understand',
    subtitle: 'the product & ecosystem',
    description: 'We dive deep into your project — the tech, the narrative, the community, and the competitive landscape.',
    accent: '#8B5CF6',
    accentDim: 'rgba(139, 92, 246, 0.12)',
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'a growth strategy',
    description: 'We map out a tailored GTM plan with milestones, channel selection, content pillars, and token-aware positioning.',
    accent: '#10B981',
    accentDim: 'rgba(16, 185, 129, 0.12)',
  },
  {
    number: '03',
    title: 'Execute',
    subtitle: 'campaigns across channels',
    description: 'We launch performance campaigns, produce content, and activate communities — across X, Telegram, Google, and more.',
    accent: '#F97316',
    accentDim: 'rgba(249, 115, 22, 0.12)',
  },
  {
    number: '04',
    title: 'Optimize',
    subtitle: '& scale',
    description: 'We continuously analyze, cut what\'s dead, and push what\'s working until growth becomes self-sustaining.',
    accent: '#3B82F6',
    accentDim: 'rgba(59, 130, 246, 0.12)',
  },
];

export default function HowWeWorkSection() {
  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-violet-500/60" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-violet-400/60 font-light">Our Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-tight"
          >
            How We Work
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px lg:gap-0 relative">
          {/* Horizontal beam track — desktop only, positioned at center of badges */}
          <div className="hidden lg:block absolute left-8 right-8 top-[28px] z-0 pointer-events-none">
            <motion.div
              className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, #8B5CF6, #10B981, #F97316, #3B82F6)', opacity: 0.12 }}
              initial={{ scaleX: 0, transformOrigin: '0% 50%' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Traveling beam */}
            <motion.div
              className="absolute top-[-1.5px] h-[4px] w-[80px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(16,185,129,0.6), transparent)' }}
              animate={{ left: ['-80px', 'calc(100% + 80px)'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative p-5 lg:p-6 xl:p-8">
                {/* Step number badge */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="relative">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-medium"
                      style={{ background: step.accentDim, color: step.accent }}
                    >
                      {step.number}
                    </div>
                    <motion.div
                      className="absolute -inset-1 rounded-lg"
                      style={{ background: step.accent }}
                      animate={{ opacity: [0.08, 0, 0.08] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-medium text-white leading-tight mb-1">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm font-light mb-3" style={{ color: step.accent }}>
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/35 font-light leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom accent bar */}
                <motion.div
                  className="mt-5 h-[2px] rounded-full"
                  style={{ background: step.accent }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                />
              </div>

              {/* Right divider — desktop only, between columns */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-4 bottom-4 right-0 w-px bg-white/[0.04]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
