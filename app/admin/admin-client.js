// ============================================================
// FILE 1: app/admin/page.js — Admin Entry (Server Component)
// ============================================================
// import { AdminClient } from './admin-client'
// export default function AdminPage() {
//   return <AdminClient />
// }

// ============================================================
// FILE 2: app/admin/admin-client.js — Full Admin Panel UI
// ============================================================
'use client'
import { useState, useEffect } from 'react'

// ─── MOCK DATA (replace with Supabase later) ─────────────────
const MOCK_USERS = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', city: 'Gurugram', industry: 'IT', lang: 'Hinglish', joined: '2025-02-01' },
  { id: 2, name: 'Priya Singh', phone: '9123456789', city: 'Delhi', industry: 'Finance', lang: 'English', joined: '2025-02-03' },
  { id: 3, name: 'Arjun Mehta', phone: '9988776655', city: 'Gurugram', industry: 'Consulting', lang: 'Hindi', joined: '2025-02-05' },
  { id: 4, name: 'Sneha Gupta', phone: '9871234560', city: 'Noida', industry: 'Marketing', lang: 'Hinglish', joined: '2025-02-07' },
]

const MOCK_VENTS = [
  { id: 1, text: 'Manager ne aaj phir credit liya mera. Thak gaya hoon.', time: '2h ago', hearts: 34, status: 'visible' },
  { id: 2, text: 'Weekend pe akela baithna padega phir. Koi plan nahi.', time: '4h ago', hearts: 67, status: 'visible' },
  { id: 3, text: '6 PM ka kaam roz 11 PM tak. Kab milega life?', time: '6h ago', hearts: 89, status: 'visible' },
  { id: 4, text: 'Fake positivity in office is killing me slowly.', time: '1d ago', hearts: 12, status: 'hidden' },
]

const MOCK_EVENTS = [
  { id: 1, title: 'No Work Talk Brunch', date: 'Sat, 22 Feb', time: '11 AM', place: 'Cyber Hub, Gurugram', size: 8, cost: 'Free', emoji: '🥞', tag: 'Food & Chill', rsvps: 6 },
  { id: 2, title: 'Sunday Board Game Circle', date: 'Sun, 23 Feb', time: '4 PM', place: 'Sector 29, Gurugram', size: 10, cost: '₹199', emoji: '🎲', tag: 'Games', rsvps: 4 },
  { id: 3, title: 'Burnt Out But Breathing Walk', date: 'Sat, 22 Feb', time: '7 AM', place: 'Leisure Valley Park', size: 12, cost: 'Free', emoji: '🚶', tag: 'Wellness', rsvps: 9 },
]

// ─── COLORS ──────────────────────────────────────────────────
const C = {
  bg: '#F9F6F2', card: '#FFFFFF', primary: '#E07B54',
  primaryLight: '#FDF0EA', accent: '#7B9E87', accentLight: '#EDF4EF',
  purple: '#9B8BB4', purpleLight: '#F2EFF8', text: '#2D2D2D',
  sub: '#8A8A8A', border: '#EDE8E3',
}

const ADMIN_EMAIL = 'your@email.com' // 🔒 Replace with your email

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function AdminClient() {
  const [authed, setAuthed] = useState(false)
  const [authEmail, setAuthEmail] = useState('')
  const [authPass, setAuthPass] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState('dashboard')

  // Simple password gate (replace with Google Auth in production)
  const login = () => {
    if (authPass === 'offclock@admin2025') {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Wrong password yaar! 🚫')
    }
  }

  if (!authed) return <LoginScreen
    email={authEmail} setEmail={setAuthEmail}
    pass={authPass} setPass={setAuthPass}
    onLogin={login} error={authError}
  />

  const tabs = [
    { id: 'dashboard', emoji: '📊', label: 'Dashboard' },
    { id: 'events', emoji: '📅', label: 'Events' },
    { id: 'users', emoji: '👥', label: 'Users' },
    { id: 'vents', emoji: '😤', label: 'Vents' },
    { id: 'customize', emoji: '🎨', label: 'Customize' },
    { id: 'buddy', emoji: '🤖', label: 'Buddy' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: C.primary, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>☕ OffClock Admin</span>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Management Panel</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>🔒 Admin</span>
          <button onClick={() => setAuthed(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 20, padding: '6px 14px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: C.card, borderRight: `1px solid ${C.border}`, padding: '20px 0', flexShrink: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              width: '100%', padding: '12px 20px', border: 'none', textAlign: 'left',
              background: tab === t.id ? C.primaryLight : 'transparent',
              borderLeft: tab === t.id ? `3px solid ${C.primary}` : '3px solid transparent',
              color: tab === t.id ? C.primary : C.text, fontWeight: tab === t.id ? 700 : 400,
              fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10
            }}>
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
          <div style={{ margin: '20px', marginTop: 32, padding: 12, background: C.accentLight, borderRadius: 12, border: `1px solid ${C.accent}33` }}>
            <p style={{ fontSize: 11, color: C.accent, fontWeight: 700, margin: '0 0 4px' }}>💡 TIP</p>
            <p style={{ fontSize: 11, color: C.sub, margin: 0, lineHeight: 1.5 }}>Connect Supabase to see live data</p>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          {tab === 'dashboard' && <Dashboard />}
          {tab === 'events' && <EventsManager />}
          {tab === 'users' && <UsersManager />}
          {tab === 'vents' && <VentsManager />}
          {tab === 'customize' && <Customize />}
          {tab === 'buddy' && <BuddySettings />}
        </div>
      </div>
    </div>
  )
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────
function LoginScreen({ email, setEmail, pass, setPass, onLogin, error }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #FDF6EE, #EDF4EF)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: 32, width: '100%', maxWidth: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>🔐</div>
          <h2 style={{ fontWeight: 900, fontSize: 24, margin: '8px 0 4px', color: C.text }}>Admin Login</h2>
          <p style={{ color: C.sub, fontSize: 13 }}>OffClock Management Panel</p>
        </div>
        <input value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Admin email"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box', color: C.text }} />
        <input value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onLogin()}
          type="password" placeholder="Password"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 14, outline: 'none', marginBottom: 8, boxSizing: 'border-box', color: C.text }} />
        {error && <p style={{ color: '#e74c3c', fontSize: 13, marginBottom: 8 }}>{error}</p>}
        <button onClick={onLogin} style={{ width: '100%', padding: 14, borderRadius: 12, background: C.primary, color: '#fff', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginTop: 8 }}>
          Login 🚀
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: C.sub, marginTop: 16 }}>
          Default password: <code>offclock@admin2025</code><br />
          Change this in admin-client.js before deploying!
        </p>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    { emoji: '👥', label: 'Total Users', value: '247', change: '+12 this week', color: C.primaryLight, border: C.primary },
    { emoji: '📅', label: 'Events', value: '8', change: '3 this weekend', color: C.accentLight, border: C.accent },
    { emoji: '😤', label: 'Vent Posts', value: '1,284', change: '+89 today', color: C.purpleLight, border: C.purple },
    { emoji: '🤝', label: 'RSVPs', value: '312', change: '+24 today', color: '#EAF4FA', border: '#7AADCA' },
  ]

  const moodData = [
    { emoji: '😤', label: 'Frustrated', count: 45, pct: 45 },
    { emoji: '😔', label: 'Low', count: 28, pct: 28 },
    { emoji: '😐', label: 'Meh', count: 52, pct: 52 },
    { emoji: '🙂', label: 'Okay', count: 67, pct: 67 },
    { emoji: '😄', label: 'Good', count: 38, pct: 38 },
  ]
  const maxMood = Math.max(...moodData.map(m => m.count))

  return (
    <div>
      <h2 style={{ fontWeight: 800, fontSize: 22, margin: '0 0 20px', color: C.text }}>📊 Dashboard</h2>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: s.color, borderRadius: 16, padding: 18, border: `1px solid ${s.border}33` }}>
            <div style={{ fontSize: 28 }}>{s.emoji}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: '8px 0 4px' }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.label}</div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 4 }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Mood Chart */}
        <div style={{ background: C.card, borderRadius: 18, padding: 20, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 16px', color: C.text }}>😊 Mood Distribution Today</h3>
          {moodData.map(m => (
            <div key={m.label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: C.text }}>{m.emoji} {m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.sub }}>{m.count}</span>
              </div>
              <div style={{ background: C.border, borderRadius: 8, height: 8, overflow: 'hidden' }}>
                <div style={{ width: `${(m.count / maxMood) * 100}%`, height: '100%', background: C.primary, borderRadius: 8, transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Signups */}
        <div style={{ background: C.card, borderRadius: 18, padding: 20, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 16px', color: C.text }}>👤 Recent Signups</h3>
          {MOCK_USERS.slice(0, 4).map(u => (
            <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: C.primary, flexShrink: 0 }}>
                {u.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{u.name}</div>
                <div style={{ fontSize: 11, color: C.sub }}>{u.city} • {u.industry}</div>
              </div>
              <div style={{ fontSize: 11, color: C.sub }}>{u.joined}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── EVENTS MANAGER ───────────────────────────────────────────
function EventsManager() {
  const [events, setEvents] = useState(MOCK_EVENTS)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const empty = { title: '', date: '', time: '', place: '', size: 10, cost: 'Free', emoji: '🎉', tag: 'Social' }
  const [form, setForm] = useState(empty)

  const save = () => {
    if (editing) {
      setEvents(events.map(e => e.id === editing ? { ...form, id: editing, rsvps: 0 } : e))
    } else {
      setEvents([...events, { ...form, id: Date.now(), rsvps: 0 }])
    }
    setShowForm(false); setEditing(null); setForm(empty)
  }

  const del = id => setEvents(events.filter(e => e.id !== id))

  const edit = ev => {
    setForm(ev); setEditing(ev.id); setShowForm(true)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontWeight: 800, fontSize: 22, margin: 0, color: C.text }}>📅 Events Manager</h2>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty) }} style={{ background: C.primary, color: '#fff', border: 'none', borderRadius: 12, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          + Add Event
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background: C.card, borderRadius: 18, padding: 24, marginBottom: 20, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontWeight: 700, margin: '0 0 16px', color: C.text }}>{editing ? '✏️ Edit Event' : '➕ New Event'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { key: 'title', label: 'Event Title', placeholder: 'No Work Talk Brunch' },
              { key: 'emoji', label: 'Emoji', placeholder: '🥞' },
              { key: 'date', label: 'Date', placeholder: 'Sat, 22 Feb' },
              { key: 'time', label: 'Time', placeholder: '11 AM' },
              { key: 'place', label: 'Location', placeholder: 'Cyber Hub, Gurugram' },
              { key: 'tag', label: 'Category', placeholder: 'Food & Chill' },
              { key: 'cost', label: 'Cost', placeholder: 'Free or ₹199' },
              { key: 'size', label: 'Max People', placeholder: '10' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.sub, display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: C.text }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={save} style={{ background: C.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Save ✅</button>
            <button onClick={() => { setShowForm(false); setEditing(null) }} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', color: C.sub }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map(ev => (
          <div key={ev.id} style={{ background: C.card, borderRadius: 16, padding: 18, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 36 }}>{ev.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{ev.title}</div>
              <div style={{ fontSize: 12, color: C.sub, marginTop: 3 }}>📅 {ev.date} {ev.time} • 📍 {ev.place}</div>
              <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>👥 {ev.rsvps}/{ev.size} RSVPs • {ev.cost}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => edit(ev)} style={{ background: C.primaryLight, color: C.primary, border: `1px solid ${C.primary}33`, borderRadius: 8, padding: '7px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Edit</button>
              <button onClick={() => del(ev.id)} style={{ background: '#FEE2E2', color: '#e74c3c', border: '1px solid #FECACA', borderRadius: 8, padding: '7px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── USERS MANAGER ────────────────────────────────────────────
function UsersManager() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.city.toLowerCase().includes(search.toLowerCase()) ||
    u.industry.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontWeight: 800, fontSize: 22, margin: 0, color: C.text }}>👥 Users ({MOCK_USERS.length})</h2>
        <button style={{ background: C.accentLight, color: C.accent, border: `1px solid ${C.accent}44`, borderRadius: 12, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          Export CSV 📥
        </button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍 Search by name, city, industry..."
        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 14, outline: 'none', marginBottom: 16, boxSizing: 'border-box', color: C.text, background: C.card }} />

      <div style={{ background: C.card, borderRadius: 18, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {['Name', 'Phone', 'City', 'Industry', 'Language', 'Joined'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: C.sub, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ background: i % 2 === 0 ? C.card : C.bg }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: C.text }}>{u.name}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: C.sub }}>{u.phone}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: C.sub }}>{u.city}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: C.sub }}>{u.industry}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: C.primaryLight, color: C.primary, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{u.lang}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: C.sub }}>{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── VENTS MANAGER ────────────────────────────────────────────
function VentsManager() {
  const [vents, setVents] = useState(MOCK_VENTS)

  const toggle = id => setVents(vents.map(v => v.id === id ? { ...v, status: v.status === 'visible' ? 'hidden' : 'visible' } : v))
  const del = id => setVents(vents.filter(v => v.id !== id))

  return (
    <div>
      <h2 style={{ fontWeight: 800, fontSize: 22, margin: '0 0 20px', color: C.text }}>😤 Vent Moderation</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Posts', value: vents.length, color: C.primaryLight },
          { label: 'Visible', value: vents.filter(v => v.status === 'visible').length, color: C.accentLight },
          { label: 'Hidden', value: vents.filter(v => v.status === 'hidden').length, color: '#FEE2E2' },
        ].map(s => (
          <div key={s.label} style={{ background: s.color, borderRadius: 12, padding: '12px 20px', flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {vents.map(v => (
          <div key={v.id} style={{ background: C.card, borderRadius: 16, padding: 18, border: `1px solid ${C.border}`, opacity: v.status === 'hidden' ? 0.6 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.sub }}>🔒 Anonymous • {v.time} • ❤️ {v.hearts}</span>
              <span style={{ background: v.status === 'visible' ? C.accentLight : '#FEE2E2', color: v.status === 'visible' ? C.accent : '#e74c3c', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                {v.status === 'visible' ? '✅ Visible' : '🚫 Hidden'}
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: C.text, margin: '0 0 12px' }}>{v.text}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggle(v.id)} style={{ background: v.status === 'visible' ? '#FEF3C7' : C.accentLight, color: v.status === 'visible' ? '#D97706' : C.accent, border: 'none', borderRadius: 8, padding: '7px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                {v.status === 'visible' ? '🙈 Hide' : '👁️ Show'}
              </button>
              <button onClick={() => del(v.id)} style={{ background: '#FEE2E2', color: '#e74c3c', border: 'none', borderRadius: 8, padding: '7px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── CUSTOMIZE ────────────────────────────────────────────────
function Customize() {
  const [settings, setSettings] = useState({
    quote: 'Kaam zaruri hai, lekin tum usse zyada zaruri ho.',
    announcement: '',
    showAnnouncement: false,
    primaryColor: '#E07B54',
    city: 'Gurugram / Delhi NCR',
    appName: 'OffClock',
    tagline: 'Work colleagues everywhere. Real friends nowhere.',
  })
  const [saved, setSaved] = useState(false)

  const save = () => {
    // TODO: save to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const Field = ({ label, k, placeholder, multiline }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: C.sub, display: 'block', marginBottom: 6 }}>{label}</label>
      {multiline ? (
        <textarea value={settings[k]} onChange={e => setSettings({ ...settings, [k]: e.target.value })}
          placeholder={placeholder} rows={3}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box', color: C.text, lineHeight: 1.6 }} />
      ) : (
        <input value={settings[k]} onChange={e => setSettings({ ...settings, [k]: e.target.value })}
          placeholder={placeholder}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: C.text }} />
      )}
    </div>
  )

  return (
    <div>
      <h2 style={{ fontWeight: 800, fontSize: 22, margin: '0 0 20px', color: C.text }}>🎨 App Customization</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Branding */}
        <div style={{ background: C.card, borderRadius: 18, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 18px', color: C.text }}>🏷️ Branding</h3>
          <Field label="App Name" k="appName" placeholder="OffClock" />
          <Field label="City Label" k="city" placeholder="Gurugram / Delhi NCR" />
          <Field label="Tagline" k="tagline" placeholder="Work colleagues everywhere..." multiline />
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.sub, display: 'block', marginBottom: 6 }}>Primary Color</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="color" value={settings.primaryColor} onChange={e => setSettings({ ...settings, primaryColor: e.target.value })}
                style={{ width: 48, height: 48, borderRadius: 10, border: `2px solid ${C.border}`, cursor: 'pointer' }} />
              <span style={{ fontSize: 14, color: C.sub }}>{settings.primaryColor}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ background: C.card, borderRadius: 18, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 18px', color: C.text }}>📝 Content</h3>
          <Field label="Daily Quote (Home Page)" k="quote" placeholder="Kaam zaruri hai..." multiline />

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: C.sub }}>📢 Announcement Banner</label>
              <button onClick={() => setSettings({ ...settings, showAnnouncement: !settings.showAnnouncement })}
                style={{ background: settings.showAnnouncement ? C.accentLight : C.bg, color: settings.showAnnouncement ? C.accent : C.sub, border: `1px solid ${C.border}`, borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                {settings.showAnnouncement ? '✅ ON' : '⭕ OFF'}
              </button>
            </div>
            <textarea value={settings.announcement} onChange={e => setSettings({ ...settings, announcement: e.target.value })}
              placeholder="e.g. 🎉 New event added! Check Events tab"
              rows={3} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box', color: C.text, lineHeight: 1.6 }} />
          </div>
        </div>
      </div>

      <button onClick={save} style={{ marginTop: 8, background: saved ? C.accent : C.primary, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 32px', fontWeight: 800, cursor: 'pointer', fontSize: 15, transition: 'background 0.3s' }}>
        {saved ? '✅ Saved!' : 'Save Changes'}
      </button>
    </div>
  )
}

// ─── BUDDY SETTINGS ───────────────────────────────────────────
function BuddySettings() {
  const [prompts, setPrompts] = useState({
    dost: "You are a close Indian dost. Talk in Hinglish. Use 'yaar','bhai','arre'. Understand corporate stress. Short replies (2-4 sentences). If distressed, suggest human volunteer.",
    mentor: "Calm wise mentor in Hinglish. Empathetic grounded advice. Short (2-4 sentences).",
    roast: "Funny savage dost roasting corporate life in Hinglish. Playful not mean. Short (2-4 sentences).",
  })
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 style={{ fontWeight: 800, fontSize: 22, margin: '0 0 8px', color: C.text }}>🤖 Buddy Settings</h2>
      <p style={{ color: C.sub, fontSize: 14, marginBottom: 24 }}>Edit the AI personality prompts for each mode</p>

      {[
        { key: 'dost', emoji: '🤝', label: 'Dost Mode', desc: 'Casual friend — warm and relatable' },
        { key: 'mentor', emoji: '🧘', label: 'Mentor Mode', desc: 'Calm and wise — grounded advice' },
        { key: 'roast', emoji: '🔥', label: 'Roast Mode', desc: 'Funny and savage — lighten the mood' },
      ].map(p => (
        <div key={p.key} style={{ background: C.card, borderRadius: 18, padding: 24, border: `1px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{p.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{p.label}</div>
              <div style={{ fontSize: 12, color: C.sub }}>{p.desc}</div>
            </div>
          </div>
          <textarea value={prompts[p.key]} onChange={e => setPrompts({ ...prompts, [p.key]: e.target.value })}
            rows={4} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', color: C.text, lineHeight: 1.6, fontFamily: 'monospace' }} />
        </div>
      ))}

      <button onClick={save} style={{ background: saved ? C.accent : C.primary, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 32px', fontWeight: 800, cursor: 'pointer', fontSize: 15, transition: 'background 0.3s' }}>
        {saved ? '✅ Saved!' : 'Save Prompts'}
      </button>
    </div>
  )
}