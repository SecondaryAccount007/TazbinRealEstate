import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import FeaturedProperties from '@/components/sections/FeaturedProperties';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import InstagramFeed from '@/components/sections/InstagramFeed';
import ContactSection from '@/components/sections/ContactSection';
import ChatWidget from '@/components/sections/ChatWidget';
import { getAllSettings, getSections, getProperties, getTestimonials } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch everything in parallel
  const [settings, sections, properties, testimonials] = await Promise.all([
    getAllSettings().catch((): Record<string, unknown> => ({})),
    getSections().catch(() => []),
    getProperties(true).catch(() => []),
    getTestimonials(true).catch(() => []),
  ]);

  // Check section visibility
  const sectionMap = Object.fromEntries(sections.map((s) => [s.name, s.visible]));
  const isVisible = (name: string) => sectionMap[name] !== false; // default to visible

  const heroSettings = settings.hero as Record<string, string> | null;
  const statsSettings = settings.stats as Record<string, unknown> | null;
  const aboutSettings = settings.about as Record<string, unknown> | null;
  const servicesSettings = settings.services as Record<string, unknown> | null;
  const contactSettings = settings.contact as Record<string, string> | null;
  const chatSettings = settings.chat as Record<string, unknown> | null;

  return (
    <>
      <Navbar />
      <main>
        {isVisible('hero') && <Hero settings={heroSettings || undefined} />}
        {isVisible('stats') && <Stats settings={statsSettings || undefined} />}
        {isVisible('properties') && <FeaturedProperties properties={properties} />}
        {isVisible('about') && <About settings={aboutSettings || undefined} />}
        {isVisible('services') && <Services settings={servicesSettings || undefined} />}
        {isVisible('testimonials') && <Testimonials testimonials={testimonials} />}
        {isVisible('instagram') && <InstagramFeed />}
        {isVisible('contact') && <ContactSection settings={contactSettings || undefined} />}
      </main>
      <Footer />
      <ChatWidget settings={chatSettings || undefined} />
    </>
  );
}
