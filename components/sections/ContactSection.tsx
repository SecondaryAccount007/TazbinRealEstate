'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Linkedin, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

type ContactSettings = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  office_hours?: string;
};

export default function ContactSection({ settings }: { settings?: ContactSettings }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', interest: 'buying' });
  const [loading, setLoading] = useState(false);

  const phone = settings?.phone || '+971 50 000 0000';
  const email = settings?.email || 'contact@taznazim.com';
  const whatsapp = settings?.whatsapp || '971500000000';
  const address = settings?.address || 'Dubai, UAE';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Message sent! We\'ll be in touch shortly.');
        setForm({ name: '', email: '', phone: '', message: '', interest: 'buying' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-obsidian-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Let&apos;s Talk</span>
            <div className="gold-divider mt-4" />
            <h2 className="section-title mt-2 mb-6">
              Begin Your Dubai<br />
              <span className="text-gradient-gold">Property Journey</span>
            </h2>
            <p className="text-white/55 font-sans text-base leading-relaxed mb-12">
              Whether you&apos;re buying, selling, or investing, I&apos;m here to provide expert guidance
              tailored to your goals. Reach out and let&apos;s find the perfect property for you.
            </p>

            {/* Contact Info */}
            <div className="space-y-5 mb-12">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 border border-gold/30 group-hover:border-gold group-hover:bg-gold/10 flex items-center justify-center transition-all duration-300">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/30 text-xs font-sans tracking-widest uppercase mb-0.5">Phone</p>
                  <p className="text-white text-sm font-sans group-hover:text-gold transition-colors">{phone}</p>
                </div>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 border border-gold/30 group-hover:border-gold group-hover:bg-gold/10 flex items-center justify-center transition-all duration-300">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/30 text-xs font-sans tracking-widest uppercase mb-0.5">Email</p>
                  <p className="text-white text-sm font-sans group-hover:text-gold transition-colors">{email}</p>
                </div>
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 border border-gold/30 group-hover:border-gold group-hover:bg-gold/10 flex items-center justify-center transition-all duration-300">
                  <MessageCircle size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/30 text-xs font-sans tracking-widest uppercase mb-0.5">WhatsApp</p>
                  <p className="text-white text-sm font-sans group-hover:text-gold transition-colors">Chat on WhatsApp</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/30 text-xs font-sans tracking-widest uppercase mb-0.5">Location</p>
                  <p className="text-white text-sm font-sans">{address}</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/tazbnnazim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-xs font-sans tracking-wider"
              >
                <Instagram size={16} /> @tazbnnazim
              </a>
              <a
                href="https://au.linkedin.com/in/taznazs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-xs font-sans tracking-wider"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-obsidian-200 border border-white/5 p-8 space-y-5">
              <h3 className="font-serif text-xl text-white mb-6">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="admin-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="admin-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="input-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="admin-label">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="admin-label">I&apos;m Interested In</label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="input-dark"
                  >
                    <option value="buying">Buying a Property</option>
                    <option value="selling">Selling a Property</option>
                    <option value="investing">Investment Advice</option>
                    <option value="renting">Renting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your property needs..."
                  className="input-dark resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </button>

              <p className="text-white/30 text-xs font-sans text-center">
                Your information is kept strictly confidential.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
