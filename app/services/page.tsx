'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GridBeamBackground } from '@/components/book-call-section';

/* ─── Data ─── */

const services = [
  {
    id: 'strategy',
    title: 'Strategy & Growth',
    subtitle: 'From concept to community — we architect your path to scale.',
    accent: '#8B5CF6',
    accentDim: 'rgba(139, 92, 246, 0.15)',
    label: 'Focus areas',
    focusAreas: [
      { name: 'GTM Strategy', description: 'Go-to-market frameworks built for Web3 dynamics — token narratives, positioning, and launch sequencing.' },
      { name: 'Token Launch Planning', description: 'End-to-end planning from tokenomics messaging to exchange listings and community ramp-up.' },
      { name: 'Ecosystem Growth', description: 'Systems to attract builders, partners, and users into a self-reinforcing growth loop.' },
      { name: 'Community Expansion', description: 'Organic and paid strategies to grow engaged communities across Discord, Telegram, and X.' },
      { name: 'Partnership Strategy', description: 'Identifying, pitching, and closing strategic partnerships that accelerate traction.' },
    ],
  },
  {
    id: 'marketing',
    title: 'Performance Marketing',
    subtitle: 'Precision campaigns that convert across every channel.',
    accent: '#8B5CF6',
    accentDim: 'rgba(139, 92, 246, 0.15)',
    label: 'Channels',
    focusAreas: [
      { name: 'X Ads', description: 'Targeted campaigns on the platform where Web3 lives — follower lookalikes, keyword targeting, and engagement ads.' },
      { name: 'Google Ads', description: 'Search, display, and YouTube campaigns to capture high-intent traffic outside the crypto bubble.' },
      { name: 'CoinGecko / CMC Ads', description: 'Premium placements on the platforms your token buyers check daily.' },
      { name: 'Telegram Ads', description: 'Native Telegram ad placements reaching crypto-native audiences in their primary communication channel.' },
      { name: 'Web3 DSP Networks', description: 'Programmatic ads across decentralized ad networks and crypto-native publisher ecosystems.' },
    ],
  },
  {
    id: 'video',
    title: 'Video Production',
    subtitle: 'Cinematic storytelling engineered for Web3 distribution.',
    accent: '#8B5CF6',
    accentDim: 'rgba(139, 92, 246, 0.15)',
    label: 'What we produce',
    focusAreas: [
      { name: 'Launch Trailers', description: 'High-energy, cinematic trailers that generate hype and set the tone for your product or token launch.' },
      { name: 'Explainers', description: 'Complex tech made simple — clear, beautiful motion design that turns confusion into conviction.' },
      { name: 'Short Form Content', description: 'Scroll-stopping clips optimized for X, TikTok, Instagram Reels, and YouTube Shorts.' },
      { name: 'Social Campaigns', description: 'Cohesive multi-format video series designed to sustain attention and drive engagement over weeks.' },
    ],
  },
];

/* ─── Accordion Item ─── */

function AccordionItem({ item, index, accent }: { item: { name: string; description: string }; index: number; accent: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        onClick={() => setOpen(!open)}
        className="group cursor-pointer border-b border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
      >
        <div className="flex items-center justify-between py-4 sm:py-5">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-wider opacity-25 w-5" style={{ color: accent }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h4 className="text-base sm:text-lg md:text-xl font-light text-white/70 group-hover:text-white transition-colors duration-300">
              {item.name}
            </h4>
          </div>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-6 h-6 flex items-center justify-center shrink-0 opacity-30 group-hover:opacity-60 transition-opacity"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm sm:text-base text-white/35 font-light leading-relaxed pb-4 sm:pb-5 pl-9 max-w-xl">
                {item.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Service Block ─── */

function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  const isReversed = index % 2 !== 0;
  const isEven = index % 2 === 0;

  const titleBlock = (
    <div className="lg:sticky lg:top-32 self-start">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-6 sm:w-8" style={{ background: service.accent }} />
        <span className="text-[11px] uppercase tracking-[0.2em] font-light" style={{ color: service.accent }}>
          0{index + 1}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.1] tracking-tight mb-3 sm:mb-4">
        {service.title}
      </h2>

      <p className="text-sm sm:text-base md:text-lg text-white/35 font-light leading-relaxed max-w-md mb-6">
        {service.subtitle}
      </p>

      <div className="flex flex-wrap gap-2">
        {service.focusAreas.map((area) => (
          <span
            key={area.name}
            className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full border border-white/[0.08] text-white/50 font-light tracking-wide"
          >
            {area.name}
          </span>
        ))}
      </div>
    </div>
  );

  const accordionBlock = (
    <div>
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light text-white/20 mb-4">
        {service.label}
      </p>
      <div>
        {service.focusAreas.map((item, i) => (
          <AccordionItem key={item.name} item={item} index={i} accent={service.accent} />
        ))}
      </div>
    </div>
  );

  return (
    <motion.section
      id={service.id}
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ background: isEven ? '#050508' : '#08080c' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle divider at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">
          {isReversed ? (
            <>
              {accordionBlock}
              {titleBlock}
            </>
          ) : (
            <>
              {titleBlock}
              {accordionBlock}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/* ─── Quick-nav pills ─── */

function QuickNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="group relative px-5 py-2.5 rounded-full border border-white/[0.08] hover:border-white/20 transition-all duration-300 text-white/40 hover:text-white text-xs sm:text-sm font-light uppercase tracking-wider"
        >
          {s.title}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]" />
        </button>
      ))}
    </motion.div>
  );
}

/* ─── CTA ─── */

function ServicesCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <GridBeamBackground />

      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-6 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-violet-400/50 text-xs sm:text-sm uppercase tracking-[0.3em] font-light mb-5"
        >
          Let&apos;s work together
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight"
        >
          Looking for a Web3
          <br />
          Marketing Team?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg text-white/35 font-light max-w-lg mb-8 sm:mb-10"
        >
          Work with a team that has been building and scaling projects in Web3 for over 6 years.
        </motion.p>
        <motion.a
          href="https://calendly.com/rohaan-web3-marketer/30min"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-7 py-3.5 sm:px-9 sm:py-4 bg-white text-black rounded-full font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_50px_rgba(139,92,246,0.2)]"
        >
          <span>Book a Strategy Call</span>
          <motion.svg width="18" height="18" viewBox="0 0 20 20" fill="none"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M5 15L15 5M15 5H5M15 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.a>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function ServicesPage() {
  return (
    <main className="relative bg-[#050508] min-h-screen overflow-hidden">
      <Navbar alwaysVisible />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/20 text-[11px] sm:text-xs uppercase tracking-[0.3em] font-light mb-4"
          >
            Our Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-4 sm:mb-5"
          >
            Everything you need to{' '}
            <span className="text-white/60">
              launch, grow, and scale.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/30 font-light leading-relaxed max-w-xl mx-auto mb-8"
          >
            Strategy. Marketing. Production. Three pillars, one studio — built for Web3 founders who refuse to blend in.
          </motion.p>
          <QuickNav />
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <ServiceBlock key={service.id} service={service} index={i} />
      ))}

      {/* CTA */}
      <ServicesCTA />

      {/* Footer */}
      <section className="relative bg-black">
        <Footer />
      </section>
    </main>
  );
}
