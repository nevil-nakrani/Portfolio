import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMessageSquare } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { sendChat } from '../utils/api';

const SESSION_KEY = 'portfolio_chat_session';

const SUGGESTIONS = [
  'What are your skills?',
  'Tell me about your Odoo experience',
  'What AI projects have you built?',
  'Are you available for hire?',
];

const WELCOME = {
  role: 'bot',
  content: "👋 Hi! I'm Nevil's AI assistant, powered by LangChain + Groq. Ask me anything about Nevil's projects, skills, or experience!",
};

export default function Chatbot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem(SESSION_KEY) || null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (text = input) => {
    const msg = text.trim();
    if (!msg || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const res = await sendChat(msg, sessionId);
      if (res.data.sessionId && !sessionId) {
        setSessionId(res.data.sessionId);
        sessionStorage.setItem(SESSION_KEY, res.data.sessionId);
      }
      setMessages(prev => [...prev, { role: 'bot', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: '⚠️ AI service is temporarily unavailable. Please use the contact form to reach Nevil directly!',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* FAB button */}
      <motion.button
        className="chatbot-fab"
        onClick={() => setOpen(v => !v)}
        aria-label="Open AI chatbot"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? { rotate: 0 } : { rotate: 0 }}
      >
        {!open && <div className="chatbot-pulse" />}
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-header-info">
                <div className="chatbot-name">Nevil's AI Assistant</div>
                <div className="chatbot-status">Online · Powered by LangChain</div>
              </div>
              <button className="chatbot-close" onClick={() => setOpen(false)}>
                <FiX />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages" data-lenis-prevent="true">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`chat-msg ${m.role}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="chat-msg-bubble">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    className="chat-msg bot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="chat-msg-bubble">
                      <div className="chat-typing">
                        <span /><span /><span />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (only at start) */}
            {messages.length <= 1 && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map(s => (
                  <button key={s} className="chat-suggestion" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input-area">
              <input
                className="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything about Nevil..."
                maxLength={300}
                disabled={loading}
              />
              <button
                className="chatbot-send"
                onClick={() => send()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
