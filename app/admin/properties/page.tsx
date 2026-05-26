'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Star, X, Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { type Property } from '@/lib/supabase';
import { DEFAULT_PROPERTY_IMAGE } from '@/lib/utils';

const EMPTY_PROPERTY = {
  title: '', description: '', price: 0, price_display: '',
  location: '', bedrooms: 0, bathrooms: 0, area: 0, area_unit: 'sqft',
  property_type: 'Apartment', status: 'available', featured: false,
  images: [] as string[], amenities: [] as string[],
};

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);
  const [form, setForm] = useState({ ...EMPTY_PROPERTY });
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [amenityInput, setAmenityInput] = useState('');

  const fetchProperties = async () => {
    setLoading(true);
    const res = await fetch('/api/properties');
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const openAdd = () => { setEditing(null); setForm({ ...EMPTY_PROPERTY }); setShowForm(true); };
  const openEdit = (p: Property) => { setEditing(p); setForm({ ...EMPTY_PROPERTY, ...p }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.title || !form.location) return toast.error('Title and location are required.');
    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/properties/${editing.id}` : '/api/properties';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(editing ? 'Property updated!' : 'Property added!');
        fetchProperties();
        closeForm();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to save property.');
      }
    } catch { toast.error('Something went wrong.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Property deleted.'); fetchProperties(); }
    else toast.error('Failed to delete.');
  };

  const addImage = () => {
    if (!imageUrl.trim()) return;
    setForm((f) => ({ ...f, images: [...(f.images || []), imageUrl.trim()] }));
    setImageUrl('');
  };

  const removeImage = (i: number) => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const addAmenity = () => {
    if (!amenityInput.trim()) return;
    setForm((f) => ({ ...f, amenities: [...(f.amenities || []), amenityInput.trim()] }));
    setAmenityInput('');
  };

  const removeAmenity = (i: number) => setForm((f) => ({ ...f, amenities: f.amenities.filter((_, idx) => idx !== i) }));

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Properties</h1>
          <p className="text-white/40 text-sm font-sans mt-1">{properties.length} listing{properties.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} /> Add Property
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="text-gold animate-spin" />
        </div>
      ) : properties.length === 0 ? (
        <div className="admin-card text-center py-16">
          <p className="text-white/30 font-sans text-sm">No properties yet. Add your first listing!</p>
          <button onClick={openAdd} className="btn-primary mt-6">
            <Plus size={16} /> Add First Property
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map((p) => (
            <div key={p.id} className="admin-card flex items-center gap-4 hover:border-white/10 transition-all">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-obsidian-200">
                <Image
                  src={p.images?.[0] || DEFAULT_PROPERTY_IMAGE}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-sans text-white text-sm font-medium truncate">{p.title}</h3>
                  {p.featured && <Star size={12} className="text-gold fill-gold shrink-0" />}
                </div>
                <p className="text-white/40 text-xs font-sans">{p.location} · {p.property_type}</p>
                <p className="text-gold text-xs font-sans mt-0.5">{p.price_display || `AED ${p.price?.toLocaleString()}`}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-sans px-2 py-0.5 rounded ${
                  p.status === 'available' ? 'bg-green-500/10 text-green-400' :
                  p.status === 'sold' ? 'bg-white/10 text-white/50' :
                  'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {p.status}
                </span>
                <button onClick={() => openEdit(p)} className="p-2 text-white/40 hover:text-gold transition-colors" title="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(p.id, p.title)} className="p-2 text-white/40 hover:text-red-400 transition-colors" title="Delete">
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
          <div className="w-full max-w-2xl h-screen bg-obsidian-100 border-l border-white/5 overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 sticky top-0 bg-obsidian-100 z-10">
              <h2 className="font-serif text-xl text-white">{editing ? 'Edit Property' : 'Add New Property'}</h2>
              <button onClick={closeForm} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-8 py-6 space-y-6">
              {/* Basic Info */}
              <div>
                <label className="admin-label">Property Title *</label>
                <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Penthouse at Burj Khalifa District" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Location *</label>
                  <input className="admin-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Downtown Dubai" />
                </div>
                <div>
                  <label className="admin-label">Property Type</label>
                  <select className="admin-input" value={form.property_type} onChange={(e) => setForm({ ...form, property_type: e.target.value })}>
                    {['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio', 'Office', 'Land'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Price (AED)</label>
                  <input type="number" className="admin-input" value={form.price || ''} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="15000000" />
                </div>
                <div>
                  <label className="admin-label">Price Display Text</label>
                  <input className="admin-input" value={form.price_display} onChange={(e) => setForm({ ...form, price_display: e.target.value })} placeholder="AED 15,000,000" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="admin-label">Bedrooms</label>
                  <input type="number" className="admin-input" value={form.bedrooms || ''} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="admin-label">Bathrooms</label>
                  <input type="number" className="admin-input" value={form.bathrooms || ''} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="admin-label">Area (sqft)</label>
                  <input type="number" className="admin-input" value={form.area || ''} onChange={(e) => setForm({ ...form, area: Number(e.target.value) })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Status</label>
                  <select className="admin-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'available' | 'sold' | 'under-offer' })}>
                    <option value="available">Available</option>
                    <option value="under-offer">Under Offer</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.featured ? 'bg-gold' : 'bg-obsidian-400'}`}
                      onClick={() => setForm({ ...form, featured: !form.featured })}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${form.featured ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                    <span className="text-white/60 text-sm font-sans">Featured on homepage</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea rows={4} className="admin-input resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Property details and highlights..." />
              </div>

              {/* Images */}
              <div>
                <label className="admin-label">Property Images</label>
                <div className="flex gap-2 mb-3">
                  <input className="admin-input flex-1" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste image URL here" onKeyDown={(e) => e.key === 'Enter' && addImage()} />
                  <button onClick={addImage} className="btn-secondary px-4 text-xs">Add</button>
                </div>
                <p className="text-white/30 text-xs font-sans mb-3">Paste URLs from Supabase storage, Unsplash, or any image host</p>
                <div className="grid grid-cols-3 gap-2">
                  {(form.images || []).map((img, i) => (
                    <div key={i} className="relative aspect-video group">
                      <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" sizes="150px" />
                      <button onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="admin-label">Amenities</label>
                <div className="flex gap-2 mb-3">
                  <input className="admin-input flex-1" value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} placeholder="e.g. Private Pool" onKeyDown={(e) => e.key === 'Enter' && addAmenity()} />
                  <button onClick={addAmenity} className="btn-secondary px-4 text-xs">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(form.amenities || []).map((a, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-obsidian-200 border border-white/10 px-3 py-1.5 text-xs font-sans text-white/70">
                      {a}
                      <button onClick={() => removeAmenity(i)} className="text-white/30 hover:text-red-400 transition-colors"><X size={11} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Footer */}
            <div className="px-8 py-6 border-t border-white/5 flex gap-3 sticky bottom-0 bg-obsidian-100">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-40">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : editing ? 'Save Changes' : 'Add Property'}
              </button>
              <button onClick={closeForm} className="btn-secondary px-6">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
