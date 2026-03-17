import ChatInterface from './components/ChatInterface'
import './index.css'

function App() {
  return (
    <>
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <ChatInterface/>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass" style={{ padding: '40px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--kyron-accent)', fontSize: '2rem', marginBottom: '8px' }}>
            Kyron Medical
          </h1>
          <p style={{ color: 'var(--kyron-gray)' }}>Patient Portal — UI Shell Working </p>
        </div>
      </div>
    </>
  )
}

export default App