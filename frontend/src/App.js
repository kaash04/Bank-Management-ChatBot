import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatBot from "./components/ChatBot";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (text, isUser = true) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="app">
      <ChatWindow
        messages={messages}
        addMessage={addMessage}
        isTyping={isTyping}
      />
      <ChatBot
        addMessage={addMessage}
        messages={messages}
        setIsTyping={setIsTyping}
      />
    </div>
  );
}

export default App;
