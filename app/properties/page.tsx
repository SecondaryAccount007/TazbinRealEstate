import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/sections/ChatWidget';
import PropertyCard from '@/components/ui/PropertyCard';
import { getProperties, getAllSettings } from '@/lib/db';
import { DEMO_PROPERTIES } from '@/lib/demo-data';

export const dynamic = 'force-dynamic';

export default async function PropertiesPage() {
  const [properties, settings] = await Promise.all([
    getProperties(false).catch(() => []),
    getAllSettings().catch((): Record<string, unknown> => ({})),
  ]);
  const chatSettings = settings.chat as Record<string, unknown> | null;
  const displayProperties = properties.length > 0 ? properties : DEMO_PROPERTIES;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-16 bg-obsidian-100 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <span className="section-label">Exclusive Listings</span>
            <div className="gold-divider mt-4" />
            <h1 className="section-title mt-2">
              Dubai&apos;s Finest<br />
              <span className="text-gradient-gold">Properties</span>
            </h1>
            <p className="text-white/50 font-sans text-base mt-4 max-w-xl">
              Explore our curated collection of Dubai&apos;s most exceptional properties — from iconic penthouses to waterfront estates.
            </p>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-20 bg-obsidian">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProperties.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget settings={chatSettings || undefined} />
    </>
  );
}
