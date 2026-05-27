import { useState } from "react";
import { Github, ExternalLink, ChevronDown, Lightbulb } from "lucide-react";
import { TradingBotSimulator } from "./TradingBotSimulator";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  defaultOpen?: boolean;
  isHighlighted?: boolean;
}

export function ProjectCard({ project: p, defaultOpen = false, isHighlighted = false }: ProjectCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article
      id={p.slug}
      className={`bg-gradient-card border rounded-2xl overflow-hidden transition-all duration-500 ${
        isHighlighted
          ? "border-primary shadow-[0_0_30px_rgba(6,182,212,0.35)] scale-[1.01]"
          : "border-border hover:border-primary/30"
      }`}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-secondary/20 transition-smooth"
      >
        <div className="flex-1">
          <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
            {p.category}
          </span>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold">{p.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>

          {/* Stack pills — visible even when closed */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((t) => (
              <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                {t}
              </span>
            ))}
            {p.stack.length > 4 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                +{p.stack.length - 4} more
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-smooth mt-1 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-6 pb-6 border-t border-border/60 pt-5 animate-fade-up">
          <div className="grid md:grid-cols-5 gap-6">
            {/* Left — details */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Problem
                </h3>
                <p className="text-sm text-muted-foreground">{p.problem}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Solution
                </h3>
                <p className="text-sm text-muted-foreground">{p.solution}</p>
              </div>

              {p.impact && (
                <div>
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    Impact
                  </h3>
                  <p className="text-sm text-muted-foreground">{p.impact}</p>
                </div>
              )}

              {p.learned && (
                <div className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-primary mb-1">What I Learned</p>
                    <p className="text-xs text-muted-foreground">{p.learned}</p>
                  </div>
                </div>
              )}

              {p.slug === "trading-bot" && <TradingBotSimulator />}
            </div>

            {/* Right — stack + links */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  Full Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-smooth"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-smooth"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
