'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { type Section } from '@/lib/supabase';

const SECTION_DESCRIPTIONS: Record<string, string> = {
  hero: 'The big full-screen banner at the top of your homepage.',
  stats: 'Numbers strip showing properties sold, years experience, etc.',
  properties: 'Featured property listings shown on the homepage.',
  about: 'Your bio, photo, and achievements section.',
  services: 'Grid of services you offer (buying, selling, investment, etc.).',
  testimonials: 'Client reviews and testimonials carousel.',
  instagram: 'Instagram photos grid linking to your profile.',
  contact: 'Contact form and your contact information.',
};

export default function AdminSections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchSections = async () => {
    setLoading(true);
    const res = await fetch('/api/sections');
    setSections(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchSections(); }, []);

  const toggleSection = async (section: Section) => {
    setToggling(section.name);
    try {
      const res = await fetch(`/api/sections/${section.name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !section.visible }),
      });
      if (res.ok) {
        toast.success(`${section.label} ${!section.visible ? 'shown' : 'hidden'} on website.`);
        fetchSections();
      } else {
        toast.error('Failed to update section.');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">Page Sections</h1>
        <p className="text-white/40 text-sm font-sans mt-1">
          Toggle which sections appear on your homepage. Changes take effect immediately.
        </p>
      </div>

      <div className="admin-card mb-6 flex items-start gap-3">
        <Info size={16} className="text-gold shrink-0 mt-0.5" />
        <p className="text-white/50 text-sm font-sans leading-relaxed">
          Each toggle controls whether that section shows on your public website.
          Turn off sections you don&apos;t want to display — they&apos;re not deleted, just hidden.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="text-gold animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.name}
              className={`admin-card transition-all ${!section.visible ? 'opacity-60' : 'hover:border-white/10'}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-sans text-white text-sm font-medium">{section.label}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded font-sans ${
                      section.visible
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-white/5 text-white/30'
                    }`}>
                      {section.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs font-sans">
                    {SECTION_DESCRIPTIONS[section.name] || ''}
                  </p>
                </div>
                <button
                  onClick={() => toggleSection(section)}
                  disabled={toggling === section.name}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 disabled:opacity-40 shrink-0 ${
                    section.visible ? 'bg-gold' : 'bg-obsidian-400'
                  }`}
                >
                  {toggling === section.name ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 size={12} className="text-white animate-spin" />
                    </div>
                  ) : (
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                      section.visible ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 admin-card">
        <p className="text-white/30 text-xs font-sans">
          💡 <strong className="text-white/50">Tip:</strong> To edit section content (text, images, etc.), go to{' '}
          <strong className="text-gold">Site Settings</strong>.
        </p>
      </div>
    </div>
  );
}
