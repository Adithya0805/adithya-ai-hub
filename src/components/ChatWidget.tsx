import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User, FileDown, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  aranya: `**Aranya Organic Dairy Farm** is Adithya's live commercial client deployment at [aranyaorganicdairyfarm.com](https://aranyaorganicdairyfarm.com/). A 9-year Vedic A2 dairy farm in Shoolagiri, Tamil Nadu, featuring a mobile-first e-commerce catalog, instant WhatsApp ordering, and a bilingual conversational RAG assistant ("Ask Farm AI").`,

  urimai: `**Urimai AI** is a multi-agent Tamil Nadu government scheme eligibility assistant analyzing 64 schemes with 199 rules and conversational Tamil intake (49/49 automated tests passing).`,

  freelance: `Under **FutureLogic AI**, Adithya builds production-grade web platforms and AI tools for Tamil Nadu businesses and international clients. Services include:
• Multi-Agent Systems (LangGraph)
• RAG Knowledge Pipelines (Pinecone/Bedrock)
• LLM API Integrations (Gemini, Claude, OpenAI)
• Full-Stack AI Platforms (Next.js, FastAPI, Supabase)
Visit the **Freelance** and **Services** pages to learn more!`,

  mediguard: `**MediGuard** is Adithya's flagship clinical AI assistant built with **LangGraph, Pinecone, AWS Bedrock, and FastAPI**. He engineered a multi-agent system that indexes **50,000+ medical documents**, achieving an end-to-end response time under **8 seconds** with **>90% relevance scoring** using advanced RAG pipelines.`,
  
  skillspeak: `**SkillSpeak AI** is a comprehensive mock interview platform that simulates company-specific and role-based technical/behavioral interviews. Built using **React, Python, Firebase, and speech transcription APIs**, it supports dynamic competency scoring and has engaged **10,000+ engineering professionals** to practice coding and communication!`,
  
  townrise: `**TownRise AI** is a real-estate intelligence scanner designed for Tamil Nadu. Deployed using **Next.js, Supabase, and the Gemini API**, it aggregates growth patterns and models data for over **50+ local towns** to assist in smart investments.`,
  
  nexus: `**Health Sense Nexus** is an anomaly detection deep learning system built using **TensorFlow and LSTM networks**, hitting **94% validation accuracy**. It was fully deployed on **AWS EC2** with automated alerting for real-time health-parameter monitoring.`,
  
  stack: `Adithya's core tech stack is highly specialized in **AI Engineering and Full-Stack Development**:

• **Languages:** Python, TypeScript, SQL, Bash
• **AI/ML:** LangGraph, Pinecone (Vector DB), RAG, TensorFlow, AWS Bedrock
• **Backend & Cloud:** FastAPI, AWS (EC2, S3), Firebase, Supabase
• **Frontend:** React, Next.js, Tailwind CSS`,
  
  relocate: `**Yes, absolutely!** Adithya is actively looking for full-time **AI/ML Engineer** or **Associate AI Builder** roles. He is open to immediate relocation to major tech hubs including **Chennai, Bengaluru, Hyderabad, Pune, Noida**, or remote setups.`,
  
  cgpa: `Adithya graduated with a B.Tech in **Artificial Intelligence & Data Science** from **Dhanalakshmi Srinivasan College of Engineering, Coimbatore** (Class of 2025). He maintained an excellent cumulative **8.5 CGPA** while building 7 AI projects outside of the curriculum.`,
  
  certifications: `Adithya holds **6 professional certifications**, including:

1. **AWS re/Start Graduate** (Amazon Web Services)
2. **Machine Learning Specialization** (DeepLearning.AI / Coursera)
3. **Prompt Engineering for AI** (DeepLearning.AI)
4. **BCG Data Science Simulation** (Forage)
5. **IBM Data Analysis with Python**
6. **Python for Everybody** (University of Michigan)`,
  
  contact: `You can hire Adithya or get in touch directly! He is open to conversations:

• 📧 **Email:** adithyaadhi0805@gmail.com
• 💬 **WhatsApp:** [+91 88257 14576](https://wa.me/918825714576)
• 🔗 **LinkedIn:** [Adithya Kuppusamy](https://www.linkedin.com/in/adithya-kuppusamy-76baab204/)
• 🐙 **GitHub:** [github.com/Adithya0805](https://github.com/Adithya0805)

You can also download his full resume from the Resume section!`,
};

const SUGGESTED_CHIPS = [
  { label: "Tell me about MediGuard", keyword: "mediguard" },
  { label: "Aranya Dairy Client Project", keyword: "aranya" },
  { label: "What is his tech stack?", keyword: "stack" },
  { label: "Freelance & Services", keyword: "freelance" },
  { label: "Is he open to relocation?", keyword: "relocate" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: `Vanakkam! 🙋‍♂️ I am Adithya's AI Agent representation.

I can help recruiters and builders learn about Adithya's projects, skills, education, and availability. 

Feel free to choose a prompt below or ask me anything!`,
        timestamp: new Date(),
      },
    ]);
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
    } else if (cleanText.includes("freelance") || cleanText.includes("service") || cleanText.includes("futurelogic") || cleanText.includes("client")) {
      reply = KNOWLEDGE_BASE.freelance;
    } else if (cleanText.includes("mediguard")) {
      reply = KNOWLEDGE_BASE.mediguard;
    } else if (cleanText.includes("skillspeak") || cleanText.includes("speak")) {
      reply = KNOWLEDGE_BASE.skillspeak;
    } else if (cleanText.includes("townrise") || cleanText.includes("town")) {
      reply = KNOWLEDGE_BASE.townrise;
    } else if (cleanText.includes("nexus") || cleanText.includes("health") || cleanText.includes("anomaly")) {
      reply = KNOWLEDGE_BASE.nexus;
    } else if (cleanText.includes("stack") || cleanText.includes("skill") || cleanText.includes("language") || cleanText.includes("tech")) {
      reply = KNOWLEDGE_BASE.stack;
    } else if (cleanText.includes("relocate") || cleanText.includes("available") || cleanText.includes("job") || cleanText.includes("location") || cleanText.includes("hired") || cleanText.includes("relocation")) {
      reply = KNOWLEDGE_BASE.relocate;
    } else if (cleanText.includes("cgpa") || cleanText.includes("education") || cleanText.includes("college") || cleanText.includes("degree") || cleanText.includes("university")) {
      reply = KNOWLEDGE_BASE.cgpa;
    } else if (cleanText.includes("certification") || cleanText.includes("cert") || cleanText.includes("aws")) {
      reply = KNOWLEDGE_BASE.certifications;
    } else if (cleanText.includes("contact") || cleanText.includes("email") || cleanText.includes("hire") || cleanText.includes("phone") || cleanText.includes("social")) {
      reply = KNOWLEDGE_BASE.contact;
    } else {
      reply = `I'm specialized in explaining Adithya's background! Try asking about his AI projects (MediGuard, SkillSpeak AI, TownRise), his tech stack (React, Python, AWS, Pinecone, LangGraph), his CGPA, or whether he is open to relocation. 

You can also click the quick prompt chips above!`;
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
    }, 1200);
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
    // Basic bold **text** parsing
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
      }
      
      // Render bullets
      if (part.startsWith("• ")) {
        return (
          <span key={idx} className="block pl-2 my-1">
            {part}
          </span>
        );
      }

      // Link rendering [text](url)
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
          >
            {linkMatch[1]}
          </a>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* ── Floating Button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-glow transition-all duration-300 animate-pulse-ring"
          aria-label="Chat with Adithya's AI"
        >
          <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
          
          {/* Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg glass text-xs font-semibold tracking-wide text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/20 shadow-md">
            ⚡ Chat with Adithya's AI
          </span>
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[400px] h-[550px] rounded-2xl glass border border-primary/30 flex flex-col overflow-hidden shadow-2xl animate-fade-up animate-duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-card to-secondary border-b border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/35 flex items-center justify-center text-primary relative">
                <Bot className="w-5 h-5 animate-pulse" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-card" />
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-1.5 leading-none">
                  Adithya's AI Agent
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                </h3>
                <span className="text-[10px] text-muted-foreground mt-1 block">Trained on Resume & Projects</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-smooth"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-card/40 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border text-xs ${
                    msg.sender === "bot"
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {msg.sender === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Box */}
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm border ${
                    msg.sender === "bot"
                      ? "bg-secondary/40 border-border/50 text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground border-primary/20 rounded-tr-sm"
                  }`}
                >
                  {msg.sender === "bot" ? renderMarkdown(msg.text) : msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-primary/20 bg-primary/10 text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-sm bg-secondary/40 border border-border/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div className="px-4 py-2 border-t border-border/60 bg-card/20 flex gap-2 overflow-x-auto select-none no-scrollbar">
            {SUGGESTED_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.label)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-secondary/60 hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary text-xs font-medium transition-smooth"
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
            className="p-3 border-t border-border bg-card flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my projects, stack, relocation..."
              className="flex-1 px-3 py-2 rounded-xl bg-secondary/60 border border-border focus:border-primary focus:outline-none text-sm transition-smooth text-foreground placeholder:text-muted-foreground/60"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-smooth shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
