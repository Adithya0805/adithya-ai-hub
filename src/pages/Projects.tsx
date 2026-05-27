import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { AdRectangle } from "@/components/AdSlot";
import { NeuralMeshBackground } from "@/components/NeuralMeshBackground";
import { ProjectRecommender } from "@/components/ProjectRecommender";
import { projects } from "@/data/projects";

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

        {/* Ad at bottom */}
        <div className="mt-14 flex justify-center">
          <AdRectangle />
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
