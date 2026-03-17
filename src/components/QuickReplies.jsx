export default function QuickReplies({ lastMessage, onSelect, patientData }) {
  const getChips = () => {
    // If appointment already booked, show post-booking chips only
    if (patientData?.doctorName) {
      return [
        "Call me instead 📞",
        "What are your office hours?",
        "That's all, thank you!",
      ];
    }

    const msg = lastMessage?.toLowerCase() || "";

    // Opening — no data collected yet
    if (msg.includes("first and last name") || msg.includes("your name")) {
      return [];
    }

    // After name collected, asking for DOB
    if (msg.includes("date of birth") || msg.includes("born")) {
      return [];
    }

    // Asking for reason / body part
    if (
      msg.includes("reason") ||
      msg.includes("body part") ||
      msg.includes("brings you") ||
      msg.includes("concerning") ||
      msg.includes("symptom") ||
      msg.includes("experiencing")
    ) {
      return ["I have a headache", "Knee pain", "Skin rash", "Chest pain"];
    }

    // Showing available slots — only before booking
    if (
      (msg.includes("available") && msg.includes("slot")) ||
      (msg.includes("appointment") &&
        (msg.includes(":00") || msg.includes(":30")))
    ) {
      return [
        "First available slot",
        "Do you have a Tuesday?",
        "Do you have a Friday?",
        "Do you have a Monday?",
      ];
    }

    // Confirming appointment details
    if (msg.includes("just to confirm") || msg.includes("shall i confirm")) {
      return ["Yes, confirm it!", "No, let me pick a different time"];
    }

    // Office hours question
    if (
      msg.includes("hours") ||
      msg.includes("address") ||
      msg.includes("location")
    ) {
      return [
        "Schedule an appointment",
        "Check prescription refill",
        "That's all, thank you!",
      ];
    }

    // Generic yes/no
    if (
      msg.includes("would you like") ||
      msg.includes("shall i") ||
      msg.includes("does that work")
    ) {
      return ["Yes please", "No, let me change something"];
    }

    return [];
  };

  const chips = getChips();
  if (chips.length === 0) return null;

  return (
    <div className="quick-replies">
      {chips.map((chip, i) => (
        <button key={i} className="chip" onClick={() => onSelect(chip)}>
          {chip}
        </button>
      ))}
    </div>
  );
}
