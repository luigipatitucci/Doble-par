import type { Metadata, Viewport } from 'next';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'DOBLEPAR | Creative & Audiovisual Studio',
  description:
    'We turn ideas into coexisting universes. Creative and audiovisual studio specialized in visual content with artificial intelligence.',
  keywords: [
    'creative studio',
    'audiovisual',
    'artificial intelligence',
    'AI',
    'visual content',
    'video',
    'branding',
    'narrative',
    'experiences',
  ],
  authors: [{ name: 'DOBLEPAR' }],
  creator: 'DOBLEPAR',
  publisher: 'DOBLEPAR',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://doblepar.com',
    title: 'DOBLEPAR | Creative & Audiovisual Studio',
    description:
      'We turn ideas into coexisting universes. Creative and audiovisual studio specialized in visual content with artificial intelligence.',
    siteName: 'DOBLEPAR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOBLEPAR | Creative & Audiovisual Studio',
    description:
      'We turn ideas into coexisting universes. Creative and audiovisual studio specialized in visual content with artificial intelligence.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
