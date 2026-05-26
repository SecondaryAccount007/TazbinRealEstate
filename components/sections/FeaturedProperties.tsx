'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/ui/PropertyCard';
import { DEMO_PROPERTIES } from '@/lib/demo-data';
import { type Property } from '@/lib/supabase';

export default function FeaturedProperties({ properties }: { properties: Property[] }) {
  const displayProperties = properties.length > 0 ? properties : DEMO_PROPERTIES;

  return (
    <section className="py-28 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Exclusive Listings</span>
            <div className="gold-divider mt-4" />
            <h2 className="section-title mt-2">
              Featured<br />
              <span className="text-gradient-gold">Properties</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/properties" className="btn-ghost group">
              View All Properties
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.slice(0, 6).map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

        {displayProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 font-sans text-sm tracking-wider">No properties available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
