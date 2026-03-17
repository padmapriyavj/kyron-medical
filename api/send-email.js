export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { patientName, patientEmail, doctorName, specialty, date, time } =
    req.body;

  const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1648a0, #3b82f6); padding: 32px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; }
          .body { padding: 32px; }
          .body h2 { color: #1648a0; margin-top: 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
          .detail-label { color: #666; font-size: 14px; }
          .detail-value { color: #111; font-weight: 600; font-size: 14px; }
          .footer { background: #f8f9fa; padding: 20px 32px; text-align: center; color: #888; font-size: 13px; }
          .badge { display: inline-block; background: #e8f0fe; color: #1648a0; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Kyron Medical</h1>
            <p>Appointment Confirmation</p>
          </div>
          <div class="body">
            <span class="badge">✅ Confirmed</span>
            <h2>Your appointment is booked, ${patientName.split(" ")[0]}!</h2>
            <p style="color:#555; margin-bottom: 24px;">Here are your appointment details. Please arrive 10 minutes early.</p>
            <div class="detail-row">
              <span class="detail-label">Doctor</span>
              <span class="detail-value">${doctorName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Specialty</span>
              <span class="detail-value">${specialty}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date</span>
              <span class="detail-value">${date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time</span>
              <span class="detail-value">${time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location</span>
              <span class="detail-value">123 Health Plaza, Suite 400, Providence, RI 02903</span>
            </div>
            <p style="margin-top: 24px; color: #555; font-size: 14px;">
              Need to reschedule? Call us at <strong>(401) 555-0192</strong> or reply to this email.
            </p>
          </div>
          <div class="footer">
            © 2026 Kyron Medical Group · HIPAA Compliant · <a href="#" style="color:#3b82f6;">Privacy Policy</a>
          </div>
        </div>
      </body>
      </html>
    `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kyron Medical <onboarding@resend.dev>",
        to: [process.env.RESEND_TO_EMAIL || patientEmail],
        subject: `Appointment Confirmed — ${doctorName} on ${date} at ${time}`,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
