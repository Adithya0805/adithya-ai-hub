import { useState } from "react";
import { Sparkles, Brain, Search, HelpCircle, ArrowRight } from "lucide-react";

interface ProjectRecommenderProps {
  onRecommend: (slug: string) => void;
}

export function ProjectRecommender({ onRecommend }: ProjectRecommenderProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [interest, setInterest] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const reset = () => {
    setInterest("");
    setRole("");
    setStep(1);
  };

  const getRecommendation = () => {
    // Map answer pairs to specific project slugs in your database
    if (interest === "ai") {
      return role === "demo" ? "skillspeak" : "mediaguard";
    } else if (interest === "fullstack") {
      return role === "demo" ? "townrise-ai" : "linkedin-automation";
    } else {
      return role === "demo" ? "trading-bot" : "health-sense-nexus";
    }
  };

  const handleRecommendation = () => {
    const slug = getRecommendation();
    onRecommend(slug);
    setStep(3);
  };

  const projectDetailsMap: Record<string, { title: string; desc: string }> = {
    skillspeak: {
      title: "SkillsSpeak AI Career Platform",
      desc: "A full-featured AI career coach with 15 engines—mock interviews, real-time feedback, and neural visualizations.",
    },
    mediaguard: {
      title: "MediGuard Multi-Agent AI System",
      desc: "A production-grade, highly secure clinical assistant built with LangGraph, Pinecone, and AWS Bedrock.",
    },
    "townrise-ai": {
      title: "TownRise AI Towns Analyzer",
      desc: "An expansion planning platform mapping and scoring over 50 Tamil Nadu towns using Next.js & Supabase.",
    },
    "linkedin-automation": {
      title: "LinkedIn Selenium Automation Bot",
      desc: "A highly resilient scraper and connection broker handling robust element tracking and session bypasses.",
    },
    "trading-bot": {
      title: "Real-time Futures Trading Bot",
      desc: "A Python automated trading system integrating live price indicators and mock trade simulation charts.",
    },
    "health-sense-nexus": {
      title: "Health Sense Nexus Predictor",
      desc: "An end-to-end deep learning framework built with TensorFlow predicting multi-class healthcare trends.",
    },
  };

  const recSlug = getRecommendation();
  const recProject = projectDetailsMap[recSlug] || { title: "AI Project", desc: "A premium AI system." };

  return (
    <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-card border border-border/70 shadow-elegant my-8 max-w-2xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center border border-primary/25">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
              Interactive Recommender <Sparkles className="w-3.5 h-3.5" />
            </h3>
            <p className="text-[11px] text-muted-foreground">Find the perfect project based on your role and interest</p>
          </div>
        </div>

        {/* Step 1: Select Interest */}
        {step === 1 && (
          <div className="space-y-3 animate-fade-up">
            <p className="text-sm font-medium text-foreground flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-primary" /> What is your primary area of interest?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: "ai", label: "Multi-Agent AI & LLMs", desc: "LangChain, RAG, Agents" },
                { id: "fullstack", label: "Full-Stack Web Systems", desc: "Next.js, APIs, Automation" },
                { id: "data", label: "Data Science & Trading", desc: "ML, TensorFlow, Python" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setInterest(item.id);
                    setStep(2);
                  }}
                  className="p-3 text-left rounded-xl border border-border/80 bg-background/25 hover:border-primary/50 hover:bg-primary/5 hover:shadow-glow transition-smooth group"
                >
                  <span className="text-xs font-semibold block text-foreground group-hover:text-primary transition-smooth">
                    {item.label}
                  </span>
                  <span className="text-[9px] text-muted-foreground mt-0.5 block">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Role */}
        {step === 2 && (
          <div className="space-y-3 animate-fade-up">
            <p className="text-sm font-medium text-foreground flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-primary" /> What are you primarily looking for?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: "demo", label: "Recruiter / Quick Review", desc: "Needs working live demo and instant visual wow factor." },
                { id: "code", label: "Developer / Architect", desc: "Needs clean code, robust architecture, and GitHub source." },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setRole(item.id);
                  }}
                  className={`p-3 text-left rounded-xl border transition-smooth group ${
                    role === item.id
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border/80 bg-background/25 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <span className={`text-xs font-semibold block group-hover:text-primary transition-smooth ${role === item.id ? "text-primary" : "text-foreground"}`}>
                    {item.label}
                  </span>
                  <span className="text-[9px] text-muted-foreground mt-0.5 block">{item.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 justify-between pt-2">
              <button onClick={() => setStep(1)} className="text-[11px] text-muted-foreground hover:text-foreground hover:underline">
                ← Back
              </button>
              <button
                disabled={!role}
                onClick={handleRecommendation}
                className="inline-flex items-center gap-1 text-xs px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none transition-smooth"
              >
                Find Project <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Recommendation result */}
        {step === 3 && (
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3 animate-fade-up">
            <div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 font-bold uppercase tracking-wider">
                Matching Project Found
              </span>
              <h4 className="mt-2 text-base font-bold text-foreground">{recProject.title}</h4>
              <p className="text-xs text-muted-foreground/90 mt-1">{recProject.desc}</p>
            </div>

            <div className="flex gap-2 flex-wrap justify-between items-center pt-2 border-t border-primary/10">
              <button onClick={reset} className="text-[10px] text-muted-foreground hover:text-foreground hover:underline">
                ↻ Try Again
              </button>
              <button
                onClick={() => onRecommend(recSlug)}
                className="inline-flex items-center gap-1 text-xs px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-smooth"
              >
                <Search className="w-3.5 h-3.5" /> Focus & Show Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
