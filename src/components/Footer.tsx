import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import React, { useState, useRef, useEffect, FormEvent } from "react";

// --- Privacy Policy Modal ---
const PrivacyPolicyModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-blue-500"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Privacy Policy</h2>
        <div className="text-gray-700 text-sm space-y-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <p><strong>Last updated:</strong> June 28, 2025</p>
          <p>
            <strong>Tagad Platforms LLP</strong> (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Information We Collect:</strong> Personal details (name, email, phone, company), usage data (IP, browser, device), and information you submit via forms or chatbots. We use cookies for analytics and site functionality.</li>
            <li><strong>How We Use Your Information:</strong> To provide and improve services, respond to inquiries, send updates or marketing (with your consent), analyze usage, protect our site, and comply with legal obligations.</li>
            <li><strong>Sharing Your Information:</strong> We do <b>not</b> sell your information. We may share it with trusted service providers, for legal reasons, or as part of a business transfer.</li>
            <li><strong>Cookies:</strong> Used for site functionality and analytics. You can control cookies via your browser settings.</li>
            <li><strong>Data Security:</strong> We use reasonable security measures to protect your data, but no method of transmission is 100% secure.</li>
            <li><strong>Your Rights:</strong> You can request access, correction, or deletion of your data, and object to or restrict processing. Contact us at <a href="mailto:support@brtagad.com" className="text-blue-500 underline">support@brtagad.com</a>.</li>
            <li><strong>Children’s Privacy:</strong> We do not knowingly collect data from children under 16.</li>
            <li><strong>Changes:</strong> We may update this policy. The latest version will always be posted here.</li>
            <li><strong>Contact:</strong> Tagad Platforms LLP, 3070 Rotary Way, Burlington ON L7M 0H1, Canada. Email: <a href="mailto:support@brtagad.com" className="text-blue-500 underline">support@brtagad.com</a>, Phone: +91 9356961657</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Terms of Service Modal ---
const TermsModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-blue-500"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Terms of Service</h2>
        <div className="text-gray-700 text-sm space-y-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <p><strong>Last updated:</strong> June 28, 2025</p>
          <p>
            <strong>Agreement to Terms:</strong> By accessing and using Tagad Platforms LLP’s website or services, you agree to these Terms of Service. If you do not agree, do not use our site or services.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Use of Services:</strong> You must be at least 16 years old. Do not use our services for unlawful, harmful, or abusive activities.</li>
            <li><strong>Prohibited Uses:</strong> No spamming, hacking, copyright infringement, harassment, or posting of illegal/obscene content.</li>
            <li><strong>Intellectual Property:</strong> All site content, trademarks, and software are owned by Tagad Platforms LLP or its licensors. Do not copy, reuse, or redistribute without permission.</li>
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li><strong>Third-Party Links:</strong> We may link to third-party sites. We are not responsible for their content or privacy practices.</li>
            <li><strong>Limitation of Liability:</strong> We are not liable for damages resulting from your use of our site, except as required by law.</li>
            <li><strong>Dispute Resolution:</strong> Any disputes will be governed by the laws of Ontario, Canada. You agree to resolve disputes through binding arbitration or small claims court.</li>
            <li><strong>Changes to Terms:</strong> We may update these terms at any time. Continued use means you accept the new terms.</li>
            <li><strong>Contact:</strong> Tagad Platforms LLP, 3070 Rotary Way, Burlington ON L7M 0H1, Canada. Email: <a href="mailto:support@brtagad.com" className="text-blue-500 underline">support@brtagad.com</a>, Phone: +91 9356961657</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Chatbot Widget Component (unchanged) ---
interface Message {
  from: "user" | "bot";
  text: string;
}
const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi there TAGAD'S AI here👋 If you need any assistance, I’m always here." }
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
      {/* Floating Chatbot Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 150, // Above WhatsApp button
            right: 20,
            zIndex: 10000,
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

      {/* Chat Widget Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 150,
            right: 20,
            width: 340,
            maxWidth: "90vw",
            height: 480,
            background: "white",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            zIndex: 10001,
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
            <div>
              <strong>Chat with TAGAD'S AI</strong>
              <div style={{ fontSize: 12, opacity: 0.85 }}>We are online!</div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer"
            }} aria-label="Close chatbot">&times;</button>
          </div>
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
          <div style={{ padding: 12, background: "#fff", borderTop: "1px solid #eee" }}>
            <form
              style={{ display: "flex", gap: 8 }}
              onSubmit={handleSubmit}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                placeholder="Enter your message..."
                style={{
                  flex: 1,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: "8px 12px",
                  color: "#222",
                  background: "#fffbe6"
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

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Tagad Platforms
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Vision to Impact — For a Billion and Beyond.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/brtagad2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/b-r-tagad-69816b370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Services', path: '/services' },
                  { name: 'Portfolio', path: '/portfolio' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <div className="space-y-2">
                {[
                  'E-Commerce Development',
                  'Mobile App Development',
                  'Business Software',
                  'Digital Marketing',
                  'ERP Solutions',
                  'Project Management',
                ].map((service) => (
                  <div key={service} className="text-gray-400 text-sm">
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>support@brtagad.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+91 9356961657</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>Canada: 3070 Rotary Way, Burlington ON L7M 0H1.</span>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Tagad Platforms. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                onClick={e => {
                  e.preventDefault();
                  setPrivacyOpen(true);
                }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                onClick={e => {
                  e.preventDefault();
                  setTermsOpen(true);
                }}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919356961657?text=Hello%20Tagad%20Team%2C%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-button"
        style={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          zIndex: 9999,
          display: 'block',
        }}
      >
        <img
          src="https://i.ibb.co/6RFWWFjk/whasdsdsdsd.png"
          alt="Chat on WhatsApp"
          style={{
            height: 60,
            width: 60,
            borderRadius: '50%',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            cursor: 'pointer',
          }}
        />
      </a>

      {/* Chatbot Floating Widget (above WhatsApp) */}
      <ChatbotWidget />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />

      {/* Terms of Service Modal */}
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};

export default Footer;
