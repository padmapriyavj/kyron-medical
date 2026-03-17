import { doctors, practiceInfo } from "../data/doctors";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const buildSystemPrompt = (patientData) => {
  const doctorsInfo = doctors
    .map(
      (d) => `
  - ${d.name} (${d.specialty})
    Treats: ${d.bodyParts.join(", ")}
    Availability:
    ${d.availability
      .map((a) => `${a.day} ${a.date}: ${a.slots.join(", ")}`)
      .join("\n    ")}
  `
    )
    .join("\n");

  return `You are a friendly, professional AI patient intake assistant for ${
    practiceInfo.name
  }.

PRACTICE INFO:
- Address: ${practiceInfo.address}
- Phone: ${practiceInfo.phone}
- Hours: Mon-Thu 8AM-5PM, Fri 8AM-4PM, Sat-Sun Closed

AVAILABLE DOCTORS:
${doctorsInfo}

CURRENT PATIENT DATA COLLECTED SO FAR:
${JSON.stringify(patientData, null, 2)}

YOUR JOB:
1. Collect patient info conversationally in this order (skip if already collected):
   - First name + last name
   - Date of birth
   - Phone number
   - Email address
   - Reason for visit / what body part or symptom

2. Once you have the reason/body part, semantically match them to the correct doctor based on specialty.
   - If no doctor treats that area, politely say so.

3. Show 3-5 available appointment slots for the matched doctor.
   - If patient asks for a specific day (e.g. "do you have a Tuesday?"), filter and show only those.

4. Confirm the chosen appointment and summarize all details.

5. Also handle:
   - Prescription refill inquiries (tell them to call the office)
   - Questions about office hours and address (use practice info above)

RULES:
- NEVER book an appointment until you have collected ALL of: first name, last name, DOB, phone number, AND email address. If any are missing, ask for them first.
- NEVER provide medical advice, diagnoses, or treatment recommendations.
- NEVER say anything that could be medically misleading or harmful.
- Be warm, concise, and professional.
- Ask only ONE question at a time.
- When an appointment is booked, end your message with exactly this JSON on a new line:
  APPOINTMENT_BOOKED:{"doctorName":"...","specialty":"...","date":"...","time":"...","patientName":"...","patientEmail":"...","patientPhone":"..."}
- When you have collected the patient's email, end your message with:
  EMAIL_COLLECTED:{"email":"..."}
- When you have collected the patient's phone, end your message with:
  PHONE_COLLECTED:{"phone":"..."}`;
};

export async function sendToGroq(messages, patientData) {
  const systemPrompt = buildSystemPrompt(patientData);

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.text })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq error: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
