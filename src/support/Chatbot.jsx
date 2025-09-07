import React, { useState, useRef, useEffect } from "react";
import "./styles/chat.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const generateBotResponse = async (currentHistory) => {
    try {
      const formattedHistory = currentHistory.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      }));

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": import.meta.env.VITE_GEMINI_API_KEY,
          },
          body: JSON.stringify({ contents: formattedHistory }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const botText = data.candidates[0].contents.parts[0].text
        .replace(/\^(\^.*?)\^(\^*)/g, "$1")
        .trim();

      // Update chat history
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.text === "thinking ..." && msg.role === "bot"
            ? { ...msg, text: botText }
            : msg
        )
      );
    } catch (error) {
      console.error(error);
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.text === "thinking ..." && msg.role === "bot"
            ? {
                ...msg,
                text:
                  "Sorry, I'm having trouble connecting right now. Please try again later.",
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    // Add user message and bot placeholder
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "bot", text: "thinking ..." },
    ]);

    setInput("");
    setLoading(true);

    // Call API with the latest history
    generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-toggle ${isOpen ? "open" : ""}`} onClick={toggleChat}>
        {isOpen ? "×" : "💬"}
      </div>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Gemini Assistant</h3>
            <button className="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.role}`}>
                <div className="message-content">
                  {msg.role === "bot" && <div className="bot-avatar">AI</div>}
                  <div className="message-text">{msg.text}</div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={loading ? "Waiting for response..." : "Type your message..."}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "⏳" : "↑"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
