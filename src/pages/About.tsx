import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, Loader2, CheckCircle2, FileDown, Award, GraduationCap, Network, LayoutGrid } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SkillGraph } from "@/components/SkillGraph";
import { BuilderJourney } from "@/components/BuilderJourney";

const skillsMatrix = [
  {
    category: "Languages",
    color: "from-cyan-400/20 to-cyan-400/5 border-cyan-400/30",
    textColor: "text-cyan-400",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "Bash"],
  },
  {
    category: "AI / ML & NLP",
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
    textColor: "text-violet-400",
    skills: ["LangGraph", "TensorFlow", "Keras", "Pinecone / RAG", "NLTK", "LLMs", "Scikit-learn"],
  },
  {
    category: "Backend & Cloud",
    color: "from-orange-400/20 to-orange-400/5 border-orange-400/30",
    textColor: "text-orange-400",
    skills: ["FastAPI", "Flask", "AWS EC2", "AWS Bedrock", "AWS S3", "Firebase", "Supabase"],
  },
  {
    category: "Frontend",
    color: "from-green-400/20 to-green-400/5 border-green-400/30",
    textColor: "text-green-400",
    skills: ["React", "Next.js", "Tailwind CSS", "Vite", "Recharts"],
  },
];

const timeline = [
  {
    year: "2021",
    title: "Started B.Tech",
    detail: "AI & Data Science — Dhanalakshmi Srinivasan College of Engineering Coimbatore",
    type: "edu",
  },
  {
    year: "2023",
    title: "First ML Project",
    detail: "Built Health Sense Nexus — LSTM anomaly detection on AWS EC2",
    type: "project",
  },
  {
    year: "2024",
    title: "AWS re/Start Certified",
    detail: "Completed AWS re/Start program, earned Cloud Practitioner cert",
    type: "cert",
  },
  {
    year: "2024",
    title: "Built MediGuard",
    detail: "Multi-agent clinical AI using LangGraph + Pinecone + AWS Bedrock",
    type: "project",
  },
  {
    year: "2025",
    title: "B.Tech Graduation",
    detail: "CGPA 8.5 — AI & Data Science",
    type: "edu",
  },
  {
    year: "2026",
    title: "Launched Adithya AI Hub",
    detail: "This blog — documenting the journey to full-time ML engineer",
    type: "project",
  },
];

const certs = [
  { name: "AWS re/Start Graduate", issuer: "Amazon Web Services", icon: "☁️", link: "#" },
  { name: "BCG Data Science Job Simulation", issuer: "BCG via Forage", icon: "📊", link: "#" },
  { name: "Prompt Engineering for AI", issuer: "DeepLearning.AI", icon: "🤖", link: "#" },
  { name: "Python for Everybody", issuer: "University of Michigan", icon: "🐍", link: "#" },
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI / Coursera", icon: "🧠", link: "#" },
  { name: "Data Analysis with Python", issuer: "IBM / Coursera", icon: "📈", link: "#" },
];

const About = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [skillsView, setSkillsView] = useState<"grid" | "graph">("graph");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrMsg("Please fill in all fields.");
      return;
    }
    setErrMsg("");
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mjgzgzbn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: `Contact from ${form.name} — Adithya AI Hub`, source: 'contact-form' }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
      setErrMsg("Something went wrong. Please email me directly at adithyaadhi0805@gmail.com");
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>About Adithya Kuppusamy — AI Engineer | Adithya AI Hub</title>
        <meta
          name="description"
          content="AI & Data Science graduate from Ambur, Tamil Nadu. CGPA 8.5. Building multi-agent AI systems. AWS certified. Looking for full-time ML engineer roles."
        />
        <meta property="og:title" content="About Adithya Kuppusamy — AI Engineer | Adithya AI Hub" />
        <meta
          property="og:description"
          content="AI & Data Science graduate from Ambur, Tamil Nadu. CGPA 8.5. Building multi-agent AI systems. AWS certified. Looking for full-time ML engineer roles."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Adithya AI Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Adithya Kuppusamy",
            "jobTitle": "AI & Data Science Engineer",
            "url": "https://adithya-ai-hub.vercel.app/about",
            "sameAs": [
              "https://github.com/Adithya0805",
              "https://www.linkedin.com/in/adithya-k-76baab204/"
            ],
            "knowsAbout": [
              "Artificial Intelligence",
              "Machine Learning",
              "Python",
              "AWS",
              "Data Science",
              "Multi-agent Systems",
              "RAG"
            ]
          })}
        </script>
      </Helmet>

      <div className="container py-20">
        {/* ── BIO SECTION ── */}
        <div className="grid md:grid-cols-3 gap-12 items-start mb-20">
          <div className="md:col-span-2">
            <p className="text-sm text-primary font-medium">About Me</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold">
              Adithya Kuppusamy
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              AI &amp; Data Science Engineer · Tamil Nadu, India
            </p>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a B.Tech AI &amp; Data Science graduate (CGPA 8.5) from Ambur, Tamil Nadu. I
                build production ML systems — not just Jupyter notebooks. From multi-agent clinical
                AI (MediGuard) to real estate intelligence (TownRise AI), I focus on systems that
                ship and solve real problems.
              </p>
              <p>
                I started this blog to document what I learn on my path from student to ML engineer,
                and to help other Tamil Nadu engineers who don't have the IIT tag but have the skill
                and the drive. If you're reading this from a tier-2 college in South India — this
                blog is for you.
              </p>
              <p>
                Currently open to full-time AI/ML engineer roles. I care about shipping, learning
                fast, and making a real impact.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/Adithya0805"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary text-sm transition-smooth"
              >
                <Github className="w-4 h-4" /> GitHub @Adithya0805
              </a>
              <a
                href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary text-sm transition-smooth"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="mailto:adithyaadhi0805@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary text-sm transition-smooth"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
              <a
                href="/resume.pdf"
                download="Adithya_Kuppusamy_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-smooth shadow-[0_0_15px_rgba(6,182,212,0.35)]"
              >
                <FileDown className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-5">
            <div className="w-40 h-40 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow text-5xl font-bold text-primary-foreground select-none">
              AK
            </div>
            <div className="text-center">
              <p className="font-semibold">Adithya Kuppusamy</p>
              <p className="text-sm text-muted-foreground">Ambur, Tamil Nadu 🇮🇳</p>
              <p className="text-sm text-muted-foreground">CGPA 8.5 · AI &amp; DS</p>
            </div>
          </div>
        </div>

        {/* ── EDUCATION ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" /> Education
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/30">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">B.Tech — Artificial Intelligence &amp; Data Science</h3>
                <p className="text-muted-foreground mt-1">Dhanalakshmi Srinivasan College of Engineering, Coimbatore</p>
                <p className="text-sm text-muted-foreground mt-0.5">Tamil Nadu, India · 2021 – 2025</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">8.5</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">CGPA</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS MATRIX ── */}
        <section className="mb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold">Skills Matrix</h2>
              <p className="text-xs text-muted-foreground mt-1">Explore my stack visually or in list form</p>
            </div>
            
            {/* View Selector Tabs */}
            <div className="flex rounded-xl bg-secondary/80 p-1 border border-border select-none">
              <button
                onClick={() => setSkillsView("graph")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth ${
                  skillsView === "graph"
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Network className="w-3.5 h-3.5" /> Neural Mesh
              </button>
              <button
                onClick={() => setSkillsView("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth ${
                  skillsView === "grid"
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid View
              </button>
            </div>
          </div>

          {skillsView === "graph" ? (
            <div className="animate-fade-up animate-duration-300">
              <SkillGraph />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up animate-duration-300">
              {skillsMatrix.map((cat) => (
                <div
                  key={cat.category}
                  className={`p-5 rounded-2xl bg-gradient-to-b border ${cat.color}`}
                >
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${cat.textColor}`}>
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-background/60 border border-border/60 text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── TIMELINE ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">The Builder's Journey</h2>
          <BuilderJourney />
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" /> Certifications
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((c) => (
              <div
                key={c.name}
                className="flex flex-col justify-between p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-200 group"
              >
                <div>
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="font-semibold text-sm leading-snug">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.issuer}</p>
                </div>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary font-medium group-hover:underline"
                >
                  View Credential →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            Open to opportunities, collaborations, and interesting conversations about AI.
          </p>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-primary" />
              <p className="font-semibold text-lg">Message sent!</p>
              <p className="text-muted-foreground">I'll reply within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-xl space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="about-name" className="block text-sm font-medium mb-1.5">
                    Name
                  </label>
                  <input
                    id="about-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-smooth"
                  />
                </div>
                <div>
                  <label htmlFor="about-email" className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="about-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-smooth"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="about-message" className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="about-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What would you like to discuss?"
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none text-sm transition-smooth resize-none"
                />
              </div>
              {errMsg && <p className="text-sm text-destructive">{errMsg}</p>}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default About;
