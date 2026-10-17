import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, ShieldCheck, Zap, Sparkles, FileText, Cpu } from "lucide-react";

export function ResumeSEOSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does this AI Resume Editor ensure my resume passes ATS filters in 2026?",
      a: "Applicant Tracking Systems (ATS) like Workday, Greenhouse, Taleo, and Lever parse resumes sequentially, stripping away complex formatting to extract plain text. This tool scans your resume against the target job description using Gemini AI to identify missing technical keywords and formatting pitfalls. The generated A4 canvas adheres strictly to single-column ATS benchmarks with standard section headers, ensuring 100% parseability."
    },
    {
      q: "Can I upload both PDF and DOCX resume files?",
      a: "Yes. The editor supports direct drag-and-drop file uploads for PDF (.pdf), Microsoft Word (.docx, .doc), and plain text (.txt) files up to 10 MB. All text extraction runs directly in your browser using high-performance parsing libraries, meaning your file is parsed in milliseconds without needing to be uploaded to any external server."
    },
    {
      q: "What is Google's XYZ formula for resume bullet points?",
      a: "Google's executive recruiting formula defines the most impactful way to frame engineering achievements: 'Accomplished [X], as measured by [Y], by doing [Z]'. Instead of generic duties, it highlights quantifiable business impact (e.g., 'Reduced query latency by 42% by designing asynchronous FastAPI workers and caching'). Our built-in 'Google XYZ Enhancer' lets you transform any bullet point into this framework with a single click."
    },
    {
      q: "Why do standard resume templates from Canva or Word often fail ATS scans?",
      a: "Many design-heavy templates use multi-column text frames, floating graphic boxes, icons, and non-standard tables. When an ATS parser attempts to extract text from multi-column layouts, it often reads across columns horizontally, scrambling your work history and skills into unreadable gibberish. Our editor maintains an elegant visual aesthetic while preserving the single-column vector text stream that ATS engines demand."
    },
    {
      q: "Is this AI Resume Editor and ATS Scanner completely free?",
      a: "Yes, 100% free forever. It is powered by Google Gemini AI and built by an AI engineer. There are no paywalls, no credit cards required, and no hidden subscriptions to download your polished PDF or text resume."
    },
    {
      q: "Is my personal data or resume stored on your servers?",
      a: "Zero resume data is stored. Your resume text and target job description are processed transiently in memory solely to analyze keyword matches and generate your tailored A4 canvas. Once your session ends or you refresh the page, your data is completely discarded."
    }
  ];

  // Schema.org structured data objects
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Adithya AI Resume Editor & ATS Scanner",
    "url": "https://adithya-ai-hub.vercel.app/tools/resume-editor",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free AI-powered Resume ATS Scanner and Visual Canvas Editor. Upload PDF/DOCX files, analyze match scores against job descriptions, and edit on an interactive A4 canvas with Google XYZ action bullets.",
    "featureList": [
      "Upload PDF and DOCX resume files with client-side text extraction",
      "Gemini AI ATS match score analysis and missing keyword identification",
      "Interactive A4 live visual resume canvas with in-place editing",
      "Google XYZ impact bullet point generator",
      "Vector ATS-friendly PDF download compatible with Workday and Greenhouse"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <section className="no-print" style={{ borderTop: "1px solid var(--border)", paddingTop: "56px", marginTop: "40px" }}>
      {/* JSON-LD Script Injections for Search Engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Comparison Grid */}
      <div style={{ marginBottom: "56px" }}>
        <p style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
          ATS Engine Optimization Guide
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "400", letterSpacing: "-1px", marginBottom: "16px", color: "var(--text-1)" }}>
          Why Technical Resumes Fail ATS Parsers
        </h2>
        <p style={{ fontSize: "15px", color: "var(--text-2)", lineHeight: "1.7", maxWidth: "680px", marginBottom: "32px" }}>
          Over 75% of technical resumes are rejected before human eyes review them. Here is how our AI Visual Canvas solves the top failure points:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {[
            {
              title: "Scrambled Reading Order",
              issue: "Multi-column templates cause parsers to merge left and right columns horizontally.",
              solution: "Our canvas enforces a linear single-column document flow that guarantees 100% parser comprehension.",
              icon: FileText
            },
            {
              title: "Missing Exact-Match Skills",
              issue: "Candidates possess the skill but write synonyms that automated filters miss.",
              solution: "Our 1-click injector embeds the exact keywords demanded in the job description directly into your skills and bullets.",
              icon: Zap
            },
            {
              title: "Unquantified Bullet Points",
              issue: "Bullets describing vague duties ('worked on APIs') get low relevance ranking.",
              solution: "Our Google XYZ enhancer rewrites bullets with measurable metrics (% efficiency, ms latency, scale).",
              icon: Sparkles
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  padding: "24px",
                  background: "var(--bg-1)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(200, 169, 110, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: "14px" }}>
                  <Icon size={18} />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-1)", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#f87171", lineHeight: "1.55", marginBottom: "8px" }}>
                  <strong>Pitfall:</strong> {item.issue}
                </p>
                <p style={{ fontSize: "13px", color: "#4ade80", lineHeight: "1.55", margin: 0 }}>
                  <strong>Fix:</strong> {item.solution}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO FAQ Accordion */}
      <div>
        <p style={{ fontSize: "11px", color: "var(--text-3)", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "var(--font-mono)" }}>
          Frequently Asked Questions
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "400", letterSpacing: "-1px", marginBottom: "28px", color: "var(--text-1)" }}>
          Frequently Asked Questions About ATS & AI Resumes
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  background: "var(--bg-1)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    gap: "14px",
                  }}
                >
                  <span style={{ fontSize: "14.5px", fontWeight: "600", color: "var(--text-1)" }}>
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={16} color="var(--accent)" /> : <ChevronDown size={16} color="var(--text-3)" />}
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 20px 20px",
                      fontSize: "13.5px",
                      color: "var(--text-2)",
                      lineHeight: "1.7",
                      borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                      paddingTop: "14px",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
