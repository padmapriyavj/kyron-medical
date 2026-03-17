# Kyron Medical — AI Patient Portal

> A voice-enabled AI patient intake and appointment scheduling web app built for Kyron Medical's technical interview. Ships a full patient journey — from chat intake to confirmed appointment to live AI phone call — in a single session.

**Live Demo:** [kyron-medical-five.vercel.app](https://kyron-medical-five.vercel.app)
**GitHub:** [github.com/padmapriyavj/kyron-medical](https://github.com/padmapriyavj/kyron-medical)

---

## Features

- **Conversational AI Intake** — Collects patient name, DOB, phone, email, and reason for visit through a natural chat interface powered by Groq
- **Semantic Doctor Matching** — LLM semantically matches patient symptoms to the correct specialist; gracefully handles unrecognized body parts
- **Appointment Scheduling** — Shows available slots per doctor; handles natural language requests like "do you have a Tuesday?"
- **Quick Reply Chips** — Contextual suggestion buttons appear after each AI message for a guided, intuitive experience
- **Email Confirmation** — Sends a branded HTML confirmation email on booking via Resend
- **Voice Call Handoff** — "Call Me Instead" button triggers an outbound AI phone call via Vapi, resuming the full chat context mid-conversation
- **Safety Guardrails** — AI is strictly prohibited from providing medical advice, diagnoses, or misleading health information
- **Liquid Glass UI** — Kyron Medical branded dark theme with animated gradient orbs, frosted glass cards, typing indicators, and smooth animations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| AI Chat | Groq API (llama-3.1-8b-instant) |
| Voice AI | Vapi (outbound phone calls + context injection) |
| Email | Resend API |
| Serverless | Vercel Functions |
| Hosting | Vercel (automatic HTTPS + CDN) |
| Styling | Custom CSS (liquid glass / backdrop-filter) |

---

## Architecture

```
src/
├── components/
│   ├── ChatInterface.jsx    # Main chat UI, message state, special token parsing
│   ├── CallButton.jsx       # Vapi call trigger with loading/success/error states
│   └── QuickReplies.jsx     # Contextual chip suggestions after each AI message
├── data/
│   └── doctors.js           # Hardcoded doctor profiles + 30-60 day availabilities
├── utils/
│   ├── groqChat.js          # Groq API client + dynamic system prompt builder
│   ├── vapiCall.js          # Vapi outbound call with E.164 formatting + context injection
│   └── sendEmail.js         # Client-side email trigger
api/
├── make-call.js             # Vercel serverless — Vapi REST API (uses private key)
└── send-email.js            # Vercel serverless — Resend email dispatch
```

---

## How the Voice Handoff Works

1. Patient completes intake and books appointment via chat
2. Patient clicks **"Call Me Instead"**
3. Frontend formats phone to E.164 and sends full chat history + patient data to `/api/make-call`
4. Serverless function calls Vapi REST API with:
   - Patient's phone number
   - Full chat transcript injected as system prompt context
   - Custom first message referencing the patient by name and existing booking
5. Vapi calls the patient's phone within ~10 seconds
6. AI picks up the conversation exactly where the chat left off — no re-asking for info already collected

---

## Doctors & Specialties

| Doctor | Specialty | Treats |
|---|---|---|
| Dr. Sarah Chen | Cardiology | Heart, chest, blood pressure, cardiovascular |
| Dr. Marcus Williams | Orthopedics | Bones, joints, knee, hip, shoulder, back, spine |
| Dr. Priya Patel | Dermatology | Skin, rash, acne, moles, eczema, hair, nails |
| Dr. James O'Brien | Neurology | Brain, headaches, migraines, nerves, dizziness |

Availabilities are hardcoded for the next 30–60 days. The AI semantically matches patient complaints to the correct doctor using LLM reasoning — no keyword matching required.

---

## Prioritization Decisions

This was built under a tight deadline. Here's what was prioritized and why:

**Built:**
- Full chat intake + doctor matching + appointment booking ✅
- Voice call handoff with context retention ✅ ← core feature being tested
- Email confirmation ✅
- Quick reply chips (pioneer feature not in spec) ✅
- Liquid glass UI with Kyron branding ✅
- Vercel over AWS EC2 — faster setup, automatic HTTPS, zero config ✅

**Deferred:**
- SMS notifications — Twilio requires approval time, not worth the risk on deadline
- Persistent database — React state is sufficient for demo; production would use PostgreSQL
- Custom email domain — Resend free tier requires verified domain; uses verified address for demo

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/padmapriyavj/kyron-medical.git
cd kyron-medical

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your API keys

# Run dev server (Vite only — no API routes locally)
npm run dev

# Run with API routes (requires Vercel CLI)
vercel dev
```

### Environment Variables

```env
# Frontend (exposed to browser via Vite)
VITE_GROQ_API_KEY=your_groq_api_key

# Serverless functions (server-side only, never exposed to browser)
RESEND_API_KEY=your_resend_api_key
RESEND_TO_EMAIL=your_verified_email
VAPI_PRIVATE_KEY=your_vapi_private_key
VAPI_PHONE_NUMBER_ID=your_vapi_phone_number_id
VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

---

## Deployment

```bash
# Set environment variables
vercel env add VITE_GROQ_API_KEY
vercel env add RESEND_API_KEY
# ... repeat for all vars

# Deploy to production
vercel --prod
```

Vercel auto-detects Vite and deploys `api/` as serverless functions with HTTPS out of the box.

---

## Design

The UI uses a **liquid glass** aesthetic matching Kyron Medical's dark navy brand:

- `backdrop-filter: blur(24px)` frosted glass cards
- Animated floating gradient orbs (blue, indigo, teal)
- Kyron blue (`#3b82f6`) and indigo (`#6366f1`) accent colors
- Pulsing avatar indicator, bouncing typing dots, smooth chip animations
- Booking confirmation banner in Kyron teal
- Fully responsive layout

---

## Known Limitations

- SMS notifications skipped — Twilio requires account approval and number provisioning
- Resend free tier sends to verified email only — custom domain required for production patient emails
- No persistent storage — conversation state lives in React state; refreshing resets the session
- Doctor availability is hardcoded — production would integrate with a real scheduling system (e.g. Epic, Athenahealth)

---

## Built By

**Padmapriya Vijayaragava Rengaraj**
MS Computer Science — Cal State Fullerton (May 2026)

[padmavijay.com](https://padmavijay.com) · [github.com/padmapriyavj](https://github.com/padmapriyavj)
