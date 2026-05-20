import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { AdRectangle } from "@/components/AdSlot";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <Layout>
      <Helmet>
        <title>AI Projects Portfolio | Adithya AI Hub</title>
        <meta
          name="description"
          content="Portfolio of AI/ML projects by Adithya Kuppusamy — MediGuard (LangGraph + RAG), TownRise AI, Health Sense Nexus, Trading Bot, and more."
        />
        <meta property="og:title" content="AI Projects Portfolio | Adithya AI Hub" />
        <meta
          property="og:description"
          content="Multi-agent AI systems, real estate intelligence, health monitoring, and trading automation built by Adithya from Tamil Nadu."
        />
      </Helmet>

      <section className="container py-20">
        <p className="text-sm text-primary font-medium">Portfolio</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">AI Projects</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          A selection of AI, ML, and automation projects. Each one was built to solve a real
          problem and shipped to production. Click any card to see the full breakdown.
        </p>

        {/* Project cards */}
        <div className="mt-10 space-y-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} defaultOpen={i === 0} />
          ))}
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
