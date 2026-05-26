import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl text-white block">TAZ NAZIM</span>
              <span className="font-sans text-[9px] text-gold tracking-[0.4em] uppercase">Dubai Real Estate</span>
            </Link>
            <p className="text-white/50 text-sm font-sans leading-relaxed max-w-xs">
              Dubai&apos;s premier luxury real estate specialist, delivering exceptional properties
              and unmatched service in the world&apos;s most dynamic city.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://www.instagram.com/tazbnnazim/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://au.linkedin.com/in/taznazs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:contact@taznazim.com"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs text-gold tracking-[0.3em] uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/properties', label: 'Properties' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm font-sans hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs text-gold tracking-[0.3em] uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-white/50 text-sm font-sans">Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:+971500000000" className="text-white/50 text-sm font-sans hover:text-gold transition-colors">
                  +971 50 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a href="mailto:contact@taznazim.com" className="text-white/50 text-sm font-sans hover:text-gold transition-colors">
                  contact@taznazim.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-sans tracking-wider">
            © {currentYear} Taz Nazim Real Estate. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-sans">
            Dubai&apos;s Luxury Property Specialist
          </p>
        </div>
      </div>
    </footer>
  );
}
