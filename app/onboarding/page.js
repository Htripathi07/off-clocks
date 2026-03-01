'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LANGS = [
  { code: 'hinglish', label: 'Hinglish', flag: '🇮🇳', desc: 'Mix of Hindi + English' },
  { code: 'hindi', label: 'हिंदी', flag: '🇮🇳', desc: 'Pure Hindi' },
  { code: 'english', label: 'English', flag: '🇬🇧', desc: 'Pure English' },
]

export default function Onboarding() {
  const [lang, setLang] = useState(null)
  const router = useRouter()

  const handleStart = () => {
    if (!lang) return
    // Save selected language to localStorage
    localStorage.setItem('offclock_lang', lang)
    // Go to home
    router.push('/')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #FDF6EE 0%, #EDF4EF 50%, #EAF4FA 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: "'Segoe UI', sans-serif"
    }}>

      {/* Logo */}
      <div style={{ fontSize: 56, marginBottom: 4 }}>☕</div>
      <h1 style={{ fontSize: 38, fontWeight: 900, color: '#2D2D2D', margin: 0 }}>
        OffClock
      </h1>
      <p style={{
        color: '#8A8A8A', fontSize: 15, textAlign: 'center',
        marginTop: 8, marginBottom: 36, maxWidth: 280, lineHeight: 1.6
      }}>
        Work colleagues everywhere.<br />
        Real friends nowhere.<br />
        <b style={{ color: '#E07B54' }}>Let's fix that.</b>
      </p>

      {/* Language Card */}
      <div style={{
        background: '#fff', borderRadius: 24, padding: 28,
        width: '100%', maxWidth: 360,
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)'
      }}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: '#2D2D2D' }}>
          Preferred language? 🌐
        </p>
        <p style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 18 }}>
          Tum jis language mein comfortable ho — wahi choose karo
        </p>

        {LANGS.map(l => (
          <button key={l.code} onClick={() => setLang(l.code)} style={{
            width: '100%', padding: '14px 20px', marginBottom: 10,
            borderRadius: 14,
            border: lang === l.code ? '2px solid #E07B54' : '2px solid #EDE8E3',
            background: lang === l.code ? '#FDF0EA' : '#fff',
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
            color: '#2D2D2D', transition: 'all 0.2s', textAlign: 'left'
          }}>
            <span style={{ fontSize: 24 }}>{l.flag}</span>
            <div>
              <div style={{ fontWeight: 700 }}>{l.label}</div>
              <div style={{ fontSize: 11, color: '#8A8A8A', marginTop: 1 }}>{l.desc}</div>
            </div>
            {lang === l.code && (
              <span style={{ marginLeft: 'auto', color: '#E07B54', fontSize: 18 }}>✓</span>
            )}
          </button>
        ))}

        <button
          onClick={handleStart}
          disabled={!lang}
          style={{
            width: '100%', padding: 16, borderRadius: 14,
            background: lang ? '#E07B54' : '#EDE8E3',
            color: '#fff', fontWeight: 800, fontSize: 17,
            border: 'none', cursor: lang ? 'pointer' : 'not-allowed',
            marginTop: 6, transition: 'all 0.2s'
          }}
        >
          {lang ? "Let's Go! 🚀" : "Language choose karo 👆"}
        </button>
      </div>

      <p style={{ marginTop: 20, fontSize: 12, color: '#8A8A8A', textAlign: 'center' }}>
        Baad mein change kar sakte ho navbar se 🌐
      </p>
    </div>
  )
}