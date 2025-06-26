import React, { useState, useRef, useEffect, FormEvent } from "react";

interface Message {
  from: "user" | "bot";
  text: string;
}

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi there Tagad's AI here 👋 If you need any assistance, I’m always here." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chatbot/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: "bot", text: data.reply || data.error }]);
    } catch {
      setMessages(msgs => [...msgs, { from: "bot", text: "Error connecting to AI." }]);
    }
    setInput("");
    setLoading(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            borderRadius: "50%",
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #4f8cff 60%, #7f53ac 100%)",
            color: "#fff",
            border: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            fontSize: 32,
            cursor: "pointer"
          }}
          aria-label="Open chatbot"
        >
          💬
        </button>
      )}

      {/* Chat Widget */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 150,
            right: 24,
            width: 340,
            maxWidth: "90vw",
            height: 480,
            background: "white",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #4f8cff 60%, #7f53ac 100%)",
            color: "#fff",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                alt="Jessica Smith"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #fff"
                }}
              />
              <div>
                <strong>Chat with TAGAD'S AI</strong>
                <div style={{ fontSize: 12, opacity: 0.85 }}>We are online!</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer"
            }} aria-label="Close chatbot">&times;</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: 16,
            background: "#f6f8fa",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column"
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                  background: msg.from === "user" ? "#e3e8ff" : "#fff",
                  color: "#222",
                  borderRadius: 16,
                  padding: "8px 14px",
                  margin: "4px 0",
                  maxWidth: "80%"
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 12, background: "#fff", borderTop: "1px solid #eee" }}>
            <form
              style={{ display: "flex", gap: 8 }}
              onSubmit={handleSubmit}
            >
<input
  className="text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg p-2.5"
  value={input}
  onChange={e => setInput(e.target.value)}
  disabled={loading}
  placeholder="Enter your message..."
  style={{
    flex: 1,
    // Remove color here, Tailwind will handle it
    // color: "#222"
  }}
/>

             <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  background: "linear-gradient(135deg, #4f8cff 60%, #7f53ac 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0 16px",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                {loading ? "..." : "➤"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
