'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

type StatItem = { value: string; label: string };

type StatsSettings = {
  items?: StatItem[];
};

const DEFAULT_STATS: StatItem[] = [
  { value: '500+', label: 'Properties Sold' },
  { value: 'AED 2B+', label: 'Total Sales Volume' },
  { value: '10+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
];

export default function Stats({ settings }: { settings?: StatsSettings }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const items = settings?.items || DEFAULT_STATS;

  return (
    <section ref={ref} className="relative py-20 bg-obsidian-100 border-y border-white/5 overflow-hidden">
      {/* Gold accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/3 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {items.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col items-center justify-center py-10 px-8 text-center border-r border-white/5 last:border-r-0 even:border-r-0 lg:even:border-r lg:last:border-r-0"
            >
              <span className="font-serif text-4xl md:text-5xl text-gradient-gold block mb-3">
                {stat.value}
              </span>
              <span className="font-sans text-white/50 text-xs tracking-[0.2em] uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
