import React, { useState } from "react";
import { Brain, Sparkles, Terminal, Code2, Network, ShieldCheck } from "lucide-react";

interface SkillNode {
  id: string;
  name: string;
  category: string;
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
    useCase: "Used across all 7 AI projects, including Health Sense Nexus (LSTM anomaly modeling) and MediGuard.",
    x: 80,
    y: 180,
    icon: <Code2 className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "AI/ML & NLP",
    proficiency: "Advanced · Agentic Architectures",
    highlight: "Stateful orchestration of multi-agent LLM systems with loops, memory, and routing.",
    useCase: "Built MediGuard's decision agent coordinating medical summary analysis across multiple sub-agents.",
    x: 230,
    y: 80,
    icon: <Brain className="w-4 h-4 text-violet-400" />,
  },
  {
    id: "aws_bedrock",
    name: "AWS Bedrock",
    category: "Backend & Cloud",
    proficiency: "Advanced · Serverless Inference",
    highlight: "Enterprise gateway for large language models (Claude, Llama) with IAM security compliance.",
    useCase: "Connected MediGuard's agents to Anthropic Claude 3.5 Sonnet to analyze medical logs securely.",
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
    useCase: "Constructed the frontends for SkillSpeak AI, TownRise AI, and this portfolio platform.",
    x: 540,
    y: 260,
    icon: <Code2 className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "supabase",
    name: "Backend & Cloud",
    proficiency: "Advanced · Serverless DB",
    highlight: "PostgreSQL databases, Edge Functions, real-time sync, and Row Level Security (RLS).",
    useCase: "Indexed real-estate indicators of 50+ Tamil Nadu cities in TownRise AI for interactive analysis.",
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

export function SkillGraph() {
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode.id) return true;
    return LINKS.some(
      (link) =>
        (link.source === hoveredNode.id && link.target === nodeId) ||
        (link.target === hoveredNode.id && link.source === nodeId)
    );
  };

  const isLinkActive = (link: SkillLink) => {
    if (!hoveredNode) return true;
    return link.source === hoveredNode.id || link.target === hoveredNode.id;
  };

  return (
    <div className="grid md:grid-cols-12 gap-8 items-stretch font-sans">
      
      {/* ── Neural Graph Display ── */}
      <div className="md:col-span-8 glass border border-primary/20 rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden shadow-card min-h-[380px]">
        
        {/* Decorative Grid BG & Radial Lights */}
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        {/* Visual Header */}
        <div className="relative flex items-center justify-between z-10 select-none pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Interactive Skill Topology</span>
          </div>
          <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/25 px-2 py-0.5 rounded-md">SVG Network</span>
        </div>

        {/* Interactive SVG Canvas */}
        <div className="relative flex-1 w-full mt-4 z-10 flex items-center justify-center">
          <svg
            viewBox="0 0 760 360"
            className="w-full h-auto select-none"
            style={{ maxWidth: "100%" }}
          >
            {/* Draw Links/Lines */}
            {LINKS.map((link, idx) => {
              const sourceNode = NODES.find((n) => n.id === link.source);
              const targetNode = NODES.find((n) => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              const active = isLinkActive(link);
              const dimmed = hoveredNode && !active;

              return (
                <line
                  key={idx}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={active ? "hsl(var(--primary))" : "hsl(var(--border))"}
                  strokeWidth={active ? (hoveredNode ? 2.5 : 1.5) : 1}
                  strokeOpacity={dimmed ? 0.08 : active && hoveredNode ? 0.8 : 0.3}
                  className="transition-all duration-300"
                  strokeDasharray={active && hoveredNode ? "5,5" : undefined}
                  style={{
                    strokeDashoffset: active && hoveredNode ? 0 : undefined,
                    animation: active && hoveredNode ? "dash 15s linear infinite" : undefined,
                  }}
                />
              );
            })}

            {/* Draw Nodes */}
            {NODES.map((node) => {
              const active = hoveredNode && node.id === hoveredNode.id;
              const dimmed = hoveredNode && !isConnected(node.id);
              const connected = hoveredNode && isConnected(node.id) && !active;

              // Color based on node category
              let nodeColor = "fill-cyan-400";
              const glowColor = "shadow-glow";
              if (node.category === "AI/ML & NLP") {
                nodeColor = "fill-violet-400";
              } else if (node.category === "Backend & Cloud") {
                nodeColor = "fill-orange-400";
              } else if (node.category === "Frontend") {
                nodeColor = "fill-green-400";
              }

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  transform={`translate(${node.x}, ${node.y})`}
                >
                  {/* Glowing Node Outer Pulse */}
                  <circle
                    r={active ? 20 : connected ? 14 : 10}
                    className={`transition-all duration-300 fill-primary/10 ${
                      active ? "opacity-100 scale-125 stroke-primary/30" : "opacity-0 scale-50"
                    }`}
                    strokeWidth={active ? 2 : 0}
                  />

                  {/* Core Node Circle */}
                  <circle
                    r={active ? 9 : 6}
                    className={`transition-all duration-300 ${nodeColor} ${
                      dimmed ? "opacity-25" : "opacity-100"
                    }`}
                  />

                  {/* Hover visual highlight border */}
                  <circle
                    r={active ? 13 : 9}
                    fill="transparent"
                    stroke={active ? "hsl(var(--primary))" : connected ? "hsl(var(--primary)/30)" : "transparent"}
                    strokeWidth={1.5}
                    className="transition-all duration-300"
                  />

                  {/* Text Tag beneath node */}
                  <text
                    y={22}
                    textAnchor="middle"
                    className={`text-[10px] font-semibold tracking-wide fill-foreground font-sans transition-all duration-300 ${
                      active
                        ? "fill-primary text-[11px] font-bold filter drop-shadow-[0_0_2px_rgba(6,182,212,0.6)]"
                        : dimmed
                        ? "fill-muted-foreground/30"
                        : "fill-muted-foreground"
                    }`}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Action Tip */}
        <div className="text-[10px] font-mono text-muted-foreground/60 select-none pointer-events-none mt-2 text-center">
          💡 Pro-tip: Hover over any skill node to visually scan its graph connections.
        </div>
      </div>

      {/* ── Skills Insight Terminal ── */}
      <div className="md:col-span-4 flex flex-col justify-between p-6 rounded-3xl glass border border-primary/20 bg-gradient-to-br from-card/80 to-secondary/30 shadow-card">
        
        {/* Insight Header */}
        <div>
          <div className="flex items-center gap-2 border-b border-border/80 pb-4 mb-4 select-none">
            <span className="p-1.5 rounded-lg bg-primary/15 border border-primary/30 text-primary">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-semibold text-sm leading-none">Skills Terminal</h4>
              <span className="text-[10px] text-muted-foreground block mt-1">Direct portfolio scan</span>
            </div>
          </div>

          {/* Dynamic Content Panel */}
          {hoveredNode ? (
            <div className="space-y-4 animate-fade-up animate-duration-300">
              
              {/* Category pill */}
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25 text-[10px] font-mono font-medium text-primary uppercase">
                  {hoveredNode.category}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {hoveredNode.proficiency}
                </span>
              </div>

              {/* Skill Name */}
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="inline-flex shrink-0 w-6 h-6 rounded-md bg-secondary/80 border border-border items-center justify-center">
                  {hoveredNode.icon}
                </span>
                {hoveredNode.name}
              </h3>

              {/* Highlight */}
              <div className="space-y-1.5">
                <h5 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">Competency Context</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {hoveredNode.highlight}
                </p>
              </div>

              {/* Exact project deployment */}
              <div className="space-y-1.5 p-3 rounded-xl bg-secondary/40 border border-border/60">
                <h5 className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">Real-World Deployment</h5>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "{hoveredNode.useCase}"
                </p>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-3 select-none">
              <div className="w-12 h-12 rounded-2xl bg-secondary border border-border/60 flex items-center justify-center text-muted-foreground/30 animate-pulse">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-[200px]">
                <p className="text-xs font-semibold text-muted-foreground">Console Inactive</p>
                <p className="text-[10px] text-muted-foreground/60 leading-normal">
                  Hover over a neural network node to view engineering use-cases.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Static Metrics (CGPA, Accuracy) Footer */}
        <div className="border-t border-border/60 pt-4 mt-6 flex justify-between select-none items-center">
          <div>
            <span className="text-[10px] text-muted-foreground block">Verification accuracy</span>
            <span className="text-sm font-bold text-primary">94.0% accuracy</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground block">Academic verification</span>
            <span className="text-sm font-bold text-accent">8.5 CGPA AI & DS</span>
          </div>
        </div>

      </div>

      {/* Embedded stroke animations rules */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}
