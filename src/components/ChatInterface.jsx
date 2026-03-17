import { useState, useRef, useEffect } from "react";
import { sendToGroq } from "../utils/groqChat";
import { sendConfirmationEmail } from "../utils/sendEmail";
import CallButton from "./CallButton";
import QuickReplies from "./QuickReplies";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hello! Welcome to Kyron Medical Patient Portal. I'm your AI assistant and I'm here to help you schedule appointments, check on prescriptions, or answer any questions about our practice. To get started, could you please tell me your first and last name?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [booking, setBooking] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const parseSpecialTokens = (text, currentPatientData) => {
    let updatedPatient = { ...currentPatientData };
    let cleanText = text;

    // Parse EMAIL_COLLECTED
    const emailMatch = text.match(/EMAIL_COLLECTED:(\{[^}]+\})/);
    if (emailMatch) {
      try {
        const { email } = JSON.parse(emailMatch[1]);
        updatedPatient.email = email;
      } catch {}
      cleanText = cleanText.replace(/EMAIL_COLLECTED:\{[^}]+\}/, "").trim();
    }

    // Parse PHONE_COLLECTED
    const phoneMatch = text.match(/PHONE_COLLECTED:(\{[^}]+\})/);
    if (phoneMatch) {
      try {
        const { phone } = JSON.parse(phoneMatch[1]);
        updatedPatient.phone = phone;
      } catch {}
      cleanText = cleanText.replace(/PHONE_COLLECTED:\{[^}]+\}/, "").trim();
    }

    // Parse APPOINTMENT_BOOKED
    const bookingMatch = text.match(/APPOINTMENT_BOOKED:(\{.*?\})/);
    if (bookingMatch) {
      try {
        const bookingData = JSON.parse(bookingMatch[1]);
        setBooking(bookingData);
        updatedPatient = { ...updatedPatient, ...bookingData };
        sendConfirmationEmail(bookingData);
      } catch {}
      cleanText = cleanText.replace(/APPOINTMENT_BOOKED:\{.*?\}/, "").trim();
    }

    return { cleanText, updatedPatient };
  };

  const sendMessage = async (directText = null) => {
    const messageText = directText || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const responseText = await sendToGroq(updatedMessages, patientData);
      const { cleanText, updatedPatient } = parseSpecialTokens(
        responseText,
        patientData
      );
      setPatientData(updatedPatient);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: cleanText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-wrapper">
      {/* Header */}
      <div className="chat-header glass">
        <div className="header-left">
          <div className="avatar-pulse">
            <div className="avatar-dot" />
          </div>
          <div>
            <h2 className="header-title">Kyron Medical</h2>
            <span className="header-status">AI Assistant • Online</span>
          </div>
        </div>
        <CallButton patientData={patientData} messages={messages} />
      </div>

      {/* Booking confirmation banner */}
      {booking && (
        <div className="glass booking-banner">
          Appointment booked with {booking.doctorName} on {booking.date} at{" "}
          {booking.time}
        </div>
      )}

      {/* Messages */}
      <div className="messages-area">
        {messages.map((msg, index) => (
          <div key={msg.id}>
            <div className={`message-row ${msg.role}`}>
              {msg.role === "assistant" && <div className="msg-avatar">K</div>}
              <div className="message-bubble glass">
                <p className="msg-text">{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
            </div>
            {/* Show chips only after the last assistant message */}
            {msg.role === "assistant" &&
              index === messages.length - 1 &&
              !isTyping && (
                <QuickReplies
                  lastMessage={msg.text}
                  patientData={patientData}
                  onSelect={(chip) => {
                    if (chip === "Call me instead 📞") {
                      document.querySelector(".call-btn")?.click();
                    } else {
                      setInput(chip);
                      setTimeout(() => sendMessage(chip), 100);
                    }
                  }}
                />
              )}
          </div>
        ))}

        {isTyping && (
          <div className="message-row assistant">
            <div className="msg-avatar">K</div>
            <div className="message-bubble glass typing-bubble">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="input-bar glass">
        <textarea
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
