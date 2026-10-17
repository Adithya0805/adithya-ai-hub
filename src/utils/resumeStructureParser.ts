import { ResumeDocument, ExperienceItem, ProjectItem, EducationItem, ContactLink } from "@/types/resume";

/**
 * Parses raw resume text into a structured ResumeDocument model.
 * Used as a fallback parser and for initializing the canvas editor.
 */
export function parseRawResumeToDocument(rawText: string): ResumeDocument {
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);

  let fullName = "Candidate Name";
  let jobTitle = "Software & AI Engineer";
  let email = "";
  let phone = "";
  let location = "";
  const links: ContactLink[] = [];

  // Try extracting header info from first 5 lines
  const headerLines = lines.slice(0, 5);
  if (headerLines[0] && !headerLines[0].toLowerCase().includes("resume") && !headerLines[0].includes(":")) {
    fullName = headerLines[0].replace(/[^a-zA-Z\s.-]/g, "").trim();
  }

  // Look for email
  const emailMatch = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) email = emailMatch[1];

  // Look for phone
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) phone = phoneMatch[0];

  // Look for GitHub/LinkedIn/Portfolio
  const githubMatch = rawText.match(/github\.com\/[a-zA-Z0-9_-]+/i);
  if (githubMatch) links.push({ label: "GitHub", url: `https://${githubMatch[0]}` });

  const linkedinMatch = rawText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  if (linkedinMatch) links.push({ label: "LinkedIn", url: `https://${linkedinMatch[0]}` });

  // Identify sections by headers
  let currentSection: "header" | "summary" | "skills" | "experience" | "projects" | "education" | "certifications" = "header";
  let summaryText = "";
  const skillsList: string[] = [];
  const experiences: ExperienceItem[] = [];
  const projects: ProjectItem[] = [];
  const educations: EducationItem[] = [];

  let currentExp: Partial<ExperienceItem> | null = null;
  let currentProj: Partial<ProjectItem> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();

    if (upper.includes("SUMMARY") || upper.includes("PROFILE") || upper.includes("ABOUT ME")) {
      currentSection = "summary";
      continue;
    } else if (upper.includes("SKILL") || upper.includes("TECHNOLOGIES") || upper.includes("COMPETENC")) {
      currentSection = "skills";
      continue;
    } else if (upper.includes("EXPERIENCE") || upper.includes("WORK HISTORY") || upper.includes("EMPLOYMENT")) {
      currentSection = "experience";
      continue;
    } else if (upper.includes("PROJECT") || upper.includes("PORTFOLIO")) {
      currentSection = "projects";
      continue;
    } else if (upper.includes("EDUCATION") || upper.includes("ACADEMIC")) {
      currentSection = "education";
      continue;
    } else if (upper.includes("CERTIFICAT")) {
      currentSection = "certifications";
      continue;
    }

    if (currentSection === "summary") {
      if (line.length > 20 && !line.startsWith("-") && !line.startsWith("•")) {
        summaryText += (summaryText ? " " : "") + line;
      }
    } else if (currentSection === "skills") {
      // Extract skills separated by commas, colons, or bullets
      const cleaned = line.replace(/^[A-Za-z\s]+:/, "").replace(/^[•\-\*]\s*/, "");
      const items = cleaned.split(/[,|•\/]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 35);
      skillsList.push(...items);
    } else if (currentSection === "experience") {
      if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*")) {
        const bullet = line.replace(/^[•\-\*]\s*/, "").trim();
        if (currentExp) {
          if (!currentExp.bullets) currentExp.bullets = [];
          currentExp.bullets.push(bullet);
        } else {
          // Create generic initial experience
          currentExp = {
            id: `exp-${Date.now()}-${Math.random()}`,
            company: "Engineering Organization",
            role: "Software / AI Developer",
            location: "Remote / Hybrid",
            startDate: "2023",
            endDate: "Present",
            isCurrent: true,
            bullets: [bullet]
          };
          experiences.push(currentExp as ExperienceItem);
        }
      } else if (line.length > 3 && !line.includes("@") && !line.includes("http")) {
        // Potential company or title header
        currentExp = {
          id: `exp-${Date.now()}-${Math.random()}`,
          company: line.split(/[-–|]/)[0]?.trim() || line,
          role: line.split(/[-–|]/)[1]?.trim() || "AI & Full-Stack Developer",
          location: "India",
          startDate: "2023",
          endDate: "Present",
          isCurrent: true,
          bullets: []
        };
        experiences.push(currentExp as ExperienceItem);
      }
    } else if (currentSection === "projects") {
      if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*")) {
        const bullet = line.replace(/^[•\-\*]\s*/, "").trim();
        if (currentProj) {
          if (!currentProj.bullets) currentProj.bullets = [];
          currentProj.bullets.push(bullet);
        } else {
          currentProj = {
            id: `proj-${Date.now()}-${Math.random()}`,
            title: "Featured Engineering Project",
            techStack: ["Python", "React", "AI"],
            bullets: [bullet]
          };
          projects.push(currentProj as ProjectItem);
        }
      } else if (line.length > 3 && !line.includes("@")) {
        currentProj = {
          id: `proj-${Date.now()}-${Math.random()}`,
          title: line.replace(/^[0-9]+\.\s*/, "").trim(),
          techStack: ["Python", "FastAPI", "React"],
          bullets: []
        };
        projects.push(currentProj as ProjectItem);
      }
    } else if (currentSection === "education") {
      if (line.length > 5) {
        educations.push({
          id: `edu-${Date.now()}-${Math.random()}`,
          degree: line.split(/[-–|]/)[0]?.trim() || line,
          field: "Artificial Intelligence & Data Science",
          institution: line.split(/[-–|]/)[1]?.trim() || "University / College",
          graduationYear: line.match(/\b(20\d{2})\b/)?.[0] || "2025",
          gpaOrScore: line.match(/(\d\.\d+|\d{2}%)/)?.[0] || "8.5 CGPA"
        });
      }
    }
  }

  // De-duplicate and categorize skills
  const uniqueSkills = Array.from(new Set(skillsList));
  const languages = uniqueSkills.filter(s => /python|typescript|javascript|c\+\+|java|sql|html|css|go|rust/i.test(s));
  const frameworks = uniqueSkills.filter(s => /react|next|node|fastapi|express|django|flask|tailwind/i.test(s));
  const cloudDevOps = uniqueSkills.filter(s => /aws|docker|kubernetes|gcp|azure|git|ci\/cd|vercel/i.test(s));
  const tools = uniqueSkills.filter(s => !languages.includes(s) && !frameworks.includes(s) && !cloudDevOps.includes(s));

  if (!summaryText) {
    summaryText = "Results-driven AI Engineer & Full-Stack Developer with hands-on experience designing and deploying scalable multi-agent systems, RAG architectures, and responsive web platforms. Proficient in Python, FastAPI, React, and cloud deployment.";
  }

  if (experiences.length === 0) {
    experiences.push({
      id: "exp-default-1",
      company: "AI Development Lab",
      role: "AI & Full-Stack Developer",
      location: "India / Remote",
      startDate: "2023",
      endDate: "Present",
      isCurrent: true,
      bullets: [
        "Architected scalable microservices using FastAPI and React, boosting application performance by 35%.",
        "Engineered RAG pipelines with Pinecone vector embeddings to reduce query hallucination rates."
      ]
    });
  }

  if (projects.length === 0) {
    projects.push({
      id: "proj-default-1",
      title: "MediGuard Clinical AI Agent",
      techStack: ["LangGraph", "FastAPI", "Pinecone", "AWS"],
      bullets: [
        "Built a 5-agent clinical triage assistant with stateful RAG diagnosis simulator.",
        "Integrated FHIR health record data serialization and automated allergen contraindication cross-checks."
      ]
    });
  }

  if (educations.length === 0) {
    educations.push({
      id: "edu-default-1",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      field: "Computer Science & AI",
      institution: "Anna University Affiliate",
      graduationYear: "2025",
      gpaOrScore: "8.5 CGPA"
    });
  }

  return {
    header: {
      fullName,
      jobTitle,
      email: email || "contact@adithyak.me",
      phone: phone || "+91 98765 43210",
      location: location || "Tamil Nadu, India",
      links
    },
    summary: summaryText,
    skills: {
      languages: languages.length > 0 ? languages : ["Python", "TypeScript", "SQL", "JavaScript"],
      frameworks: frameworks.length > 0 ? frameworks : ["React.js", "Next.js", "FastAPI", "Tailwind CSS"],
      cloudDevOps: cloudDevOps.length > 0 ? cloudDevOps : ["Docker", "AWS (EC2, S3)", "Git", "CI/CD"],
      tools: tools.length > 0 ? tools.slice(0, 8) : ["LangChain", "Pinecone", "PostgreSQL", "Prompt Engineering"]
    },
    experience: experiences,
    projects: projects,
    education: educations,
    certifications: [
      {
        id: "cert-1",
        name: "Google Cloud AI / Cloud Practitioner",
        issuer: "Google / AWS",
        year: "2024"
      }
    ],
    sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications"]
  };
}
