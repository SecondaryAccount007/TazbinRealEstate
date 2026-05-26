'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

const DEMO_POSTS = [
  { id: '1', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', caption: 'Just listed — Stunning Dubai Marina penthouse' },
  { id: '2', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80', caption: 'Palm Jumeirah views like no other' },
  { id: '3', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', caption: 'Keys handed over — another happy client' },
  { id: '4', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80', caption: 'Luxury living in Downtown Dubai' },
  { id: '5', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&q=80', caption: 'Exclusive villa — ready to move in' },
  { id: '6', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80', caption: 'Dubai\'s skyline never gets old' },
];

export default function InstagramFeed() {
  return (
    <section className="py-28 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="section-label">Stay Connected</span>
            <div className="gold-divider mt-4" />
            <h2 className="section-title mt-2">
              Follow the<br />
              <span className="text-gradient-gold">Journey</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/tazbnnazim/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-300 font-sans text-sm tracking-wider"
          >
            <Instagram size={18} />
            @tazbnnazim
            <ExternalLink size={12} />
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {DEMO_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/tazbnnazim/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 17vw"
              />
              <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={24} className="text-gold" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
