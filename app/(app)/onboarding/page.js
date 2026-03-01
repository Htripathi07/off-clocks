
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveUser } from '@/lib/db'

const LANGS = [
  { code: 'hinglish', label: 'Hinglish', flag: '🇮🇳', desc: 'Mix of Hindi + English' },
  { code: 'hindi', label: 'हिंदी', flag: '🇮🇳', desc: 'Pure Hindi' },
  { code: 'english', label: 'English', flag: '🇮🇳', desc: 'Pure English' },
]

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [lang, setLang] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', city: '', industry: '' })
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const handleStart = async () => {
    if (!lang) return
    setSaving(true)
    await saveUser({
      name: form.name || 'Anonymous',
      phone: form.phone,
      city: form.city,
      industry: form.industry,
      language: lang,
    })
    localStorage.setItem('offclock_lang', lang)
    setSaving(false)
    router.push('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #FDF6EE 0%, #EDF4EF 50%, #EAF4FA 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ fontSize: 56, marginBottom: 4 }}>☕</div>
      <h1 style={{ fontSize: 38, fontWeight: 900, color: '#2D2D2D', margin: 0 }}>OffClock</h1>
      <p style={{ color: '#8A8A8A', fontSize: 15, textAlign: 'center', marginTop: 8, marginBottom: 36, maxWidth: 280, lineHeight: 1.6 }}>
        Work colleagues everywhere.<br />Real friends nowhere.<br />
        <b style={{ color: '#E07B54' }}>Let's fix that.</b>
      </p>

      <div style={{ background: '#fff', borderRadius: 24, padding: 28, width: '100%', maxWidth: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>

        {/* Step 1 — Basic Info */}
        {step === 1 && (
          <>
            <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 16, color: '#2D2D2D' }}>
              Pehle thoda jaante hain 👋
            </p>
            {[
              { key: 'name', label: 'Naam kya hai?', placeholder: 'Rahul, Priya...' },
              { key: 'phone', label: 'Phone number', placeholder: '98765 43210' },
              { key: 'city', label: 'Kaun si city?', placeholder: 'Gurugram, Delhi...' },
              { key: 'industry', label: 'Kaunse field mein ho?', placeholder: 'IT, Finance, Marketing...' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#8A8A8A', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '2px solid #EDE8E3', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#2D2D2D' }} />
              </div>
            ))}
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: 14, borderRadius: 14, background: '#E07B54', color: '#fff', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginTop: 4 }}>
              Next →
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: 10, borderRadius: 14, background: 'transparent', color: '#8A8A8A', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', marginTop: 8 }}>
              Skip karo
            </button>
          </>
        )}

        {/* Step 2 — Language */}
        {step === 2 && (
          <>
            <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: '#2D2D2D' }}>
              Preferred language? 🌐
            </p>
            <p style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 18 }}>
              Jis language mein comfortable ho
            </p>
            {LANGS.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{
                width: '100%', padding: '14px 20px', marginBottom: 10, borderRadius: 14,
                border: lang === l.code ? '2px solid #E07B54' : '2px solid #EDE8E3',
                background: lang === l.code ? '#FDF0EA' : '#fff',
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12, color: '#2D2D2D'
              }}>
                <span style={{ fontSize: 24 }}>{l.flag}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700 }}>{l.label}</div>
                  <div style={{ fontSize: 11, color: '#8A8A8A' }}>{l.desc}</div>
                </div>
                {lang === l.code && <span style={{ marginLeft: 'auto', color: '#E07B54' }}>✓</span>}
              </button>
            ))}
            <button onClick={handleStart} disabled={!lang || saving} style={{
              width: '100%', padding: 16, borderRadius: 14,
              background: lang ? '#E07B54' : '#EDE8E3',
              color: '#fff', fontWeight: 800, fontSize: 17,
              border: 'none', cursor: lang ? 'pointer' : 'not-allowed', marginTop: 6
            }}>
              {saving ? 'Saving...' : lang ? "Let's Go! 🚀" : 'Language choose karo 👆'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

