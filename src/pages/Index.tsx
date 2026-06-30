import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Cloud, Brain, Database, Sparkles, TrendingUp, Bot, FileDown, Github, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AdLeaderboard } from "@/components/AdSlot";
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
const otherProjects = projects.filter((p) => !p.flagship).slice(0, 3);

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

      {/* ── FEATURED FEATURED POSTS (PREVIOUS SECTION WAS py-20, WE REMOVED FLAGSHIP DUPLICATION) ────────────────── */}
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
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-sm text-[#00d4ff] font-semibold mb-1 uppercase tracking-wider">Flagship Highlight</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Featured Projects</h2>
          </div>
          <Button asChild variant="glass">
            <Link to="/projects">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* 2-Column Flagship Grid */}
        <div className="flagship-grid items-stretch mb-16">
          {/* Card 1: MediGuard */}
          <div className="flagship-card relative rounded-3xl p-8 md:p-10 overflow-hidden group transition-all duration-300 flex flex-col justify-between">
            {/* Ambient Background Details */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 via-transparent to-[#2563eb]/5 pointer-events-none" />
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00d4ff]/10 blur-3xl pointer-events-none group-hover:bg-[#00d4ff]/15 transition-all duration-500" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
              <div className="space-y-6">
                {/* Badges and tags */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flagship-badge inline-flex items-center gap-1.5 shadow-lg select-none">
                      🏆 Flagship Project
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-[#00d4ff]/40 text-[#00d4ff] text-xs font-bold uppercase tracking-wider">
                      FEATURED
                    </span>
                  </div>
                  <a
                    href="https://mediguard-v2.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00d4ff] hover:underline"
                  >
                    mediguard-v2.vercel.app <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    MediGuard — Clinical AI Decision Support System
                  </h3>
                  <p className="text-base md:text-lg font-medium text-cyan-400">
                    Stopping patients from getting wrong medication information using Multi-Agent AI
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                  {["LangGraph", "Pinecone RAG", "AWS Bedrock", "FastAPI", "React", "Docker"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-[#00d4ff]/30 text-cyan-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A multi-agent clinical decision support system with a LangGraph supervisor orchestrating 3 specialized agents — Triage, Drug Interaction, and Report. Powered by Pinecone RAG over WHO/ICD-10/OpenFDA data and AWS Bedrock for LLM inference.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/30 mt-auto">
                <Button asChild variant="hero" size="default" className="shadow-[0_0_20px_rgba(0,212,255,0.35)] border-[#00d4ff] bg-[#00d4ff] text-black hover:bg-cyan-400 text-xs font-bold">
                  <a href="https://github.com/Adithya0805" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-1.5" /> View on GitHub
                  </a>
                </Button>
                <Button asChild variant="glass" size="default" className="border-[#00d4ff]/40 hover:border-[#00d4ff] hover:text-[#00d4ff] text-xs font-bold">
                  <Link to="/blog/how-i-built-mediaguard-multi-agent-ai-system">
                    <BookOpen className="w-4 h-4 mr-1.5" /> Read Case Study
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Card 2: SkillSpeak AI */}
          <div className="flagship-card-purple relative rounded-3xl p-8 md:p-10 overflow-hidden group transition-all duration-300 flex flex-col justify-between">
            {/* Ambient Background Details */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-[#d946ef]/5 pointer-events-none" />
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none group-hover:bg-[#7c3aed]/15 transition-all duration-500" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
              <div className="space-y-6">
                {/* Badges and tags */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flagship-badge-purple inline-flex items-center gap-1.5 shadow-lg select-none">
                      🚀 Flagship Project
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-[#7c3aed]/40 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">
                      FEATURED
                    </span>
                  </div>
                  <a
                    href="https://skillsspeak-1a3ac.web.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a78bfa] hover:underline"
                  >
                    skillsspeak-1a3ac.web.app <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    SkillSpeak AI — Career Platform for Indian Job Seekers
                  </h3>
                  <p className="text-base md:text-lg font-medium text-purple-400">
                    15-feature AI career platform helping any Indian job seeker get hired
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                  {["Gemini API", "Firebase", "React", "TypeScript", "Web Speech API", "Recharts"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-purple-950/40 border border-[#7c3aed]/30 text-purple-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A mobile-first AI career platform with 15 core engines — ATS resume scanner, real-time speech mock interviews, Tamil-English career translator, neural brain visualizer, and 30/60/90 day learning roadmaps.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/30 mt-auto">
                <Button asChild variant="hero" size="default" className="shadow-[0_0_20px_rgba(124,58,237,0.35)] border-[#7c3aed] bg-[#7c3aed] text-white hover:bg-purple-500 text-xs font-bold">
                  <a href="https://github.com/Adithya0805" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-1.5" /> View on GitHub
                  </a>
                </Button>
                <Button asChild variant="glass" size="default" className="border-[#7c3aed]/40 hover:border-[#7c3aed] hover:text-[#a78bfa] text-xs font-bold">
                  <Link to="/blog/how-i-built-skillspeak-ai-career-platform-15-features">
                    <BookOpen className="w-4 h-4 mr-1.5" /> Read Case Study
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Heading for More Projects */}
        <div className="mb-8 border-t border-border/40 pt-12">
          <p className="text-sm text-primary font-medium mb-1">More Selected Work</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">More Projects</h2>
        </div>

        <div className="space-y-4">
          {otherProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* ── WHY I WRITE HERE ─────────────────────────────────────────────── */}
      <section className="container pb-20">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-card border border-border/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">My Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why I Write Here</h2>
            
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                Most AI and ML content online is written for people who already have a strong 
                foundation. When I was learning — sitting in Ambur, Tamil Nadu, with slow internet 
                and no mentor — I struggled to find honest, practical content written for someone 
                at my level.
              </p>
              <p>
                This blog exists to fix that. Every article here is written from real experience — 
                real exam halls, real code errors, real project failures, and real lessons. If you 
                are an engineering student or fresher in India trying to break into AI and ML, 
                this blog is for you.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
              <div>
                <span className="block text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-display">8+</span>
                <span className="text-xs text-muted-foreground mt-1 block">In-depth articles</span>
              </div>
              <div>
                <span className="block text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-display">5+</span>
                <span className="text-xs text-muted-foreground mt-1 block">Real AI projects</span>
              </div>
              <div>
                <span className="block text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-display">100%</span>
                <span className="text-xs text-muted-foreground mt-1 block">Free content</span>
              </div>
            </div>
          </div>
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
