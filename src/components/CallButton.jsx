import { useState } from 'react'
import { startVapiCall } from '../utils/vapiCall'

export default function CallButton({ patientData, messages }) {
  const [callState, setCallState] = useState('idle') // idle | calling | active | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleCall = async () => {
    const phone = patientData?.phone
    if (!phone) {
      setErrorMsg('Please provide your phone number in the chat first.')
      setCallState('error')
      return
    }

    setCallState('calling')
    setErrorMsg('')

    try {
      await startVapiCall({
        patientPhone: phone,
        patientData,
        messages
      })
      setCallState('active')
    } catch (err) {
      console.error('Vapi call error:', err)
      setErrorMsg('Call failed. Please try again.')
      setCallState('error')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
      <button
        className={`call-btn ${callState === 'active' ? 'call-btn-active' : ''}`}
        onClick={handleCall}
        disabled={callState === 'calling' || callState === 'active'}
      >
        {callState === 'idle' && '📞 Call Me Instead'}
        {callState === 'calling' && '⏳ Calling...'}
        {callState === 'active' && '✅ Call Started!'}
        {callState === 'error' && '📞 Try Again'}
      </button>
      {errorMsg && (
        <span style={{ fontSize: '0.72rem', color: '#f87171', maxWidth: '200px', textAlign: 'right' }}>
          {errorMsg}
        </span>
      )}
      {callState === 'active' && (
        <span style={{ fontSize: '0.72rem', color: 'var(--kyron-teal)', maxWidth: '220px', textAlign: 'right' }}>
          Check your phone! The AI is calling you now.
        </span>
      )}
    </div>
  )
}