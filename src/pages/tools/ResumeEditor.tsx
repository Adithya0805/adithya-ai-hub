import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  ArrowRight,
  RotateCcw,
  Zap,
  Copy,
  Check,
  Download,
  Edit3,
  Sliders,
  Plus,
  RefreshCw,
  ExternalLink,
  Layers,
  Printer,
} from "lucide-react";
import { ResumeDocument, ATSResult, OptimizedResult, BulletInsertion } from "@/types/resume";
import { ExtractedResumeFile } from "@/utils/resumeParser";
import { ResumeFileUploader } from "@/components/resume/ResumeFileUploader";
import { ResumeCanvasEditor } from "@/components/resume/ResumeCanvasEditor";
import { ResumeSEOSection } from "@/components/resume/ResumeSEOSection";
import { parseRawResumeToDocument } from "@/utils/resumeStructureParser";
import {
  isSubscriber,
  getSubscriberEmail,
  saveSubscriber,
  initSubscriberFromURL,
  subscribeToSubscriberStatus,
} from "@/utils/subscriber";

const SAMPLE_RESUME = `ADITHYA KUPPUSAMY
AI Engineer & Full-Stack Developer | Tamil Nadu, India
Email: contact@adithyak.me | GitHub: github.com/adithyak | Portfolio: adithya-ai-hub.vercel.app

SUMMARY:
B.Tech AI & Data Science graduate (8.5 CGPA) with hands-on experience designing and deploying production multi-agent systems, RAG architectures, and responsive web platforms. Proficient in Python, FastAPI, LangGraph, React, TypeScript, and AWS cloud deployment.

TECHNICAL SKILLS:
- Languages: Python, TypeScript, JavaScript, SQL (PostgreSQL), HTML5, CSS3
- AI / ML: LangChain, LangGraph, Pinecone, RAG Pipelines, HuggingFace, OpenAI API, Gemini API, Prompt Engineering
- Full-Stack & Cloud: React.js, Next.js, Node.js, FastAPI, Tailwind CSS, Docker, AWS (EC2, S3, IAM), Git

EXPERIENCE & PROJECTS:
1. MediGuard Clinical AI (Flagship LangGraph System)
- Engineered a 5-agent stateful clinical triage and RAG diagnosis simulator processing medical guidelines via Pinecone vector store.
- Integrated safety guardrails, automated allergen contraindication cross-checks, and HL7 FHIR structured data exports.
- Reduced clinical triage query latency by 42% utilizing asynchronous FastAPI workers and caching.

2. Aranya Organic Dairy Farm (Production E-Commerce Platform)
- Architected full-lifecycle commercial web application for an organic dairy client with 400+ daily orders.
- Deployed bilingual RAG assistant ("Ask Farm AI"), WhatsApp cart serialization, and zero-downtime edge caching on Vercel.

EDUCATION:
B.Tech in Artificial Intelligence & Data Science (CGPA: 8.5/10) — 2021-2025`;

const SAMPLE_JD = `Senior AI / Full-Stack Engineer
Company: CloudScale AI Technologies
Location: Remote / Hybrid

We are seeking a high-velocity AI Engineer to develop and scale next-generation agentic workflows and intelligent applications.

RESPONSIBILITIES:
- Architect and deploy production Multi-Agent AI workflows using LangGraph and LangChain.
- Design high-performance Retrieval-Augmented Generation (RAG) pipelines connected to vector databases (Pinecone / Weaviate).
- Develop robust, secure REST APIs in Python using FastAPI.
- Build clean, accessible user interfaces using React, TypeScript, and Tailwind CSS.
- Deploy, monitor, and optimize cloud services on AWS (ECS, S3, Lambda, Bedrock).
- Implement evaluation frameworks, guardrails, and latency reduction benchmarks for LLM outputs.

REQUIRED QUALIFICATIONS:
- Proven experience with Python, FastAPI, React, and TypeScript.
- Hands-on expertise in LangGraph or similar multi-agent orchestration frameworks.
- Deep understanding of Vector Embeddings, Semantic Search, and Chunking strategies for RAG.
- Strong proficiency in PostgreSQL and database performance optimization.
- Experience with Docker containerization and CI/CD pipelines on AWS.`;

const SAMPLE_ML_RESUME = `ARJUN SHARMA
Machine Learning Engineer & NLP Researcher | Bengaluru, India
Email: arjun.ai@example.com | GitHub: github.com/arjun-ml | Portfolio: arjun-ml.dev

SUMMARY:
B.Tech in Artificial Intelligence (2025 Graduate, CGPA: 8.8/10). Hands-on experience developing transformer-based NLP pipelines, LoRA fine-tuning for open LLMs, and PyTorch model quantization. Published researcher in automated defect detection.

TECHNICAL SKILLS:
- Languages: Python, C++, SQL, Bash
- Machine Learning & Deep Learning: PyTorch, Hugging Face Transformers, LoRA/PEFT, scikit-learn, OpenCV
- MLOps & Tools: MLflow, Docker, Weights & Biases, Git, FastAPI, AWS S3

PROJECTS:
1. NeuralMed: Transformer-based Clinical Named Entity Recognition
- Fine-tuned RoBERTa and BioBERT models on NCBI-disease dataset, achieving 92.4% F1-score across 15,000 biomedical entities.
- Quantized model using ONNX runtime and TensorRT, reducing inference latency by 45% (down to 18ms per document).
- Deployed containerized FastAPI microservice on AWS EC2 with automated Docker CI/CD pipelines.

2. VisionInspect: Real-Time Industrial Defect Detection
- Trained YOLOv8 and Vision Transformers (ViT) on custom 20,000-image dataset, reaching 94.8% mAP@0.5.
- Implemented multi-threaded video stream inference pipeline processing 60 FPS on edge Nvidia Jetson devices.

EDUCATION:
- B.Tech in Artificial Intelligence & Data Science | 2021 – 2025 | CGPA: 8.8/10

CERTIFICATIONS & TRAINING:
- DeepLearning.AI Deep Learning Specialization (Andrew Ng)
- Hugging Face Transformers & NLP Certification`;

const SAMPLE_ML_JD = `Machine Learning Engineer (Entry-Level / Graduate)
Company: Cognition Systems
Location: Hybrid / Bengaluru

We are seeking a high-velocity ML Engineer with strong foundations in Deep Learning, PyTorch, and NLP.

RESPONSIBILITIES:
- Train, evaluate, and fine-tune foundation models (Transformers, LoRA, QLoRA) on domain datasets.
- Optimize model inference latency using quantization (ONNX, TensorRT, vLLM).
- Build and maintain data pipelines for model training with MLflow and Weights & Biases.
- Develop production-grade REST APIs in Python using FastAPI.
- Containerize and deploy models with Docker on AWS cloud environments.

QUALIFICATIONS:
- B.Tech or M.Tech in Artificial Intelligence, Computer Science, or Data Science (2024-2025 batch).
- Strong proficiency in Python, PyTorch, and Hugging Face libraries.
- Hands-on experience with Computer Vision (YOLO/ViT) or NLP transformers.
- Knowledge of Docker containerization and Git version control.`;

const SAMPLE_FS_RESUME = `PRIYA SUNDARAM
Full-Stack AI Developer | Chennai, India
Email: priya.sundar@example.com | GitHub: github.com/priyasundar | LinkedIn: linkedin.com/in/priyasundar

SUMMARY:
B.Tech graduate in Computer Science & AI (2025) with expertise in building end-to-end intelligent web applications. Proficient in React, TypeScript, Next.js, FastAPI, Vector Databases (Pinecone), and LLM API integrations.

TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
- Frontend: React.js, Next.js, Tailwind CSS, Redux Toolkit, Framer Motion
- Backend & Cloud: Node.js, FastAPI, PostgreSQL, Pinecone, Docker, Vercel, Supabase
- AI Tooling: OpenAI API, Gemini API, LangChain, Semantic Search, Prompt Engineering

PROJECTS:
1. Omnisearch AI: Semantic Code Search Engine
- Built full-stack semantic search engine indexing 50,000+ GitHub repositories using Pinecone vector database and OpenAI embeddings.
- Developed real-time responsive React UI with Tailwind CSS and debounced instant search delivering sub-100ms response times.
- Implemented FastAPI backend microservice with Redis caching, reducing repeated vector query costs by 68%.

2. SmartNotes AI: Autonomous Research Assistant
- Created web workspace that extracts key insights, creates flashcards, and synthesizes audio notes using Gemini 2.5 Flash.
- Integrated Supabase vector store with pgvector for local embeddings and user session synchronization.

EDUCATION:
- B.Tech in Computer Science and Engineering | 2021 – 2025 | CGPA: 8.6/10

CERTIFICATIONS & TRAINING:
- Full-Stack Web Development Bootcamp (Meta Certified)
- Prompt Engineering for Developers (DeepLearning.AI)`;

const SAMPLE_FS_JD = `Full-Stack AI Engineer
Company: Synapse Cloud Labs
Location: Remote

We are looking for a Full-Stack AI Engineer to create intuitive user experiences powered by Generative AI and vector search.

RESPONSIBILITIES:
- Design and build responsive modern frontend interfaces using React, TypeScript, and Tailwind CSS.
- Integrate LLM APIs (OpenAI, Gemini) and Vector Databases (Pinecone, pgvector) for semantic search.
- Develop scalable backend REST APIs using FastAPI or Node.js.
- Optimize client-side bundle size, Core Web Vitals, and real-time streaming state management.
- Deploy full-stack applications with Docker and CI/CD pipelines.

QUALIFICATIONS:
- Proven experience with React, TypeScript, Next.js, and modern CSS.
- Hands-on knowledge of Python, FastAPI, and vector embedding pipelines.
- Familiarity with PostgreSQL, Redis caching, and Docker.
- Passion for Generative AI and agentic user interfaces.`;

const STUDENT_PRESETS = [
  {
    id: "genai",
    label: "🎓 GenAI & LangGraph Engineer",
    badge: "Multi-Agent & RAG",
    resume: SAMPLE_RESUME,
    jd: SAMPLE_JD,
    fileName: "Adithya_Kuppusamy_AI_Resume.pdf",
  },
  {
    id: "ml-nlp",
    label: "🔬 ML & NLP Researcher / Student",
    badge: "Transformers & LoRA",
    resume: SAMPLE_ML_RESUME,
    jd: SAMPLE_ML_JD,
    fileName: "Arjun_Sharma_ML_Resume.pdf",
  },
  {
    id: "fullstack-ai",
    label: "⚡ AI Full-Stack Developer",
    badge: "React & Vector DB",
    resume: SAMPLE_FS_RESUME,
    jd: SAMPLE_FS_JD,
    fileName: "Priya_Sundaram_FullStack_AI_Resume.pdf",
  },
];

// Local dev mock generator
function generateLocalMock(resumeText: string, jdText: string): ATSResult {
  const commonTech = [
    "Python", "FastAPI", "React", "TypeScript", "LangGraph",
    "LangChain", "Pinecone", "RAG", "Docker", "AWS",
    "PostgreSQL", "Tailwind CSS", "Git", "REST APIs", "Vector Embeddings",
    "CI/CD pipelines", "Docker ECS", "System Benchmarking"
  ];
  const lowerResume = resumeText.toLowerCase();
  const lowerJd = jdText.toLowerCase();

  const matched = commonTech.filter(t => lowerResume.includes(t.toLowerCase()) && lowerJd.includes(t.toLowerCase()));
  const missing = commonTech.filter(t => lowerJd.includes(t.toLowerCase()) && !lowerResume.includes(t.toLowerCase()));

  if (matched.length === 0) matched.push("Python", "REST APIs", "Git");
  if (missing.length === 0) missing.push("CI/CD pipelines", "System Benchmarking", "Docker ECS");

  const score = Math.min(94, Math.max(52, Math.round((matched.length / (matched.length + missing.length || 1)) * 90) + 12));

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    formatIssues: [
      "Include quantifiable percentage metrics (% improvement, latency drops) in your recent experience bullets.",
      "Ensure standard single-column section hierarchy for 100% parser readability.",
      "Avoid multi-column tables or non-standard text frames that disrupt automated parsers."
    ],
    topSuggestion: `Embed targeted keywords like '${missing[0] || "CI/CD pipelines"}' into your project bullets using Google's XYZ formula.`,
    sectionScores: {
      keywordMatch: score,
      formatting: 90,
      relevance: Math.min(96, score + 4),
      completeness: 88,
    },
    verdict: score >= 75
      ? "Strong resume match with high technical alignment. Passing initial ATS filters."
      : "Moderate alignment. Incorporating missing technical competencies will dramatically increase interview callbacks.",
    verdictColor: score >= 75 ? "green" : score >= 50 ? "yellow" : "red",
  };
}

export function ResumeEditor() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [extractedMeta, setExtractedMeta] = useState<ExtractedResumeFile | null>(null);
  const [email, setEmail] = useState("");
  const [userIsSubscribed, setUserIsSubscribed] = useState(() => isSubscriber());
  const [step, setStep] = useState<"input" | "loading" | "partial" | "email" | "full">("input");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Active view in full mode
  const [activeTab, setActiveTab] = useState<"canvas" | "scorecard" | "raw">("canvas");

  // Structured Resume Document for the Canvas
  const [resumeDoc, setResumeDoc] = useState<ResumeDocument>(() => parseRawResumeToDocument(SAMPLE_RESUME));

  // Auto-detect subscriber status on mount and via URL params
  useEffect(() => {
    initSubscriberFromURL();
    const sub = isSubscriber();
    setUserIsSubscribed(sub);
    const savedEmail = getSubscriberEmail();
    if (savedEmail) setEmail(savedEmail);

    return subscribeToSubscriberStatus((status) => {
      setUserIsSubscribed(status);
    });
  }, []);

  // ── Step 1: Analyze ──────────────────────────────────────────────────────
  const handleAnalyze = async (resumeToAnalyze?: string) => {
    const textToAnalyze = (resumeToAnalyze || resume).trim();
    const jdToAnalyze = jobDesc.trim();

    if (textToAnalyze.length < 80) {
      setError("Please upload a resume file or paste your resume text (minimum 80 characters)");
      return;
    }
    if (jdToAnalyze.length < 40) {
      setError("Please paste the target job description (minimum 40 characters)");
      return;
    }

    setError("");
    setStep("loading");

    // Initialize structured document model immediately
    const parsedDoc = parseRawResumeToDocument(textToAnalyze);
    setResumeDoc(parsedDoc);

    const payload = JSON.stringify({ resume: textToAnalyze, jobDesc: jdToAnalyze });
    let scanSuccess = false;

    // Helper to determine destination step based on subscriber status
    const resolveNextStep = () => {
      const isSub = isSubscriber() || userIsSubscribed;
      return isSub ? "full" : "partial";
    };

    // 1. Relative endpoint
    try {
      const response = await fetch("/api/ats-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (response.ok) {
        const data = await response.json();
        if (data && typeof data.score === "number") {
          setResult(data);
          if (data.structuredResume) {
            setResumeDoc(data.structuredResume);
          }
          setStep(resolveNextStep());
          scanSuccess = true;
          return;
        }
      }
    } catch (e) {
      console.warn("Relative /api/ats-scan call failed, attempting production gateway...", e);
    }

    // 2. Production Vercel gateway fallback
    if (!scanSuccess) {
      try {
        const prodResponse = await fetch("https://adithya-ai-hub.vercel.app/api/ats-scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        });

        if (prodResponse.ok) {
          const prodData = await prodResponse.json();
          if (prodData && typeof prodData.score === "number") {
            setResult(prodData);
            if (prodData.structuredResume) {
              setResumeDoc(prodData.structuredResume);
            }
            setStep(resolveNextStep());
            scanSuccess = true;
            return;
          }
        }
      } catch (e) {
        console.warn("Production /api/ats-scan call failed, generating local fallback...", e);
      }
    }

    // 3. Fallback mock generator
    if (!scanSuccess) {
      const fallbackData = generateLocalMock(textToAnalyze, jdToAnalyze);
      setResult(fallbackData);
      setStep(resolveNextStep());
    }
  };

  // ── Step 2: Email Capture ─────────────────────────────────────────────────
  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    setIsSubscribing(true);

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: "ATS Resume Editor User",
          source: "resume-editor-tool",
        }),
      });
      saveSubscriber(email.trim());
      setUserIsSubscribed(true);
      setStep("full");
    } catch {
      saveSubscriber(email.trim());
      setUserIsSubscribed(true);
      setStep("full");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleLoadPreset = (preset: (typeof STUDENT_PRESETS)[0]) => {
    setResume(preset.resume);
    setJobDesc(preset.jd);
    setExtractedMeta({
      text: preset.resume,
      fileName: preset.fileName,
      fileSize: 45200,
      fileType: "pdf",
      pageCount: 1,
    });
    setResumeDoc(parseRawResumeToDocument(preset.resume));
    setError("");
  };

  const handleUseSample = () => {
    handleLoadPreset(STUDENT_PRESETS[0]);
  };

  const scoreColor = (score: number) =>
    score >= 75 ? "#4ade80" : score >= 50 ? "#f59e0b" : "#f87171";

  return (
    <Layout>
      <Helmet>
        <title>Free AI Resume Editor & ATS Scanner (PDF & DOCX) | Adithya AI Hub</title>
        <meta
          name="description"
          content="Free AI-powered Resume ATS Scanner and Visual Canvas Editor by Adithya Kuppusamy. Upload PDF or Word resumes, analyze keyword match against target job descriptions, and edit on an interactive A4 canvas."
        />
        <meta
          name="keywords"
          content="resume editor, ats resume editor, ai resume builder, pdf resume scanner, docx resume parser, google xyz resume bullet, ats score checker, free resume fixer"
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/tools/resume-editor" />
        <meta property="og:title" content="AI Resume Editor & ATS Scanner (PDF & DOCX) | Adithya AI Hub" />
        <meta
          property="og:description"
          content="Upload your resume, inspect keyword match against tech job descriptions, and edit on a live A4 visual canvas. 100% free forever."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/tools/resume-editor" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div style={{ paddingTop: "56px", minHeight: "100vh", background: "var(--bg-0)" }}>
        {/* Page Header */}
        <div
          className="no-print"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "56px 24px 36px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-3)",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: 0,
                fontFamily: "var(--font-mono)",
              }}
            >
              Free Tool · AI Labs
            </p>
            <span
              style={{
                fontSize: "11px",
                color: "var(--accent)",
                background: "rgba(200, 169, 110, 0.12)",
                padding: "3px 8px",
                borderRadius: "4px",
                fontWeight: "600",
                fontFamily: "var(--font-mono)",
              }}
            >
              PDF & Word Supported
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(34px, 5.5vw, 58px)",
              fontWeight: "400",
              letterSpacing: "-1.5px",
              lineHeight: "1.08",
              marginBottom: "18px",
            }}
          >
            AI Resume Analyzer &<br />
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Visual Canvas Editor.</span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--text-2)",
              lineHeight: "1.7",
              maxWidth: "620px",
            }}
          >
            Upload your resume in PDF or DOCX format alongside your target job description.
            Get an instant ATS match score, extract structured facts, and edit in a live A4 canvas with 1-click Google XYZ action bullets.
          </p>

          {/* Trust Badges */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}
          >
            {[
              "✓ 100% Free forever",
              "✓ PDF & DOCX File Upload",
              "✓ Live A4 Visual Canvas",
              "✓ Google XYZ Bullet Magic",
              "✓ Zero Data Stored",
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  fontSize: "12px",
                  color: "var(--text-3)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "40px 24px" }}>
          <AnimatePresence mode="wait">
            {/* ── STEP 1: INPUT VIEW ────────────────────────────────────── */}
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* File Uploader Component */}
                <ResumeFileUploader
                  onTextExtracted={(text, meta) => {
                    setResume(text);
                    if (meta) setExtractedMeta(meta);
                    setResumeDoc(parseRawResumeToDocument(text));
                  }}
                  extractedMeta={extractedMeta}
                  onClear={() => {
                    setResume("");
                    setExtractedMeta(null);
                  }}
                  rawText={resume}
                  onRawTextChange={(text) => {
                    setResume(text);
                    setResumeDoc(parseRawResumeToDocument(text));
                  }}
                />

                {/* Job Description Input */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--text-1)",
                      marginBottom: "10px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    Target Job Description
                    <span style={{ color: "var(--text-3)", fontWeight: "400", marginLeft: "8px" }}>
                      (paste role requirements, tech stack, and responsibilities)
                    </span>
                  </label>
                  <textarea
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Paste the target job description requirements here..."
                    rows={8}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: "var(--bg-1)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--text-1)",
                      fontSize: "13px",
                      lineHeight: "1.65",
                      resize: "vertical",
                      outline: "none",
                      fontFamily: "var(--font-mono)",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {error && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#f87171",
                      marginBottom: "16px",
                      padding: "10px 14px",
                      background: "rgba(248,113,113,0.1)",
                      borderRadius: "6px",
                      border: "1px solid rgba(248,113,113,0.2)",
                    }}
                  >
                    {error}
                  </p>
                )}

                {/* Action Buttons */}
                {/* ── AI STUDENT CAREER PRESETS ──────────────────────────────────── */}
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "14px 16px",
                    background: "var(--bg-1)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                        fontFamily: "var(--font-mono)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Sparkles size={13} /> AI Student Career Presets (1-Click Load)
                    </span>
                    <span style={{ fontSize: "11.5px", color: "var(--text-3)" }}>
                      Curated templates for 2025/2026 campus placements & startups
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "8px",
                    }}
                  >
                    {STUDENT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleLoadPreset(preset)}
                        style={{
                          padding: "9px 12px",
                          background: "var(--bg-0)",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          color: "var(--text-1)",
                          fontSize: "12px",
                          fontWeight: "600",
                          cursor: "pointer",
                          textAlign: "left",
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.background = "var(--bg-2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.background = "var(--bg-0)";
                        }}
                      >
                        <span>{preset.label}</span>
                        <span style={{ fontSize: "10.5px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                          {preset.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => handleAnalyze()}
                    style={{
                      padding: "14px 32px",
                      background: "var(--accent)",
                      color: "#000",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      letterSpacing: "0.3px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 2px 12px rgba(200, 169, 110, 0.25)",
                    }}
                  >
                    Scan & Open Canvas Editor →
                  </button>

                  <button
                    type="button"
                    onClick={handleUseSample}
                    style={{
                      padding: "14px 20px",
                      background: "var(--bg-2)",
                      color: "var(--text-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Reset to Default Sample
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: LOADING VIEW ──────────────────────────────────── */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center", padding: "80px 0" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "2px solid var(--accent)",
                    borderTopColor: "transparent",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 24px",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "24px",
                    fontWeight: "400",
                    marginBottom: "8px",
                    color: "var(--text-1)",
                  }}
                >
                  Deconstructing Pattern & Analyzing ATS Fit...
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-3)" }}>
                  Gemini AI is parsing semantic keywords, checking layout compliance, and assembling your A4 canvas.
                </p>
              </motion.div>
            )}

            {/* ── STEP 3: PARTIAL (SCORE TEASER) VIEW ────────────────────── */}
            {step === "partial" && result && (
              <motion.div
                key="partial"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 32px",
                    background: "var(--bg-1)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    marginBottom: "32px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--text-3)",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ATS Match Score
                  </p>
                  <div
                    style={{
                      fontSize: "92px",
                      fontFamily: "var(--font-serif)",
                      fontWeight: "400",
                      color: scoreColor(result.score),
                      lineHeight: "1",
                      marginBottom: "8px",
                    }}
                  >
                    {result.score}
                    <span style={{ fontSize: "32px", color: "var(--text-3)", fontWeight: "300" }}>/100</span>
                  </div>

                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: scoreColor(result.score),
                      marginBottom: "12px",
                    }}
                  >
                    {result.score >= 75 ? "Strong Candidate Match" : result.score >= 50 ? "Moderate Alignment" : "Needs Optimization"}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-2)",
                      maxWidth: "520px",
                      margin: "0 auto 28px",
                      lineHeight: "1.6",
                    }}
                  >
                    {result.verdict}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      if (userIsSubscribed || isSubscriber()) {
                        setStep("full");
                      } else {
                        setStep("email");
                      }
                    }}
                    style={{
                      padding: "14px 36px",
                      background: "var(--accent)",
                      color: "#000",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 2px 12px rgba(200, 169, 110, 0.25)",
                    }}
                  >
                    {userIsSubscribed ? (
                      <>
                        <Sparkles size={16} /> Open Visual Canvas Editor →
                      </>
                    ) : (
                      "Unlock Full Report & Visual Canvas Editor →"
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: EMAIL UNLOCK MODAL ────────────────────────────── */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  maxWidth: "480px",
                  margin: "0 auto",
                  padding: "40px 32px",
                  background: "var(--bg-1)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(200, 169, 110, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "var(--accent)",
                  }}
                >
                  <Lock size={22} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "26px",
                    fontWeight: "400",
                    marginBottom: "8px",
                    color: "var(--text-1)",
                  }}
                >
                  Unlock Canvas Editor
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-2)",
                    lineHeight: "1.6",
                    marginBottom: "24px",
                  }}
                >
                  Enter your email to instantly unlock the interactive A4 Visual Canvas, keyword injector, and vector PDF download.
                </p>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    background: "var(--bg-0)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: "var(--text-1)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: "12px",
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                />

                {emailError && (
                  <p style={{ fontSize: "12px", color: "#f87171", margin: "0 0 12px" }}>
                    {emailError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={isSubscribing}
                  style={{
                    width: "100%",
                    padding: "13px",
                    background: "var(--accent)",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    marginBottom: "12px",
                  }}
                >
                  {isSubscribing ? "Unlocking..." : "Unlock Canvas Editor Instantly"}
                </button>

                {/* 1-Click Restore Link for Existing Subscribers */}
                <div style={{ marginTop: "10px", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      saveSubscriber(email || undefined);
                      setUserIsSubscribed(true);
                      setStep("full");
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--accent)",
                      fontSize: "12.5px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: "4px 8px",
                    }}
                  >
                    Already a newsletter subscriber? Click to restore instant access →
                  </button>
                </div>

                <p style={{ fontSize: "11px", color: "var(--text-3)", margin: "10px 0 0" }}>
                  Free forever. Zero spam. Unsubscribe anytime in 1 click.
                </p>
              </motion.div>
            )}

            {/* ── STEP 5: FULL UNLOCKED VIEW (CANVAS + SCORECARD) ───────── */}
            {step === "full" && result && (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* View Mode Switcher Header */}
                <div
                  className="no-print"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "14px",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        padding: "6px 12px",
                        background: "rgba(74, 222, 128, 0.12)",
                        border: "1px solid rgba(74, 222, 128, 0.3)",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: "var(--text-3)" }}>ATS Match:</span>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: scoreColor(result.score) }}>
                        {result.score}/100
                      </span>
                    </div>

                    {userIsSubscribed && (
                      <span
                        style={{
                          padding: "4px 10px",
                          background: "rgba(200, 169, 110, 0.12)",
                          border: "1px solid rgba(200, 169, 110, 0.3)",
                          borderRadius: "20px",
                          fontSize: "11.5px",
                          color: "var(--accent)",
                          fontWeight: "600",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        ✓ Subscriber VIP Access
                      </span>
                    )}

                    <span style={{ fontSize: "13px", color: "var(--text-3)" }}>
                      ({result.matchedKeywords.length} matched / {result.missingKeywords.length} missing)
                    </span>
                  </div>

                  {/* Tabs */}
                  <div
                    style={{
                      display: "inline-flex",
                      background: "var(--bg-2)",
                      padding: "3px",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {[
                      { id: "canvas", label: "Pro Visual Canvas", icon: Edit3 },
                      { id: "scorecard", label: "ATS Scorecard", icon: Sliders },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id as any)}
                          style={{
                            padding: "6px 14px",
                            fontSize: "13px",
                            fontWeight: activeTab === tab.id ? "600" : "400",
                            color: activeTab === tab.id ? "var(--accent)" : "var(--text-2)",
                            background: activeTab === tab.id ? "var(--bg-0)" : "transparent",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            transition: "all 0.2s",
                          }}
                        >
                          <Icon size={14} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* TAB 1: PRO VISUAL CANVAS EDITOR */}
                {activeTab === "canvas" && (
                  <div>
                    <ResumeCanvasEditor
                      document={resumeDoc}
                      onChange={setResumeDoc}
                      missingKeywords={result.missingKeywords}
                      matchedKeywords={result.matchedKeywords}
                      currentScore={result.score}
                      onReScan={() => handleAnalyze()}
                    />
                  </div>
                )}

                {/* TAB 2: DETAILED ATS SCORECARD */}
                {activeTab === "scorecard" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                    {/* Score Breakdown Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {[
                        { label: "Keyword Match", score: result.sectionScores.keywordMatch },
                        { label: "ATS Formatting", score: result.sectionScores.formatting },
                        { label: "Role Relevance", score: result.sectionScores.relevance },
                        { label: "Completeness", score: result.sectionScores.completeness },
                      ].map((sec) => (
                        <div
                          key={sec.label}
                          style={{
                            padding: "18px",
                            background: "var(--bg-1)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            textAlign: "center",
                          }}
                        >
                          <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", margin: "0 0 6px" }}>
                            {sec.label}
                          </p>
                          <div style={{ fontSize: "28px", fontFamily: "var(--font-serif)", fontWeight: "600", color: scoreColor(sec.score) }}>
                            {sec.score}%
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Matched vs Missing Keywords */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                      {/* Matched */}
                      <div style={{ padding: "24px", background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                          <CheckCircle2 size={18} color="#4ade80" />
                          <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-1)", margin: 0 }}>
                            Matched Keywords ({result.matchedKeywords.length})
                          </h4>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {result.matchedKeywords.map((kw) => (
                            <span
                              key={kw}
                              style={{
                                padding: "4px 10px",
                                background: "rgba(74, 222, 128, 0.12)",
                                color: "#4ade80",
                                border: "1px solid rgba(74, 222, 128, 0.25)",
                                borderRadius: "4px",
                                fontSize: "12px",
                              }}
                            >
                              ✓ {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing */}
                      <div style={{ padding: "24px", background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                          <XCircle size={18} color="#f87171" />
                          <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-1)", margin: 0 }}>
                            Missing Keywords ({result.missingKeywords.length})
                          </h4>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {result.missingKeywords.map((kw) => (
                            <span
                              key={kw}
                              style={{
                                padding: "4px 10px",
                                background: "rgba(248, 113, 113, 0.12)",
                                color: "#f87171",
                                border: "1px solid rgba(248, 113, 113, 0.25)",
                                borderRadius: "4px",
                                fontSize: "12px",
                              }}
                            >
                              + {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Format Issues & Warnings */}
                    {result.formatIssues.length > 0 && (
                      <div style={{ padding: "24px", background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                          <AlertTriangle size={18} color="#f59e0b" />
                          <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-1)", margin: 0 }}>
                            ATS Parser & Readability Warnings
                          </h4>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          {result.formatIssues.map((issue, idx) => (
                            <li key={idx} style={{ fontSize: "13.5px", color: "var(--text-2)", lineHeight: "1.6" }}>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Back to Rescan Button */}
                <div style={{ marginTop: "32px", textAlign: "center" }}>
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    style={{
                      padding: "10px 20px",
                      background: "transparent",
                      color: "var(--text-3)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <RotateCcw size={13} />
                    Scan Another Resume
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── SEO FAQ & ATS ENGINE EXPLAINER SECTION ────────────────────── */}
          <ResumeSEOSection />
        </div>
      </div>
    </Layout>
  );
}

export default ResumeEditor;
