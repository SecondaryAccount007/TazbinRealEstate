import Link from 'next/link';
import { Building2, MessageSquareQuote, Layers, Settings2, ArrowRight, Eye } from 'lucide-react';
import { getProperties, getTestimonials, getSections } from '@/lib/db';

export default async function AdminDashboard() {
  const [properties, testimonials, sections] = await Promise.all([
    getProperties(false).catch(() => []),
    getTestimonials(false).catch(() => []),
    getSections().catch(() => []),
  ]);

  const visibleSections = sections.filter((s) => s.visible).length;

  const cards = [
    {
      title: 'Properties',
      count: properties.length,
      sub: `${properties.filter((p) => p.featured).length} featured`,
      icon: Building2,
      href: '/admin/properties',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10 border-blue-400/20',
    },
    {
      title: 'Testimonials',
      count: testimonials.length,
      sub: `${testimonials.filter((t) => t.visible).length} visible`,
      icon: MessageSquareQuote,
      href: '/admin/testimonials',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10 border-purple-400/20',
    },
    {
      title: 'Page Sections',
      count: visibleSections,
      sub: `of ${sections.length} enabled`,
      icon: Layers,
      href: '/admin/sections',
      color: 'text-gold',
      bg: 'bg-gold/10 border-gold/20',
    },
  ];

  const quickLinks = [
    { href: '/admin/settings', label: 'Update Contact Info & Chat Webhook', icon: Settings2 },
    { href: '/admin/properties', label: 'Add a New Property Listing', icon: Building2 },
    { href: '/admin/sections', label: 'Show / Hide Website Sections', icon: Layers },
    { href: '/admin/settings', label: 'Change Hero Image & Text', icon: Settings2 },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-white mb-2">Welcome Back</h1>
        <p className="text-white/40 font-sans text-sm">Manage your website content from here. All changes go live instantly.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="admin-card hover:border-white/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 border flex items-center justify-center ${card.bg}`}>
                  <Icon size={18} className={card.color} />
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-gold transition-colors" />
              </div>
              <p className="font-serif text-3xl text-white mb-1">{card.count}</p>
              <p className="font-sans text-white/60 text-sm">{card.title}</p>
              <p className="font-sans text-white/30 text-xs mt-1">{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h2 className="font-sans text-sm font-medium text-white/60 tracking-widest uppercase mb-6">Quick Actions</h2>
        <div className="space-y-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3.5 bg-obsidian-200 border border-white/5 hover:border-gold/20 hover:bg-obsidian-300 transition-all group"
              >
                <Icon size={16} className="text-gold shrink-0" />
                <span className="text-white/70 group-hover:text-white text-sm font-sans transition-colors">{link.label}</span>
                <ArrowRight size={14} className="text-white/20 group-hover:text-gold ml-auto transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Preview Link */}
      <div className="mt-6 flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/30 hover:text-gold text-xs font-sans tracking-wider transition-colors"
        >
          <Eye size={14} />
          Preview your live website
        </a>
      </div>
    </div>
  );
}
