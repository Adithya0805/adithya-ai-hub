import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, Brain, Cloud, Award, Sparkles, Rocket } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  detail: string;
  type: "edu" | "project" | "cert" | "milestone";
  quote: string;
  metrics?: string;
  icon: React.ReactNode;
}

const MILESTONES: Milestone[] = [
  {
    year: "2021",
    title: "B.Tech AI & Data Science Start (Ambur → Coimbatore)",
    detail: "Began B.Tech at Dhanalakshmi Srinivasan College of Engineering. Moving from Ambur, Tamil Nadu with high ambitions and a clean slate. Dedicated nights to self-learning, coding fundamentals, and data structures.",
    quote: "Roadmap truth: Tier-3 college students don't need elite pedigree; we need relentless curiosity and GitHub commits.",
    type: "edu",
    metrics: "Coimbatore · India",
    icon: <GraduationCap className="w-4 h-4 text-cyan-400" />,
  },
  {
    year: "2023",
    title: "First Major Deep Learning Project",
    detail: "Conceived and developed Health Sense Nexus — a deep learning anomaly detection architecture using TensorFlow LSTM networks. Configured and deployed the prediction servers on an AWS EC2 instance.",
    quote: "ML rule: Don't stop at building models in Jupyter Notebooks. Learn cloud hosting and load-testing.",
    type: "project",
    metrics: "94% Accuracy achieved",
    icon: <Brain className="w-4 h-4 text-violet-400" />,
  },
  {
    year: "2024",
    title: "AWS Cloud Certification & RAG Breakthrough",
    detail: "Graduated from the rigorous AWS re/Start cloud training program, scoring the official AWS Certified Cloud Practitioner credential. Pivoted into generative AI and built MediGuard — a multi-agent clinical workspace.",
    quote: "Engineering breakthrough: Mastered LangGraph orchestrations and dense Pinecone vector indexing.",
    type: "cert",
    metrics: "AWS CCP Certification",
    icon: <Cloud className="w-4 h-4 text-orange-400" />,
  },
  {
    year: "2025",
    title: "B.Tech Graduation & Flagship Product Live",
    detail: "Successfully completed B.Tech with a strong 8.5 CGPA. Built and launched SkillSpeak AI — a real-time conversational mock interview framework that engaged over 10,000+ engineering professionals.",
    quote: "Building in public: Proving to recruiters that hands-on production deployment beats generic resumes.",
    type: "milestone",
    metrics: "8.5 CGPA · 10k+ Users",
    icon: <Award className="w-4 h-4 text-emerald-400" />,
  },
  {
    year: "2026",
    title: "Adithya AI Hub & Mentoring the Next Wave",
    detail: "Upgraded the Hub portfolio to highlight advanced RAG, Pinecone indexing, and cloud-agent infrastructures. Running a newsletter with 100+ weekly learners to guide Tier-3 students through honest roadmaps.",
    quote: "The brand: Learn AI. Build Real. Get Hired. We build the future in public.",
    type: "milestone",
    metrics: "Flagship Portfolio Upgrade",
    icon: <Rocket className="w-4 h-4 text-primary animate-bounce" />,
  },
];

interface TimelineItemProps {
  item: Milestone;
  index: number;
}

function TimelineItem({ item, index }: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Year (Left column on desktop) */}
      <div className="md:col-span-2 text-left md:text-right pt-1.5 select-none">
        <span
          className={`inline-block font-mono text-sm font-bold px-3 py-1 rounded-lg transition-all duration-500 ${
            isVisible
              ? "bg-primary/10 border border-primary/30 text-primary shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "bg-secondary text-muted-foreground border border-border"
          }`}
        >
          {item.year}
        </span>
      </div>

      {/* Decorative center track indicator */}
      <div className="hidden md:col-span-1 md:flex flex-col items-center justify-center pt-2 relative">
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-700 z-10 ${
            isVisible
              ? "bg-card border-primary text-primary shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-110"
              : "bg-secondary border-border text-muted-foreground"
          }`}
        >
          {item.icon}
        </div>
      </div>

      {/* Detail Card (Right column on desktop) */}
      <div className="md:col-span-9">
        <div
          className={`p-6 rounded-2xl transition-all duration-500 border ${
            isVisible
              ? "bg-gradient-to-br from-card to-secondary/40 border-primary/25 shadow-card hover:border-primary/45 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              : "bg-card border-border/80 text-muted-foreground"
          }`}
        >
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3 mb-3">
            <h3 className={`font-semibold text-lg font-display ${isVisible ? "text-foreground" : "text-muted-foreground"}`}>
              {item.title}
            </h3>
            {item.metrics && (
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/80 border border-border text-[10px] font-mono text-muted-foreground tracking-wide font-medium">
                {item.metrics}
              </span>
            )}
          </div>

          {/* Core explanation */}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.detail}
          </p>

          {/* Inspirational blockquote */}
          {item.quote && (
            <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-primary/80 font-medium italic leading-relaxed">
                {item.quote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BuilderJourney() {
  return (
    <div className="relative font-sans py-6">
      
      {/* Decorative vertical timeline path */}
      <div className="absolute left-[16px] md:left-[20.8%] top-10 bottom-10 w-0.5 bg-border pointer-events-none" />

      {/* Timeline points */}
      <div className="space-y-12 relative z-10">
        {MILESTONES.map((item, idx) => (
          <TimelineItem key={idx} item={item} index={idx} />
        ))}
      </div>

      {/* Finish/Looking Ahead callout */}
      <div className="mt-16 text-center select-none">
        <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl glass border border-primary/30 text-xs font-semibold text-primary shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse">
          🎯 Next Milestone: Securing the next enterprise-scale AI Engineer role
        </span>
      </div>
    </div>
  );
}
