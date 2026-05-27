import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Cloud, Brain, Database, Sparkles, TrendingUp, Bot, FileDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AdLeaderboard } from "@/components/AdSlot";
import { FlagshipProject } from "@/components/FlagshipProject";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

const skills = [
  { icon: Code2, label: "Python" },
  { icon: Brain, label: "LangGraph" },
  { icon: Cloud, label: "AWS" },
  { icon: Sparkles, label: "NLP / LLMs" },
  { icon: Database, label: "Pinecone / RAG" },
  { icon: TrendingUp, label: "TensorFlow" },
  { icon: Bot, label: "FastAPI" },
];

const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
const featuredProjects = projects.slice(0, 3);

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Adithya AI Hub — AI/ML Engineer Roadmap for Tier-3 College Students</title>
        <meta
          name="description"
          content="AI Learning & Blog Platform by Adithya Kuppusamy. Honest AI/ML Engineer roadmap for Tier-3 college students in Tamil Nadu. Daily tutorials on LangChain, Python, RAG, and career prep."
        />
        <meta name="keywords" content="AI/ML Engineer Roadmap, Tier-3 College Placements, Tamil Nadu AI student, Machine Learning for beginners, LangChain tutorial, Python AI, get hired as ML engineer" />
        <meta property="og:title" content="Adithya AI Hub — Learn AI, Build Real, Get Hired" />
        <meta
          property="og:description"
          content="Honest AI/ML roadmap for Tier-3 college students. Daily tutorials, project breakdowns, and career advice from Tamil Nadu."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Adithya AI Hub" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float-blob" />
        <div
          className="absolute top-10 right-0 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl animate-float-blob"
          style={{ animationDelay: "3s" }}
        />

        <div className="container relative pt-28 pb-28 md:pt-36 md:pb-36">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-ring" />
              Available for Full-time AI/ML Roles
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Learn AI.{" "}
              <span className="text-gradient">Build Real.</span>
              <br />
              Get Hired.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              By <span className="text-foreground font-medium">Adithya</span> — AI Engineer,
              Builder, Tamil Nadu. Daily tutorials, project breakdowns, and the unfiltered roadmap
              from student to ML engineer.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/blog">
                  <BookOpen className="w-4 h-4" /> Read Latest Blog
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/projects">
                  View My Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="border-cyan-400/40 hover:border-cyan-400 hover:text-cyan-400">
                <a href="/resume.pdf" download="Adithya_Kuppusamy_Resume.pdf">
                  <FileDown className="w-4 h-4" /> Download Resume
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-sm"
                >
                  <s.icon className="w-3.5 h-3.5 text-primary" />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="container -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["7", "AI Projects"],
            ["6", "Certifications"],
            ["94%", "Model Accuracy"],
            ["8.5", "CGPA"],
          ].map(([n, l]) => (
            <div key={l} className="glass rounded-xl p-5 text-center shadow-card">
              <div className="text-3xl font-display font-bold text-gradient">{n}</div>
              <div className="text-xs text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADSENSE LEADERBOARD ──────────────────────────────────────────── */}
      <div className="container mt-12">
        <AdLeaderboard />
      </div>

      {/* ── FLAGSHIP PROJECT ─────────────────────────────────────────────── */}
      <section className="container py-16">
        <div className="mb-8">
          <p className="text-sm text-primary font-medium mb-2">Centerpiece Work</p>
          <h2 className="text-3xl md:text-4xl font-bold">Flagship AI Project</h2>
        </div>
        <FlagshipProject />
      </section>

      {/* ── FEATURED BLOG POSTS ──────────────────────────────────────────── */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm text-primary font-medium mb-2">From the Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold">Latest Articles &amp; Tutorials</h2>
          </div>
          <Button asChild variant="glass">
            <Link to="/blog">
              All posts <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featuredPosts.map((p) => (
            <BlogCard key={p.slug} post={p} featured />
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────────────────── */}
      <section className="container py-4 pb-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm text-primary font-medium mb-2">Featured Work</p>
            <h2 className="text-3xl md:text-4xl font-bold">Selected AI Projects</h2>
          </div>
          <Button asChild variant="glass">
            <Link to="/projects">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="container pb-20">
        <NewsletterForm />
      </section>

      {/* ── BOTTOM AD ────────────────────────────────────────────────────── */}
      <div className="container pb-10">
        <AdLeaderboard />
      </div>
    </Layout>
  );
};

export default Index;
