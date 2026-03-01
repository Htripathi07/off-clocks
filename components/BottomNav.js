'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', emoji: '🏠', label: 'Home' },
  { href: '/buddy', emoji: '🤖', label: 'Buddy' },
  { href: '/vent', emoji: '😤', label: 'Vent' },
  { href: '/chill', emoji: '🎮', label: 'Chill' },
  { href: '/events', emoji: '📅', label: 'Events' },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430, background: '#fff',
      borderTop: '1px solid #EDE8E3', display: 'flex', zIndex: 100
    }}>
      {tabs.map(t => {
        const active = path === t.href
        return (
          <Link key={t.href} href={t.href} style={{
            flex: 1, padding: '10px 4px 8px', display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: 3,
            textDecoration: 'none'
          }}>
            <span style={{ fontSize: 20 }}>{t.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 400,
              color: active ? '#E07B54' : '#8A8A8A' }}>{t.label}</span>
            {active && <div style={{ width: 4, height: 4, borderRadius: '50%',
              background: '#E07B54' }} />}
          </Link>
        )
      })}
    </nav>
  )
}