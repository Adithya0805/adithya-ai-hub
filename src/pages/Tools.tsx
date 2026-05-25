import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { Wand2, FileText, Database, Brain, Zap, Lock } from "lucide-react";

const tools = [
  { icon: Wand2, name: "Prompt Generator", desc: "Craft high-quality LLM prompts from a simple intent." },
  { icon: FileText, name: "Resume Analyzer", desc: "Get instant AI feedback on your resume against any role." },
  { icon: Database, name: "SQL Helper", desc: "Translate natural language into clean, optimized SQL." },
  { icon: Brain, name: "ML Concept Explainer", desc: "Demystify any ML term in plain English with examples." },
  { icon: Zap, name: "AI Productivity Suite", desc: "Mini utilities for writing, summarizing, and ideating." },
];

const Tools = () => (
  <Layout>
    <Helmet>
      <title>Free AI Engineering Tools | Adithya AI Hub</title>
      <meta
        name="description"
        content="Access free, interactive AI engineering tools including Prompt Generator, Resume Analyzer, SQL Helper, and ML Concept Explainer. Build and ship AI products faster."
      />
      <link rel="canonical" href="https://adithya-ai-hub.vercel.app/tools" />
      <meta property="og:title" content="Free AI Engineering Tools | Adithya AI Hub" />
      <meta
        property="og:description"
        content="Free interactive AI utilities, prompt generators, resume checkers, and SQL helper tools created for developers."
      />
      <meta property="og:url" content="https://adithya-ai-hub.vercel.app/tools" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Adithya AI Hub" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>

    <section className="container py-20">
      <p className="text-sm text-primary font-medium">AI Tools</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold">A growing toolbox of <span className="text-gradient">AI utilities</span></h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Free and premium tools to help you ship faster. New utilities launching every month.
      </p>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((t) => (
          <div key={t.name} className="group bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-elegant transition-smooth">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <t.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
              <Lock className="w-3 h-3" /> Coming soon
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-2xl bg-gradient-card border border-border text-center">
        <h2 className="text-2xl font-bold">Premium Membership <span className="text-gradient">(launching soon)</span></h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Get unlimited access to all AI tools, exclusive study notes, downloadable resources,
          and early-bird access to new releases.
        </p>
      </div>
    </section>
  </Layout>
);

export default Tools;
