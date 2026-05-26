'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { type Property } from '@/lib/supabase';
import { DEFAULT_PROPERTY_IMAGE } from '@/lib/utils';

export default function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const image = property.images?.[0] || DEFAULT_PROPERTY_IMAGE;
  const isAvailable = property.status === 'available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/properties/${property.id}`} className="group block card-dark overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 ${
                isAvailable
                  ? 'bg-gold text-obsidian'
                  : property.status === 'sold'
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'bg-obsidian/80 text-gold border border-gold/50'
              }`}
            >
              {property.status === 'under-offer' ? 'Under Offer' : property.status}
            </span>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-serif text-2xl text-white">
              {property.price_display || `AED ${property.price?.toLocaleString()}`}
            </p>
          </div>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowRight size={16} className="text-obsidian" />
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="flex items-center gap-1.5 text-gold text-xs font-sans tracking-wider uppercase mb-2">
            <MapPin size={11} />
            {property.location}
          </p>
          <h3 className="font-serif text-xl text-white mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-1">
            {property.title}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-5 pt-4 border-t border-white/5">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-sans">
                <Bed size={13} />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-sans">
                <Bath size={13} />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area > 0 && (
              <div className="flex items-center gap-1.5 text-white/50 text-xs font-sans">
                <Square size={13} />
                <span>{property.area?.toLocaleString()} {property.area_unit}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
