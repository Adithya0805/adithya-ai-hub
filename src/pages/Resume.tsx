import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, Mail, Linkedin, ExternalLink } from "lucide-react";

const timeline = [
  { year: "2025", title: "B.Tech — AI & Data Science", desc: "Dhanalakshmi Srinivasan College of Engineering, Coimbatore. CGPA: 8.5" },
  { year: "2025", title: "AWS re/Start Programme", desc: "Cultus & Amazon Web Services" },
  { year: "2021", title: "Higher Secondary (Class XII)", desc: "Hindu Higher Secondary School, Ambur. 82%" },
  { year: "2019", title: "SSLC (Class X)", desc: "Hindu Higher Secondary School, Ambur. 74%" },
];

const skills = [
  { group: "Programming Languages", items: ["Python", "SQL", "C++", "JavaScript", "Bash"] },
  { group: "AI / ML Frameworks", items: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "XGBoost"] },
  { group: "Cloud & Tools", items: ["AWS (EC2, S3, IAM, SageMaker)", "Docker", "Git", "GitHub", "Power BI"] },
  { group: "Data Science", items: ["EDA", "Statistical Modelling", "NLP", "Computer Vision"] },
  { group: "Soft Skills", items: ["Analytical Thinking", "Team Collaboration", "Problem-Solving"] },
];

const certs = [
  { name: "AWS re/Start Programme (Cultus & AWS)", file: null },
  { name: "Prompt Engineering for Generative AI (Internshala)", file: "/prompt_cert.pdf" },
  { name: "Data Science Job Simulation (BCG)", file: "/bcg_cert.pdf" },
  { name: "Networking Essentials (Cisco)", file: null },
  { name: "Entry Level Python Programmer (Cisco)", file: null },
  { name: "Web Development Fundamentals", file: null }
];

const Resume = () => (
  <Layout>
    <Helmet>
      <title>Adithya Kuppusamy Resume | AI & Data Science Graduate | Adithya AI Hub</title>
      <meta
        name="description"
        content="Recruiters and hiring managers can view and download Adithya Kuppusamy's professional resume. CGPA 8.5 B.Tech graduate in AI & Data Science with expertise in Python, AWS, and Machine Learning."
      />
      <link rel="canonical" href="https://adithya-ai-hub.vercel.app/resume" />
      <meta property="og:title" content="Adithya Kuppusamy Resume | AI & Data Science Graduate" />
      <meta
        property="og:description"
        content="Recruiters can view and download Adithya Kuppusamy's professional resume. CGPA 8.5, deep learning, AWS, and python skills matrix."
      />
      <meta property="og:url" content="https://adithya-ai-hub.vercel.app/resume" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Adithya AI Hub" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>

    <section className="container py-20">
      <p className="text-sm text-primary font-medium">Resume & Credentials</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold">Adithya K — AI & Data Science Engineer</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        A snapshot for recruiters, engineering leads, and hiring managers. Download the official PDF resume or get in touch directly.
      </p>

      <div className="mt-6 flex gap-3 flex-wrap">
        <Button variant="hero" size="lg" asChild>
          <a href="/resume.pdf" download="Adithya_Kuppusamy_Resume.pdf">
            <Download className="w-4 h-4 mr-2" /> Download Resume PDF
          </a>
        </Button>
        <Button variant="glass" size="lg" asChild>
          <a href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/" target="_blank" rel="noreferrer">
            <Linkedin className="w-4 h-4 mr-2" /> View LinkedIn
          </a>
        </Button>
        <Button variant="glass" size="lg" asChild>
          <a href="mailto:adithyaadhi0805@gmail.com">
            <Mail className="w-4 h-4 mr-2" /> Email Adithya
          </a>
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
              <li key={c.name} className="p-4 rounded-xl bg-card border border-border text-sm flex items-center justify-between">
                <span>{c.name}</span>
                {c.file && (
                  <a href={c.file} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1 shrink-0 ml-2">
                    Verify <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </li>
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
