'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Star, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { type Testimonial } from '@/lib/supabase';

const EMPTY = {
  client_name: '', client_title: '', client_photo: '',
  content: '', rating: 5, property_type: '', visible: true,
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const fetch$ = async () => {
    setLoading(true);
    const res = await fetch('/api/testimonials');
    setTestimonials(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetch$(); }, []);

  const openAdd = () => { setEditing(null); setForm({ ...EMPTY }); setShowForm(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ ...EMPTY, ...t }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.client_name || !form.content) return toast.error('Name and content are required.');
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/testimonials/${editing.id}` : '/api/testimonials';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(editing ? 'Updated!' : 'Testimonial added!');
        fetch$();
        closeForm();
      } else toast.error('Failed to save.');
    } catch { toast.error('Something went wrong.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Deleted.'); fetch$(); }
    else toast.error('Failed to delete.');
  };

  const toggleVisible = async (t: Testimonial) => {
    await fetch(`/api/testimonials/${t.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !t.visible }),
    });
    fetch$();
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Testimonials</h1>
          <p className="text-white/40 text-sm font-sans mt-1">{testimonials.length} total · {testimonials.filter((t) => t.visible).length} visible</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><Plus size={16} /> Add Testimonial</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="text-gold animate-spin" /></div>
      ) : testimonials.length === 0 ? (
        <div className="admin-card text-center py-16">
          <p className="text-white/30 font-sans text-sm">No testimonials yet.</p>
          <button onClick={openAdd} className="btn-primary mt-6"><Plus size={16} /> Add First Testimonial</button>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className={`admin-card flex items-start gap-4 transition-all ${!t.visible ? 'opacity-50' : 'hover:border-white/10'}`}>
              {t.client_photo && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                  <Image src={t.client_photo} alt={t.client_name} fill className="object-cover" sizes="48px" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-sans text-white text-sm font-medium">{t.client_name}</p>
                  {!t.visible && <span className="text-xs text-white/30 font-sans">(hidden)</span>}
                </div>
                <p className="text-gold text-xs font-sans mb-2">{t.client_title}</p>
                <p className="text-white/50 text-xs font-sans line-clamp-2">"{t.content}"</p>
                <div className="flex mt-2 gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={11} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleVisible(t)} className="p-2 text-white/40 hover:text-white transition-colors" title={t.visible ? 'Hide' : 'Show'}>
                  {t.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => openEdit(t)} className="p-2 text-white/40 hover:text-gold transition-colors" title="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-obsidian/80 backdrop-blur-sm">
          <div className="w-full max-w-xl h-screen bg-obsidian-100 border-l border-white/5 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 sticky top-0 bg-obsidian-100 z-10">
              <h2 className="font-serif text-xl text-white">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={closeForm} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>

            <div className="flex-1 px-8 py-6 space-y-5">
              <div><label className="admin-label">Client Name *</label>
                <input className="admin-input" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} placeholder="e.g. James & Sarah Mitchell" /></div>

              <div><label className="admin-label">Client Title / Property Type</label>
                <input className="admin-input" value={form.client_title} onChange={(e) => setForm({ ...form, client_title: e.target.value })} placeholder="e.g. Purchased: Palm Jumeirah Villa" /></div>

              <div><label className="admin-label">Client Photo URL</label>
                <input className="admin-input" value={form.client_photo} onChange={(e) => setForm({ ...form, client_photo: e.target.value })} placeholder="https://..." /></div>

              <div><label className="admin-label">Testimonial *</label>
                <textarea rows={5} className="admin-input resize-none" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="What did the client say..." /></div>

              <div>
                <label className="admin-label">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                      <Star size={22} className={n <= form.rating ? 'text-gold fill-gold' : 'text-white/20'} />
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.visible ? 'bg-gold' : 'bg-obsidian-400'}`}
                  onClick={() => setForm({ ...form, visible: !form.visible })}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${form.visible ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
                <span className="text-white/60 text-sm font-sans">Show on website</span>
              </label>
            </div>

            <div className="px-8 py-6 border-t border-white/5 flex gap-3 sticky bottom-0 bg-obsidian-100">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-40">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : editing ? 'Save Changes' : 'Add Testimonial'}
              </button>
              <button onClick={closeForm} className="btn-secondary px-6">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
