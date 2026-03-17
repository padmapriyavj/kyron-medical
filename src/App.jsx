import ChatInterface from "./components/ChatInterface";
import "./index.css";

function App() {
  return (
    <>
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <ChatInterface />
    </>
  );
}

export default App;
