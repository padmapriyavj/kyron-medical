export async function sendConfirmationEmail(bookingData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })
      const data = await response.json()
      return data.success
    } catch (err) {
      console.error('Email send failed:', err)
      return false
    }
  }