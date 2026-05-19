export interface Project {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  github?: string;
  demo?: string;
  category: string;
}

export const projects: Project[] = [
  {
    slug: "health-sense-nexus",
    title: "Health Sense Nexus",
    tagline: "AI-driven health monitoring & risk assessment platform.",
    problem: "Patients and clinicians need a unified system to detect early-stage health risks from multimodal vitals data.",
    solution: "Built an end-to-end pipeline ingesting vitals, applying ML risk classifiers, and surfacing actionable alerts through a clean dashboard.",
    stack: ["Python", "Scikit-learn", "FastAPI", "React", "PostgreSQL"],
    github: "https://github.com/",
    category: "AI Systems",
  },
  {
    slug: "financial-risk-prediction",
    title: "Financial Risk Prediction",
    tagline: "Random Forest model predicting loan default likelihood.",
    problem: "Lenders need interpretable risk scores beyond traditional credit heuristics.",
    solution: "Engineered 30+ financial features, trained a tuned Random Forest reaching 0.91 AUC, and exposed it through a Flask inference API.",
    stack: ["Python", "Pandas", "Scikit-learn", "Flask", "Matplotlib"],
    github: "https://github.com/",
    category: "Machine Learning",
  },
  {
    slug: "aws-ec2-linux-labs",
    title: "AWS EC2 & Linux Labs",
    tagline: "Hands-on cloud infrastructure & DevOps lab series.",
    problem: "Beginners struggle to translate AWS theory into real deployments.",
    solution: "Designed a series of reproducible labs covering EC2, IAM, VPC, S3, and Linux shell automation with provisioning scripts.",
    stack: ["AWS", "Linux", "Bash", "Terraform", "Docker"],
    github: "https://github.com/",
    category: "Cloud / AWS",
  },
  {
    slug: "ai-automation-experiments",
    title: "AI Automation Experiments",
    tagline: "LLM agents automating real productivity workflows.",
    problem: "Repetitive knowledge-work tasks consume hours that could be automated with modern LLM tooling.",
    solution: "Prototyped agentic workflows using OpenAI + LangChain that draft emails, summarize PDFs, and triage data — measured 70% time savings.",
    stack: ["Python", "LangChain", "OpenAI", "Next.js"],
    github: "https://github.com/",
    category: "AI Automation",
  },
];
