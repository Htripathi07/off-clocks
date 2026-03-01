'use client'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  // Read language from localStorage (set during onboarding)
  const lang = typeof window !== 'undefined'
    ? localStorage.getItem('offclock_lang') || 'Hinglish'
    : 'Hinglish'

  // Map code to display label
  const langLabel = {
    hinglish: 'Hinglish',
    hindi: 'हिंदी',
    english: 'English',
  }[lang] || 'Hinglish'

  return (
    <div style={{
      background: '#fff', padding: '16px 20px 14px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '1px solid #EDE8E3', position: 'sticky', top: 0, zIndex: 50
    }}>
      <div>
        <span style={{ fontSize: 22, fontWeight: 900, color: '#2D2D2D' }}>
          ☕ <span style={{ color: '#E07B54' }}>Off</span>Clock
        </span>
        <div style={{ fontSize: 11, color: '#8A8A8A', marginTop: 2 }}>
          📍 Gurugram / Delhi NCR
        </div>
      </div>

      {/* Clicking this goes back to onboarding to change language */}
      <button
        onClick={() => router.push('/onboarding')}
        style={{
          background: '#FDF0EA', border: '1px solid #F3C4A8',
          borderRadius: 20, padding: '6px 14px', color: '#E07B54',
          fontSize: 12, fontWeight: 700, cursor: 'pointer'
        }}
      >
        🌐 {langLabel}
      </button>
    </div>
  )
}