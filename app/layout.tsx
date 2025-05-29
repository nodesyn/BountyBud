import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Use dynamic import with SSR disabled for components that use client-side features
const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false,
});

const ThemeProvider = dynamic(() => import('@/components/ThemeProvider'), {
  ssr: false,
});

const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
});

const PWAInstallPrompt = dynamic(() => import('@/components/PWAInstallPrompt'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0070f3',
};

export const metadata: Metadata = {
  title: 'BountyBud - Bug Bounty Hunting Toolkit',
  description: 'A comprehensive toolkit for bug bounty hunters and security researchers.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BountyBud',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navigation />
          <main className="mx-auto w-full py-12 flex-grow">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
          <Footer />
          <Analytics />
          <PWAInstallPrompt />
        </ThemeProvider>
        <Script src="/sw-register.js" strategy="afterInteractive" />
      </body>
    </html>
  );
} 