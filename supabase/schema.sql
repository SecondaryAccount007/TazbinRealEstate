-- ============================================================
-- TAZ NAZIM REAL ESTATE — DATABASE SCHEMA
-- Run this in Supabase → SQL Editor
-- ============================================================

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL DEFAULT 0,
  price_display TEXT DEFAULT '',
  location TEXT DEFAULT '',
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area DECIMAL DEFAULT 0,
  area_unit TEXT DEFAULT 'sqft',
  property_type TEXT DEFAULT 'Apartment',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'under-offer')),
  featured BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT DEFAULT '',
  client_photo TEXT DEFAULT '',
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  property_type TEXT DEFAULT '',
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sections visibility
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  visible BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0
);

-- Site settings (flexible key/value JSON storage)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read everything
CREATE POLICY "Public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Service role can do everything (used by our admin API)
CREATE POLICY "Service role all properties" ON properties USING (auth.role() = 'service_role');
CREATE POLICY "Service role all testimonials" ON testimonials USING (auth.role() = 'service_role');
CREATE POLICY "Service role all sections" ON sections USING (auth.role() = 'service_role');
CREATE POLICY "Service role all settings" ON site_settings USING (auth.role() = 'service_role');

-- ─── Seed Default Sections ────────────────────────────────────────────────────

INSERT INTO sections (name, label, visible, order_index) VALUES
  ('hero',         'Hero Section',        true, 1),
  ('stats',        'Statistics Strip',    true, 2),
  ('properties',   'Featured Properties', true, 3),
  ('about',        'About Section',       true, 4),
  ('services',     'Services Grid',       true, 5),
  ('testimonials', 'Testimonials',        true, 6),
  ('instagram',    'Instagram Feed',      true, 7),
  ('contact',      'Contact Section',     true, 8)
ON CONFLICT (name) DO NOTHING;

-- ─── Seed Default Settings ────────────────────────────────────────────────────

INSERT INTO site_settings (key, value) VALUES
  ('hero', '{
    "title": "Find Your Dream\nProperty in Dubai",
    "subtitle": "Dubai''s premier luxury real estate specialist — curating exceptional homes in the world''s most dynamic city.",
    "cta_primary": "Explore Properties",
    "cta_secondary": "Contact Taz",
    "background_image": ""
  }'),
  ('about', '{
    "name": "Taz Nazim",
    "title": "Dubai''s Premier Real Estate Specialist",
    "bio": "With over a decade of experience navigating Dubai''s dynamic luxury property market, I''ve built a reputation for delivering results that exceed expectations. My deep market knowledge, extensive network, and unwavering commitment to clients set me apart.",
    "bio_extra": "From Palm Jumeirah villas to Downtown penthouses, I specialize in connecting discerning buyers and sellers with exceptional properties that align with their vision and investment goals.",
    "photo": "",
    "achievements": ["Top 1% Agent in Dubai", "AED 2B+ in Sales Volume", "RERA Certified Broker", "International Property Specialist"]
  }'),
  ('stats', '{
    "items": [
      {"value": "500+", "label": "Properties Sold"},
      {"value": "AED 2B+", "label": "Total Sales Volume"},
      {"value": "10+", "label": "Years Experience"},
      {"value": "98%", "label": "Client Satisfaction"}
    ]
  }'),
  ('contact', '{
    "email": "contact@taznazim.com",
    "phone": "+971 50 000 0000",
    "whatsapp": "971500000000",
    "address": "Dubai, UAE",
    "office_hours": "Mon-Fri: 9AM - 6PM"
  }'),
  ('social', '{
    "instagram": "https://www.instagram.com/tazbnnazim/",
    "linkedin": "https://au.linkedin.com/in/taznazs",
    "facebook": "",
    "twitter": ""
  }'),
  ('chat', '{
    "enabled": true,
    "webhook_url": "",
    "bot_name": "Taz''s Assistant",
    "initial_message": "Hello! I''m here to help you find your perfect property in Dubai. How can I assist you today?"
  }'),
  ('services', '{
    "items": [
      {"title": "Luxury Property Sales", "description": "Expert guidance buying and selling Dubai''s most prestigious residences.", "icon": "building"},
      {"title": "Investment Advisory", "description": "Strategic opportunities in Dubai''s thriving property market with data-driven insights.", "icon": "trending-up"},
      {"title": "Property Management", "description": "End-to-end management of your Dubai investments.", "icon": "key"},
      {"title": "Market Intelligence", "description": "In-depth valuations and market analysis for informed decisions.", "icon": "bar-chart"},
      {"title": "International Buyers", "description": "Dedicated support for overseas investors navigating Dubai''s legal framework.", "icon": "globe"},
      {"title": "Off-Plan Specialist", "description": "Access to exclusive off-plan projects from Dubai''s leading developers.", "icon": "shield"}
    ]
  }')
ON CONFLICT (key) DO NOTHING;

-- ─── Sample Properties ────────────────────────────────────────────────────────
-- (Optional: uncomment to add sample data)

/*
INSERT INTO properties (title, description, price, price_display, location, bedrooms, bathrooms, area, property_type, status, featured, images) VALUES
('Penthouse at Burj Khalifa District',
 'An extraordinary penthouse with panoramic views of Dubai Fountain and Burj Khalifa.',
 15000000, 'AED 15,000,000', 'Downtown Dubai', 4, 5, 6500, 'Penthouse', 'available', true,
 ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80']),

('Waterfront Villa, Palm Jumeirah',
 'Exclusive beachfront villa with private beach, infinity pool, and stunning sea views.',
 45000000, 'AED 45,000,000', 'Palm Jumeirah', 6, 7, 12000, 'Villa', 'available', true,
 ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80']);
*/
