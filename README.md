# Kyron Medical — AI Patient Portal

> A HIPAA-aware, voice-enabled AI patient intake and appointment scheduling web app built for Kyron Medical's technical interview.

**Live Demo:** [kyron-medical-five.vercel.app](https://kyron-medical-five.vercel.app)

---

## Features

- **Conversational AI Intake** — Collects patient name, DOB, phone, email, and reason for visit through a natural chat interface
- **Semantic Doctor Matching** — Matches patient symptoms/body parts to the correct specialist using LLM reasoning
- **Appointment Scheduling** — Shows available slots per doctor, handles natural language requests like "do you have a Tuesday?"
- **Email Confirmation** — Sends a branded HTML confirmation email on booking via Resend
- **Voice Call Handoff** — "Call Me Instead" button triggers an outbound AI phone call via Vapi, resuming the exact chat context on the call
- **Liquid Glass UI** — Kyron Medical branded dark theme with animated gradient orbs, frosted glass cards, and smooth animations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| AI Chat | Groq API (llama-3.1-8b-instant) |
| Voice AI | Vapi (outbound phone calls) |
| Email | Resend API |
| Hosting | Vercel (serverless functions + CDN) |
| Styling | Custom CSS (liquid glass / backdrop-filter) |

---

## Architecture

```
src/
├── components/
│   ├── ChatInterface.jsx    # Main chat UI, message state, token parsing
│   └── CallButton.jsx       # Vapi call trigger with state management
├── data/
│   └── doctors.js           # Hardcoded doctor profiles + availabilities
├── utils/
│   ├── groqChat.js          # Groq API client + system prompt builder
│   ├── vapiCall.js          # Vapi outbound call with chat context injection
│   └── sendEmail.js         # Client-side email trigger
api/
├── make-call.js             # Vercel serverless — Vapi REST API call
└── send-email.js            # Vercel serverless — Resend email dispatch
```

---

## How the Voice Handoff Works

1. Patient completes intake and books appointment via chat
2. Patient clicks **"Call Me Instead"**
3. Frontend sends full chat history + patient data to `/api/make-call`
4. Serverless function calls Vapi REST API with:
   - Patient's phone number (E.164 formatted)
   - Full chat context injected as system prompt
   - Custom first message referencing the existing booking
5. Vapi calls the patient's phone within ~10 seconds
6. AI picks up the conversation exactly where the chat left off

---

## Doctors & Specialties

| Doctor | Specialty | Treats |
|---|---|---|
| Dr. Sarah Chen | Cardiology | Heart, chest, blood pressure, cardiovascular |
| Dr. Marcus Williams | Orthopedics | Bones, joints, knee, hip, shoulder, back, spine |
| Dr. Priya Patel | Dermatology | Skin, rash, acne, moles, eczema, hair, nails |
| Dr. James O'Brien | Neurology | Brain, headaches, migraines, nerves, dizziness |

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
# Fill in your API keys (see below)

# Run locally with Vercel dev server (required for API routes)
vercel dev
```

### Environment Variables

```env
# Frontend (Vite)
VITE_GROQ_API_KEY=your_groq_api_key

# Serverless functions (Vercel only)
RESEND_API_KEY=your_resend_api_key
RESEND_TO_EMAIL=your_verified_email
VAPI_PRIVATE_KEY=your_vapi_private_key
VAPI_PHONE_NUMBER_ID=your_vapi_phone_number_id
VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

---

## Deployment

```bash
# Deploy to Vercel
vercel --prod
```

Vercel automatically detects the Vite frontend and deploys the `api/` folder as serverless functions.

---

## Design

The UI uses a **liquid glass** aesthetic matching Kyron Medical's dark navy brand:

- `backdrop-filter: blur(24px)` frosted glass cards
- Animated floating gradient orbs in the background
- Kyron blue (`#3b82f6`) and indigo (`#6366f1`) accent colors
- Smooth typing indicator and message animations
- Fully responsive layout

---

## Known Limitations & Future Work

- SMS notifications require Twilio account approval (skipped for demo)
- Doctor availability is hardcoded — production would use a real scheduling API
- Resend free tier only sends to verified emails — custom domain needed for production
- No persistent storage — conversation state lives in React state only
- Call-back memory (AI remembering previous calls) is partially implemented via Vapi context injection

---

## Built By

**Padmapriya Vijayaragava Rengaraj**
MS Computer Science — Cal State Fullerton (May 2026)
[padmavijay.com](https://padmavijay.com) · [github.com/padmapriyavj](https://github.com/padmapriyavj)
