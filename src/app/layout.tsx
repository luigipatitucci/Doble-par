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
  title: 'DOBLEPAR | Agencia Creativa & Audiovisual',
  description:
    'Convertimos ideas en universos coexistentes. Agencia creativa y audiovisual especializada en contenido visual con inteligencia artificial.',
  keywords: [
    'agencia creativa',
    'audiovisual',
    'inteligencia artificial',
    'IA',
    'contenido visual',
    'video',
    'branding',
    'narrativa',
    'experiencias',
  ],
  authors: [{ name: 'DOBLEPAR' }],
  creator: 'DOBLEPAR',
  publisher: 'DOBLEPAR',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://doblepar.com',
    title: 'DOBLEPAR | Agencia Creativa & Audiovisual',
    description:
      'Convertimos ideas en universos coexistentes. Agencia creativa y audiovisual especializada en contenido visual con inteligencia artificial.',
    siteName: 'DOBLEPAR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOBLEPAR | Agencia Creativa & Audiovisual',
    description:
      'Convertimos ideas en universos coexistentes. Agencia creativa y audiovisual especializada en contenido visual con inteligencia artificial.',
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
