import React, { useState, useRef, useEffect } from "react";
import "./styles/chat.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Add user message
    setMessages(prev => [...prev, { from: "user", text: input }]);
    setLoading(true);

    try {
      // Replace with your Hugging Face token
      const HUGGING_FACE_API_TOKEN = import.meta.env.VITE_HF_TOKEN;
      const HUGGING_FACE_MODEL = "meta-llama/Llama-2-7b-chat-hf";

      const response = await fetch(
        `https://api-inference.huggingface.co/models/${HUGGING_FACE_MODEL}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_API_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: `User: ${input}\nAssistant:`,
            parameters: { max_new_tokens: 200 }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw HF response:", data);

      let botReply = "Sorry, I didn't understand that.";

      // Extract generated text (might vary depending on model)
      if (Array.isArray(data) && data[0]?.generated_text) {
        botReply = data[0].generated_text;
      } else if (data?.generated_text) {
        botReply = data.generated_text;
      }

      setMessages(prev => [...prev, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Error fetching from Hugging Face:", err);
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "Sorry, I'm having trouble connecting to AI right now." }
      ]);
    } finally {
      setLoading(false);
    }

    setInput("");
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
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbot-message bot">...</div>}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={loading ? "Thinking..." : "Type your message..."}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
