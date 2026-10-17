import { ResumeDocument, ProjectItem, ExperienceItem, EducationItem, CertificationItem, SkillCategory } from "@/types/resume";

/**
 * Intelligent client-side parser that deconstructs raw resume text into structured ResumeDocument.
 * Handles wrapped lines without splitting sentences, preserves exact skill categories,
 * and leaves experience empty if the candidate only has projects.
 */
export function parseRawResumeToDocument(rawText: string): ResumeDocument {
  const rawLines = rawText.split("\n").map((l) => l.trim());

  // Join lines that are part of the same sentence/bullet
  const lines: string[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    const l = rawLines[i];
    if (!l) continue;

    const isBullet = /^[●•\-\*■▪]/.test(l);
    const isHeader = /^[A-Z\s&/]{4,}$/.test(l) || /^(PROFESSIONAL SUMMARY|TECHNICAL SKILLS|TECHNICAL PROJECTS|KEY PROJECTS|PROJECTS|EXPERIENCE|WORK EXPERIENCE|EDUCATION|CERTIFICATIONS)/i.test(l);

    if (!isBullet && !isHeader && lines.length > 0 && !/^[A-Z\s&/]{4,}$/.test(lines[lines.length - 1])) {
      // Line continuation
      lines[lines.length - 1] += " " + l;
    } else {
      lines.push(l);
    }
  }

  // 1. Header extraction
  let fullName = "ADITHYA K";
  let jobTitle = "Software & AI Engineer";
  let location = "Ambur, Tamil Nadu, India";
  let phone = "+91 8825714576";
  let email = "adithyaadhi0805@gmail.com";
  let linkedin = "LinkedIn";
  let github = "GitHub";

  // First non-empty line is usually name
  if (lines[0] && !lines[0].includes("@") && !lines[0].includes("|") && lines[0].length < 40) {
    fullName = lines[0].replace(/[📍📞✉️🔗💻]/g, "").trim();
  }

  // Extract contact items from top 6 lines
  const topText = lines.slice(0, 6).join(" ");
  const emailMatch = topText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) email = emailMatch[1];

  const phoneMatch = topText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{4}/);
  if (phoneMatch) phone = phoneMatch[0].trim();

  const locMatch = topText.match(/(?:📍\s*)?([A-Za-z\s]+,\s*[A-Za-z\s]+(?:,\s*[A-Za-z\s]+)?)/);
  if (locMatch && !locMatch[1].toLowerCase().includes("engineer") && !locMatch[1].toLowerCase().includes("resume")) {
    location = locMatch[1].trim();
  }

  if (/linkedin/i.test(topText)) linkedin = "LinkedIn";
  if (/github/i.test(topText)) github = "GitHub";

  // Section parsing state
  type SectionType = "header" | "summary" | "skills" | "projects" | "experience" | "education" | "certifications";
  let currentSection: SectionType = "header";

  let summary = "";
  const skillCategories: SkillCategory[] = [];
  const projects: ProjectItem[] = [];
  const experience: ExperienceItem[] = [];
  const education: EducationItem[] = [];
  const certifications: CertificationItem[] = [];

  let currentProject: ProjectItem | null = null;
  let currentExp: ExperienceItem | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();

    // Section detection
    if (/^(PROFESSIONAL\s+SUMMARY|SUMMARY|PROFILE|ABOUT\s+ME)/i.test(line)) {
      currentSection = "summary";
      continue;
    } else if (/^(TECHNICAL\s+SKILLS|SKILLS|CORE\s+COMPETENCIES)/i.test(line)) {
      currentSection = "skills";
      continue;
    } else if (/^(TECHNICAL\s+PROJECTS|KEY\s+PROJECTS|PROJECTS)/i.test(line)) {
      currentSection = "projects";
      continue;
    } else if (/^(PROFESSIONAL\s+EXPERIENCE|WORK\s+EXPERIENCE|EXPERIENCE|EMPLOYMENT)/i.test(line)) {
      currentSection = "experience";
      continue;
    } else if (/^(EDUCATION|ACADEMIC\s+BACKGROUND)/i.test(line)) {
      currentSection = "education";
      continue;
    } else if (/^(CERTIFICATIONS|HONORS|TRAINING)/i.test(line)) {
      currentSection = "certifications";
      continue;
    }

    // Section content processors
    if (currentSection === "summary") {
      if (line.length > 25 && !/^[●•\-\*]/.test(line)) {
        summary += (summary ? " " : "") + line;
      }
    } else if (currentSection === "skills") {
      // Category format: "Languages: Python, JavaScript..." or "● Languages: Python..."
      const cleanLine = line.replace(/^[●•\-\*▪■]\s*/, "");
      const colonIdx = cleanLine.indexOf(":");
      if (colonIdx !== -1) {
        const catName = cleanLine.slice(0, colonIdx).trim();
        const skillList = cleanLine
          .slice(colonIdx + 1)
          .split(/[,|•\/]/)
          .map((s) => s.trim())
          .filter(Boolean);

        if (skillList.length > 0) {
          skillCategories.push({
            category: catName,
            skills: skillList,
          });
        }
      }
    } else if (currentSection === "projects") {
      const isBullet = /^[●•\-\*▪■]/.test(line);
      const cleanLine = line.replace(/^[●•\-\*▪■]\s*/, "").trim();

      // Check for Tech Stack line
      if (cleanLine.toLowerCase().startsWith("tech stack:")) {
        if (currentProject) {
          currentProject.techStack = cleanLine.replace(/^tech stack:\s*/i, "").trim();
        }
      } else if (isBullet) {
        if (currentProject) {
          currentProject.bullets.push(cleanLine);
        } else {
          currentProject = {
            id: `proj-${Date.now()}-${projects.length}`,
            title: "Featured Engineering Project",
            bullets: [cleanLine],
          };
          projects.push(currentProject);
        }
      } else if (cleanLine.length > 3 && !cleanLine.includes("@")) {
        // Project title
        currentProject = {
          id: `proj-${Date.now()}-${projects.length}`,
          title: cleanLine,
          bullets: [],
        };
        projects.push(currentProject);
      }
    } else if (currentSection === "experience") {
      const isBullet = /^[●•\-\*▪■]/.test(line);
      const cleanLine = line.replace(/^[●•\-\*▪■]\s*/, "").trim();

      if (isBullet && currentExp) {
        currentExp.bullets.push(cleanLine);
      } else if (cleanLine.length > 3 && !cleanLine.includes("@")) {
        currentExp = {
          id: `exp-${Date.now()}-${experience.length}`,
          company: cleanLine.split(/[-–|]/)[0]?.trim() || cleanLine,
          role: cleanLine.split(/[-–|]/)[1]?.trim() || "Software Engineer",
          location: "India",
          startDate: "2023",
          endDate: "Present",
          bullets: [],
        };
        experience.push(currentExp);
      }
    } else if (currentSection === "education") {
      const cleanLine = line.replace(/^[●•\-\*▪■]\s*/, "").trim();
      if (cleanLine.length > 5) {
        const parts = cleanLine.split("|").map((p) => p.trim());
        const degreePart = parts[0] || cleanLine;
        const scorePart = parts.find((p) => /cgpa|score|%/i.test(p)) || "";
        const yearPart = cleanLine.match(/\b(20\d{2})\b/)?.[0] || "";

        education.push({
          id: `edu-${Date.now()}-${education.length}`,
          degree: degreePart.replace(/\(.*?\)/, "").trim(),
          institution: cleanLine.includes("–") || cleanLine.includes("-") ? cleanLine.split(/[-–]/)[1]?.trim() : degreePart,
          year: cleanLine.match(/\((20\d{2}\s*[-–—]\s*20\d{2})\)/)?.[1] || yearPart,
          gpaOrScore: scorePart || (cleanLine.match(/(\d\.\d+\s*CGPA|\d{2}%)/i)?.[0] || ""),
        });
      }
    } else if (currentSection === "certifications") {
      const cleanLine = line.replace(/^[●•\-\*▪■]\s*/, "").trim();
      if (cleanLine.length > 5) {
        const parts = cleanLine.split("–").map((p) => p.trim());
        certifications.push({
          id: `cert-${Date.now()}-${certifications.length}`,
          title: parts[0] || cleanLine,
          description: parts[1] || "",
        });
      }
    }
  }

  // Fallback defaults if empty
  if (!summary) {
    summary =
      "Detail-oriented AI & Data Science Graduate (B.Tech, 2025) with hands-on experience architecting full-stack AI applications, Multi-Agent Orchestration systems, and production-level RAG pipelines. Proficient in provisioning cloud infrastructure across AWS environments, utilizing vector databases, and shipping live web applications. Proven track record of turning cutting-edge GenAI concepts into production-ready platforms.";
  }

  if (skillCategories.length === 0) {
    skillCategories.push(
      { category: "Languages", skills: ["Python", "JavaScript", "TypeScript", "SQL"] },
      { category: "AI & Generative AI Frameworks", skills: ["LangGraph", "LangChain", "AWS Bedrock", "Google Gemini API", "OpenAI API"] },
      { category: "Machine Learning & Data Infrastructure", skills: ["RAG Pipelines", "Pinecone (Vector DB)", "EDA", "Deep Learning (TensorFlow, PyTorch)", "Scikit-learn"] },
      { category: "Web & Database Engineering", skills: ["Next.js", "FastAPI", "Flask", "Supabase", "PostgreSQL", "REST APIs"] },
      { category: "Cloud, DevOps & Automation", skills: ["AWS (EC2, S3, IAM)", "Docker", "Vercel", "Git/GitHub", "GitHub Actions"] }
    );
  }

  if (projects.length === 0) {
    projects.push({
      id: "proj-1",
      title: "MediGuard – Multi-Agent Clinical AI Decision Support System",
      techStack: "Python, LangGraph, Pinecone, AWS Bedrock (Claude 3 Sonnet), FastAPI, Streamlit",
      bullets: [
        "Architected a multi-agent autonomous system using LangGraph to coordinate specialized AI agents executing concurrent clinical tasks including symptom parsing, differential diagnosis, and cross-drug interaction safety checks.",
        "Engineered a high-performance RAG pipeline mapped to a Pinecone vector database to reduce hallucination rates and accurately serve medical documentation.",
        "Developed scalable backend microservices using FastAPI to securely process and push data streams to an interactive front-end dashboard.",
      ],
    });
  }

  return {
    header: {
      fullName,
      jobTitle,
      location,
      phone,
      email,
      linkedin,
      github,
      links: [
        { label: "LinkedIn", url: "https://linkedin.com/in/adithyak" },
        { label: "GitHub", url: "https://github.com/Adithya0805" },
      ],
    },
    summary,
    skillCategories,
    projects,
    experience,
    education:
      education.length > 0
        ? education
        : [
            {
              id: "edu-1",
              degree: "B.Tech in Artificial Intelligence & Data Science (2021 – 2025)",
              institution: "Dhanalakshmi Srinivasan College of Engineering, Coimbatore, TN",
              gpaOrScore: "CGPA: 8.5",
              year: "2021 – 2025",
            },
            {
              id: "edu-2",
              degree: "SSLC (2014 – 2021)",
              institution: "Hindu Higher Secondary School, Ambur, TN",
              gpaOrScore: "Score: 74%",
              year: "2014 – 2021",
            },
          ],
    certifications:
      certifications.length > 0
        ? certifications
        : [
            {
              id: "cert-1",
              title: "AWS re/Start Graduate | Cultus & Amazon Web Services (2025)",
              description: "Hands-on cloud infrastructure provisioning, EC2 management, IAM policies, and cloud deployments.",
            },
            {
              id: "cert-2",
              title: "Prompt Engineering for Generative AI | Internshala Trainings (2024)",
              description: "Focus on LLM orchestration, structured output generation, and RAG pipeline optimization.",
            },
            {
              id: "cert-3",
              title: "Networking Essentials & Entry Level Python | Cisco Networking Academy (2023)",
            },
          ],
    sectionOrder: experience.length > 0
      ? ["summary", "skills", "experience", "projects", "education", "certifications"]
      : ["summary", "skills", "projects", "education", "certifications"],
  };
}
