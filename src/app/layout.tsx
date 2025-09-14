import type { Metadata } from 'next';
import './globals.css.ts';
import { PageTransitionWrapper } from '../components/PageTransition';

export const metadata: Metadata = {
  title: '日々',
  description: 'Portfolio Site',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: '日々',
    description: 'Portfolio Site',
    images: '/hibi-ogp.png',
    url: 'https://hibi-atelier.com',
    type: 'website',
    siteName: '日々',
  },
  twitter: {
    card: 'summary_large_image',
    title: '日々',
    description: 'Portfolio Site',
    images: '/hibi-ogp.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </body>
    </html>
  );
}
