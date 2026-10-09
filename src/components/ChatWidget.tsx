import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, User, FileDown, CheckCircle2, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  aranya: `**Aranya Organic Dairy Farm** is Adithya's live commercial client deployment at [aranyaorganicdairyfarm.com](https://aranyaorganicdairyfarm.com/).
A 9-year Vedic A2 dairy farm in Shoolagiri, Tamil Nadu, featuring:
• Mobile-first e-commerce catalog with instant WhatsApp cart serialization
• Zero-overhead Gmail customer routing
• Bilingual conversational RAG assistant ("Ask Farm AI") answering customer queries 24/7 on purity, delivery, and Vedic Bilona ghee.`,

  urimai: `**Urimai AI** is a multi-agent Tamil Nadu government scheme eligibility assistant analyzing 64 schemes with 199 rules and conversational Tamil intake (49/49 automated unit tests passing).`,

  services: `Adithya engineers production AI systems through **FutureLogic AI**:
1. **Multi-Agent Systems** (LangGraph, FastAPI, supervisors)
2. **Enterprise RAG Knowledge Engines** (Pinecone, Bedrock, FAISS)
3. **LLM API Integrations** (Claude, Gemini, OpenAI)
4. **Autonomous Customer Chatbots** (e-commerce & WhatsApp commerce)
5. **Computer Vision & OCR**
6. **Time-Series Anomaly Detection**
7. **Tamil & Regional NLP**
8. **End-to-End Full-Stack AI Platforms** (Next.js, Supabase, Cloud Run)
Fast turnaround: Production MVPs delivered in 7–14 days.`,

  freelance: `Under **FutureLogic AI**, Adithya builds production web platforms and AI tools for businesses.
Notable live platform: **Aranya Organic Dairy Farm** ([aranyaorganicdairyfarm.com](https://aranyaorganicdairyfarm.com/)).
Services include fixed-price MVP sprints, custom RAG systems, and AI workflows.
Contact directly via [WhatsApp (+91 88257 14576)](https://wa.me/918825714576)!`,

  mediguard: `**MediGuard V2** is Adithya's flagship clinical AI decision support system (CDSS):
• **Architecture:** 5-agent LangGraph pipeline with a Clinical Supervisor, Intake Nurse, Symptom Red-Flag Agent, RAG Diagnostic Agent over 50k+ papers, and Drug-Drug Allergy Specialist.
• **Speed & Reliability:** End-to-end clinical PDF & HL7 FHIR R4 report generated in <8s.
• **Deployment:** Google Cloud Run + Vercel edge reverse-proxies.
Try the live interactive sandbox on the **Tools** page!`,

  skillspeak: `**SkillSpeak AI** is a mock interview lab and bilingual career tool:
• Tanglish & Tamil to Corporate English converter
• STAR-method interview response analyzer
• Real-time JD keyword matcher and score breakdown
Try it now on the **Tools** page!`,

  townrise: `**TownRise AI** is a growth intelligence platform analyzing 50+ Tamil Nadu towns:
• Integrates OpenStreetMap, Gemini API, and Supabase
• Computes real estate growth score, affordability index, and town infrastructure ratings.`,

  stack: `Adithya's specialized production stack:
• **Languages:** Python, TypeScript, SQL, Modern Bash
• **AI & Orchestration:** LangGraph, LangChain, Pinecone (Vector DB), AWS Bedrock (Claude 3.5), Gemini API, FAISS, DeepEval
• **Backend & Cloud:** FastAPI, Supabase, PostgreSQL, Docker, Google Cloud Run, AWS EC2, GitHub Actions
• **Frontend:** Next.js 14, React 18, Tailwind CSS, Framer Motion`,

  relocate: `**Yes, absolutely!** Adithya is actively available for full-time **AI/ML Engineer** or **Full-Stack AI Builder** roles.
He is open to immediate relocation to **Bengaluru, Chennai, Hyderabad, Pune, Gurgaon, or Noida**, as well as remote positions.`,

  resume: `You can view or download Adithya's official resume directly:
• [Download Resume PDF](/resume.pdf)
• Education: B.Tech in AI & Data Science (8.5 CGPA, Class of 2025)
• Certifications: AWS re/Start, DeepLearning.AI ML Specialization, Prompt Engineering.`,

  cgpa: `Adithya graduated with a B.Tech in **Artificial Intelligence & Data Science** from **Dhanalakshmi Srinivasan College of Engineering, Coimbatore** (Class of 2025) with a cumulative **8.5 CGPA** while shipping multiple production systems.`,

  certifications: `Adithya holds verified credentials:
1. **AWS re/Start Graduate** (Amazon Web Services)
2. **Machine Learning Specialization** (DeepLearning.AI / Coursera)
3. **Prompt Engineering for Generative AI** (Internshala)
4. **BCG Data Science Simulation** (Forage)
5. **Cisco Python Programmer & Networking Essentials**`,

  contact: `Connect with Adithya directly:
• 💬 **WhatsApp:** [+91 88257 14576](https://wa.me/918825714576)
• 📧 **Email:** adithyaadhi0805@gmail.com
• 🐙 **GitHub:** [github.com/Adithya0805](https://github.com/Adithya0805)
• 🔗 **LinkedIn:** [Adithya Kuppusamy](https://www.linkedin.com/in/adithya-kuppusamy-76baab204/)
He typically responds within 24 hours.`,
};

const SUGGESTED_CHIPS = [
  { label: "Clinical AI (MediGuard)", keyword: "mediguard" },
  { label: "Aranya Dairy Client Project", keyword: "aranya" },
  { label: "Tech Stack & Skills", keyword: "stack" },
  { label: "Hire for AI Services", keyword: "services" },
  { label: "Download Resume", keyword: "resume" },
  { label: "Relocation & Full-Time", keyword: "relocate" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with persona-aware welcome message
  useEffect(() => {
    const updateWelcome = () => {
      const persona = localStorage.getItem("adithya_visitor_persona");
      let welcomeText = `Vanakkam! 👋 I am Adithya's personal digital concierge.

I can brief you on his **production AI systems (MediGuard, Aranya Dairy)**, architecture notes, certifications, client services, and employment availability.`;

      if (persona === "recruiter") {
        welcomeText = `Vanakkam! 👋 I see you're evaluating Adithya for engineering opportunities.

I can brief you immediately on his **B.Tech AI & DS credentials (8.5 CGPA)**, AWS re/Start certification, production LangGraph/FastAPI architectures, or provide his direct resume.`;
      } else if (persona === "founder") {
        welcomeText = `Vanakkam! 👋 Welcome! Looking to deploy custom AI or automate your platform?

I can walk you through how Adithya delivered 400+ daily orders for **Aranya Organic Dairy**, his fixed-price MVP sprints (7–14 days), or connect you directly via WhatsApp.`;
      } else if (persona === "engineer") {
        welcomeText = `Vanakkam! 👋 Welcome, fellow builder!

Feel free to ask me anything about the **5-agent LangGraph supervisor graph** in MediGuard, Pinecone RAG latency optimizations, or explore his interactive sandboxes in AI Labs.`;
      }

      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: welcomeText + "\n\nSelect a quick topic below or type any question:",
          timestamp: new Date(),
        },
      ]);
    };

    updateWelcome();
    window.addEventListener("adithya-persona-changed", updateWelcome);
    return () => window.removeEventListener("adithya-persona-changed", updateWelcome);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleResponse = (text: string) => {
    const cleanText = text.toLowerCase();
    let reply = "";

    if (cleanText.includes("aranya") || cleanText.includes("dairy") || cleanText.includes("farm")) {
      reply = KNOWLEDGE_BASE.aranya;
    } else if (cleanText.includes("urimai") || cleanText.includes("scheme") || cleanText.includes("tamil nadu")) {
      reply = KNOWLEDGE_BASE.urimai;
    } else if (cleanText.includes("service") || cleanText.includes("hire") || cleanText.includes("price") || cleanText.includes("cost") || cleanText.includes("mvp")) {
      reply = KNOWLEDGE_BASE.services;
    } else if (cleanText.includes("freelance") || cleanText.includes("futurelogic") || cleanText.includes("client")) {
      reply = KNOWLEDGE_BASE.freelance;
    } else if (cleanText.includes("mediguard") || cleanText.includes("clinical") || cleanText.includes("cdss") || cleanText.includes("health")) {
      reply = KNOWLEDGE_BASE.mediguard;
    } else if (cleanText.includes("skillspeak") || cleanText.includes("speak") || cleanText.includes("interview")) {
      reply = KNOWLEDGE_BASE.skillspeak;
    } else if (cleanText.includes("townrise") || cleanText.includes("town") || cleanText.includes("estate")) {
      reply = KNOWLEDGE_BASE.townrise;
    } else if (cleanText.includes("stack") || cleanText.includes("skill") || cleanText.includes("language") || cleanText.includes("python") || cleanText.includes("langgraph")) {
      reply = KNOWLEDGE_BASE.stack;
    } else if (cleanText.includes("resume") || cleanText.includes("cv") || cleanText.includes("download")) {
      reply = KNOWLEDGE_BASE.resume;
    } else if (cleanText.includes("relocate") || cleanText.includes("available") || cleanText.includes("job") || cleanText.includes("location") || cleanText.includes("hired") || cleanText.includes("relocation")) {
      reply = KNOWLEDGE_BASE.relocate;
    } else if (cleanText.includes("cgpa") || cleanText.includes("education") || cleanText.includes("college") || cleanText.includes("degree")) {
      reply = KNOWLEDGE_BASE.cgpa;
    } else if (cleanText.includes("cert") || cleanText.includes("aws")) {
      reply = KNOWLEDGE_BASE.certifications;
    } else if (cleanText.includes("contact") || cleanText.includes("email") || cleanText.includes("whatsapp") || cleanText.includes("phone")) {
      reply = KNOWLEDGE_BASE.contact;
    } else {
      reply = `I can help you explore Adithya's work! Ask me about:
• **Flagship Systems:** MediGuard V2, Aranya Organic Dairy, Urimai AI
• **Engineering Stack:** LangGraph, AWS Bedrock, Pinecone RAG, FastAPI, Next.js
• **Availability:** Full-time roles, relocation to Bengaluru/Chennai, or freelance MVPs
• **Resume & Certifications:** 8.5 CGPA, AWS re/Start graduate.

Feel free to click any quick chip below!`;
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: reply,
          timestamp: new Date(),
        },
      ]);
    }, 700);
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    handleResponse(textToSend);
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Bullets
      const isBullet = line.startsWith("• ");
      const rawContent = isBullet ? line.slice(2) : line;

      // Parse bold & links
      const parts = rawContent.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
      const renderedParts = parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={idx} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          return (
            <a
              key={idx}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8a96e] hover:underline font-medium inline-flex items-center gap-0.5"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return <span key={idx}>{part}</span>;
      });

      return (
        <div key={lineIdx} className={isBullet ? "flex items-start gap-1.5 my-1 pl-1" : "min-h-[1.2em]"}>
          {isBullet && <span className="text-[#c8a96e] font-bold shrink-0">•</span>}
          <span>{renderedParts}</span>
        </div>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* ── Floating Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#111111] border border-[#c8a96e]/40 text-white shadow-2xl hover:border-[#c8a96e] transition-all"
            aria-label="Chat with Adithya's AI"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#c8a96e]" />
              Ask AI Agent
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-[92vw] sm:w-[420px] h-[580px] rounded-2xl glass-premium flex flex-col overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c8a96e]/15 border border-[#c8a96e]/30 flex items-center justify-center text-[#c8a96e] relative">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-white flex items-center gap-1.5 leading-none">
                    Adithya AI Agent
                    <Sparkles className="w-3.5 h-3.5 text-[#c8a96e]" />
                  </h3>
                  <span className="text-[10px] text-white/50 mt-1 block">Trained on Production Deployments</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[88%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-xs mt-0.5 ${
                      msg.sender === "bot"
                        ? "bg-[#c8a96e]/10 border-[#c8a96e]/30 text-[#c8a96e]"
                        : "bg-white/10 border-white/15 text-white/80"
                    }`}
                  >
                    {msg.sender === "bot" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed shadow-sm border ${
                      msg.sender === "bot"
                        ? "bg-[#141414] border-white/10 text-white/90 rounded-tl-xs"
                        : "bg-[#c8a96e] text-black font-medium border-transparent rounded-tr-xs"
                    }`}
                  >
                    {msg.sender === "bot" ? renderMarkdown(msg.text) : msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] items-center">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-[#c8a96e]/30 bg-[#c8a96e]/10 text-[#c8a96e]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-xl rounded-tl-xs bg-[#141414] border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="px-3 py-2 border-t border-white/10 bg-black/40 flex gap-1.5 overflow-x-auto select-none no-scrollbar">
              {SUGGESTED_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.label)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#c8a96e] hover:text-black border border-white/10 hover:border-transparent text-[11px] text-white/80 font-medium transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Panel */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-white/10 bg-black/70 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, stack, services..."
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#c8a96e] focus:outline-none text-xs text-white placeholder:text-white/40"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-[#c8a96e] text-black hover:bg-[#d6b77c] disabled:opacity-30 transition-colors shrink-0 font-bold"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
