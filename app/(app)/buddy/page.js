'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function Buddy() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNotify = () => {
    if (!email.trim()) return
    // TODO: connect to Supabase to save email
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: 'calc(100vh - 60px)',
        background: 'linear-gradient(160deg, #FDF6EE 0%, #EDF4EF 50%, #EAF4FA 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 24, textAlign: 'center'
      }}>

        {/* Animated Icon */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(135deg, #FDF0EA, #EDF4EF)',
          border: '2px solid #F3C4A8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 48, marginBottom: 24,
          boxShadow: '0 8px 32px rgba(224,123,84,0.15)'
        }}>
          🤖
        </div>

        {/* Badge */}
        <div style={{
          background: '#FDF0EA', border: '1px solid #F3C4A8',
          borderRadius: 20, padding: '6px 16px', marginBottom: 16,
          fontSize: 12, fontWeight: 700, color: '#E07B54',
          display: 'inline-block'
        }}>
          🚀 Coming Soon
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 28, fontWeight: 900, color: '#2D2D2D',
          margin: '0 0 12px', lineHeight: 1.3
        }}>
          AI Buddy — <br />
          <span style={{ color: '#E07B54' }}>Tera 24/7 Dost</span>
        </h1>

        {/* Description */}
        <p style={{
          fontSize: 15, color: '#8A8A8A', lineHeight: 1.7,
          maxWidth: 300, margin: '0 0 32px'
        }}>
          Kaam ki tension ho ya loneliness — tera AI Buddy sunne ke liye hamesha ready rahega. Hinglish mein baat karo, koi judgment nahi. 🤝
        </p>

        {/* Features preview */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: 20,
          border: '1px solid #EDE8E3', width: '100%', maxWidth: 340,
          marginBottom: 32, textAlign: 'left'
        }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: '#8A8A8A', margin: '0 0 14px' }}>
            WHAT'S COMING 👇
          </p>
          {[
            { emoji: '🗣️', text: 'Hinglish / Hindi / English mein baat karo' },
            { emoji: '🎭', text: 'Dost, Mentor ya Roast mode choose karo' },
            { emoji: '🤝', text: 'Real human volunteer se connect karo' },
            { emoji: '🔒', text: '100% private & anonymous conversations' },
          ].map(f => (
            <div key={f.text} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              marginBottom: 12
            }}>
              <span style={{ fontSize: 18, marginTop: 1 }}>{f.emoji}</span>
              <span style={{ fontSize: 14, color: '#2D2D2D', lineHeight: 1.5 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Notify form */}
        {!submitted ? (
          <div style={{ width: '100%', maxWidth: 340 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#2D2D2D', marginBottom: 10 }}>
              🔔 Notify karo jab launch ho:
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNotify()}
                placeholder="apna@email.com"
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 14,
                  border: '2px solid #EDE8E3', fontSize: 14,
                  outline: 'none', color: '#2D2D2D', background: '#F9F6F2'
                }}
              />
              <button onClick={handleNotify} style={{
                background: '#E07B54', color: '#fff', border: 'none',
                borderRadius: 14, padding: '12px 18px', fontWeight: 700,
                cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap'
              }}>
                Notify Me
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: '#EDF4EF', border: '1.5px solid #B5CEB9',
            borderRadius: 16, padding: '16px 24px', maxWidth: 340
          }}>
            <p style={{ fontWeight: 700, color: '#7B9E87', margin: 0, fontSize: 15 }}>
              ✅ Done yaar! Launch hote hi batayenge 🚀
            </p>
          </div>
        )}

        {/* Back link */}
        <p style={{ marginTop: 32, fontSize: 13, color: '#8A8A8A' }}>
          Tab tak vent karo ya events join karo 👇
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <a href="/vent" style={{
            background: '#F2EFF8', color: '#9B8BB4',
            border: '1px solid #C9BFD9', borderRadius: 12,
            padding: '8px 16px', fontSize: 13, fontWeight: 700,
            textDecoration: 'none'
          }}>😤 Vent</a>
          <a href="/events" style={{
            background: '#EAF4FA', color: '#7AADCA',
            border: '1px solid #B0CDD9', borderRadius: 12,
            padding: '8px 16px', fontSize: 13, fontWeight: 700,
            textDecoration: 'none'
          }}>📅 Events</a>
        </div>

      </div>
    </>
  )
}