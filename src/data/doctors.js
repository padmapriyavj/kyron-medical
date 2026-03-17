export const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      bodyParts: ["heart", "chest", "cardiovascular", "cardiac", "blood pressure", "palpitations", "arteries"],
      bio: "Board-certified cardiologist with 15 years of experience.",
      availability: [
        { date: "2026-03-20", day: "Friday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
        { date: "2026-03-24", day: "Tuesday", slots: ["10:00 AM", "1:00 PM", "3:30 PM"] },
        { date: "2026-03-27", day: "Friday", slots: ["9:00 AM", "11:30 AM"] },
        { date: "2026-03-31", day: "Tuesday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
        { date: "2026-04-03", day: "Friday", slots: ["9:00 AM", "1:00 PM"] },
        { date: "2026-04-07", day: "Tuesday", slots: ["11:00 AM", "3:00 PM"] },
        { date: "2026-04-14", day: "Tuesday", slots: ["9:30 AM", "2:00 PM"] },
      ]
    },
    {
      id: 2,
      name: "Dr. Marcus Williams",
      specialty: "Orthopedics",
      bodyParts: ["bone", "bones", "joint", "joints", "knee", "hip", "shoulder", "back", "spine", "fracture", "muscle", "tendon", "ligament", "wrist", "ankle", "elbow"],
      bio: "Orthopedic surgeon specializing in sports injuries and joint replacement.",
      availability: [
        { date: "2026-03-19", day: "Thursday", slots: ["8:00 AM", "10:00 AM", "1:00 PM"] },
        { date: "2026-03-23", day: "Monday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
        { date: "2026-03-26", day: "Thursday", slots: ["8:00 AM", "2:00 PM"] },
        { date: "2026-03-30", day: "Monday", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
        { date: "2026-04-02", day: "Thursday", slots: ["9:00 AM", "11:00 AM"] },
        { date: "2026-04-06", day: "Monday", slots: ["8:00 AM", "2:00 PM", "4:00 PM"] },
        { date: "2026-04-13", day: "Monday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
      ]
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialty: "Dermatology",
      bodyParts: ["skin", "rash", "acne", "mole", "hair", "nail", "nails", "eczema", "psoriasis", "dermatitis", "sunburn", "lesion", "wart", "face", "scalp"],
      bio: "Dermatologist specializing in medical and cosmetic skin conditions.",
      availability: [
        { date: "2026-03-18", day: "Wednesday", slots: ["9:00 AM", "11:00 AM", "2:30 PM"] },
        { date: "2026-03-25", day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
        { date: "2026-04-01", day: "Wednesday", slots: ["9:00 AM", "11:30 AM", "2:00 PM"] },
        { date: "2026-04-08", day: "Wednesday", slots: ["10:00 AM", "1:00 PM"] },
        { date: "2026-04-15", day: "Wednesday", slots: ["9:00 AM", "11:00 AM", "3:30 PM"] },
        { date: "2026-04-22", day: "Wednesday", slots: ["10:00 AM", "2:00 PM"] },
      ]
    },
    {
      id: 4,
      name: "Dr. James O'Brien",
      specialty: "Neurology",
      bodyParts: ["brain", "head", "headache", "migraine", "nerve", "nerves", "neurological", "seizure", "memory", "dizzy", "dizziness", "stroke", "spine", "numbness", "tingling"],
      bio: "Neurologist with expertise in headache disorders, epilepsy, and memory conditions.",
      availability: [
        { date: "2026-03-20", day: "Friday", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
        { date: "2026-03-24", day: "Tuesday", slots: ["9:00 AM", "11:30 AM"] },
        { date: "2026-03-27", day: "Friday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
        { date: "2026-04-03", day: "Friday", slots: ["9:30 AM", "1:00 PM"] },
        { date: "2026-04-07", day: "Tuesday", slots: ["10:00 AM", "2:30 PM"] },
        { date: "2026-04-10", day: "Friday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
        { date: "2026-04-17", day: "Friday", slots: ["10:00 AM", "1:00 PM"] },
      ]
    }
  ]
  
  export const practiceInfo = {
    name: "Kyron Medical Group",
    address: "123 Health Plaza, Suite 400, Providence, RI 02903",
    phone: "(401) 555-0192",
    email: "appointments@kyronmedicalgroup.com",
    hours: {
      monday: "8:00 AM – 5:00 PM",
      tuesday: "8:00 AM – 5:00 PM",
      wednesday: "8:00 AM – 5:00 PM",
      thursday: "8:00 AM – 5:00 PM",
      friday: "8:00 AM – 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    }
  }