module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  
    const { patientPhone, patientData, chatContext } = req.body
  
    try {
      const response = await fetch('https://api.vapi.ai/call/phone', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
          assistantId: process.env.VAPI_ASSISTANT_ID,
          customer: {
            number: patientPhone,
          },
          assistantOverrides: {
            firstMessage: `Hi ${patientData.patientName?.split(' ')[0] || 'there'}! This is your Kyron Medical AI assistant continuing from your web chat. ${patientData.doctorName ? `I can see you've already booked an appointment with Dr. ${patientData.doctorName} on ${patientData.date} at ${patientData.time}. Is there anything else I can help you with?` : `How can I help you today?`}`,
            model: {
              provider: 'openai',
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: chatContext
                }
              ]
            }
          }
        })
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        return res.status(500).json({ error: data })
      }
  
      return res.status(200).json({ success: true, callId: data.id })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }