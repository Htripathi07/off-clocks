const BASE_URL = 'https://offclock.in'

export const DEFAULT_SEO = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OffClock — Real Friends for Corporate India',
    template: '%s | OffClock',
  },
  description: 'Feeling lonely after work? OffClock helps corporate employees in Gurugram, Bengaluru & Mumbai build real friendships, find weekend events, and beat burnout. Not therapy. Just real people.',
  keywords: [
    'corporate loneliness India',
    'weekend plans Gurugram',
    'corporate employees friends',
    'work life balance India',
    'corporate burnout help',
    'make friends in Gurugram',
    'corporate wellness app India',
    'weekend events Delhi NCR',
    'mental health corporate India',
    'offclock app',
    'new to city meetup Gurugram',
    'corporate social club India',
    'AI buddy for stress',
    'anonymous vent work stress',
    'corporate employees community',
    'work friends app India',
    'weekend social events Bengaluru',
    'corporate India mental wellness',
  ],
  authors: [{ name: 'OffClock', url: BASE_URL }],
  creator: 'OffClock',
  publisher: 'OffClock',
  category: 'lifestyle',
  applicationName: 'OffClock',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'OffClock',
    title: 'OffClock — Real Friends for Corporate India',
    description: 'Work colleagues everywhere. Real friends nowhere. OffClock fixes that — weekend events, AI buddy, anonymous vent space for corporate India.',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'OffClock — Real Friends for Corporate India',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OffClock — Real Friends for Corporate India',
    description: 'Weekend events, AI buddy & community for lonely corporate employees in India.',
    images: [`${BASE_URL}/og-image.png`],
    creator: '@offclockapp',
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: 'your-google-verification-code',   // ← replace after Google Search Console setup
  },
}

// Per-page SEO — import and use in each page
export const PAGE_SEO = {
  home: {
    title: 'OffClock — Beat Corporate Loneliness | Weekend Events Gurugram',
    description: 'Feeling lonely after work? OffClock connects corporate employees in Gurugram & Delhi NCR through curated weekend events and real friendships.',
    alternates: { canonical: `${BASE_URL}/` },
  },
  buddy: {
    title: 'AI Buddy — Talk to Someone Who Gets Corporate Life',
    description: 'Chat with your AI dost in Hinglish, Hindi or English. Vent, get advice or just have a real conversation. No judgment, available 24/7.',
    alternates: { canonical: `${BASE_URL}/buddy` },
  },
  vent: {
    title: 'Anonymous Vent Space for Corporate India | OffClock',
    description: 'Post your work frustrations anonymously. Thousands of corporate employees venting, supporting and saying "samjha". You are not alone.',
    alternates: { canonical: `${BASE_URL}/vent` },
  },
  chill: {
    title: 'Corporate Chill Zone — Jokes, Breathing & Bingo | OffClock',
    description: '5-minute stress relief for corporate employees. Corporate jokes, box breathing exercises and bingo. Take a real break today.',
    alternates: { canonical: `${BASE_URL}/chill` },
  },
  events: {
    title: 'Weekend Events for Corporate Employees — Gurugram & Delhi NCR',
    description: 'Curated weekend meetups for corporate professionals — brunches, board game nights, walks and more. Make real friends in your city.',
    alternates: { canonical: `${BASE_URL}/events` },
  },
}