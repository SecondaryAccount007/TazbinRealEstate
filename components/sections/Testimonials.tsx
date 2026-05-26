'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { type Testimonial } from '@/lib/supabase';
import { DEMO_TESTIMONIALS } from '@/lib/demo-data';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : DEMO_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + displayTestimonials.length) % displayTestimonials.length);
  const next = () => setCurrent((c) => (c + 1) % displayTestimonials.length);

  const testimonial = displayTestimonials[current];

  return (
    <section className="py-28 bg-obsidian-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Client Stories</span>
          <div className="gold-divider mx-auto mt-4" />
          <h2 className="section-title mt-2">
            What My Clients<br />
            <span className="text-gradient-gold">Say About Me</span>
          </h2>
        </motion.div>

        {/* Testimonial Display */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-obsidian-200 border border-white/5 p-10 md:p-16 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote size={80} className="text-gold" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="font-serif text-xl md:text-2xl text-white/85 leading-relaxed mb-10 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Client */}
              <div className="flex items-center gap-4">
                {testimonial.client_photo && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30 shrink-0">
                    <Image
                      src={testimonial.client_photo}
                      alt={testimonial.client_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-sans text-white font-medium">{testimonial.client_name}</p>
                  <p className="font-sans text-gold text-xs tracking-wider">{testimonial.client_title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {displayTestimonials.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {displayTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-px transition-all duration-300 ${
                      i === current ? 'w-10 bg-gold' : 'w-4 bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-11 h-11 border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
