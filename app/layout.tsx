import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taz Nazim | Dubai Luxury Real Estate',
  description: 'Dubai\'s premier luxury real estate agent. Find exclusive villas, penthouses, and apartments in Dubai\'s most prestigious locations.',
  keywords: 'Dubai real estate, luxury property Dubai, Dubai villas, Dubai apartments, property investment Dubai',
  openGraph: {
    title: 'Taz Nazim | Dubai Luxury Real Estate',
    description: 'Dubai\'s premier luxury real estate agent. Exclusive properties in the world\'s most dynamic city.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-white antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#fff',
              border: '1px solid rgba(201,169,110,0.3)',
              borderRadius: '0',
              fontFamily: 'var(--font-inter)',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#C9A96E', secondary: '#0A0A0A' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
