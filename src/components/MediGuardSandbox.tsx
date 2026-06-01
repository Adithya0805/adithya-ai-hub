import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Activity,
  Brain,
  FileText,
  Terminal,
  ArrowRight,
  AlertTriangle,
  User,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Code2,
  Play,
  Sparkles,
  RefreshCw,
  FileDown,
  Dna,
  Check,
  Smartphone,
  Eye,
  Server,
  Layers
} from "lucide-react";

// Types
interface PatientCase {
  id: string;
  name: string;
  age: number;
  gender: string;
  symptoms: string;
  vitals: {
    bp: string;
    hr: string;
    spo2: string;
    temp: string;
    resp?: string; // Optional to demonstrate dynamic filtering
  };
  medications: string[];
  allergies: string[];
}

const PATIENT_CASES: PatientCase[] = [
  {
    id: "case-a",
    name: "Adithya Kuppusamy",
    age: 28,
    gender: "Male",
    symptoms: "Acute, crushing retrosternal chest pain radiating down left arm, accompanied by sudden severe shortness of breath, heavy diaphoresis, and anxiety.",
    vitals: {
      bp: "90/60 mmHg",
      hr: "120 bpm",
      spo2: "88%",
      temp: "98.6°F",
      resp: "24 breaths/min"
    },
    medications: ["None"],
    allergies: ["None"]
  },
  {
    id: "case-b",
    name: "Chandru Subramaniam",
    age: 62,
    gender: "Male",
    symptoms: "Progressive productive cough with thick yellow sputum, persistent high fever, chest congestion, and mild fatigue for 3 days.",
    vitals: {
      bp: "130/80 mmHg",
      hr: "74 bpm",
      spo2: "97%",
      temp: "101.4°F" // Resp is missing to test dynamic "N/A" exclusion!
    },
    medications: ["Warfarin 5mg daily (Active Anticoagulant)"],
    allergies: ["Penicillin", "NSAIDs (Aspirin, Ibuprofen)"]
  }
];

const AGENT_STEPS = [
  { id: "intake", label: "Intake Nurse Agent", model: "Claude 3 Haiku", desc: "Parses patient EHR and text complaints" },
  { id: "symptom", label: "Symptom Chief Agent", model: "Claude 3.5 Sonnet", desc: "Analyzes timelines and flags emergency bypasses" },
  { id: "diagnosis", label: "Diagnosis Research Head", model: "Claude 3.5 Sonnet", desc: "Runs RAG semantic database lookup (50k+ papers)" },
  { id: "drug", label: "Pharmacist Specialist", model: "Claude 3 Haiku", desc: "Cross-checks chemical, drug & allergy hazards" },
  { id: "report", label: "Transcriptionist Agent", model: "Claude 3.5 Sonnet", desc: "Compiles ICD-10 codings & HL7 FHIR standards" }
];

const BATTLES = [
  {
    id: "cors-blocking",
    title: "1. The CORS & ISP Blocking Victory",
    error: "FastAPI server deployed on Railway worked perfectly, but direct browser connections were frequently blackholed/blocked by ISP DNS overrides (like JioFiber DNS), showing a generic 'Site Can't Be Reached' error.",
    strategy: "Implemented a robust Edge Rewrite Proxy in Vercel. Instead of connecting direct to Railway, the client sends requests to its own Vercel host under /api/v1/, which proxies transparently to Railway at the CDN edge.",
    victory: "CORS and DNS overrides are completely bypassed! Secure and clean browser traffic flows smoothly.",
    before: `// Before: Direct browser-to-backend fetch vulnerable to DNS overrides
const API_URL = "https://mediguard-v2-production.up.railway.app";
const response = await fetch(\`\${API_URL}/api/v1/auth/me\`, {
  headers: { "Content-Type": "application/json" }
});`,
    after: `// After: Vercel Global Edge Reverse-Proxy (vercel.json)
{
  "rewrites": [
    {
      "source": "/api/v1/:path*",
      "destination": "https://mediguard-v2-production.up.railway.app/api/v1/:path*"
    }
  ]
}`
  },
  {
    id: "route-precedence",
    title: "2. The Vercel Routing Conflict Bug",
    error: "Adding Vercel rewrites to /api/:path* hijacked local Vercel API routes and internal application page assets, leading to bizarre 404 NOT_FOUND page collapses.",
    strategy: "Tightened the edge rewrite rule to specifically match /api/v1/:path* instead of the generic wildcard /api/:path*, separating the Railway clinical engine traffic from Vercel's internal directory routes.",
    victory: "Vercel cleanly distinguishes internal React assets from external clinical API queries, stabilizing routing.",
    before: `// Before: Broad rewrite rule intercepts Next.js pages/endpoints
{
  "source": "/api/:path*",
  "destination": "https://mediguard-v2-production.up.railway.app/api/:path*"
}`,
    after: `// After: Specific namespace isolating external clinical engines
{
  "source": "/api/v1/:path*",
  "destination": "https://mediguard-v2-production.up.railway.app/api/v1/:path*"
}`
  },
  {
    id: "token-sync",
    title: "3. The authStore Token Desync Lockout",
    error: "Logging in returned a valid JWT token, but the subsequent clinician profile fetch immediately crashed with a 401 Unauthorized block because Zustand was reading stale cookies/localStorage before saving complete.",
    strategy: "Updated Zustand async store functions to write JWT keys synchronously to localStorage FIRST, then updated client interceptors to ensure headers fetch fresh keys rather than caching stale memory references.",
    victory: "Zero-latency dashboard logins. One click provides automated authentication synchrony.",
    before: `// Before: Interceptor runs immediately while Zustand is asynchronously writing key
axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; // Async state lagging
  config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});`,
    after: `// After: Direct synchronous LocalStorage lookup for fresh token write
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("mediguard_auth_token");
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});`
  },
  {
    id: "pdf-auth",
    title: "4. The window.open PDF Tab Auth Barrier",
    error: "Clicking 'Download Report' opened a new browser tab via window.open, but threw a 401 Unauthorized error since new browser tabs do not carry standard custom axios authorization headers.",
    strategy: "Appended JWT authorization securely as a transient query string token parameter (?token=...) to the PDF window endpoint, and modified the FastAPI dependencies.py to validate tokens from query params when Authorization headers are missing.",
    victory: "Physicians download visual PDF logs instantly with one secure click across tabs.",
    before: `// Before: FastAPI strictly required a Bearer header (fails in new tab)
def verify_clinical_auth(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return parse_jwt(authorization.split(" ")[1])`,
    after: `// After: Dual-Authorization validator supporting both Header & Query params
def verify_clinical_auth(
    authorization: Optional[str] = Header(None),
    token: Optional[str] = Query(None)
):
    jwt_token = None
    if authorization and authorization.startswith("Bearer "):
        jwt_token = authorization.split(" ")[1]
    elif token:
        jwt_token = token
        
    if not jwt_token:
        raise HTTPException(status_code=401, detail="Missing auth token")
    return parse_jwt(jwt_token)`
  },
  {
    id: "vitals-clutter",
    title: "5. The Hardcoded 'N/A' PDF Layout Clutter",
    error: "Optional clinical measurements (like Respiration or Temp) rendered ugly 'N/A bpm', 'N/A mmHg' labels, cluttering critical medical forms and creating a messy layout in generated PDFs.",
    strategy: "Implemented a dynamic schema parser in both the React UI and ReportLab PDF compilers on the backend. It evaluates the key values, dynamically excluding missing items while rendering fluid layouts without empty rows.",
    victory: "Beautiful, dynamic, patient-specific visual reports tailored only to clinical records captured.",
    before: `// Before: Hardcoded report structure printing placeholder rows
const vitalsRows = [
  \`Blood Pressure: \${vitals.bp || 'N/A'}\`,
  \`Respiration: \${vitals.resp || 'N/A'}\`,
  \`Temperature: \${vitals.temp || 'N/A'}\`
];`,
    after: `// After: Filtered parameters ensuring dynamic rendering
const activeVitals = Object.entries(vitals)
  .filter(([_, val]) => val && val.trim() !== "" && val !== "N/A")
  .map(([key, val]) => ({
    label: key.toUpperCase(),
    value: val
  }));
// Renders only active vitals; displays clean fallback if empty.`
  },
  {
    id: "race-condition",
    title: "6. The Aborted Intake Request Race Condition",
    error: "Hitting 'Initiate Analysis' registered the patient session but sometimes failed to trigger the pipeline (leaving it stuck in 'Pending') because client-side SPA routing unmounted the form and aborted the fetch call midway.",
    strategy: "Optimized the backend to return an instantaneous 202 Accepted triage handshake response in <50ms. The frontend awaits this handshake before navigating, then runs a background fetch state hook on mount in the tracker dashboard.",
    victory: "100% reliable multi-agent execution pipeline triggers without client interruption.",
    before: `// Before: Trigger and navigate instantly (SPA unmounts active request)
const handleSubmit = () => {
  api.post("/analyze", formData); // request aborted on unmount
  router.push("/cases");
};`,
    after: `// After: Handshake check before navigation + background fetch synchronization
const handleSubmit = async () => {
  setLoading(true);
  const res = await api.post("/initiate-triage", patientData); // Fast 202 Handshake
  if (res.status === 202) {
    router.push(\`/cases/\${res.data.caseId}?autoTrigger=true\`);
  }
};`
  }
];

export function MediGuardSandbox() {
  const [activeTab, setActiveTab] = useState<"simulator" | "battles">("simulator");
  
  // Simulator states
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-a");
  const [simulationState, setSimulationState] = useState<"idle" | "running" | "completed">("idle");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeResultTab, setActiveResultTab] = useState<"ddx" | "pdf" | "fhir">("ddx");
  
  // Battle states
  const [selectedBattleId, setSelectedBattleId] = useState<string>("cors-blocking");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  // Selected case helper
  const patient = PATIENT_CASES.find((c) => c.id === selectedCaseId) || PATIENT_CASES[0];

  // Auto scroll console logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Run the multi-agent clinical simulation
  const runSimulation = () => {
    setSimulationState("running");
    setActiveStepIndex(0);
    setLogs([]);
    
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const execute = async () => {
      // Step 1: Intake
      setLogs((l) => [...l, `[SYSTEM] 0.00s — Connection secured via Vercel Edge CDN proxy.`]);
      await delay(400);
      setLogs((l) => [...l, `[SYSTEM] 0.05s — Route verified: /api/v1/sessions/initiate`]);
      await delay(400);
      setLogs((l) => [...l, `[SUPERVISOR] 0.12s — Received triage record. Parsing demographics...`]);
      await delay(500);
      setLogs((l) => [
        ...l,
        `[INTAKE AGENT] 0.85s — DEMOGRAPHICS: Name: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}.`
      ]);
      await delay(500);
      setLogs((l) => [
        ...l,
        `[INTAKE AGENT] 1.30s — VITALS CAPTURED: ${Object.entries(patient.vitals)
          .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
          .join(" | ")}.`
      ]);
      
      // Highlight Dynamic Vitals exclusion
      if (selectedCaseId === "case-b") {
        await delay(550);
        setLogs((l) => [
          ...l,
          `ℹ️ [INTAKE AGENT] 1.60s — NOTE: RESPIRATORY measurement not entered. Dynamically excluded from PDF schemas (exhibiting Victory #5).`
        ]);
      }
      
      // Step 2: Symptom Assessment
      await delay(600);
      setActiveStepIndex(1);
      setLogs((l) => [...l, `[SUPERVISOR] 2.10s — Intake complete. Passing context to Symptom Chief Agent.`]);
      await delay(600);
      setLogs((l) => [
        ...l,
        `[SYMPTOM AGENT] 2.70s — Analyzing complaint details: "${patient.symptoms.substring(0, 50)}..."`
      ]);
      
      if (selectedCaseId === "case-a") {
        await delay(700);
        setLogs((l) => [
          ...l,
          `🚨 [SYMPTOM AGENT] 3.20s — CRITICAL ALERT! Crushing chest pain combined with hypoxia (SpO2 ${patient.vitals.spo2}) detected.`
        ]);
        await delay(500);
        setLogs((l) => [
          ...l,
          `⚡ [SYMPTOM AGENT] 3.50s — EMERGENCY BYPASS PROTOCOL TRIGGERED. Fast-tracking diagnostic vectors bypassing standard queues.`
        ]);
      } else {
        await delay(700);
        setLogs((l) => [
          ...l,
          `[SYMPTOM AGENT] 3.20s — Case classified: Stable respiratory disorder. Sub-acute timeline (3 days). Continuing default supervisor loop.`
        ]);
      }

      // Step 3: Diagnosis RAG
      await delay(700);
      setActiveStepIndex(2);
      setLogs((l) => [...l, `[SUPERVISOR] 4.10s — Routing to Diagnosis Research Head for literature checks.`]);
      await delay(600);
      setLogs((l) => [
        ...l,
        `[DIAGNOSIS AGENT] 4.70s — Constructing dense queries. Querying Pinecone Vector Index (50,000+ medical journals and guidelines)...`
      ]);
      await delay(800);
      setLogs((l) => [
        ...l,
        `[DIAGNOSIS AGENT] 5.50s — RAG RESULTS: Found 3 relevant clinical matching guidelines with relevance score > 92%. prioritizing differential diagnoses.`
      ]);

      // Step 4: Drug Specialist
      await delay(700);
      setActiveStepIndex(3);
      setLogs((l) => [...l, `[SUPERVISOR] 6.10s — Querying Drug Specialist Agent with active statements & allergies.`]);
      await delay(600);
      setLogs((l) => [
        ...l,
        `[DRUG SPECIALIST] 6.60s — Checking allergy profile [${patient.allergies.join(", ")}] against proposed therapies.`
      ]);
      
      if (selectedCaseId === "case-b") {
        await delay(800);
        setLogs((l) => [
          ...l,
          `⚠️ [DRUG SPECIALIST] 7.20s — CONTRAINDICATION ALERT! Active medication Warfarin has high bleeding hazards with common NSAIDs (Aspirin, Ibuprofen). Penicillin allergy blocks default antibiotic therapy.`
        ]);
        await delay(700);
        setLogs((l) => [
          ...l,
          `💡 [DRUG SPECIALIST] 7.80s — PHARMACOLOGICAL RECOMMENDATION: Override default treatment. Suggest alternative Macrolide (Azithromycin 500mg) and non-NSAID antipyretics (Acetaminophen 650mg).`
        ]);
      } else {
        await delay(800);
        setLogs((l) => [
          ...l,
          `[DRUG SPECIALIST] 7.20s — No active medications or allergies reported. Proposed clinical drugs cleared for administration.`
        ]);
      }

      // Step 5: Report Agent
      await delay(800);
      setActiveStepIndex(4);
      setLogs((l) => [...l, `[SUPERVISOR] 8.50s — Pipeline routing to final Transcriptionist Agent.`]);
      await delay(700);
      setLogs((l) => [
        ...l,
        `[REPORT AGENT] 9.10s — Compiling ICD-10 medical codings. Generating visual PDF formatting.`
      ]);
      await delay(500);
      setLogs((l) => [
        ...l,
        `[REPORT AGENT] 9.40s — Constructing HL7 FHIR R4 standard JSON composition bundle.`
      ]);
      await delay(500);
      setLogs((l) => [...l, `[SYSTEM] 9.80s — Session state pushed to Supabase audit log. File generated.`]);
      await delay(300);
      setLogs((l) => [...l, `✨ [SYSTEM] 10.00s — MULTI-AGENT STATE GRAPH PIPELINE COMPLETE (Processed in 10s).`]);
      
      setActiveStepIndex(5);
      setSimulationState("completed");
    };

    execute();
  };

  const resetSimulation = () => {
    setSimulationState("idle");
    setActiveStepIndex(-1);
    setLogs([]);
  };

  const activeBattle = BATTLES.find((b) => b.id === selectedBattleId) || BATTLES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeBattle.after);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="mt-8 border-t border-border/80 pt-8 select-none font-sans max-w-full overflow-hidden">
      {/* Tab Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary animate-pulse" />
            MediGuard V2 Workspace Console
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Test the live multi-agent simulation or explore the engineering chronicle.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex rounded-xl bg-secondary/80 p-0.5 border border-border">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "simulator"
                ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Multi-Agent Triage Simulator
          </button>
          <button
            onClick={() => setActiveTab("battles")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "battles"
                ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Chronicle of Debugging Battles
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── TAB 1: MULTI-AGENT TRIAGE SIMULATOR ────────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "simulator" && (
        <div className="space-y-6 animate-fade-up animate-duration-300">
          
          {/* Top Panel: Patient profiles selection */}
          <div className="grid md:grid-cols-3 gap-4">
            
            {/* Left Column: Selector */}
            <div className="md:col-span-1 space-y-3">
              <label className="block text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest">
                Select Patient Triage Record
              </label>
              
              <div className="space-y-2">
                {PATIENT_CASES.map((pc) => (
                  <button
                    key={pc.id}
                    onClick={() => {
                      if (simulationState !== "running") {
                        setSelectedCaseId(pc.id);
                        resetSimulation();
                      }
                    }}
                    disabled={simulationState === "running"}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between min-h-[100px] ${
                      selectedCaseId === pc.id
                        ? "bg-primary/5 border-primary text-foreground shadow-[0_0_15px_rgba(6,182,212,0.12)]"
                        : "bg-card hover:bg-secondary/40 border-border hover:border-muted-foreground/30 text-muted-foreground disabled:opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary" />
                        {pc.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">
                        {pc.id === "case-a" ? "🚨 Emergency" : "⚠️ Complex"}
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                      "{pc.symptoms}"
                    </p>

                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border/50 text-[10px] font-mono text-muted-foreground">
                      <span>Age: {pc.age}</span>
                      <span>•</span>
                      <span>Gender: {pc.gender}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-2">
                {simulationState === "idle" && (
                  <button
                    onClick={runSimulation}
                    className="w-full py-3 rounded-xl bg-gradient-primary hover:opacity-95 text-primary-foreground text-xs font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Initiate AI Clinical Analysis
                  </button>
                )}

                {simulationState === "running" && (
                  <div className="w-full py-3 rounded-xl bg-secondary/50 border border-border text-xs font-semibold text-muted-foreground flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                    Pipeline Running (10s)...
                  </div>
                )}

                {simulationState === "completed" && (
                  <button
                    onClick={resetSimulation}
                    className="w-full py-3 rounded-xl border border-primary/40 hover:border-primary text-primary bg-primary/5 hover:bg-primary/10 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Simulation Workspace
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Dynamic Agent Stepper Workflow */}
            <div className="md:col-span-2 glass border border-border/80 bg-secondary/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest flex items-center gap-1.5 mb-3.5">
                  <Brain className="w-4 h-4 text-accent animate-pulse" />
                  LangGraph Active State Topology
                </span>

                {/* 5 Nodes Stepper */}
                <div className="grid grid-cols-5 gap-2 relative mt-4">
                  {/* Background connecting bar */}
                  <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-border/60 z-0" />
                  
                  {AGENT_STEPS.map((step, idx) => {
                    const isActive = activeStepIndex === idx;
                    const isCompleted = activeStepIndex > idx || activeStepIndex === 5;
                    return (
                      <div key={step.id} className="flex flex-col items-center text-center z-10">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-500 relative ${
                            isActive
                              ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(6,182,212,0.65)] scale-110"
                              : isCompleted
                              ? "bg-green-500/20 border-green-500 text-green-400"
                              : "bg-card border-border text-muted-foreground"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-60" />
                          )}
                          {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className="text-[10px] font-bold text-foreground mt-2 block truncate w-full px-1">
                          {step.id.toUpperCase()}
                        </span>
                        <span className="text-[8px] text-muted-foreground block truncate w-full font-mono">
                          {step.model.split(" ")[1] || step.model}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Step Detailed Card */}
                <div className="mt-5 p-3 rounded-xl border border-border bg-card/60">
                  {activeStepIndex >= 0 && activeStepIndex < 5 ? (
                    <div className="flex items-start gap-3 animate-fade-up animate-duration-200">
                      <span className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary mt-0.5">
                        {activeStepIndex === 0 && <User className="w-4 h-4" />}
                        {activeStepIndex === 1 && <Activity className="w-4 h-4" />}
                        {activeStepIndex === 2 && <Dna className="w-4 h-4" />}
                        {activeStepIndex === 3 && <AlertTriangle className="w-4 h-4" />}
                        {activeStepIndex === 4 && <FileText className="w-4 h-4" />}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-foreground">
                          Active Agent: {AGENT_STEPS[activeStepIndex].label}
                        </h5>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          {AGENT_STEPS[activeStepIndex].desc}
                        </p>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-secondary text-primary border border-border mt-2 inline-block">
                          Model Core: {AGENT_STEPS[activeStepIndex].model}
                        </span>
                      </div>
                    </div>
                  ) : activeStepIndex === 5 ? (
                    <div className="flex items-start gap-3 animate-fade-up">
                      <span className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-green-400">LangGraph Pipeline Completed!</h5>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal">
                          Relational variables saved and structured PDF & HL7 FHIR formats compiled with 100% telemetry traces in LangSmith.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-4 text-muted-foreground/60 text-xs">
                      Select a patient record and click "Initiate AI Clinical Analysis" to activate the agent state loop.
                    </div>
                  )}
                </div>
              </div>

              {/* Console log outputs */}
              <div className="mt-4 border border-border/80 bg-[#0c1015] rounded-xl p-3.5 h-[140px] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border/40 pb-1.5 mb-2 shrink-0">
                  <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-1">
                    <Terminal className="w-3 h-3 animate-pulse" />
                    LIVE PIPELINE CONSOLE LOGS
                  </span>
                  <span className="text-[8px] font-mono text-muted-foreground">SUPABASE_STREAM // ACTIVE</span>
                </div>
                
                <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1 pr-1 custom-scrollbar">
                  {logs.length > 0 ? (
                    logs.map((log, i) => {
                      let color = "text-muted-foreground";
                      if (log.startsWith("🚨") || log.includes("CRITICAL")) color = "text-red-400 font-bold";
                      else if (log.startsWith("⚠️") || log.includes("CONTRAINDICATION")) color = "text-amber-400 font-bold";
                      else if (log.startsWith("✨") || log.includes("COMPLETE")) color = "text-green-400 font-bold";
                      else if (log.startsWith("💡") || log.includes("RECOMMENDATION")) color = "text-cyan-400";
                      else if (log.startsWith("ℹ️")) color = "text-blue-400";
                      else if (log.includes("[SUPERVISOR]")) color = "text-purple-400";
                      else if (log.includes("[SYSTEM]")) color = "text-neutral-500";
                      
                      return (
                        <div key={i} className={`leading-normal ${color}`}>
                          {log}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-neutral-600 italic py-6 text-center">
                      Waiting for telemetry initialization stream...
                    </div>
                  )}
                  <div ref={consoleEndRef} />
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Panel: Tabbed Outputs (PDF / FHIR / Differential Diagnoses) */}
          {simulationState === "completed" && (
            <div className="border border-border/80 bg-secondary/5 rounded-2xl p-5 animate-fade-up animate-duration-500">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-3 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary" />
                    Generated Clinical Compositions
                  </h4>
                  <p className="text-[10px] text-muted-foreground">Review the differential diagnosis outputs and export structures.</p>
                </div>
                
                {/* Result selector */}
                <div className="flex rounded-lg bg-secondary p-0.5 border border-border">
                  <button
                    onClick={() => setActiveResultTab("ddx")}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                      activeResultTab === "ddx" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    Differential Diagnoses (DDx)
                  </button>
                  <button
                    onClick={() => setActiveResultTab("pdf")}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                      activeResultTab === "pdf" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    Visual PDF Form Preview
                  </button>
                  <button
                    onClick={() => setActiveResultTab("fhir")}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                      activeResultTab === "fhir" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                  >
                    HL7 FHIR R4 JSON
                  </button>
                </div>
              </div>

              {/* Dynamic Content */}
              {activeResultTab === "ddx" && (
                <div className="space-y-4 animate-fade-up">
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border font-bold">
                          <th className="p-3">Rank</th>
                          <th className="p-3">Differential Diagnosis</th>
                          <th className="p-3">Confidence</th>
                          <th className="p-3">Supporting Arguments</th>
                          <th className="p-3">Recommended Diagnostics</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {selectedCaseId === "case-a" ? (
                          <>
                            <tr className="hover:bg-secondary/20 transition-all">
                              <td className="p-3 font-bold text-red-400">#1</td>
                              <td className="p-3 font-semibold">Acute Coronary Syndrome (ACS) / STEMI</td>
                              <td className="p-3 font-mono text-primary font-bold">96%</td>
                              <td className="p-3 text-muted-foreground leading-relaxed">
                                Retrosternal crushing chest pain radiating to left arm. Accompanying diaphoresis and hypoxemic distress.
                              </td>
                              <td className="p-3 text-muted-foreground font-mono">12-Lead ECG, Serum Troponin T/I, Coronary Angiography</td>
                            </tr>
                            <tr className="hover:bg-secondary/20 transition-all">
                              <td className="p-3 font-bold text-amber-500">#2</td>
                              <td className="p-3 font-semibold">Acute Pulmonary Embolism (PE)</td>
                              <td className="p-3 font-mono text-primary">68%</td>
                              <td className="p-3 text-muted-foreground leading-relaxed">
                                Sudden severe shortness of breath, acute chest pain, hypoxemia (SpO2 88%), and marked sinus tachycardia (HR 120).
                              </td>
                              <td className="p-3 text-muted-foreground font-mono">D-Dimer assay, CT Pulmonary Angiography (CTPA)</td>
                            </tr>
                            <tr className="hover:bg-secondary/20 transition-all">
                              <td className="p-3 font-bold text-neutral-400">#3</td>
                              <td className="p-3 font-semibold">Aortic Dissection</td>
                              <td className="p-3 font-mono text-primary">45%</td>
                              <td className="p-3 text-muted-foreground leading-relaxed">
                                Severe sudden chest pain. Severe tachycardia and borderline hypoxemia. Requires urgent ruling out.
                              </td>
                              <td className="p-3 text-muted-foreground font-mono">Chest CT Contrast, Transesophageal Echocardiogram (TEE)</td>
                            </tr>
                          </>
                        ) : (
                          <>
                            <tr className="hover:bg-secondary/20 transition-all">
                              <td className="p-3 font-bold text-primary">#1</td>
                              <td className="p-3 font-semibold">Community-Acquired Bacterial Pneumonia</td>
                              <td className="p-3 font-mono text-primary font-bold">89%</td>
                              <td className="p-3 text-muted-foreground leading-relaxed">
                                Productive cough with yellow sputum, persistent high fever (101.4°F), and chest congestion. Age 62 increases susceptibility.
                              </td>
                              <td className="p-3 text-muted-foreground font-mono">Chest X-Ray, Sputum Culture, CBC, Sputum Gram Stain</td>
                            </tr>
                            <tr className="hover:bg-secondary/20 transition-all">
                              <td className="p-3 font-bold text-neutral-400">#2</td>
                              <td className="p-3 font-semibold">Acute Bronchitis</td>
                              <td className="p-3 font-mono text-primary">70%</td>
                              <td className="p-3 text-muted-foreground leading-relaxed">
                                Productive cough, chest congestion, fever, and bronchial irritation. Generally self-limiting but requires observation.
                              </td>
                              <td className="p-3 text-muted-foreground font-mono">Clinical evaluation, Pulse Oximetry monitoring</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Simulated PDF Form Preview */}
              {activeResultTab === "pdf" && (
                <div className="bg-[#12161a]/90 border border-border p-6 rounded-xl font-sans max-w-2xl mx-auto shadow-2xl relative text-slate-200 animate-fade-up">
                  {/* Decorative background grids representing ECG watermark */}
                  <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

                  {/* Header */}
                  <div className="border-b-2 border-primary pb-4 mb-5 flex justify-between items-start relative z-10">
                    <div>
                      <h2 className="text-base font-extrabold text-primary flex items-center gap-1.5 tracking-wide">
                        <Shield className="w-4.5 h-4.5 text-primary" />
                        MEDIGUARD V2 CDSS COMPOSITION
                      </h2>
                      <p className="text-[9px] font-mono text-muted-foreground mt-0.5">
                        Generated by Multi-Agent Engine v2.0.4 // HIPAA Compliant Record
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 text-[8px] font-bold rounded bg-primary/10 text-primary border border-primary/30">
                        {patient.id === "case-a" ? "🚨 CRITICAL TRIAGE BYPASS" : "📋 WORKFLOW NORMAL"}
                      </span>
                      <p className="text-[9px] font-mono text-muted-foreground mt-1">Ref: {patient.id.toUpperCase()}-79A5</p>
                    </div>
                  </div>

                  {/* Patient Data Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-secondary/35 border border-border/80 p-4 rounded-lg mb-4 text-[11px] relative z-10">
                    <div>
                      <span className="text-[8px] font-mono text-muted-foreground uppercase block">Patient Name:</span>
                      <span className="font-bold text-foreground">{patient.name}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-muted-foreground uppercase block">Age / Gender:</span>
                      <span>{patient.age} Yrs / {patient.gender}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-muted-foreground uppercase block">Allergies:</span>
                      <span className={patient.allergies[0] !== "None" ? "text-red-400 font-bold" : "text-slate-300"}>
                        {patient.allergies.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-muted-foreground uppercase block">Home Meds:</span>
                      <span className="truncate block max-w-full font-mono text-[10px]">{patient.medications[0]}</span>
                    </div>
                  </div>

                  {/* Vitals Section - Dynamic Filtering Proof */}
                  <div className="mb-5 relative z-10">
                    <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-2 border-b border-border/40 pb-1">
                      Physiological Vitals Summary
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(patient.vitals)
                        .filter(([_, val]) => val && val.trim() !== "" && val !== "N/A")
                        .map(([k, v]) => (
                          <div key={k} className="px-3 py-1.5 rounded bg-secondary/40 border border-border text-center min-w-[70px]">
                            <span className="text-[8px] font-mono text-muted-foreground uppercase block">{k}</span>
                            <span className="text-xs font-bold text-foreground font-mono">{v}</span>
                          </div>
                        ))}
                    </div>
                    {/* Excluded vitals list check */}
                    {patient.id === "case-b" && (
                      <p className="text-[9px] text-muted-foreground italic mt-2 flex items-center gap-1 bg-primary/5 p-1 px-2 rounded border border-primary/10">
                        <Check className="w-3 h-3 text-green-400 shrink-0" />
                        Dynamic Vitals Filtering active: Excluded 'RESPIRATORY' as no baseline vitals were recorded.
                      </p>
                    )}
                  </div>

                  {/* Drug Warnings */}
                  {patient.id === "case-b" && (
                    <div className="mb-5 p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-[11px] relative z-10 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-red-400 block mb-0.5">⚠️ PHARMACOLOGICAL HAZARD ALERT DETECTED</span>
                        <p className="text-muted-foreground leading-normal">
                          Patient is allergic to Penicillin. Home medication <strong className="text-slate-200">Warfarin</strong> exhibits severe drug-drug interactions with recommended NSAIDs. System override active: Prescribed alternative Macrolide therapy.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Differential Diagnoses */}
                  <div className="mb-5 relative z-10">
                    <h4 className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider mb-2 border-b border-border/40 pb-1">
                      Differential Diagnoses Map
                    </h4>
                    <div className="space-y-2">
                      {patient.id === "case-a" ? (
                        <div className="flex justify-between items-center text-xs p-2 rounded bg-red-500/10 border border-red-500/20">
                          <span className="font-bold text-foreground flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            #1 Acute Coronary Syndrome (ACS) / STEMI
                          </span>
                          <span className="font-mono text-red-400 font-bold">96% Match</span>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center text-xs p-2 rounded bg-primary/10 border border-primary/20">
                          <span className="font-bold text-foreground">
                            #1 Community-Acquired Bacterial Pneumonia
                          </span>
                          <span className="font-mono text-primary font-bold">89% Match</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom validation signature */}
                  <div className="border-t border-border/60 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono relative z-10">
                    <span className="text-muted-foreground">Validated securely via digital signature parameters</span>
                    <span className="text-foreground border-b border-dashed border-border px-4 py-0.5 font-bold italic">
                      MD. Adithya AI-CDSS
                    </span>
                  </div>
                </div>
              )}

              {/* HL7 FHIR JSON Output */}
              {activeResultTab === "fhir" && (
                <div className="bg-[#0b0e12] border border-border rounded-xl p-4 font-mono text-xs max-h-[300px] overflow-y-auto custom-scrollbar animate-fade-up">
                  <pre className="text-neutral-300">
                    <code>
                      <span className="text-purple-400">{"{"}</span>
                      {"\n  "}
                      <span className="text-amber-400">"resourceType"</span>: <span className="text-emerald-400">"Bundle"</span>,
                      {"\n  "}
                      <span className="text-amber-400">"id"</span>: <span className="text-emerald-400">"mediguard-composition-fhir-r4"</span>,
                      {"\n  "}
                      <span className="text-amber-400">"type"</span>: <span className="text-emerald-400">"document"</span>,
                      {"\n  "}
                      <span className="text-amber-400">"entry"</span>: <span className="text-purple-400">[</span>
                      {"\n    "}
                      <span className="text-purple-400">{"{"}</span>
                      {"\n      "}
                      <span className="text-amber-400">"resource"</span>: <span className="text-purple-400">{"{"}</span>
                      {"\n        "}
                      <span className="text-amber-400">"resourceType"</span>: <span className="text-emerald-400">"Composition"</span>,
                      {"\n        "}
                      <span className="text-amber-400">"status"</span>: <span className="text-emerald-400">"final"</span>,
                      {"\n        "}
                      <span className="text-amber-400">"subject"</span>: <span className="text-purple-400">{"{"}</span>
                      {"\n          "}
                      <span className="text-amber-400">"reference"</span>: <span className="text-emerald-400">"Patient/{patient.id}"</span>,
                      {"\n          "}
                      <span className="text-amber-400">"display"</span>: <span className="text-emerald-400">"{patient.name}"</span>
                      {"\n        "}
                      <span className="text-purple-400">{"}"}</span>,
                      {"\n        "}
                      <span className="text-amber-400">"date"</span>: <span className="text-emerald-400">"2026-06-01T11:58:00+05:30"</span>,
                      {"\n        "}
                      <span className="text-amber-400">"title"</span>: <span className="text-emerald-400">"Clinical Triage Composition"</span>,
                      {"\n        "}
                      <span className="text-amber-400">"section"</span>: <span className="text-purple-400">[</span>
                      {"\n          "}
                      <span className="text-purple-400">{"{"}</span>
                      {"\n            "}
                      <span className="text-amber-400">"title"</span>: <span className="text-emerald-400">"Chief Complaints"</span>,
                      {"\n            "}
                      <span className="text-amber-400">"text"</span>: <span className="text-purple-400">{"{"}</span>
                      {"\n              "}
                      <span className="text-amber-400">"status"</span>: <span className="text-emerald-400">"generated"</span>,
                      {"\n              "}
                      <span className="text-amber-400">"div"</span>: <span className="text-emerald-400">"&lt;div&gt;{patient.symptoms}&lt;/div&gt;"</span>
                      {"\n            "}
                      <span className="text-purple-400">{"}"}</span>
                      {"\n          "}
                      <span className="text-purple-400">{"}"}</span>
                      {"\n        "}
                      <span className="text-purple-400">]</span>
                      {"\n      "}
                      <span className="text-purple-400">{"}"}</span>
                      {"\n    "}
                      <span className="text-purple-400">{"}"}</span>
                      {"\n  "}
                      <span className="text-purple-400">]</span>
                      {"\n"}
                      <span className="text-purple-400">{"}"}</span>
                    </code>
                  </pre>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── TAB 2: CHRONICLE OF DEBUGGING BATTLES ───────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === "battles" && (
        <div className="space-y-5 animate-fade-up animate-duration-300">
          
          <div className="grid md:grid-cols-3 gap-5">
            
            {/* Left Sidebar - Battle Buttons */}
            <div className="md:col-span-1 space-y-2 max-h-[350px] overflow-y-auto pr-1 border-r border-border/40 custom-scrollbar">
              {BATTLES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBattleId(b.id);
                    setCopiedCode(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold leading-normal transition-all duration-200 ${
                    selectedBattleId === b.id
                      ? "bg-primary/10 border-primary text-foreground shadow-sm"
                      : "bg-card hover:bg-secondary/40 border-border hover:border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {b.title}
                </button>
              ))}
            </div>

            {/* Right Display - Battle Detail Pane */}
            <div className="md:col-span-2 space-y-4">
              
              {/* Battle Header */}
              <div className="p-4 bg-[#1b1010]/30 border border-red-500/20 rounded-xl space-y-2">
                <h5 className="text-xs font-bold font-mono text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4.5 h-4.5" />
                  THE PROBLEM BOTTLENECK
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {activeBattle.error}
                </p>
              </div>

              <div className="p-4 bg-[#101b15]/30 border border-green-500/20 rounded-xl space-y-2">
                <h5 className="text-xs font-bold font-mono text-green-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  THE ENGINEERING STRATEGY & VICTORY
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {activeBattle.strategy}
                </p>
                <div className="pt-2 border-t border-green-500/10 text-[10px] text-green-400 font-bold flex items-center gap-1">
                  ⚔️ Result: {activeBattle.victory}
                </div>
              </div>

              {/* Code Editor Preview */}
              <div className="border border-border/80 bg-[#0e1115] rounded-xl overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center bg-[#161a20] px-4 py-2 border-b border-border/80 shrink-0">
                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-primary" />
                    ARCHITECTURE SPECIFICATION FILE
                  </span>
                  
                  <button
                    onClick={handleCopyCode}
                    className="text-[10px] px-2.5 py-1 rounded bg-secondary hover:bg-secondary-foreground hover:text-secondary text-muted-foreground transition-all flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-green-400" /> : <FileDown className="w-3 h-3" />}
                    {copiedCode ? "Copied Victory" : "Copy Solution"}
                  </button>
                </div>

                {/* Split pane for Code comparisons */}
                <div className="grid md:grid-cols-2 divide-x divide-border/60 text-[10px] font-mono leading-relaxed h-[200px] overflow-y-auto custom-scrollbar">
                  
                  {/* Before */}
                  <div className="p-3 bg-[#1e0f0f]/40">
                    <div className="text-[8px] font-bold text-red-400 uppercase tracking-widest mb-2 border-b border-red-500/10 pb-1">
                      🛑 ORIGINAL FAILED CODE
                    </div>
                    <pre className="text-neutral-400 select-text whitespace-pre-wrap">
                      <code>{activeBattle.before}</code>
                    </pre>
                  </div>

                  {/* After */}
                  <div className="p-3 bg-[#0f1e14]/40">
                    <div className="text-[8px] font-bold text-green-400 uppercase tracking-widest mb-2 border-b border-green-500/10 pb-1">
                      ✅ REFINED PRODUCTION RESOLUTION
                    </div>
                    <pre className="text-emerald-300/90 select-text whitespace-pre-wrap">
                      <code>{activeBattle.after}</code>
                    </pre>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
