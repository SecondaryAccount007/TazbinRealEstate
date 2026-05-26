# Taz Nazim Real Estate Website

A professional luxury real estate website for Dubai, built with Next.js 14 and Supabase.

---

## 🚀 Quick Setup Guide (Step by Step)

### Step 1 — Create a Supabase Account (Free)

1. Go to **[supabase.com](https://supabase.com)** and sign up (free)
2. Click **"New Project"**
3. Choose a name (e.g. `taz-real-estate`), set a database password, choose a region near Dubai (e.g. `eu-west-1`)
4. Wait ~2 minutes for your project to be created

### Step 2 — Set Up the Database

1. In Supabase, click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the file `supabase/schema.sql` from this project
4. Copy everything in that file and paste it into the SQL editor
5. Click **Run** — this creates all tables and default content

### Step 3 — Get Your API Keys

In Supabase, go to **Project Settings → API**:
- Copy **Project URL** → this is your `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon / public key** → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy **service_role key** → this is your `SUPABASE_SERVICE_ROLE_KEY`

### Step 4 — Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
ADMIN_PASSWORD=choose-a-strong-password
JWT_SECRET=any-random-32+-character-string
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

### Step 5 — Deploy to Vercel (Free)

1. Push this project to GitHub (create a new repo)
2. Go to **[vercel.com](https://vercel.com)** and sign in
3. Click **"Add New Project"** → import from GitHub
4. In **Environment Variables**, add all variables from your `.env.local`
5. Click **Deploy** — your site will be live in ~2 minutes!

---

## 🔐 Admin Panel

Access your admin panel at:
```
https://your-site.com/admin
```

Password: whatever you set as `ADMIN_PASSWORD`

### What You Can Do in Admin:

| Section | What You Can Do |
|---------|----------------|
| **Dashboard** | Overview of your site content |
| **Properties** | Add, edit, delete property listings |
| **Testimonials** | Add, edit, show/hide client reviews |
| **Page Sections** | Toggle entire sections on/off |
| **Site Settings** | Edit hero text, about bio, contact info, chat webhook |

---

## 💬 Setting Up the Chat Widget (n8n)

1. In n8n, create a workflow with a **Webhook** trigger
2. Copy the webhook URL from n8n
3. In Admin Panel → **Site Settings** → **Chat Widget (n8n)**
4. Paste the webhook URL
5. Click Save — the chat button appears immediately on your site

---

## 🖼️ Adding/Updating Images

For property and profile images:

**Option A — Supabase Storage (Recommended):**
1. In Supabase, go to **Storage**
2. Create a bucket called `images` (set to public)
3. Upload your images
4. Copy the public URL and paste in the admin panel

**Option B — Paste any image URL:**
- The admin fields accept any public image URL (Unsplash, Dropbox, Google Drive direct link, etc.)

---

## ✏️ Common Tasks

**Change agent photo:**
Admin → Site Settings → About Section → Agent Photo URL

**Change hero background:**
Admin → Site Settings → Hero Section → Background Image URL

**Add a new property:**
Admin → Properties → Add Property

**Hide a section:**
Admin → Page Sections → toggle off

**Set up WhatsApp:**
Admin → Site Settings → Contact Info → WhatsApp Number (digits only, e.g. `971501234567`)

---

## 🛠️ Local Development

```bash
npm install
cp .env.local.example .env.local
# Fill in your .env.local values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              ← Homepage
│   ├── properties/           ← Property listings + detail pages
│   ├── about/                ← Agent profile
│   ├── contact/              ← Contact page
│   ├── admin/                ← Admin panel (password protected)
│   └── api/                  ← Backend API routes
├── components/
│   ├── layout/               ← Navbar, Footer
│   ├── sections/             ← Page sections (Hero, About, etc.)
│   └── ui/                   ← Reusable components
├── lib/
│   ├── supabase.ts           ← Database client
│   ├── auth.ts               ← Admin authentication
│   └── db.ts                 ← Data access functions
└── supabase/
    └── schema.sql            ← Database setup script
```

---

Built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.
