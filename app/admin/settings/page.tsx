'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, ChevronDown, ChevronRight, Info, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

type SettingsData = Record<string, Record<string, unknown>>;

const TABS = [
  { key: 'hero', label: 'Hero Section' },
  { key: 'about', label: 'About Section' },
  { key: 'stats', label: 'Statistics' },
  { key: 'contact', label: 'Contact Info' },
  { key: 'social', label: 'Social Links' },
  { key: 'chat', label: 'Chat Widget (n8n)' },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<SettingsData>({});
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const res = await fetch('/api/settings');
    setSettings(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const setField = (section: string, key: string, value: unknown) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [key]: value },
    }));
  };

  const saveSection = async (section: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/settings/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings[section] || {}),
      });
      if (res.ok) toast.success('Settings saved! Changes are live.');
      else toast.error('Failed to save settings.');
    } catch { toast.error('Something went wrong.'); }
    finally { setSaving(false); }
  };

  const s = settings[activeTab] || {};

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 size={24} className="text-gold animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">Site Settings</h1>
        <p className="text-white/40 text-sm font-sans mt-1">Manage your website content and configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab List */}
        <div className="lg:w-48 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-sans whitespace-nowrap rounded transition-all ${
                activeTab === tab.key
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === tab.key ? <ChevronRight size={14} /> : <ChevronDown size={14} className="opacity-0" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 admin-card space-y-6">
          {/* HERO */}
          {activeTab === 'hero' && (
            <>
              <div>
                <label className="admin-label">Main Headline</label>
                <input className="admin-input" value={(s.title as string) || ''} onChange={(e) => setField('hero', 'title', e.target.value)} placeholder="Find Your Dream Property in Dubai" />
                <p className="text-white/30 text-xs font-sans mt-1">Use a newline character (\n) to split into two lines</p>
              </div>
              <div>
                <label className="admin-label">Subtitle / Tagline</label>
                <textarea rows={2} className="admin-input resize-none" value={(s.subtitle as string) || ''} onChange={(e) => setField('hero', 'subtitle', e.target.value)} placeholder="Dubai's premier luxury real estate..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Primary Button Text</label>
                  <input className="admin-input" value={(s.cta_primary as string) || ''} onChange={(e) => setField('hero', 'cta_primary', e.target.value)} placeholder="Explore Properties" />
                </div>
                <div>
                  <label className="admin-label">Secondary Button Text</label>
                  <input className="admin-input" value={(s.cta_secondary as string) || ''} onChange={(e) => setField('hero', 'cta_secondary', e.target.value)} placeholder="Contact Taz" />
                </div>
              </div>
              <div>
                <label className="admin-label">Background Image URL</label>
                <input className="admin-input" value={(s.background_image as string) || ''} onChange={(e) => setField('hero', 'background_image', e.target.value)} placeholder="https://images.unsplash.com/..." />
                <p className="text-white/30 text-xs font-sans mt-1">Paste a URL from Supabase storage or any image host. Best: 1920×1080px landscape.</p>
              </div>
            </>
          )}

          {/* ABOUT */}
          {activeTab === 'about' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Agent Name</label>
                  <input className="admin-input" value={(s.name as string) || ''} onChange={(e) => setField('about', 'name', e.target.value)} placeholder="Taz Nazim" />
                </div>
                <div>
                  <label className="admin-label">Title / Role</label>
                  <input className="admin-input" value={(s.title as string) || ''} onChange={(e) => setField('about', 'title', e.target.value)} placeholder="Dubai's Premier Real Estate Specialist" />
                </div>
              </div>
              <div>
                <label className="admin-label">Biography</label>
                <textarea rows={5} className="admin-input resize-none" value={(s.bio as string) || ''} onChange={(e) => setField('about', 'bio', e.target.value)} placeholder="Your story and expertise..." />
              </div>
              <div>
                <label className="admin-label">Agent Photo URL</label>
                <input className="admin-input" value={(s.photo as string) || ''} onChange={(e) => setField('about', 'photo', e.target.value)} placeholder="https://..." />
                <p className="text-white/30 text-xs font-sans mt-1">Professional headshot. Best: portrait orientation, at least 600px wide.</p>
              </div>
              <div>
                <label className="admin-label">Achievements / Credentials</label>
                <div className="space-y-2">
                  {((s.achievements as string[]) || []).map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <input className="admin-input flex-1" value={a} onChange={(e) => {
                        const arr = [...((s.achievements as string[]) || [])];
                        arr[i] = e.target.value;
                        setField('about', 'achievements', arr);
                      }} />
                      <button onClick={() => {
                        const arr = ((s.achievements as string[]) || []).filter((_, idx) => idx !== i);
                        setField('about', 'achievements', arr);
                      }} className="text-white/30 hover:text-red-400 transition-colors px-2"><X size={15} /></button>
                    </div>
                  ))}
                  <button onClick={() => setField('about', 'achievements', [...((s.achievements as string[]) || []), ''])}
                    className="flex items-center gap-2 text-gold/60 hover:text-gold text-xs font-sans transition-colors mt-1">
                    <Plus size={14} /> Add Achievement
                  </button>
                </div>
              </div>
            </>
          )}

          {/* STATS */}
          {activeTab === 'stats' && (
            <div>
              <label className="admin-label">Statistics Items</label>
              <p className="text-white/30 text-xs font-sans mb-4">These numbers appear in the strip below the hero.</p>
              <div className="space-y-3">
                {((s.items as { value: string; label: string }[]) || []).map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input className="admin-input w-32" placeholder="500+" value={item.value} onChange={(e) => {
                      const items = [...((s.items as { value: string; label: string }[]) || [])];
                      items[i] = { ...items[i], value: e.target.value };
                      setField('stats', 'items', items);
                    }} />
                    <input className="admin-input flex-1" placeholder="Properties Sold" value={item.label} onChange={(e) => {
                      const items = [...((s.items as { value: string; label: string }[]) || [])];
                      items[i] = { ...items[i], label: e.target.value };
                      setField('stats', 'items', items);
                    }} />
                    <button onClick={() => {
                      const items = ((s.items as { value: string; label: string }[]) || []).filter((_, idx) => idx !== i);
                      setField('stats', 'items', items);
                    }} className="text-white/30 hover:text-red-400 transition-colors px-2"><X size={15} /></button>
                  </div>
                ))}
                <button onClick={() => setField('stats', 'items', [...((s.items as { value: string; label: string }[]) || []), { value: '', label: '' }])}
                  className="flex items-center gap-2 text-gold/60 hover:text-gold text-xs font-sans transition-colors mt-1">
                  <Plus size={14} /> Add Statistic
                </button>
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === 'contact' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Email Address</label>
                  <input type="email" className="admin-input" value={(s.email as string) || ''} onChange={(e) => setField('contact', 'email', e.target.value)} placeholder="contact@taznazim.com" />
                </div>
                <div>
                  <label className="admin-label">Phone Number</label>
                  <input className="admin-input" value={(s.phone as string) || ''} onChange={(e) => setField('contact', 'phone', e.target.value)} placeholder="+971 50 000 0000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">WhatsApp Number (digits only)</label>
                  <input className="admin-input" value={(s.whatsapp as string) || ''} onChange={(e) => setField('contact', 'whatsapp', e.target.value)} placeholder="971500000000" />
                  <p className="text-white/30 text-xs font-sans mt-1">No + sign, no spaces. e.g. 971501234567</p>
                </div>
                <div>
                  <label className="admin-label">Office Address</label>
                  <input className="admin-input" value={(s.address as string) || ''} onChange={(e) => setField('contact', 'address', e.target.value)} placeholder="Dubai, UAE" />
                </div>
              </div>
            </>
          )}

          {/* SOCIAL */}
          {activeTab === 'social' && (
            <>
              <div>
                <label className="admin-label">Instagram URL</label>
                <input className="admin-input" value={(s.instagram as string) || ''} onChange={(e) => setField('social', 'instagram', e.target.value)} placeholder="https://www.instagram.com/tazbnnazim/" />
              </div>
              <div>
                <label className="admin-label">LinkedIn URL</label>
                <input className="admin-input" value={(s.linkedin as string) || ''} onChange={(e) => setField('social', 'linkedin', e.target.value)} placeholder="https://au.linkedin.com/in/taznazs" />
              </div>
              <div>
                <label className="admin-label">Facebook URL (optional)</label>
                <input className="admin-input" value={(s.facebook as string) || ''} onChange={(e) => setField('social', 'facebook', e.target.value)} placeholder="https://facebook.com/..." />
              </div>
            </>
          )}

          {/* CHAT */}
          {activeTab === 'chat' && (
            <>
              <div className="admin-card bg-gold/5 border-gold/20 flex items-start gap-3">
                <Info size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm font-sans font-medium mb-1">n8n Chat Widget Setup</p>
                  <p className="text-white/40 text-xs font-sans leading-relaxed">
                    Paste your n8n webhook URL below. The chat widget will appear on every page automatically.
                    Leave empty to hide the chat widget.
                  </p>
                </div>
              </div>
              <div>
                <label className="admin-label">n8n Webhook URL *</label>
                <input className="admin-input" value={(s.webhook_url as string) || ''} onChange={(e) => setField('chat', 'webhook_url', e.target.value)} placeholder="https://your-n8n-instance.com/webhook/..." />
                <p className="text-white/30 text-xs font-sans mt-1">Copy this from your n8n workflow → Webhook node</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Bot Name</label>
                  <input className="admin-input" value={(s.bot_name as string) || ''} onChange={(e) => setField('chat', 'bot_name', e.target.value)} placeholder="Taz's Assistant" />
                </div>
              </div>
              <div>
                <label className="admin-label">Welcome Message</label>
                <textarea rows={3} className="admin-input resize-none" value={(s.initial_message as string) || ''} onChange={(e) => setField('chat', 'initial_message', e.target.value)} placeholder="Hello! I'm here to help you find your perfect property in Dubai..." />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${s.enabled !== false ? 'bg-gold' : 'bg-obsidian-400'}`}
                  onClick={() => setField('chat', 'enabled', s.enabled === false)}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${s.enabled !== false ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
                <span className="text-white/60 text-sm font-sans">Chat widget enabled</span>
              </label>
            </>
          )}

          {/* Save Button */}
          <div className="pt-4 border-t border-white/5">
            <button onClick={() => saveSection(activeTab)} disabled={saving} className="btn-primary disabled:opacity-40">
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
