import React, { useState } from "react";
import { Brain, Sparkles, Terminal, Code2, Network, ShieldCheck, Layers } from "lucide-react";

interface SkillNode {
  id: string;
  name: string;
  category: "Languages" | "AI/ML & NLP" | "Backend & Cloud" | "Frontend";
  proficiency: string;
  highlight: string;
  useCase: string;
  x: number;
  y: number;
  icon: React.ReactNode;
}

interface SkillLink {
  source: string;
  target: string;
}

const NODES: SkillNode[] = [
  {
    id: "python",
    name: "Python",
    category: "Languages",
    proficiency: "Expert · 3+ Years",
    highlight: "Primary language for model training, system scripting, and backend API work.",
    useCase: "Used across all AI projects, including Health Sense Nexus (LSTM anomaly modeling) and MediGuard.",
    x: 80,
    y: 180,
    icon: <Code2 className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "AI/ML & NLP",
    proficiency: "Advanced · Agentic Architectures",
    highlight: "Stateful orchestration of multi-agent LLM systems with loops, memory, and supervisor routing.",
    useCase: "Built MediGuard's decision agent coordinating clinical analysis across 5 sub-agents.",
    x: 230,
    y: 80,
    icon: <Brain className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "aws_bedrock",
    name: "AWS Bedrock",
    category: "Backend & Cloud",
    proficiency: "Advanced · Serverless Inference",
    highlight: "Enterprise gateway for large language models (Claude, Llama) with IAM security compliance.",
    useCase: "Connected MediGuard's agents to Anthropic Claude 3.5 Sonnet for clinical reasoning.",
    x: 400,
    y: 90,
    icon: <Brain className="w-4 h-4 text-orange-400" />,
  },
  {
    id: "pinecone",
    name: "Pinecone / RAG",
    category: "AI/ML & NLP",
    proficiency: "Expert · Semantic Search",
    highlight: "Dense vector database configurations, index tuning, metadata filtering, and semantic pipelines.",
    useCase: "Indexed 50,000+ clinical documents in MediGuard to provide grounding contexts for AI diagnoses.",
    x: 580,
    y: 120,
    icon: <Network className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI/ML & NLP",
    proficiency: "Advanced · Deep Learning",
    highlight: "Custom neural network design (LSTM, CNN), training schedules, validation checkpoints.",
    useCase: "Engineered LSTM classifier in Health Sense Nexus hitting 94% accuracy in health parameter analysis.",
    x: 200,
    y: 280,
    icon: <Sparkles className="w-4 h-4 text-violet-400" />,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend & Cloud",
    proficiency: "Expert · Asynchronous APIs",
    highlight: "High-performance Python web APIs with Pydantic validation, CORS configurations, and automated docs.",
    useCase: "Created the backend server for MediGuard & SkillSpeak AI supporting rapid client queries (<8s response).",
    x: 380,
    y: 280,
    icon: <Terminal className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: "react",
    name: "React / Next.js",
    category: "Frontend",
    proficiency: "Expert · Component Architecture",
    highlight: "Sleek user interface development, modular components, responsive layouts, and interactive state logic.",
    useCase: "Constructed the frontends for SkillSpeak AI, TownRise AI, and Aranya Organic Dairy Farm.",
    x: 540,
    y: 260,
    icon: <Code2 className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "supabase",
    name: "Supabase / SQL",
    category: "Backend & Cloud",
    proficiency: "Advanced · Serverless DB",
    highlight: "PostgreSQL databases, Edge Functions, real-time sync, and Row Level Security (RLS).",
    useCase: "Indexed real-estate indicators of 50+ Tamil Nadu cities in TownRise AI and customer carts in Aranya Dairy.",
    x: 680,
    y: 200,
    icon: <ShieldCheck className="w-4 h-4 text-orange-400" />,
  },
];

const LINKS: SkillLink[] = [
  { source: "python", target: "langgraph" },
  { source: "python", target: "tensorflow" },
  { source: "python", target: "fastapi" },
  { source: "langgraph", target: "aws_bedrock" },
  { source: "langgraph", target: "pinecone" },
  { source: "aws_bedrock", target: "fastapi" },
  { source: "pinecone", target: "supabase" },
  { source: "tensorflow", target: "fastapi" },
  { source: "fastapi", target: "react" },
  { source: "react", target: "supabase" },
  { source: "aws_bedrock", target: "react" },
];

const CATEGORIES = ["All", "AI/ML & NLP", "Backend & Cloud", "Languages", "Frontend"] as const;

export function SkillGraph() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(NODES[1]); // Default to LangGraph
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredNodes = activeCategory === "All"
    ? NODES
    : NODES.filter((n) => n.category === activeCategory);

  const isConnected = (nodeId: string) => {
    if (!selectedNode) return true;
    if (nodeId === selectedNode.id) return true;
    return LINKS.some(
      (link) =>
        (link.source === selectedNode.id && link.target === nodeId) ||
        (link.target === selectedNode.id && link.source === nodeId)
    );
  };

  const isLinkActive = (link: SkillLink) => {
    if (!selectedNode) return true;
    return link.source === selectedNode.id || link.target === selectedNode.id;
  };

  return (
    <div className="grid md:grid-cols-12 gap-6 items-stretch font-sans">
      {/* ── Neural Graph Display ── */}
      <div className="md:col-span-8 glass-premium rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl min-h-[420px] border border-white/10">
        {/* Decorative Grid BG */}
        <div className="absolute inset-0 bg-[radial-gradient(#c8a96e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Visual Header & Category filter tabs */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c8a96e] animate-pulse" />
            <span className="text-xs font-mono text-white/80 uppercase tracking-widest font-semibold">
              Skill Network Topology
            </span>
          </div>

          <div className="flex flex-wrap gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded transition-colors ${
                  activeCategory === cat
                    ? "bg-[#c8a96e] text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive SVG Canvas */}
        <div className="relative flex-1 w-full mt-4 z-10 flex items-center justify-center">
          <svg viewBox="0 0 760 360" className="w-full h-auto select-none" style={{ maxWidth: "100%" }}>
            {/* Draw Links */}
            {LINKS.map((link, idx) => {
              const sourceNode = NODES.find((n) => n.id === link.source);
              const targetNode = NODES.find((n) => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              const active = isLinkActive(link);
              const dimmed = selectedNode && !active;

              return (
                <line
                  key={idx}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={active ? "#c8a96e" : "rgba(255,255,255,0.15)"}
                  strokeWidth={active ? 2.5 : 1}
                  strokeOpacity={dimmed ? 0.08 : active ? 0.9 : 0.25}
                  className="transition-all duration-300"
                  strokeDasharray={active ? "6,6" : undefined}
                />
              );
            })}

            {/* Draw Nodes */}
            {NODES.map((node) => {
              const active = selectedNode && node.id === selectedNode.id;
              const matchesFilter = activeCategory === "All" || node.category === activeCategory;
              const dimmed = (!matchesFilter) || (selectedNode && !isConnected(node.id));
              const connected = selectedNode && isConnected(node.id) && !active;

              let nodeFill = "#38bdf8";
              if (node.category === "AI/ML & NLP") nodeFill = "#c8a96e";
              else if (node.category === "Backend & Cloud") nodeFill = "#fb923c";
              else if (node.category === "Frontend") nodeFill = "#4ade80";

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setSelectedNode(node)}
                  transform={`translate(${node.x}, ${node.y})`}
                >
                  {/* Outer pulse */}
                  <circle
                    r={active ? 22 : connected ? 15 : 10}
                    fill={active ? "rgba(200,169,110,0.15)" : "transparent"}
                    stroke={active ? "#c8a96e" : "transparent"}
                    strokeWidth={active ? 1.5 : 0}
                    className="transition-all duration-300"
                  />

                  {/* Core Node Circle */}
                  <circle
                    r={active ? 9 : 6.5}
                    fill={nodeFill}
                    opacity={dimmed ? 0.2 : 1}
                    className="transition-all duration-300 shadow-lg"
                  />

                  {/* Text label */}
                  <text
                    y={22}
                    textAnchor="middle"
                    className={`text-[10px] font-sans tracking-wide transition-all duration-300 ${
                      active
                        ? "fill-[#c8a96e] text-[11px] font-bold"
                        : dimmed
                        ? "fill-white/20"
                        : "fill-white/80 font-medium"
                    }`}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Tip */}
        <div className="text-[11px] font-mono text-white/40 select-none text-center mt-2">
          💡 Click or hover any node to inspect real-world architecture connections.
        </div>
      </div>

      {/* ── Skills Insight Terminal ── */}
      <div className="md:col-span-4 flex flex-col justify-between p-6 rounded-2xl glass-premium shadow-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4 select-none">
            <span className="p-1.5 rounded-lg bg-[#c8a96e]/15 border border-[#c8a96e]/30 text-[#c8a96e]">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-semibold text-sm text-white leading-none">Engineering Spec</h4>
              <span className="text-[10px] text-white/50 block mt-1">Production Capability Telemetry</span>
            </div>
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-[#c8a96e]/15 border border-[#c8a96e]/30 text-[10px] font-mono font-medium text-[#c8a96e] uppercase">
                  {selectedNode.category}
                </span>
                <span className="text-[11px] font-mono text-white/50">
                  {selectedNode.proficiency}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="inline-flex shrink-0 w-7 h-7 rounded-lg bg-white/5 border border-white/10 items-center justify-center">
                  {selectedNode.icon}
                </span>
                {selectedNode.name}
              </h3>

              <div className="space-y-1">
                <h5 className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-semibold">
                  Core Competency
                </h5>
                <p className="text-xs text-white/70 leading-relaxed">
                  {selectedNode.highlight}
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <h5 className="text-[10px] font-mono uppercase tracking-wider text-[#c8a96e] font-bold">
                  Production Case Study
                </h5>
                <p className="text-xs text-white/80 leading-relaxed italic">
                  "{selectedNode.useCase}"
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-white/40 text-xs">
              Select a node to inspect architecture details
            </div>
          )}
        </div>

        {/* Metrics Footer */}
        <div className="border-t border-white/10 pt-4 mt-6 flex justify-between select-none items-center text-xs">
          <div>
            <span className="text-[10px] text-white/40 block">Safety & Grounding</span>
            <span className="font-bold text-[#c8a96e]">DeepEval Benchmarked</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-white/40 block">Academic Credential</span>
            <span className="font-bold text-white">8.5 CGPA (AI & DS)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
