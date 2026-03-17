export async function startVapiCall({ patientPhone, patientData, messages }) {
  // Clean phone number to E.164 format
  const cleanPhone = patientPhone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("1")
    ? `+${cleanPhone}`
    : `+1${cleanPhone}`;
  const chatContext = `
  You are a friendly, professional AI patient intake assistant for Kyron Medical Group.
  
  PATIENT CONTEXT FROM WEB CHAT:
  Patient Name: ${patientData.patientName || "Not yet collected"}
  Patient Email: ${patientData.email || "Not yet collected"}  
  Patient Phone: ${patientData.phone || patientPhone}
  Appointment Status: ${
    patientData.doctorName
      ? `ALREADY BOOKED — Dr. ${patientData.doctorName} (${patientData.specialty}) on ${patientData.date} at ${patientData.time}`
      : "Not yet booked"
  }
  
  FULL CHAT HISTORY:
  ${messages
    .map(
      (m) => `${m.role === "assistant" ? "Assistant" : "Patient"}: ${m.text}`
    )
    .join("\n")}
  
  INSTRUCTION: Resume this conversation naturally. Do not re-ask for information already collected. NEVER provide medical advice or diagnoses.
  `;

  const response = await fetch("/api/make-call", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientPhone: formattedPhone,
      patientData,
      chatContext,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data.error));
  }

  return data;
}
