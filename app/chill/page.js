'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { JOKES } from '@/lib/constants'

const BINGO = ['Unnecessary meeting', 'Excel crash', "'Per my last email'",
  'Camera off', 'Chai break escape', 'Quick call = 1 hour']

const STEPS = ['Saans lo... 4 sec', 'Roko... 4 sec', 'Chodo... 4 sec', 'Ruko... 4 sec']

function BingoCell({ label }) {
  const [checked, setChecked] = useState(false)
  return (
    <button onClick={() => setChecked(c => !c)} style={{
      background: checked ? '#EDF4EF' : '#F9F6F2',
      border: `1.5px solid ${checked ? '#7B9E87' : '#EDE8E3'}`,
      borderRadius: 12, padding: '10px 8px', color: checked ? '#7B9E87' : '#8A8A8A',
      fontSize: 11, fontWeight: 600, cursor: 'pointer',
      textDecoration: checked ? 'line-through' : 'none'
    }}>
      {checked ? '✅ ' : ''}{label}
    </button>
  )
}

export default function Chill() {
  const [jokeIdx, setJokeIdx] = useState(0)
  const [breathing, setBreathing] = useState(false)
  const [step, setStep] = useState(0)
  const [round, setRound] = useState(0)

  useEffect(() => {
    if (!breathing) return
    const t = setInterval(() => {
      setStep(s => { if (s === 3) { setRound(r => r + 1); return 0 } return s + 1 })
    }, 4000)
    return () => clearInterval(t)
  }, [breathing])

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        {/* Joke */}
        <div className="card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>😂 Corporate Joke</p>
          <div style={{ background: '#FDF8E7', borderRadius: 14, padding: 16,
            marginBottom: 14, border: '1px solid #F2C94C44' }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{JOKES[jokeIdx]}</p>
          </div>
          <button onClick={() => setJokeIdx(i => (i + 1) % JOKES.length)}
            className="btn-primary" style={{ width: 'auto', padding: '10px 22px' }}>
            Next joke 😄
          </button>
        </div>

        {/* Breathing */}
        <div className="card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>🫁 2-Min Breathing</p>
          <p style={{ color: '#8A8A8A', fontSize: 13, marginBottom: 16 }}>Box breathing — proven stress relief</p>
          {!breathing ? (
            <button onClick={() => { setBreathing(true); setStep(0); setRound(0) }}
              style={{ background: '#EDF4EF', color: '#7B9E87', border: '1.5px solid #B5CEB9',
                borderRadius: 12, padding: '12px 24px', fontWeight: 700,
                cursor: 'pointer', width: '100%', fontSize: 14 }}>
              Shuru karo 🧘
            </button>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 130, height: 130, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7B9E8744, #7AADCA44)',
                border: '3px solid #7B9E8755', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 16px',
                fontWeight: 700, fontSize: 14, lineHeight: 1.4 }}>
                {STEPS[step]}
              </div>
              <p style={{ color: '#8A8A8A', fontSize: 13, marginBottom: 12 }}>
                Round {round + 1} • Step {step + 1}/4
              </p>
              <button onClick={() => setBreathing(false)}
                style={{ background: '#F9F6F2', border: '1px solid #EDE8E3',
                  borderRadius: 12, padding: '10px 22px', cursor: 'pointer',
                  fontWeight: 600, color: '#8A8A8A' }}>Rok do</button>
            </div>
          )}
        </div>

        {/* Bingo */}
        <div className="card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>🎯 Corporate Bingo!</p>
          <p style={{ fontSize: 13, color: '#8A8A8A', marginBottom: 14 }}>Tap to check off!</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {BINGO.map(item => <BingoCell key={item} label={item} />)}
          </div>
        </div>
      </div>
    </>
  )
}