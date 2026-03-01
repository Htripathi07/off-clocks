import BottomNav from '@/components/BottomNav'
import { supabase } from '@/lib/supabase'

export default function AppLayout({ children }) {
    
  return (
    <div style={{
      maxWidth: 430,
      margin: '0 auto',
      minHeight: '100vh',
      background: '#F9F6F2',
      position: 'relative',
      paddingBottom: 72,
    }}>
      {children}
      <BottomNav />
    </div>
  )
}