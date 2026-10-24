import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { EARLY_INSTALL_SCRIPT } from '@/lib/install';

const META_PIXEL = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1452293013714362');
fbq('track', 'PageView');`;
const META_PIXEL_NOSCRIPT = `<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1452293013714362&ev=PageView&noscript=1"
/>`;

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
