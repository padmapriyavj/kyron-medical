export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { patientPhone, patientData, chatContext } = req.body;

    if (!patientPhone) {
      return res.status(400).json({ error: "patientPhone is required" });
    }

    const vapiRes = await fetch("https://api.vapi.ai/call/phone", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
        assistantId: process.env.VAPI_ASSISTANT_ID,
        customer: {
          number: patientPhone,
        },
        assistantOverrides: {
          firstMessage: `Hi ${
            patientData?.patientName?.split(" ")[0] || "there"
          }! This is your Kyron Medical AI assistant continuing from your web chat. ${
            patientData?.doctorName
              ? `I can see you have already booked an appointment with Dr. ${patientData.doctorName} on ${patientData.date} at ${patientData.time}. Is there anything else I can help you with?`
              : "How can I help you today?"
          }`,
          model: {
            provider: "openai",
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: chatContext || "" }],
          },
        },
      }),
    });

    const text = await vapiRes.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Vapi raw response:", text);
      return res
        .status(500)
        .json({ error: "Vapi returned non-JSON", raw: text });
    }

    if (!vapiRes.ok) {
      console.error("Vapi error:", data);
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ success: true, callId: data.id });
  } catch (err) {
    console.error("MAKE-CALL ERROR:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
