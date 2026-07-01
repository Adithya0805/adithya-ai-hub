import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { AdRectangle } from "@/components/AdSlot";
import { NeuralMeshBackground } from "@/components/NeuralMeshBackground";
import { ProjectRecommender } from "@/components/ProjectRecommender";
import { projects } from "@/data/projects";
import { Github } from "lucide-react";

const missedProjects = [
  {
    name: "smart-resume-job-matcher",
    desc: "NLP-based resume and job description parser & matcher with custom Streamlit dashboard interface.",
    lang: "Python",
    url: "https://github.com/Adithya0805/smart-resume-job-matcher",
  },
  {
    name: "AgriPredict_TN",
    desc: "Crop yield suitability and disease recommendation engine for farmers in regional Tamil Nadu districts.",
    lang: "Python",
    url: "https://github.com/Adithya0805/AgriPredict_TN",
  },
  {
    name: "AI-Fraud-Detection-System",
    desc: "Anomaly detection and risk classification model for financial transactions using imbalanced data structures.",
    lang: "Jupyter Notebook",
    url: "https://github.com/Adithya0805/AI-Fraud-Detection-System",
  },
  {
    name: "prompt-architect",
    desc: "Visual workspace tool designed to create, test, refine, and version-control prompt structures for LLMs.",
    lang: "JavaScript",
    url: "https://github.com/Adithya0805/prompt-architect",
  },
  {
    name: "QuantumAI-Website",
    desc: "Interactive conceptual landing page explaining the intersection of Quantum Computing and Neural Networks.",
    lang: "TypeScript",
    url: "https://github.com/Adithya0805/QuantumAI-Website",
  },
  {
    name: "AI-Multiplayer-Game",
    desc: "Python game testing concurrent autonomous AI behavior paths using rule-based decision trees.",
    lang: "Python",
    url: "https://github.com/Adithya0805/AI-Multiplayer-Game",
  },
];

const Projects = () => {
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  const handleRecommend = (slug: string) => {
    setHighlightedSlug(slug);
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <Layout>
      <Helmet>
        <title>AI Projects Portfolio | Adithya AI Hub</title>
        <meta
          name="description"
          content="Portfolio of AI/ML projects by Adithya Kuppusamy — MediGuard (LangGraph + RAG), TownRise AI, Health Sense Nexus, Trading Bot, and more."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/projects" />
        <meta property="og:title" content="AI Projects Portfolio | Adithya AI Hub" />
        <meta
          property="og:description"
          content="Multi-agent AI systems, real estate intelligence, health monitoring, and trading automation built by Adithya from Tamil Nadu."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Adithya AI Hub" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Interactive Neural background mesh */}
      <NeuralMeshBackground />

      <section className="container relative py-20 z-10">
        <p className="text-sm text-primary font-medium">Portfolio</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">AI Projects</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          A selection of AI, ML, and automation projects. Each one was built to solve a real
          problem and shipped to production. Click any card to see the full breakdown.
        </p>

        {/* Cyber-themed AI Recommender quiz */}
        <ProjectRecommender onRecommend={handleRecommend} />

        {/* Project cards */}
        <div className="mt-10 space-y-4">
          {projects.map((p, i) => {
            const isHighlighted = p.slug === highlightedSlug;
            return (
              <ProjectCard
                key={`${p.slug}-${isHighlighted}`}
                project={p}
                defaultOpen={i === 0 || isHighlighted}
                isHighlighted={isHighlighted}
              />
            );
          })}
        </div>

        {/* ── ADDITIONAL REPOSITORIES GRID ────────────────── */}
        <div className="mt-20 border-t border-border/40 pt-12">
          <p className="text-sm text-[#00d4ff] font-semibold mb-1 uppercase tracking-wider">Open Source Catalog</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Additional Repositories</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl mb-8">
            Other utilities, NLP models, and micro-applications published on GitHub.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {missedProjects.map((p) => (
              <div key={p.name} className="p-5 rounded-2xl border border-border bg-card/40 flex flex-col justify-between hover:border-primary/30 transition-smooth">
                <div>
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                      {p.lang}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-smooth"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Explore Repository →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad at bottom */}
        <div className="mt-14 flex justify-center">
          <AdRectangle />
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
