import './globals.css'
import BottomNav from '@/components/BottomNav'
import { DEFAULT_SEO } from './seo'

export const metadata = {
  ...DEFAULT_SEO,
  manifest: '/manifest.json',
}

// Structured Data (JSON-LD) — helps Google understand your app
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OffClock',
  url: 'https://offclock.in',
  description: 'Real friends and weekend events for corporate employees in India.',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web, Android, iOS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '120',
  },
  author: {
    '@type': 'Organization',
    name: 'OffClock',
    url: 'https://offclock.in',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.anthropic.com" />
        {/* Geo targeting for India */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Gurugram, Haryana, India" />
        <meta name="language" content="English, Hindi" />
        <meta name="target" content="all" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body>
        <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh',
          background: '#F9F6F2', position: 'relative', paddingBottom: 72 }}>
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  )
}