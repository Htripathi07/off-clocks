export default function sitemap() {
    const base = 'https://offclock.in'
    const routes = ['', '/buddy', '/vent', '/chill', '/events', '/onboarding']
    return routes.map(r => ({
      url: `${base}${r}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: r === '' ? 1 : 0.8,
    }))
  }