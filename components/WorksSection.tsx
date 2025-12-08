'use client';

import { motion } from 'framer-motion';

interface StatCard {
  id: number;
  value: string;
  label: string;
}

const stats: StatCard[] = [
  { id: 1, value: '500+', label: 'Videos' },
  { id: 2, value: '12M+', label: 'Impressions' },
  { id: 3, value: '99%', label: 'Satisfaction' },
];

export default function WorksSection() {
  return (
    <section id="works-section" className="relative min-h-screen bg-black">
      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 min-h-screen flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-16 gap-8">
          {/* Left Side - Title */}
          <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col flex-start mb-12 md:mb-0 py-12">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-geist-sans)] text-3xl sm:text-4xl md:text-5xl font-thin text-white leading-[1.1] tracking-tight mb-6 md:mb-8"
            >
              WORKS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-geist-sans)] text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed"
            >
              A showcase of our creative endeavors and impactful projects.
            </motion.p>
          </div>

          {/* Right Side - Stats Column + Bento Grid */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex items-center justify-center">
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4 items-start">
              {/* Mobile: Stats Grid - 3 columns on top row */}
              <div className="w-full grid grid-cols-3 gap-4 md:hidden mb-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="w-full aspect-square bg-black rounded-2xl p-4 sm:p-6 flex flex-col justify-center items-center border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/60 font-light text-center">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Stats Column - matches one grid column width exactly */}
              <div className="hidden md:flex flex-col gap-4 flex-shrink-0" style={{ width: 'calc((100% - 1rem) / 4)' }}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="w-full aspect-square bg-black rounded-2xl p-6 flex flex-col justify-center items-center border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm md:text-base lg:text-lg xl:text-xl text-white/60 font-light text-center">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Bento Grid Container - 3 columns, each matching stats column width */}
              <div className="flex-1 grid grid-cols-3 gap-4 auto-rows-fr">

                {/* Row 1: 2x1 Landscape + 1x2 Portrait */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="col-span-2 row-span-1 aspect-[2/1] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <video
                    src="/1080horizontal.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <video
                    src="/yellow-allinone-ecosystem-v3-portrait.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Row 2: 1x2 Portrait + 1x1 Square */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <video
                    src="/IMG_0330-1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="col-span-1 row-span-1 aspect-square rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <img
                    src="/IMG_6276.PNG"
                    alt="Work 4"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-black " 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Row 3: 1x2 Portrait */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="col-span-2 row-span-1 aspect-[2/1] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <img
                    src="/bitget-podcast.png"
                    alt="Work 5"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
