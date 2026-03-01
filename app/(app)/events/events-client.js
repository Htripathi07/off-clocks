'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { getEvents, saveRSVP } from '@/lib/db'

const TAG_COLORS = {
  'Food & Chill': { bg: '#FDF0EA', color: '#E07B54' },
  'Games':        { bg: '#F2EFF8', color: '#9B8BB4' },
  'Wellness':     { bg: '#EDF4EF', color: '#7B9E87' },
  'Social':       { bg: '#EAF4FA', color: '#7AADCA' },
}

export default function EventsClient() {
  const [events, setEvents] = useState([])
  const [rsvped, setRsvped] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents().then(data => {
      setEvents(data)
      setLoading(false)
    })
    // Load saved RSVPs from localStorage
    const saved = JSON.parse(localStorage.getItem('offclock_rsvps') || '[]')
    setRsvped(saved)
  }, [])

  const toggleRSVP = async (ev) => {
    const isRsvped = rsvped.includes(ev.id)
    const updated = isRsvped
      ? rsvped.filter(x => x !== ev.id)
      : [...rsvped, ev.id]
    setRsvped(updated)
    localStorage.setItem('offclock_rsvps', JSON.stringify(updated))
    if (!isRsvped) {
      await saveRSVP({ event_id: ev.id, user_name: 'Anonymous', user_phone: '' })
    }
  }

  if (loading) return (
    <>
      <Navbar />
      <div style={{ padding: 20, textAlign: 'center', marginTop: 60, color: '#8A8A8A' }}>
        <div style={{ fontSize: 40 }}>📅</div>
        <p style={{ marginTop: 12 }}>Events load ho rahe hain...</p>
      </div>
    </>
  )

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 20, margin: '0 0 4px', color: '#2D2D2D' }}>
          Weekend ke plans 📅
        </p>
        <p style={{ color: '#8A8A8A', fontSize: 13, margin: '0 0 20px' }}>
          Gurugram / Delhi NCR • Real people, real fun
        </p>
        {events.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 40, color: '#8A8A8A' }}>
            <div style={{ fontSize: 40 }}>😴</div>
            <p>Abhi koi event nahi. Check back soon!</p>
          </div>
        )}
        {events.map(ev => {
          const tc = TAG_COLORS[ev.tag] || { bg: '#F9F6F2', color: '#8A8A8A' }
          const isIn = rsvped.includes(ev.id)
          return (
            <div key={ev.id} style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 14, border: '1px solid #EDE8E3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ background: tc.bg, borderRadius: 14, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                  {ev.emoji}
                </div>
                <span style={{ background: tc.bg, color: tc.color, borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700 }}>
                  {ev.tag}
                </span>
              </div>
              <p style={{ fontWeight: 800, fontSize: 16, margin: '0 0 6px', color: '#2D2D2D' }}>{ev.title}</p>
              <p style={{ color: '#8A8A8A', fontSize: 13, margin: '0 0 3px' }}>📅 {ev.date} • {ev.time}</p>
              <p style={{ color: '#8A8A8A', fontSize: 13, margin: '0 0 3px' }}>📍 {ev.place}</p>
              <p style={{ color: '#8A8A8A', fontSize: 13, margin: '0 0 16px' }}>
                👥 Max {ev.size} •{' '}
                <span style={{ color: ev.cost === 'Free' ? '#7B9E87' : '#E07B54', fontWeight: 700 }}>
                  {ev.cost}
                </span>
              </p>
              <button onClick={() => toggleRSVP(ev)} style={{
                width: '100%', padding: 13, borderRadius: 14,
                background: isIn ? '#EDF4EF' : '#E07B54',
                color: isIn ? '#7B9E87' : '#fff',
                border: isIn ? '1.5px solid #B5CEB9' : 'none',
                fontWeight: 700, fontSize: 14, cursor: 'pointer'
              }}>
                {isIn ? "✅ I'm In! (Cancel karo?)" : "🙋 I'm In!"}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
