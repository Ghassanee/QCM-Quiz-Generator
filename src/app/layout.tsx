// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Quizmo',
  description: 'Interactive quiz application with modern design',
  metadataBase: new URL('https://quizmo.top'),
  openGraph: {
    title: 'Quizmo',
    description: 'Interactive quiz application with modern design',
    url: 'https://quizmo.top',
    siteName: 'Quizmo',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
