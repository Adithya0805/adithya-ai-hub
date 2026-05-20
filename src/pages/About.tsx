import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const skills = [
  { name: "Python", level: 92 },
  { name: "Machine Learning", level: 88 },
  { name: "LangGraph / Agents", level: 82 },
  { name: "RAG & Vector DBs", level: 85 },
  { name: "AWS Cloud", level: 78 },
  { name: "Next.js / React", level: 80 },
  { name: "FastAPI", level: 76 },
  { name: "TensorFlow / Keras", level: 83 },
];

const timeline = [
  {
    year: "2021",
    title: "Started B.Tech",
    detail: "AI & Data Science — Ranipet district college, Tamil Nadu",
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
  "AWS re/Start Graduate",
  "BCG Data Science Job Simulation (Forage)",
  "Prompt Engineering for AI — DeepLearning.ai",
  "Python for Everybody — University of Michigan",
  "Machine Learning Specialization — deeplearning.ai",
  "Data Analysis with Python — IBM",
];

const About = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

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
        <meta property="og:title" content="About Adithya Kuppusamy — AI Engineer" />
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

        {/* ── SKILLS ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Skills</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div key={s.name} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-xs text-primary font-mono">{s.level}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Journey</h2>
          <div className="relative pl-6 space-y-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                <div className="ml-2">
                  <span className="text-xs text-primary font-mono font-semibold">{item.year}</span>
                  <h3 className="font-semibold mt-0.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {certs.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm">{c}</span>
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
