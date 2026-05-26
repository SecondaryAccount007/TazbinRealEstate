import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/sections/ChatWidget';
import { getProperty, getAllSettings } from '@/lib/db';
import { DEMO_PROPERTIES } from '@/lib/demo-data';
import { Bed, Bath, Square, MapPin, Phone, Mail, ArrowLeft, Check } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [dbProperty, settings] = await Promise.all([
    getProperty(id).catch(() => null),
    getAllSettings().catch((): Record<string, unknown> => ({})),
  ]);

  // Fall back to demo data if not in database (e.g. no Supabase connected yet)
  const property = dbProperty ?? DEMO_PROPERTIES.find((p) => p.id === id) ?? null;
  if (!property) notFound();

  const chatSettings = settings.chat as Record<string, unknown> | null;
  const contactSettings = settings.contact as Record<string, string> | null;
  const images = property.images || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Back */}
        <div className="bg-obsidian-100 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link href="/properties" className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm font-sans">
              <ArrowLeft size={16} />
              Back to Properties
            </Link>
          </div>
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="relative h-[60vh] bg-obsidian-200 overflow-hidden">
            <Image src={images[0]} alt={property.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="bg-gold text-obsidian font-sans text-xs tracking-widest uppercase px-3 py-1.5">
                {property.status === 'under-offer' ? 'Under Offer' : property.status}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <p className="flex items-center gap-1.5 text-gold text-xs font-sans tracking-wider uppercase mb-3">
                <MapPin size={12} /> {property.location}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">{property.title}</h1>
              <p className="font-serif text-3xl text-gold mb-8">{property.price_display || `AED ${property.price?.toLocaleString()}`}</p>

              {/* Specs */}
              <div className="flex flex-wrap gap-8 py-6 border-y border-white/5 mb-8">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2 text-white/60 text-sm font-sans">
                    <Bed size={16} className="text-gold" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-2 text-white/60 text-sm font-sans">
                    <Bath size={16} className="text-gold" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                )}
                {property.area > 0 && (
                  <div className="flex items-center gap-2 text-white/60 text-sm font-sans">
                    <Square size={16} className="text-gold" />
                    <span>{property.area?.toLocaleString()} {property.area_unit}</span>
                  </div>
                )}
              </div>

              {property.description && (
                <div className="mb-10">
                  <h2 className="font-serif text-2xl text-white mb-4">About This Property</h2>
                  <p className="text-white/60 font-sans text-base leading-relaxed">{property.description}</p>
                </div>
              )}

              {property.amenities?.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-white mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-white/60 text-sm font-sans">
                        <Check size={14} className="text-gold shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Contact */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-obsidian-200 border border-white/5 p-8">
                <p className="font-serif text-xl text-white mb-2">Taz Nazim</p>
                <p className="text-gold text-xs font-sans tracking-wider mb-6">Dubai Luxury Real Estate</p>

                <div className="space-y-3">
                  <a
                    href={`tel:${(contactSettings?.phone || '+971500000000').replace(/\s/g, '')}`}
                    className="btn-primary w-full justify-center"
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${contactSettings?.whatsapp || '971500000000'}?text=I'm interested in: ${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${contactSettings?.email || 'contact@taznazim.com'}?subject=Enquiry: ${property.title}`}
                    className="btn-ghost w-full justify-center border border-white/10"
                  >
                    <Mail size={16} />
                    Send Email
                  </a>
                </div>

                <p className="text-white/30 text-xs font-sans text-center mt-6">
                  Response within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget settings={chatSettings || undefined} />
    </>
  );
}
