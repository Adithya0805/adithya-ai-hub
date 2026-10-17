export interface ContactLink {
  label: string; // e.g. "LinkedIn", "GitHub", "Portfolio"
  url: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  graduationYear: string;
  gpaOrScore?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
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
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    links: ContactLink[];
  };
  summary: string;
  skills: ResumeSkills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  sectionOrder: Array<"summary" | "skills" | "experience" | "projects" | "education" | "certifications">;
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

// Module declaration for mammoth since no @types package exists
declare module "mammoth" {
  export interface MammothResult {
    value: string;
    messages: any[];
  }
  export function extractRawText(options: { arrayBuffer: ArrayBuffer }): Promise<MammothResult>;
}
