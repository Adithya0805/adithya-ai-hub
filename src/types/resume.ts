export interface ContactLink {
  label: string; // e.g. "LinkedIn", "GitHub", "Portfolio"
  url: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  techStack?: string | string[];
  demoUrl?: string;
  githubUrl?: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field?: string;
  institution: string;
  year?: string;
  graduationYear?: string;
  gpaOrScore?: string;
}

export interface CertificationItem {
  id: string;
  title?: string;
  name?: string;
  issuer?: string;
  issuerYear?: string;
  year?: string;
  description?: string;
}

export interface ResumeSkills {
  languages: string[];
  frameworks: string[];
  cloudDevOps: string[];
  tools: string[];
  softSkills?: string[];
}

export interface ResumeDocument {
  header: {
    fullName: string;
    jobTitle?: string;
    location?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    github?: string;
    links: ContactLink[];
  };
  summary: string;
  skillCategories: SkillCategory[];
  skills?: ResumeSkills; // backwards compatibility
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  sectionOrder: Array<"summary" | "skills" | "projects" | "experience" | "education" | "certifications">;
}

export interface SectionScores {
  keywordMatch: number;
  formatting: number;
  relevance: number;
  completeness: number;
}

export interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formatIssues: string[];
  topSuggestion: string;
  sectionScores: SectionScores;
  verdict: string;
  verdictColor: string;
  structuredResume?: ResumeDocument;
}

export interface BulletInsertion {
  keyword: string;
  suggestedBullet: string;
  placementSection: string;
}

export interface OptimizedResult {
  optimizedResume: string;
  keyEnhancements: string[];
  bulletInsertions: BulletInsertion[];
  projectedScore: number;
  structuredResume?: ResumeDocument;
}

// Module declaration for mammoth
declare module "mammoth" {
  export interface MammothResult {
    value: string;
    messages: any[];
  }
  export function extractRawText(options: { arrayBuffer: ArrayBuffer }): Promise<MammothResult>;
}
