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

export const metadata: Metadata = {
  title: 'Paramount Merchant Navy - Excellence in Education',
  description: 'Premier coaching institute offering comprehensive courses, test series, and study materials for merchant navy and IMU-CET preparation.',
  keywords: ['merchant navy', 'IMU-CET', 'GME', 'marine engineering', 'deck cadet', 'sponsorship guidance', 'paramount coaching', 'maritime training'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Paramount Merchant Navy',
    description: 'Excellence in Education - Comprehensive courses and test series for Merchant Navy exams.',
    images: [
      {
        url: '/logo.png', // Better for social sharing than a .ico
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paramount Merchant Navy',
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
