import { useState } from "react";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { projects } from "@/data/projects";
import { AdSlot } from "@/components/AdSlot";

const Projects = () => {
  const [open, setOpen] = useState<string | null>(projects[0]?.slug ?? null);

  return (
    <Layout>
      <section className="container py-20">
        <p className="text-sm text-primary font-medium">Portfolio</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Projects</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          A selection of AI, ML, and cloud engineering work. Click any card to expand.
        </p>

        <div className="mt-10 space-y-4">
          {projects.map((p, i) => {
            const isOpen = open === p.slug;
            return (
              <article
                key={p.slug}
                id={p.slug}
                className="bg-gradient-card border border-border rounded-2xl overflow-hidden transition-smooth"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-smooth"
                >
                  <div>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">{p.category}</span>
                    <h2 className="mt-3 text-xl md:text-2xl font-semibold">{p.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-smooth ${isOpen ? "rotate-180 text-primary" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 grid md:grid-cols-3 gap-6 animate-fade-up">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Problem</h3>
                        <p className="mt-1 text-muted-foreground">{p.problem}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Solution</h3>
                        <p className="mt-1 text-muted-foreground">{p.solution}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Tech Stack</h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.stack.map((t) => (
                            <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:border-primary hover:text-primary transition-smooth">
                            <Github className="w-4 h-4" /> GitHub
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:border-primary hover:text-primary transition-smooth">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="aspect-video rounded-xl bg-hero grid-bg border border-border flex items-center justify-center text-xs text-muted-foreground">
                      Screenshot coming soon
                    </div>
                  </div>
                )}
                {i === 1 && !isOpen && null}
              </article>
            );
          })}
        </div>

        <AdSlot />
      </section>
    </Layout>
  );
};

export default Projects;
