import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/sections/ChatWidget';
import ContactSection from '@/components/sections/ContactSection';
import { getAllSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getAllSettings().catch((): Record<string, unknown> => ({}));
  const contact = settings.contact as Record<string, string> | null;
  const chat = settings.chat as Record<string, unknown> | null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-0 bg-obsidian-100 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <span className="section-label">Get In Touch</span>
            <div className="gold-divider mt-4" />
            <h1 className="section-title mt-2">
              Let&apos;s Start Your<br />
              <span className="text-gradient-gold">Dubai Journey</span>
            </h1>
          </div>
        </section>
        <ContactSection settings={contact || undefined} />
      </main>
      <Footer />
      <ChatWidget settings={chat || undefined} />
    </>
  );
}
