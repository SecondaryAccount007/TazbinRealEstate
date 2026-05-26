'use client';

import { motion } from 'framer-motion';
import { Building2, TrendingUp, Key, BarChart3, Globe, Shield } from 'lucide-react';

type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

type ServicesSettings = {
  items?: ServiceItem[];
};

const ICON_MAP: Record<string, React.ElementType> = {
  building: Building2,
  'building2': Building2,
  'trending-up': TrendingUp,
  key: Key,
  'bar-chart': BarChart3,
  'bar-chart3': BarChart3,
  globe: Globe,
  shield: Shield,
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    title: 'Luxury Property Sales',
    description: 'Expert guidance buying and selling Dubai\'s most prestigious residences — from penthouses to waterfront estates.',
    icon: 'building',
  },
  {
    title: 'Investment Advisory',
    description: 'Strategic opportunities in Dubai\'s thriving property market with data-driven insights and ROI-focused analysis.',
    icon: 'trending-up',
  },
  {
    title: 'Property Management',
    description: 'End-to-end management of your Dubai investments — tenant sourcing, maintenance, and financial reporting.',
    icon: 'key',
  },
  {
    title: 'Market Intelligence',
    description: 'In-depth valuations and market analysis to ensure you always make informed decisions.',
    icon: 'bar-chart',
  },
  {
    title: 'International Buyers',
    description: 'Dedicated support for overseas investors navigating Dubai\'s legal framework and investment landscape.',
    icon: 'globe',
  },
  {
    title: 'Off-Plan Specialist',
    description: 'Access to exclusive off-plan projects from Dubai\'s leading developers before they reach the market.',
    icon: 'shield',
  },
];

export default function Services({ settings }: { settings?: ServicesSettings }) {
  const items = settings?.items || DEFAULT_SERVICES;

  return (
    <section className="py-28 bg-obsidian relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 40px), repeating-linear-gradient(-45deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">What I Offer</span>
          <div className="gold-divider mx-auto mt-4" />
          <h2 className="section-title mt-2">
            Expert Services<br />
            <span className="text-gradient-gold">Tailored For You</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {items.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Building2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-obsidian hover:bg-obsidian-200 p-10 transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 border border-gold/30 group-hover:border-gold flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon size={20} className="text-gold" />
                </div>

                <h3 className="font-serif text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm font-sans leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
