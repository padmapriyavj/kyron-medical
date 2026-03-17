export default function QuickReplies({ lastMessage, onSelect, patientData }) {
    const getChips = () => {
      const msg = lastMessage?.toLowerCase() || ''
  
      // Opening — no data collected yet
      if (msg.includes('first and last name') || msg.includes('your name')) {
        return []  // Let them type their name freely
      }
  
      // After name collected, asking for DOB
      if (msg.includes('date of birth') || msg.includes('born')) {
        return []  // Free text for DOB
      }
  
      // Asking for reason / body part
      if (msg.includes('reason') || msg.includes('body part') || msg.includes('brings you') || msg.includes('concerning')) {
        return ['I have a headache', 'Knee pain', 'Skin rash', 'Chest pain']
      }
  
      // Showing available slots
      if (msg.includes('available') || msg.includes('slots') || msg.includes('appointment') && msg.includes('am') || msg.includes('pm')) {
        return ['First available slot', 'Do you have a Tuesday?', 'Do you have a Friday?', 'Do you have a Monday?']
      }
  
      // Confirming appointment details
      if (msg.includes('confirm') || msg.includes('just to confirm') || msg.includes('details')) {
        return ['Yes, confirm it!', 'No, let me pick a different time']
      }
  
      // After booking
      if (msg.includes('booked') || msg.includes('confirmed') || msg.includes('looking forward')) {
        return ['Call me instead 📞', 'What are your office hours?', 'How do I reschedule?']
      }
  
      // Office hours question
      if (msg.includes('hours') || msg.includes('address') || msg.includes('location')) {
        return ['Schedule an appointment', 'Check prescription refill', 'That\'s all, thank you!']
      }
  
      // Generic fallback for yes/no questions
      if (msg.includes('would you like') || msg.includes('shall i') || msg.includes('does that work')) {
        return ['Yes please', 'No, let me change something']
      }
  
      return []
    }
  
    const chips = getChips()
    if (chips.length === 0) return null
  
    return (
      <div className="quick-replies">
        {chips.map((chip, i) => (
          <button
            key={i}
            className="chip"
            onClick={() => onSelect(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    )
  }