import './globals.css'
import { DEFAULT_SEO } from './seo'

export const metadata = {
  ...DEFAULT_SEO,
  manifest: '/manifest.json',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OffClock',
  url: 'https://offclock.in',
  description: 'Real friends and weekend events for corporate employees in India.',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web, Android, iOS',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '120' },
  author: { '@type': 'Organization', name: 'OffClock', url: 'https://offclock.in' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.anthropic.com" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Gurugram, Haryana, India" />
        <meta name="language" content="English, Hindi" />
        <meta name="target" content="all" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body>
        {/* No wrapper here — each layout handles its own width */}
        {children}
      </body>
    </html>
  )
}