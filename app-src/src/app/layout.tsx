import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { EARLY_INSTALL_SCRIPT } from '@/lib/install';

export const metadata: Metadata = {
  title: 'Wall Pilates · 21-Day Challenge',
  description: 'Your 21-day Wall Pilates challenge: guided workouts, missions, achievements and Lili as your companion.',
  manifest: '/app/manifest.webmanifest',
  icons: { icon: '/app/icons/icon-192.png', apple: '/app/icons/apple-touch-icon.png' },
  appleWebApp: { capable: true, title: 'Pilates 21', statusBarStyle: 'default' },
};

export const viewport: Viewport = {
  themeColor: '#2A0C23',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <script dangerouslySetInnerHTML={{ __html: EARLY_INSTALL_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
