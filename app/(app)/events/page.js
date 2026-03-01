'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { EVENTS } from '@/lib/constants'

export default function Events() {
  const [rsvped, setRsvped] = useState([])

  const toggle = id => setRsvped(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id])

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Weekend ke plans 📅</p>
        <p style={{ color: '#8A8A8A', fontSize: 13, marginBottom: 20 }}>
          Gurugram / Delhi NCR • Real people, real fun
        </p>
        {EVENTS.map(ev => (
          <div key={ev.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ background: ev.color, borderRadius: 14, width: 52, height: 52,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28 }}>{ev.emoji}</div>
              <span style={{ background: ev.color, color: ev.tagColor, borderRadius: 20,
                padding: '4px 14px', fontSize: 11, fontWeight: 700 }}>{ev.tag}</span>
            </div>
            <p style={{ fontWeight: 800, fontSize: 16, margin: '0 0 6px' }}>{ev.title}</p>
            <p style={{ color: '#8A8A8A', fontSize: 13, margin: '0 0 3px' }}>📅 {ev.date} • {ev.time}</p>
            <p style={{ color: '#8A8A8A', fontSize: 13, margin: '0 0 3px' }}>📍 {ev.place}</p>
            <p style={{ color: '#8A8A8A', fontSize: 13, margin: '0 0 16px' }}>
              👥 {ev.size} • <span style={{ color: ev.cost === 'Free' ? '#7B9E87' : '#E07B54',
                fontWeight: 700 }}>{ev.cost}</span>
            </p>
            <button onClick={() => toggle(ev.id)} style={{
              width: '100%', padding: 13, borderRadius: 14,
              background: rsvped.includes(ev.id) ? '#EDF4EF' : '#E07B54',
              color: rsvped.includes(ev.id) ? '#7B9E87' : '#fff',
              border: rsvped.includes(ev.id) ? '1.5px solid #B5CEB9' : 'none',
              fontWeight: 700, fontSize: 14, cursor: 'pointer'
            }}>
              {rsvped.includes(ev.id) ? '✅ I\'m In! (Cancel karo?)' : '🙋 I\'m In!'}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}