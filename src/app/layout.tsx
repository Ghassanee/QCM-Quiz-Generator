import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quizmo',
  description: 'Interactive quiz application with modern design',
  metadataBase: new URL('https://quizmo.top'), // Replace with your actual URL
  openGraph: {
    title: 'Quizmo',
    description: 'Interactive quiz application with modern design',
    url: 'https://quizmo.top', // Replace with your actual URL
    siteName: 'Quizmo',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/logo.png',
        type: 'image/png',
        rel: 'icon', // <-- add this!
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
