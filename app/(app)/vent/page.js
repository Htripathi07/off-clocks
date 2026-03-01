'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

const INITIAL_VENTS = [
  { id: 1, text: 'Manager ne aaj phir credit liya mera. 3rd time this month.', time: '2h ago', hearts: 34, emoji: '😤' },
  { id: 2, text: 'Weekend aa gaya but ghar pe akela baithna padega phir. Koi plan nahi.', time: '4h ago', hearts: 67, emoji: '😔' },
  { id: 3, text: '6 PM ka kaam roz 11 PM tak khich jaata hai. Kab milega life?', time: '6h ago', hearts: 89, emoji: '😩' },
]

export default function Vent() {
  const [vents, setVents] = useState(INITIAL_VENTS)
  const [text, setText] = useState('')
  const [likes, setLikes] = useState({})

  const post = () => {
    if (!text.trim()) return
    setVents([{ id: Date.now(), text, time: 'Just now', hearts: 0, emoji: '😤' }, ...vents])
    setText('')
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <div className="card">
          <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 3 }}>
            😤 Dil ki baat yahan dalo
          </p>
          <p style={{ color: '#8A8A8A', fontSize: 13, marginBottom: 14 }}>
            100% anonymous. Koi judge nahi karega.
          </p>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Aaj kya hua? Manager ne phir dimag khaya?..."
            style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 14,
              border: '2px solid #EDE8E3', fontSize: 14, resize: 'none',
              outline: 'none', background: '#F9F6F2', color: '#2D2D2D',
              lineHeight: 1.6, boxSizing: 'border-box' }} />
          <button onClick={post} className="btn-primary" style={{ marginTop: 10 }}>
            Post karo (Anonymous) 🔒
          </button>
        </div>

        {vents.map(v => (
          <div key={v.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#8A8A8A' }}>🔒 Anonymous • {v.time}</span>
              <span style={{ fontSize: 18 }}>{v.emoji}</span>
            </div>
            <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.7 }}>{v.text}</p>
            <button onClick={() => setLikes(l => ({ ...l, [v.id]: (l[v.id] || v.hearts) + 1 }))}
              className="btn-outline" style={{ width: 'auto', fontSize: 13 }}>
              ❤️ {likes[v.id] || v.hearts} samjha
            </button>
          </div>
        ))}
      </div>
    </>
  )
}