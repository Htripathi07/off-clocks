
// ============================================================
// FILE 4: app/(app)/vent/vent-client.js — Live Vents
// ============================================================
'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { getVents, postVent, likeVent } from '@/lib/db'

export default function VentClient() {
  const [vents, setVents] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    getVents().then(data => {
      setVents(data)
      setLoading(false)
    })
  }, [])

  const post = async () => {
    if (!text.trim() || posting) return
    setPosting(true)
    const newVent = await postVent({ text, emoji: '😤' })
    if (newVent) setVents([newVent, ...vents])
    setText('')
    setPosting(false)
  }

  const like = async (v) => {
    await likeVent(v.id, v.hearts)
    setVents(vents.map(x => x.id === v.id ? { ...x, hearts: x.hearts + 1 } : x))
  }

  const timeAgo = (date) => {
    const mins = Math.floor((Date.now() - new Date(date)) / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`
    return `${Math.floor(mins / 1440)}d ago`
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, border: '1px solid #EDE8E3' }}>
          <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 3, color: '#2D2D2D' }}>
            😤 Dil ki baat yahan dalo
          </p>
          <p style={{ color: '#8A8A8A', fontSize: 13, marginBottom: 14 }}>
            100% anonymous. Koi judge nahi karega.
          </p>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Aaj kya hua? Manager ne phir dimag khaya?..."
            style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 14, border: '2px solid #EDE8E3', fontSize: 14, resize: 'none', outline: 'none', background: '#F9F6F2', color: '#2D2D2D', lineHeight: 1.6, boxSizing: 'border-box' }} />
          <button onClick={post} disabled={posting} style={{ marginTop: 10, background: posting ? '#ccc' : '#E07B54', color: '#fff', border: 'none', borderRadius: 12, padding: '13px 24px', fontWeight: 700, cursor: 'pointer', width: '100%', fontSize: 14 }}>
            {posting ? 'Posting...' : 'Post karo (Anonymous) 🔒'}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: 40, color: '#8A8A8A' }}>
            <div style={{ fontSize: 36 }}>😤</div>
            <p style={{ marginTop: 8 }}>Vents load ho rahe hain...</p>
          </div>
        ) : vents.map(v => (
          <div key={v.id} style={{ background: '#fff', borderRadius: 18, padding: 18, marginBottom: 12, border: '1px solid #EDE8E3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#8A8A8A' }}>🔒 Anonymous • {timeAgo(v.created_at)}</span>
              <span style={{ fontSize: 18 }}>{v.emoji}</span>
            </div>
            <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.7, color: '#2D2D2D' }}>{v.text}</p>
            <button onClick={() => like(v)} style={{ background: '#FDF0EA', border: '1px solid #F3C4A8', borderRadius: 20, padding: '6px 16px', cursor: 'pointer', fontSize: 13, color: '#E07B54', fontWeight: 700 }}>
              ❤️ {v.hearts} samjha
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
