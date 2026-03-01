'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { MOODS } from '@/lib/constants'

export default function HomeClient() {
  const [mood, setMood] = useState(null)
  const router = useRouter()

  const actions = [
    { emoji: '🤖', title: 'AI Buddy', sub: '24/7 dost available', href: '/buddy', bg: '#FDF0EA', border: '#F3C4A8' },
    { emoji: '😤', title: 'Vent Out', sub: 'Anonymous space', href: '/vent', bg: '#F2EFF8', border: '#C9BFD9' },
    { emoji: '🎮', title: '5 Min Chill', sub: 'Games & jokes', href: '/chill', bg: '#EDF4EF', border: '#B5CEB9' },
    { emoji: '📅', title: 'Weekend Plans', sub: 'Real meetups', href: '/events', bg: '#EAF4FA', border: '#B0CDD9' },
  ]

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <div className="card">
          <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 3 }}>Aaj kaisa feel ho raha hai? 🌤️</p>
          <p style={{ color: '#8A8A8A', fontSize: 13, marginBottom: 14 }}>No judgment. Sach batao.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {MOODS.map(m => (
              <button key={m.emoji} onClick={() => setMood(m.emoji)} style={{
                flex: 1, padding: '12px 4px', borderRadius: 14,
                border: mood === m.emoji ? '2px solid #E07B54' : '2px solid #EDE8E3',
                background: mood === m.emoji ? '#FDF0EA' : '#F9F6F2',
                fontSize: 22, cursor: 'pointer'
              }}>{m.emoji}</button>
            ))}
          </div>
          {mood && <p style={{ textAlign: 'center', marginTop: 12, color: '#7B9E87', fontWeight: 600, fontSize: 14 }}>Noted yaar. Tum akele nahi ho 🤝</p>}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #9B8BB422, #7AADCA22)', borderRadius: 20, padding: 20, marginBottom: 14, border: '1px solid #9B8BB433' }}>
          <p style={{ margin: 0, fontSize: 12, color: '#9B8BB4', fontWeight: 600 }}>💡 Aaj ka thought</p>
          <p style={{ margin: '8px 0 0', fontWeight: 700, fontSize: 15, color: '#2D2D2D', lineHeight: 1.6 }}>"Kaam zaruri hai, lekin tum usse zyada zaruri ho."</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {actions.map(a => (
            <button key={a.href} onClick={() => router.push(a.href)} style={{
              background: a.bg, borderRadius: 18, padding: 18,
              border: `1px solid ${a.border}`, cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ fontSize: 30 }}>{a.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 10, color: '#2D2D2D' }}>{a.title}</div>
              <div style={{ fontSize: 12, color: '#8A8A8A', marginTop: 3 }}>{a.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}