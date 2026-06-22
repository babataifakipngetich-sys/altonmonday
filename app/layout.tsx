import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'THE GRAND ALTON RESORT | Luxury Hotel in Kisumu, Kenya',
  description: 'Experience luxury, comfort, and personalized hospitality at The Grand Alton Resort, a premier hotel destination in Kisumu, Kenya. Elegant rooms, fine dining, conference facilities, and beautiful event spaces.',
  keywords: 'Grand Alton Resort, Kisumu hotel, luxury hotel Kenya, conference facilities Kisumu, wedding venue Kenya, lake victoria hotel',
  authors: [{ name: 'The Grand Alton Resort' }],
  openGraph: {
    title: 'THE GRAND ALTON RESORT | Luxury Hotel in Kisumu, Kenya',
    description: 'Experience luxury, comfort, and personalized hospitality at The Grand Alton Resort.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'THE GRAND ALTON RESORT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE GRAND ALTON RESORT | Luxury Hotel in Kisumu, Kenya',
    description: 'Experience luxury, comfort, and personalized hospitality at The Grand Alton Resort.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'THE GRAND ALTON RESORT',
              description: 'Premier hospitality destination in Kisumu, Kenya offering elegant accommodation, fine dining, and event spaces.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Otonglo, behind Kodiaga Prison',
                addressLocality: 'Kisumu',
                addressCountry: 'KE',
              },
              telephone: '+254794000020',
              email: 'thegrandaltonresort@gmail.com',
              priceRange: '$$$',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.5',
                reviewCount: '127',
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi' },
                { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
                { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
                { '@type': 'LocationFeatureSpecification', name: 'Conference Facilities' },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-inter antialiased`}>{children}</body>
    </html>
  );
}
