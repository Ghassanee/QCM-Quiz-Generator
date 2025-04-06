// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import ClientLayout from './ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Quizmo - Create & Share Interactive Quizzes',
    template: '%s | Quizmo',
  },
  description:
    'Create, share, and take interactive quizzes with beautiful UI. Perfect for educators, content creators, and teams.',
  metadataBase: new URL('https://quizmo.top'),
  keywords: [
    'quiz',
    'interactive quiz',
    'quiz maker',
    'quiz creator',
    'online quiz',
    'education technology',
    'learning tools',
  ],
  openGraph: {
    title: 'Quizmo - Interactive Quiz Platform',
    description: 'Create and share beautiful interactive quizzes in seconds',
    url: 'https://quizmo.top',
    siteName: 'Quizmo',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quizmo - Interactive Quiz Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quizmo - Interactive Quiz Platform',
    description: 'Create and share beautiful interactive quizzes in seconds',
    creator: '@quizmoapp',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-200`}
      >
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
