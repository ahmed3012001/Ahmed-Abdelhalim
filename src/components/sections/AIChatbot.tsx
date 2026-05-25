import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// ── Portfolio context system prompt ──────────────────────────────────────────
const SYSTEM_PROMPT = `You are Ahmed Abdelhalim's personal AI assistant embedded in his portfolio website. You are helpful, friendly, and knowledgeable about Ahmed's work.

Key facts about Ahmed:
- Front-End Software Engineer based in Egypt
- Specializes in React, TypeScript, Tailwind CSS, Bootstrap, JavaScript, HTML, CSS
- Passionate about pixel-perfect UI, performance optimization, and accessibility
- Builds production-grade, scalable web interfaces
- Open to freelance work, collaborations, and full-time opportunities

When asked about Ahmed's work, projects, skills, or availability — answer based on these facts.
For general questions, answer helpfully and conversationally.
Keep responses concise (2-4 sentences max unless more detail is needed).
Be warm, professional, and human-like. Never be robotic.
If asked something you can't know (like a specific project URL), say you can point them to the Contact section.`

// ── Quick suggestion chips ────────────────────────────────────────────────────
const SUGGESTIONS = [
  "What's Ahmed's tech stack?",
  "Is Ahmed available for freelance?",
  "Tell me about his experience",
  "How can I contact Ahmed?",
]

// ── Typing animation component ───────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--primary)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  )
}

// ── Simple markdown renderer (bold, code, line breaks) ───────────────────────
function MarkdownText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ background: 'rgba(139,92,246,0.15)', color: 'var(--primary)' }}>
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part === '\n') return <br key={i} />
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{
          background: isUser
            ? 'var(--primary)'
            : 'linear-gradient(135deg, var(--gradient-glow-1), var(--gradient-glow-3))',
        }}
      >
        {isUser
          ? <User size={14} color="#fff" aria-hidden="true" />
          : <Bot size={14} color="#fff" aria-hidden="true" />
        }
      </div>

      {/* Bubble */}
      <div
        className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={isUser ? {
          background: 'var(--primary)',
          color: '#fff',
          borderBottomRightRadius: 6,
        } : {
          background: 'var(--card)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          borderBottomLeftRadius: 6,
        }}
      >
        <MarkdownText text={message.content} />
        <p
          className="text-[10px] mt-1 opacity-50"
          style={{ textAlign: isUser ? 'right' : 'left' }}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main chatbot component ────────────────────────────────────────────────────
export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm Ahmed's AI assistant. Ask me anything about his skills, projects, or how to get in touch! 👋",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: text.trim() },
    ]
    setConversationHistory(newHistory)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      })

      if (!response.ok) throw new Error('API error')

      const data = await response.json()
      const reply = data.content?.map((b: any) => b.text || '').join('') || getFallback(text)

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      }

      setConversationHistory(prev => [...prev, { role: 'assistant', content: reply }])
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      // Fallback response
      const fallback = getFallback(text)
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: fallback, timestamp: new Date() },
      ])
    } finally {
      setIsTyping(false)
    }
  }, [isTyping, conversationHistory])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close chat' : 'Open AI chat assistant'}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: 'linear-gradient(135deg, var(--gradient-glow-1), var(--gradient-glow-3))',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? { rotate: 90 } : { rotate: 0 }}
        transition={{ duration: 0.22 }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}><X size={22} color="#fff" /></motion.div>
            : <motion.div key="chat" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}><MessageCircle size={22} color="#fff" /></motion.div>
          }
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: 'var(--primary)' }} aria-hidden="true" />
        )}
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[9997] w-[360px] max-w-[calc(100vw-24px)]"
            role="dialog"
            aria-label="AI Chat Assistant"
            aria-modal="true"
          >
            {/* Animated gradient border around chatbot window */}
            <div className="animated-gradient-border rounded-2xl p-[2px]">
              <div
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--bg)',
                  height: 520,
                  maxHeight: 'calc(100vh - 120px)',
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--gradient-glow-3), var(--gradient-glow-1))',
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles size={16} color="#fff" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm text-white">Ahmed's AI Assistant</p>
                    <p className="text-[10px] text-white/70 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      Online · Powered by Ahmed Abdelhalim
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="ml-auto w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                    style={{ color: '#fff' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
                  {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--gradient-glow-1), var(--gradient-glow-3))' }}
                      >
                        <Bot size={14} color="#fff" />
                      </div>
                      <div
                        className="rounded-2xl"
                        style={{
                          background: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestion chips — only when no conversation yet */}
                {messages.length <= 1 && (
                  <div className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-hide">
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-105"
                        style={{
                          borderColor: 'var(--border)',
                          color: 'var(--text-muted)',
                          background: 'var(--card)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input bar */}
                <div
                  className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything…"
                    disabled={isTyping}
                    aria-label="Type a message"
                    className="flex-1 bg-transparent text-sm outline-none disabled:opacity-50"
                    style={{ color: 'var(--text)' }}
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-40 hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, var(--gradient-glow-1), var(--gradient-glow-3))',
                    }}
                  >
                    <Send size={14} color="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Fallback responses when API is unavailable ────────────────────────────────
function getFallback(input: string): string {
  const q = input.toLowerCase()
  if (q.match(/hi|hello|hey|greet/)) {
    return "Hello! Great to meet you. I'm here to answer anything about Ahmed's work and skills. What would you like to know? 😊"
  }
  if (q.match(/stack|tech|skills?|use|work with/)) {
    return "Ahmed's core stack is **React**, **TypeScript**, and **Tailwind CSS**. He also works with Bootstrap, plain JavaScript, HTML, and CSS — and he's comfortable with the full UI layer from design systems to performance optimization."
  }
  if (q.match(/project|built|portfolio|work/)) {
    return "Ahmed has built production-grade interfaces with a focus on performance, accessibility, and clean architecture. You can check out his projects section for detailed examples — just scroll up!"
  }
  if (q.match(/hire|freelance|available|job|opportunit|contact/)) {
    return "Yes! Ahmed is open to freelance projects, collaborations, and full-time opportunities. The best way to reach out is through the **Contact** section — he typically responds quickly."
  }
  if (q.match(/experience|year|long|senior|junior/)) {
    return "Ahmed is a skilled Front-End Engineer with hands-on experience building scalable, accessible React + TypeScript applications. He focuses on delivering pixel-perfect, production-ready UI."
  }
  if (q.match(/location|where|country|egypt|remote/)) {
    return "Ahmed is based in Egypt and is open to remote work with teams globally."
  }
  return "That's a great question! I'd suggest reaching out to Ahmed directly via the **Contact** section — he'd be happy to answer in detail. Is there anything else I can help you with?"
}
