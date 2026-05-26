'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { DEFAULT_HERO_IMAGE } from '@/lib/utils';

type HeroSettings = {
  title?: string;
  subtitle?: string;
  cta_primary?: string;
  cta_secondary?: string;
  background_image?: string;
};

export default function Hero({ settings }: { settings?: HeroSettings }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const title = settings?.title || "Find Your Dream\nProperty in Dubai";
  const subtitle = settings?.subtitle || "Dubai's premier luxury real estate specialist — curating exceptional homes in the world's most dynamic city.";
  const ctaPrimary = settings?.cta_primary || "Explore Properties";
  const ctaSecondary = settings?.cta_secondary || "Contact Taz";
  const bgImage = settings?.background_image || DEFAULT_HERO_IMAGE;

  const scrollDown = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Dubai Skyline"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/30" />
      </div>

      {/* Animated grain overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Gold accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent z-[2]" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="section-label">Dubai Luxury Real Estate</span>
          <div className="w-8 h-px bg-gold mx-auto mt-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.05]"
          style={{ whiteSpace: 'pre-line' }}
        >
          {title.split('\n').map((line, i) => (
            <span key={i} className={i % 2 === 1 ? 'text-gradient-gold' : ''}>
              {line}
              {i < title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/60 font-sans text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/properties" className="btn-primary">
            {ctaPrimary}
            <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            {ctaSecondary}
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-gold transition-colors"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.button>

      {/* Scroll target */}
      <div ref={scrollRef} className="absolute bottom-0" />
    </section>
  );
}
