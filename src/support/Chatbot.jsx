import React, { useState, useRef, useEffect } from "react";
import "./styles/chat.css";

const RULES = [
  { keywords: ["hello", "hi", "hey", "greetings"], response: "Hello! Welcome to the stroke support chatbot. I can provide information on common stroke-related topics. How can I help you today?" },
  { keywords: ["what is a stroke", "stroke definition"], response: "A stroke occurs when the blood supply to part of your brain is interrupted, preventing brain tissue from getting oxygen and nutrients. This can cause brain cells to die." },
  { keywords: ["symptoms", "signs of a stroke", "fast test", "what are the symptoms"], response: "The FAST test is a simple way to remember the key signs of a stroke: \n\n**F** - Face drooping: Is one side of the face numb or drooping?\n**A** - Arm weakness: Is one arm weak or numb?\n**S** - Speech difficulty: Is speech slurred or difficult to understand?\n**T** - Time to call emergency services. If you notice any of these signs, call for help immediately." },
  { keywords: ["stroke recovery", "rehabilitation", "rehab", "recovering"], response: "Stroke recovery is a process that can take time. Rehabilitation often includes physical therapy, occupational therapy, and speech therapy to help you regain skills and independence." },
  { keywords: ["emotional support", "feeling sad", "depressed after stroke"], response: "It's common to experience a range of emotions after a stroke. Talking to a professional or a support group can be very helpful. Please consider reaching out to a support service for guidance." },
  { keywords: ["resources", "support groups", "help"], response: "You can find a variety of resources and support groups online and in your local community. Organizations like the American Stroke Association and the National Stroke Association offer extensive information and support networks." },
  { keywords: [], response: "I'm sorry, I couldn't find an answer for that. Please try rephrasing your question or ask about one of these topics: **symptoms**, **recovery**, or **resources**." },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const getBotResponse = (userMessage) => {
    const normalizedInput = userMessage.toLowerCase();
    for (const rule of RULES) {
      if (rule.keywords.some(keyword => normalizedInput.includes(keyword))) return rule.response;
    }
    return RULES.find(rule => rule.keywords.length === 0).response;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    const botResponse = getBotResponse(userMessage);
    setChatHistory(prev => [...prev, { role: "user", text: userMessage }, { role: "bot", text: botResponse }]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      <div className="chat-toggle-btn" onClick={toggleChat}>{isOpen ? "×" : "💬"}</div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            Stroke Assistant
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="chat-messages">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>{msg.text}</div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me a question..."
              />
              <button onClick={handleSend}>↑</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
