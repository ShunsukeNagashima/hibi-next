import type { Metadata } from 'next';
import './globals.css.ts';
import { PageTransitionWrapper } from '../components/PageTransition';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  throw new Error('NEXT_PUBLIC_SITE_URL environment variable is required');
}

export const metadata: Metadata = {
  title: '日々',
  description: 'Portfolio Site',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: '日々',
    description: 'Portfolio Site',
    images: `${siteUrl}/hibi-ogp.png`,
    url: siteUrl,
    type: 'website',
    siteName: '日々',
  },
  twitter: {
    card: 'summary_large_image',
    title: '日々',
    description: 'Portfolio Site',
    images: `${siteUrl}/hibi-ogp.png`,
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
