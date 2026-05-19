import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";

const timeline = [
  { year: "2026", title: "Final Year — AI & Data Science", desc: "Capstone projects, internships, advanced ML coursework." },
  { year: "2025", title: "AWS & MLOps Deep Dive", desc: "Built production-grade ML pipelines on AWS." },
  { year: "2024", title: "Applied Machine Learning", desc: "Shipped first end-to-end predictive systems." },
  { year: "2023", title: "Foundations", desc: "Math, statistics, Python, and core data structures." },
];

const skills = [
  { group: "Languages", items: ["Python", "SQL", "JavaScript", "Bash"] },
  { group: "ML / AI", items: ["Scikit-learn", "PyTorch", "TensorFlow", "LangChain", "OpenAI"] },
  { group: "Cloud / DevOps", items: ["AWS (EC2, S3, IAM, Lambda)", "Docker", "Linux", "Git"] },
  { group: "Data", items: ["Pandas", "NumPy", "PostgreSQL", "Matplotlib", "Tableau"] },
];

const certs = ["AWS Cloud Practitioner (in progress)", "Google Data Analytics", "DeepLearning.AI ML Specialization"];

const Resume = () => (
  <Layout>
    <section className="container py-20">
      <p className="text-sm text-primary font-medium">Resume</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold">Adithya — AI & Data Science Engineer</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        A snapshot for recruiters and hiring managers. Download the full resume or get in touch.
      </p>

      <div className="mt-6 flex gap-3 flex-wrap">
        <Button variant="hero" size="lg" asChild>
          <a href="/resume.pdf" download><Download className="w-4 h-4" /> Download Resume</a>
        </Button>
        <Button variant="glass" size="lg" asChild>
          <a href="mailto:hello@adithya.dev"><Mail className="w-4 h-4" /> Email Me</a>
        </Button>
      </div>

      <div className="mt-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Learning Journey</h2>
          <div className="relative border-l border-border pl-6 space-y-8">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-gradient-primary shadow-glow" />
                <p className="text-xs font-mono text-primary">{t.year}</p>
                <h3 className="text-lg font-semibold mt-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <ul className="space-y-3">
            {certs.map((c) => (
              <li key={c} className="p-4 rounded-xl bg-card border border-border text-sm">{c}</li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Skills Matrix</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((s) => (
            <div key={s.group} className="bg-gradient-card border border-border rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">{s.group}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-secondary">{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Resume;
