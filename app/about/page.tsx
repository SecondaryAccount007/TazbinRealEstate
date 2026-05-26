import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/sections/ChatWidget';
import { getAllSettings } from '@/lib/db';
import { Instagram, Linkedin, Award, ArrowRight } from 'lucide-react';
import { PLACEHOLDER_AGENT_PHOTO } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const settings = await getAllSettings().catch((): Record<string, unknown> => ({}));
  const about = (settings.about as Record<string, unknown>) || {};
  const chat = settings.chat as Record<string, unknown> | null;

  const name = (about.name as string) || 'Taz Nazim';
  const title = (about.title as string) || "Dubai's Premier Real Estate Specialist";
  const bio = (about.bio as string) || 'With over a decade of experience in Dubai\'s luxury property market, Taz Nazim has built a reputation built on trust, expertise, and extraordinary results.';
  const photo = (about.photo as string) || PLACEHOLDER_AGENT_PHOTO;
  const achievements = (about.achievements as string[]) || ['Top 1% Agent in Dubai', 'AED 2B+ Sales Volume', 'RERA Certified', 'International Property Specialist'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 bg-obsidian-100 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 60px)' }}
          />
          <div className="max-w-7xl mx-auto px-6 relative">
            <span className="section-label">The Agent</span>
            <div className="gold-divider mt-4" />
            <h1 className="section-title mt-2">
              Meet<br />
              <span className="text-gradient-gold">{name}</span>
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-obsidian">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Photo */}
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/20" />
                <div className="absolute -inset-2 border border-gold/10" />
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={photo} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="flex gap-4 mt-6">
                  <a href="https://www.instagram.com/tazbnnazim/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-xs font-sans tracking-wider">
                    <Instagram size={16} /> @tazbnnazim
                  </a>
                  <a href="https://au.linkedin.com/in/taznazs" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-xs font-sans tracking-wider">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="pt-4">
                <h2 className="font-serif text-4xl text-white mb-2">{name}</h2>
                <p className="text-gold font-sans text-sm tracking-wider mb-8">{title}</p>
                <p className="text-white/60 font-sans text-base leading-relaxed mb-6">{bio}</p>
                <p className="text-white/50 font-sans text-base leading-relaxed mb-10">
                  Born with a passion for architecture and a natural instinct for market trends, Taz has become one of Dubai&apos;s most trusted names in real estate.
                  His clientele spans high-net-worth individuals, international investors, and families seeking their forever home in this remarkable city.
                </p>

                {/* Achievements */}
                <h3 className="font-serif text-2xl text-white mb-6">Credentials & Achievements</h3>
                <div className="space-y-3 mb-10">
                  {achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3 bg-obsidian-200 px-4 py-3.5 border border-white/5">
                      <Award size={16} className="text-gold shrink-0" />
                      <span className="text-white/70 font-sans text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link href="/contact" className="btn-primary">
                    Work With Taz <ArrowRight size={16} />
                  </Link>
                  <Link href="/properties" className="btn-secondary">
                    View Listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget settings={chat || undefined} />
    </>
  );
}
