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

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paramount Coaching Institute - Excellence in Education',
  description: 'Premier coaching institute offering comprehensive courses, test series, and study materials for competitive exams',
  openGraph: {
    title: 'Paramount Coaching Institute',
    description: 'Excellence in Education - Comprehensive courses and test series',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paramount Coaching Institute',
    description: 'Excellence in Education - Comprehensive courses and test series',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
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
        </Providers>
      </body>
    </html>
  );
}
