import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Cloud, Brain, Database, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { AdSlot } from "@/components/AdSlot";

const skills = [
  { icon: Brain, label: "Machine Learning" },
  { icon: Code2, label: "Python" },
  { icon: Cloud, label: "AWS" },
  { icon: Database, label: "Data Analytics" },
  { icon: Sparkles, label: "AI Systems" },
  { icon: TrendingUp, label: "MLOps" },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float-blob" />
        <div className="absolute top-10 right-0 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl animate-float-blob" style={{ animationDelay: "3s" }} />

        <div className="container relative pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-ring" />
              Available for Full-time AI/ML Roles
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Building intelligent systems with{" "}
              <span className="text-gradient">AI & Data Science</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              I'm <span className="text-foreground font-medium">Adithya</span> — a final-year AI & Data Science engineer
              crafting machine learning systems, cloud-native pipelines, and writing tutorials that
              help engineers level up.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/projects">View Projects <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/blog"><BookOpen className="w-4 h-4" /> Read Articles</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/contact">Contact</Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-sm">
                  <s.icon className="w-3.5 h-3.5 text-primary" />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["15+", "AI Projects"],
            ["20+", "Technical Articles"],
            ["4+", "AWS Certifications Track"],
            ["1k+", "Hours of Practice"],
          ].map(([n, l]) => (
            <div key={l} className="glass rounded-xl p-5 text-center shadow-card">
              <div className="text-3xl font-display font-bold text-gradient">{n}</div>
              <div className="text-xs text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm text-primary font-medium mb-2">Featured Work</p>
            <h2 className="text-3xl md:text-4xl font-bold">Selected AI & Data Projects</h2>
          </div>
          <Button asChild variant="glass">
            <Link to="/projects">All projects <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              to={`/projects#${p.slug}`}
              className="group bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-elegant transition-smooth"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">{p.category}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="container"><AdSlot /></div>

      {/* LATEST POSTS */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm text-primary font-medium mb-2">From the Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold">Latest Articles & Tutorials</h2>
          </div>
          <Button asChild variant="glass">
            <Link to="/blog">All posts <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-smooth">
              <div className="aspect-[16/9] bg-gradient-primary/20 bg-hero relative">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded bg-background/80 backdrop-blur">{p.category}</div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold leading-snug group-hover:text-primary transition-smooth">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{p.readTime} read</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border p-10 md:p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold">Let's build something <span className="text-gradient">intelligent</span>.</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Open to internships, full-time roles, and freelance AI/ML engagements.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button asChild variant="hero" size="lg"><Link to="/contact">Get in touch</Link></Button>
              <Button asChild variant="glass" size="lg"><Link to="/resume">Download Resume</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
