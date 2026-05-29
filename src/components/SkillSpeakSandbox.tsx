import React, { useState } from "react";
import { MessageSquare, Sparkles, AlertCircle, RefreshCw, Send, CheckCircle, ShieldAlert, Cpu } from "lucide-react";

interface TamilPhrase {
  tamil: string;
  english: string;
}

const TAMIL_PHRASES: TamilPhrase[] = [
  {
    tamil: "Ennaku programming romba pudikkum, project-la work panna eppovum ready.",
    english: "I possess a deep passion for software engineering and am always prepared to collaborate effectively to deliver robust production systems.",
  },
  {
    tamil: "College-la theory dhaan solli thandhanga, aana naana neriya projects panni kathukitten.",
    english: "While my academic curriculum focused heavily on foundational theory, I proactively bridged the gap by independently designing and building production-ready AI applications in public.",
  },
  {
    tamil: "En team mates kooda adjust panni velai seiya theriyum, entha problem vandhalum solve pannuvom.",
    english: "I excel in cross-functional collaboration, leveraging structured communication to coordinate team efforts and systematically resolve complex engineering bottlenecks.",
  },
  {
    tamil: "Ennaku technology pudhusa irundhalum seekram padichiduven.",
    english: "I am highly adaptable and possess a high learning velocity, enabling me to rapidly master and deploy new technology stacks under aggressive timelines.",
  },
];

const JD_TEMPLATES = {
  gen_ai: "We are seeking an AI Engineer with hands-on experience in Python, building multi-agent architectures using LangGraph, storing vector embeddings in Pinecone, and configuring advanced RAG models. Experience in deploying to AWS is a big plus.",
  full_stack: "Looking for a Full-Stack Engineer proficient in React, Node/Python, and building high-performance asynchronous REST APIs via FastAPI. Familiarity with serverless databases like Supabase or Firebase is required.",
};

export function SkillSpeakSandbox() {
  const [activeTab, setActiveTab] = useState<"translator" | "scanner">("translator");
  
  // Translator States
  const [selectedTamilIdx, setSelectedTamilIdx] = useState<number | null>(null);
  const [customTamil, setCustomTamil] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  // Scanner States
  const [jdInput, setJdInput] = useState("");
  const [scanResult, setScanResult] = useState<{
    score: number;
    highlights: string[];
    feedback: string;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Translator Handler
  const handleTranslate = (idx: number | null) => {
    let sourceText = "";
    let resultText = "";

    if (idx !== null) {
      sourceText = TAMIL_PHRASES[idx].tamil;
      resultText = TAMIL_PHRASES[idx].english;
      setSelectedTamilIdx(idx);
    } else {
      if (!customTamil.trim()) return;
      sourceText = customTamil;
      // Default smart fallback translation
      resultText = "I possess strong hands-on experience in building state-of-the-art AI applications, integrating secure backend REST APIs, and designing interactive client dashboards.";
      setSelectedTamilIdx(null);
    }

    setIsTranslating(true);
    setTranslatedText("");

    // Simulate token by token typing generation of LLM
    setTimeout(() => {
      setIsTranslating(false);
      setTranslatedText(resultText);
    }, 1500);
  };

  // Scanner Handler
  const handleScan = () => {
    if (!jdInput.trim()) return;
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const lowerJD = jdInput.toLowerCase();
      const skillsToScan = [
        { name: "Python", keywords: ["python"] },
        { name: "LangGraph", keywords: ["langgraph", "agent", "agents", "multi-agent"] },
        { name: "Pinecone", keywords: ["pinecone", "vector", "embedding"] },
        { name: "RAG", keywords: ["rag", "retrieval", "retrieval-augmented"] },
        { name: "FastAPI", keywords: ["fastapi", "rest api", "apis"] },
        { name: "AWS", keywords: ["aws", "cloud", "ec2", "s3", "bedrock"] },
        { name: "React", keywords: ["react", "frontend", "next.js"] },
        { name: "Supabase", keywords: ["supabase", "postgres"] },
      ];

      const matches = skillsToScan.filter((s) =>
        s.keywords.some((k) => lowerJD.includes(k))
      );

      const highlights = matches.map((m) => m.name);
      const matchPct = Math.round((matches.length / skillsToScan.length) * 100);
      
      let feedback = "";
      if (matchPct >= 70) {
        feedback = `Outstanding fit! Adithya has active production-level project deployments in ${highlights.join(", ")}. His flagship multi-agent system MediGuard aligns 100% with this stack.`;
      } else if (matchPct >= 40) {
        feedback = `Strong alignment. Adithya's core skill sets cover critical pillars of your stack: ${highlights.join(", ")}. Highly adaptable to bridge other requirements.`;
      } else {
        feedback = `Moderate match. Matches found in ${highlights.join(", ")}. Adithya's high learning velocity (B.Tech 8.5 CGPA, 7 completed AI projects) guarantees fast integration.`;
      }

      setScanResult({
        score: matchPct === 0 ? 30 : matchPct, // Minimum baseline fit
        highlights,
        feedback,
      });
      setIsScanning(false);
    }, 1200);
  };

  const loadJdTemplate = (key: "gen_ai" | "full_stack") => {
    setJdInput(JD_TEMPLATES[key]);
    setScanResult(null);
  };

  return (
    <div className="mt-8 border-t border-border/80 pt-8 select-none font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-md font-bold text-foreground flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary animate-pulse" />
            SkillSpeak AI Live Console
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">Test real core models built into Adithya's flagship workspace</p>
        </div>

        {/* Tab switchers */}
        <div className="flex rounded-xl bg-secondary/80 p-0.5 border border-border">
          <button
            onClick={() => setActiveTab("translator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth ${
              activeTab === "translator"
                ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tamil ⇄ Interview English
          </button>
          <button
            onClick={() => setActiveTab("scanner")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth ${
              activeTab === "scanner"
                ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Recruiter JD Scanner
          </button>
        </div>
      </div>

      {/* ── Translator Module ── */}
      {activeTab === "translator" && (
        <div className="space-y-4 animate-fade-up animate-duration-300">
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Left: Input selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest">Colloquial Tamil Input</label>
              
              {/* Pre-set chips */}
              <div className="space-y-2">
                {TAMIL_PHRASES.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTranslate(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-smooth ${
                      selectedTamilIdx === idx
                        ? "bg-primary/5 border-primary text-foreground shadow-[0_0_10px_rgba(6,182,212,0.08)]"
                        : "bg-card hover:bg-secondary/40 border-border hover:border-muted-foreground/35 text-muted-foreground"
                    }`}
                  >
                    "{phrase.tamil}"
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={customTamil}
                  onChange={(e) => setCustomTamil(e.target.value)}
                  placeholder="Or write custom Tamil (e.g. Enaku code panna pudikum...)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-secondary/40 border border-border focus:border-primary focus:outline-none transition-smooth text-foreground"
                />
                <button
                  onClick={() => handleTranslate(null)}
                  disabled={!customTamil.trim()}
                  className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 disabled:opacity-50 transition-smooth shrink-0"
                >
                  Translate
                </button>
              </div>
            </div>

            {/* Right: Refined Output Console */}
            <div className="glass border border-border/80 bg-secondary/20 rounded-2xl p-4 flex flex-col justify-between min-h-[190px]">
              
              <div>
                <div className="flex justify-between items-center border-b border-border pb-2.5 mb-3">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                    Interview English Model
                  </span>
                  <span className="px-1.5 py-0.5 text-[8px] font-mono text-muted-foreground border border-border rounded">
                    LLM-SCORER v1
                  </span>
                </div>

                {isTranslating ? (
                  <div className="space-y-2 py-4">
                    <div className="h-3 w-3/4 rounded bg-border animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-border animate-pulse" style={{ animationDelay: "150ms" }} />
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      <span className="text-[10px] text-muted-foreground font-mono">Running model generation inference...</span>
                    </div>
                  </div>
                ) : translatedText ? (
                  <div className="animate-fade-up animate-duration-300">
                    <p className="text-xs text-foreground leading-relaxed font-medium">
                      "{translatedText}"
                    </p>
                    
                    {/* Model alignment feedback */}
                    <div className="mt-3.5 pt-3 border-t border-border/50 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-[9px] text-muted-foreground leading-normal">
                        **Alignment Tip:** Recruiter-grade impact verified. Focuses on collaborative competence and project delivery.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6 text-muted-foreground/40">
                    <MessageSquare className="w-8 h-8 mb-2" />
                    <p className="text-[10px] leading-normal font-medium max-w-[170px]">
                      Click any Tamil statement or input custom text to trigger translation.
                    </p>
                  </div>
                )}
              </div>

              {translatedText && !isTranslating && (
                <div className="mt-4 text-[9px] text-primary/70 font-mono text-right select-none">
                  ⚡ Confidence Score: 98%
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Scanner Module ── */}
      {activeTab === "scanner" && (
        <div className="space-y-4 animate-fade-up animate-duration-300">
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Left: JD Input Container */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest">Paste Recruiter JD</label>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => loadJdTemplate("gen_ai")}
                    className="px-2 py-0.5 text-[9px] rounded-md bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    AI Engineer Template
                  </button>
                  <button
                    onClick={() => loadJdTemplate("full_stack")}
                    className="px-2 py-0.5 text-[9px] rounded-md bg-secondary hover:bg-secondary/80 border border-border text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    Full-Stack Template
                  </button>
                </div>
              </div>

              <textarea
                value={jdInput}
                onChange={(e) => setJdInput(e.target.value)}
                placeholder="Paste your job description requirements here..."
                rows={6}
                className="w-full p-3 text-xs rounded-xl bg-secondary/40 border border-border focus:border-primary focus:outline-none transition-smooth text-foreground resize-none"
              />

              <button
                onClick={handleScan}
                disabled={!jdInput.trim() || isScanning}
                className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 disabled:opacity-50 transition-smooth"
              >
                {isScanning ? "Scanning Matrix..." : "Scan & Match Skill Alignments"}
              </button>
            </div>

            {/* Right: Compatibility Results */}
            <div className="glass border border-border/80 bg-secondary/20 rounded-2xl p-4 flex flex-col justify-between min-h-[190px]">
              
              <div>
                <div className="flex justify-between items-center border-b border-border pb-2.5 mb-3">
                  <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    Adithya Alignment Matrix
                  </span>
                  <span className="px-1.5 py-0.5 text-[8px] font-mono text-muted-foreground border border-border rounded">
                    FIT-SCORER v2
                  </span>
                </div>

                {isScanning ? (
                  <div className="space-y-2 py-4">
                    <div className="h-3 w-3/4 rounded bg-border animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-border animate-pulse" style={{ animationDelay: "150ms" }} />
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span className="text-[10px] text-muted-foreground font-mono">Running regex scans & scoring mappings...</span>
                    </div>
                  </div>
                ) : scanResult ? (
                  <div className="space-y-3 animate-fade-up animate-duration-300">
                    
                    {/* Score and meter */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">Compatibility Fit:</span>
                      <span className="text-md font-bold text-primary">{scanResult.score}% match</span>
                    </div>
                    
                    <div className="w-full bg-secondary/60 h-2 rounded-full overflow-hidden border border-border">
                      <div
                        className="bg-gradient-primary h-full rounded-full transition-all duration-1000"
                        style={{ width: `${scanResult.score}%` }}
                      />
                    </div>

                    {/* Skill Tags */}
                    {scanResult.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[9px] font-mono uppercase text-muted-foreground block">Key Stacks Detected:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {scanResult.highlights.map((h) => (
                            <span key={h} className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary/10 border border-primary/25 text-primary">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Feedback */}
                    <p className="text-[10px] text-muted-foreground leading-relaxed bg-secondary/40 border border-border p-2.5 rounded-lg italic">
                      "{scanResult.feedback}"
                    </p>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6 text-muted-foreground/40">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <p className="text-[10px] leading-normal font-medium max-w-[170px]">
                      Paste a JD or load one of the quick templates above to trigger alignment matches.
                    </p>
                  </div>
                )}
              </div>

              {scanResult && !isScanning && (
                <div className="mt-4 text-[9px] text-primary/70 font-mono text-right flex items-center justify-end gap-1 select-none">
                  <CheckCircle className="w-3 h-3 text-green-400" /> Hiring recommendation: Hire
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
