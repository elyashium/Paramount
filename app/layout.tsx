import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { FloatingDock } from '@/components/navigation/floating-dock';
import { CommandPalette } from '@/components/search/command-palette';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { ChatbaseWidget } from '@/components/chat/chatbase-widget';

const inter = Inter({ subsets: ['latin'] });
import { StructuredData } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: 'Paramount Merchant Navy Institute - Excellence in Education',
  description: 'Premier merchant navy academy offering comprehensive courses, test series, and study materials for IMU-CET preparation.',
  keywords: ['merchant navy', 'IMU-CET', 'GME', 'marine engineering', 'deck cadet', 'sponsorship guidance', 'paramount merchant navy institute', 'maritime training'],
  metadataBase: new URL('https://www.paramountmerchantnavy.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', sizes: '512x512', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon.ico', sizes: '512x512', type: 'image/x-icon' },
    ],
  },
  openGraph: {
    title: 'Paramount Merchant Navy Institute',
    description: 'Excellence in Education - Comprehensive courses and test series for Merchant Navy exams.',
    images: [
      {
        url: '/logo.png', // Better for social sharing than a .ico
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paramount Merchant Navy Institute',
    description: 'Excellence in Education - Comprehensive courses and test series for Merchant Navy exams.',
    images: [
      {
        url: '/logo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <StructuredData />
          <ScrollProgress />
          <FloatingDock />
          <CommandPalette />
          <main className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
          <Toaster />
          <SonnerToaster />
          <ChatbaseWidget />
        </Providers>
      </body>
    </html>
  );
}
