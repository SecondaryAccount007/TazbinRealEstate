import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized clients — only created when first called (not at module load time),
// so the build phase works even without env vars present.
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return _supabaseAdmin;
}

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  price_display: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  area_unit: string;
  property_type: string;
  status: 'available' | 'sold' | 'under-offer';
  featured: boolean;
  images: string[];
  amenities: string[];
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  client_title: string;
  client_photo: string;
  content: string;
  rating: number;
  property_type: string;
  visible: boolean;
  created_at: string;
};

export type Section = {
  id: string;
  name: string;
  label: string;
  visible: boolean;
  order_index: number;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
};
