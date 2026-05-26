'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, ArrowRight, Award, Star, TrendingUp } from 'lucide-react';
import { PLACEHOLDER_AGENT_PHOTO } from '@/lib/utils';

type AboutSettings = {
  name?: string;
  title?: string;
  bio?: string;
  bio_extra?: string;
  photo?: string;
  achievements?: string[];
};

const DEFAULT_ACHIEVEMENTS = [
  'Top 1% Agent in Dubai',
  'AED 2B+ in Sales Volume',
  'RERA Certified Broker',
  'International Property Specialist',
];

export default function About({ settings }: { settings?: AboutSettings }) {
  const name = settings?.name || 'Taz Nazim';
  const title = settings?.title || "Dubai's Premier Real Estate Specialist";
  const bio = settings?.bio || "With over a decade of experience navigating Dubai's dynamic luxury property market, I've built a reputation for delivering results that exceed expectations. My deep market knowledge, extensive network, and unwavering commitment to clients set me apart in one of the world's most competitive real estate landscapes.";
  const bioExtra = settings?.bio_extra || "From Palm Jumeirah villas to Downtown penthouses, I specialize in connecting discerning buyers and sellers with exceptional properties that align with their vision and investment goals.";
  const photo = settings?.photo || PLACEHOLDER_AGENT_PHOTO;
  const achievements = settings?.achievements || DEFAULT_ACHIEVEMENTS;

  return (
    <section className="py-28 bg-obsidian-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Frame */}
              <div className="absolute -inset-4 border border-gold/20 z-0" />
              <div className="absolute -inset-2 border border-gold/10 z-0" />

              <div className="relative z-10 h-full overflow-hidden">
                <Image
                  src={photo}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent" />
              </div>

              {/* Gold accent corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/10 border border-gold/30 z-20 flex items-center justify-center">
                <Star size={24} className="text-gold" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8 lg:pl-4">
              <a
                href="https://www.instagram.com/tazbnnazim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300 text-xs font-sans tracking-wider"
              >
                <Instagram size={16} />
                @tazbnnazim
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://au.linkedin.com/in/taznazs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300 text-xs font-sans tracking-wider"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="section-label">About the Agent</span>
            <div className="gold-divider mt-4" />
            <h2 className="section-title mt-2 mb-2">{name}</h2>
            <p className="text-gold font-sans text-sm tracking-wider mb-8">{title}</p>

            <p className="text-white/60 font-sans text-base leading-relaxed mb-6">{bio}</p>
            <p className="text-white/50 font-sans text-base leading-relaxed mb-10">{bioExtra}</p>

            {/* Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {achievements.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-obsidian-200 px-4 py-3 border border-white/5">
                  <Award size={14} className="text-gold shrink-0" />
                  <span className="text-white/70 text-xs font-sans tracking-wide">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              My Full Story
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
