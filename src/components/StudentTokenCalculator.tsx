import { useState } from "react";
import {
  Cpu,
  Zap,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Info,
  Copy,
  Check,
  DollarSign,
  Gauge,
  Layers,
  Terminal,
} from "lucide-react";

interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPerMillion: number;
  outputPerMillion: number;
  freeTierLimit: string;
  maxContext: string;
  supportsThinking: boolean;
  notes: string;
}

const MODELS: ModelPricing[] = [
  {
    id: "gemini-2.5-flash-free",
    name: "Gemini 2.5 Flash (Free Tier)",
    provider: "Google AI Studio",
    inputPerMillion: 0,
    outputPerMillion: 0,
    freeTierLimit: "15 RPM · 1,500 RPD · 1M TPM",
    maxContext: "1,048,576 tokens",
    supportsThinking: true,
    notes: "100% Free forever with Google AI Studio key. Requires thinkingBudget: 0 to avoid quota cutoff.",
  },
  {
    id: "gemini-2.5-flash-paid",
    name: "Gemini 2.5 Flash (Pay-as-you-go)",
    provider: "Google Cloud / AI Studio",
    inputPerMillion: 0.075,
    outputPerMillion: 0.30,
    freeTierLimit: "Unlimited",
    maxContext: "1,048,576 tokens",
    supportsThinking: true,
    notes: "Extremely cost-effective multimodal workhorse for production agents.",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    inputPerMillion: 0.15,
    outputPerMillion: 0.60,
    freeTierLimit: "None (Paid only)",
    maxContext: "128,000 tokens",
    supportsThinking: false,
    notes: "Standard lightweight OpenAI model for chatbots and embeddings.",
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    inputPerMillion: 0.80,
    outputPerMillion: 4.00,
    freeTierLimit: "None (Paid only)",
    maxContext: "200,000 tokens",
    supportsThinking: false,
    notes: "High reasoning speed, ideal for classification and coding agents.",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    inputPerMillion: 0.14,
    outputPerMillion: 0.28,
    freeTierLimit: "Trial credits",
    maxContext: "64,000 tokens",
    supportsThinking: false,
    notes: "Open weights and low-cost API inference.",
  },
];

const PRESETS = [
  {
    title: "Simple Chatbot / Q&A",
    inputTokens: 120,
    outputTokens: 250,
    dailyCalls: 100,
  },
  {
    title: "RAG Pipeline (5 Chunks retrieved)",
    inputTokens: 2800,
    outputTokens: 450,
    dailyCalls: 200,
  },
  {
    title: "Resume / PDF Analysis Agent",
    inputTokens: 6500,
    outputTokens: 900,
    dailyCalls: 50,
  },
  {
    title: "Multi-Agent LangGraph System",
    inputTokens: 18000,
    outputTokens: 2200,
    dailyCalls: 80,
  },
];

export function StudentTokenCalculator() {
  const [selectedModelId, setSelectedModelId] = useState("gemini-2.5-flash-free");
  const [inputTokens, setInputTokens] = useState(2800);
  const [outputTokens, setOutputTokens] = useState(450);
  const [thinkingTokens, setThinkingTokens] = useState(0);
  const [dailyCalls, setDailyCalls] = useState(150);
  const [copiedCode, setCopiedCode] = useState(false);

  const model = MODELS.find((m) => m.id === selectedModelId) || MODELS[0];

  const effectiveOutputTokens = outputTokens + thinkingTokens;
  const totalTokensPerCall = inputTokens + effectiveOutputTokens;

  // Cost calculation
  const costPerCall =
    (inputTokens / 1_000_000) * model.inputPerMillion +
    (effectiveOutputTokens / 1_000_000) * model.outputPerMillion;

  const dailyCost = costPerCall * dailyCalls;
  const monthlyCost = dailyCost * 30;

  // Gemini Free Tier safety check
  const isFreeGemini = model.id === "gemini-2.5-flash-free";
  const exceedsDailyLimit = isFreeGemini && dailyCalls > 1500;
  const dailyLimitPercent = Math.min(100, Math.round((dailyCalls / 1500) * 100));

  const samplePythonCode = `import os
from google import genai
from google.genai import types

# Free Tier Setup: Zero Credit Card Required
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain LangGraph StateGraph architectures for students.",
    config=types.GenerateContentConfig(
        # CRITICAL FOR FREE TIER: Disable thinking tokens to preserve 100% output budget
        thinking_config=types.ThinkingConfig(thinking_budget=0),
        temperature=0.2,
        max_output_tokens=${outputTokens},
    )
)

print(response.text)`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(samplePythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleApplyPreset = (p: typeof PRESETS[0]) => {
    setInputTokens(p.inputTokens);
    setOutputTokens(p.outputTokens);
    setDailyCalls(p.dailyCalls);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "8px 0" }}>
      {/* Header Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0, 245, 160, 0.08) 0%, rgba(56, 189, 248, 0.05) 100%)",
          border: "1px solid rgba(0, 245, 160, 0.25)",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "11px",
                fontFamily: "var(--font-mono)",
                fontWeight: "700",
                color: "#00f5a0",
                background: "rgba(0, 245, 160, 0.12)",
                border: "1px solid rgba(0, 245, 160, 0.3)",
                padding: "2px 8px",
                borderRadius: "100px",
              }}
            >
              AI STUDENT BENCHMARK
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-3)" }}>Updated for 2026 Models</span>
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-1)", margin: "0 0 6px" }}>
            LLM Token & Free-Tier Quota Studio
          </h2>
          <p style={{ fontSize: "13.5px", color: "var(--text-2)", margin: 0, maxWidth: "600px", lineHeight: "1.5" }}>
            Simulate token consumption, prevent quota exhaustion, and optimize RAG/Multi-Agent pipelines for zero-cost student deployments.
          </p>
        </div>

        {/* Quick Cost Card */}
        <div
          style={{
            background: "var(--bg-0)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "16px 20px",
            textAlign: "right",
            minWidth: "180px",
          }}
        >
          <div style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px" }}>
            Monthly API Cost
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: isFreeGemini ? "#00f5a0" : "var(--accent)" }}>
            {isFreeGemini ? "$0.00" : `$${monthlyCost.toFixed(2)}`}
          </div>
          <div style={{ fontSize: "11px", color: isFreeGemini ? "#00f5a0" : "var(--text-3)" }}>
            {isFreeGemini ? "✓ 100% Free on AI Studio" : `$${costPerCall.toFixed(5)} / request`}
          </div>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "12px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px" }}>
          Load AI Architecture Preset:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "10px" }}>
          {PRESETS.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => handleApplyPreset(p)}
              style={{
                background: "var(--bg-1)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "12px 14px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--text-1)", marginBottom: "4px" }}>
                {p.title}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                {p.inputTokens.toLocaleString()} in / {p.outputTokens} out
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls vs Analysis */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        {/* LEFT COLUMN: PARAMETER CONTROLS */}
        <div
          style={{
            background: "var(--bg-1)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-1)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Cpu size={16} style={{ color: "var(--accent)" }} /> 1. Select Model & Provider
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            {MODELS.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: selectedModelId === m.id ? "rgba(0, 245, 160, 0.08)" : "var(--bg-0)",
                  border: selectedModelId === m.id ? "1px solid #00f5a0" : "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.15s",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: selectedModelId === m.id ? "#00f5a0" : "var(--text-1)" }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-3)" }}>
                    {m.provider} · Context: {m.maxContext}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: m.inputPerMillion === 0 ? "#00f5a0" : "var(--text-2)" }}>
                    {m.inputPerMillion === 0 ? "FREE" : `$${m.inputPerMillion}/1M in`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-1)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Gauge size={16} style={{ color: "var(--accent)" }} /> 2. Token Sliders
          </h3>

          {/* Input Tokens */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-2)" }}>Prompt / Context Tokens:</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-1)", fontFamily: "var(--font-mono)" }}>
                {inputTokens.toLocaleString()} tokens
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="64000"
              step="50"
              value={inputTokens}
              onChange={(e) => setInputTokens(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
          </div>

          {/* Output Tokens */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-2)" }}>Max Generated Output Tokens:</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-1)", fontFamily: "var(--font-mono)" }}>
                {outputTokens.toLocaleString()} tokens
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="4096"
              step="50"
              value={outputTokens}
              onChange={(e) => setOutputTokens(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
          </div>

          {/* Thinking Tokens (Gemini 2.5) */}
          {model.supportsThinking && (
            <div style={{ marginBottom: "18px", padding: "12px", background: "rgba(200, 169, 110, 0.08)", borderRadius: "8px", border: "1px solid rgba(200, 169, 110, 0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--accent)" }}>
                  Internal Thinking Budget (Tokens):
                </span>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-1)", fontFamily: "var(--font-mono)" }}>
                  {thinkingTokens} tokens
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2048"
                step="64"
                value={thinkingTokens}
                onChange={(e) => setThinkingTokens(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent)" }}
              />
              <p style={{ fontSize: "11px", color: "var(--text-3)", margin: "4px 0 0" }}>
                💡 <em>Tip: Setting thinkingBudget: 0 eliminates internal token burn on free tier bots.</em>
              </p>
            </div>
          )}

          {/* Daily Request Volume */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-2)" }}>Daily Requests (Traffic):</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-1)", fontFamily: "var(--font-mono)" }}>
                {dailyCalls.toLocaleString()} calls / day
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="3000"
              step="10"
              value={dailyCalls}
              onChange={(e) => setDailyCalls(Number(e.target.value))}
              style={{ width: "100%", accentColor: isFreeGemini && exceedsDailyLimit ? "#f87171" : "var(--accent)" }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: RADAR & ARCHITECTURE RECOMMENDATIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Quota Radar */}
          <div
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-1)", marginBottom: "14px" }}>
              ⚡ Free-Tier Capacity Meter (Gemini 2.5 Flash)
            </h3>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                <span style={{ color: "var(--text-2)" }}>Daily Request Quota (1,500 Max):</span>
                <span style={{ fontWeight: "700", color: exceedsDailyLimit ? "#f87171" : "#00f5a0", fontFamily: "var(--font-mono)" }}>
                  {dailyCalls} / 1,500 RPD ({dailyLimitPercent}%)
                </span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "var(--bg-0)", borderRadius: "4px", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${dailyLimitPercent}%`,
                    height: "100%",
                    background: exceedsDailyLimit ? "#f87171" : "#00f5a0",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            {exceedsDailyLimit ? (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(248, 113, 113, 0.1)",
                  border: "1px solid rgba(248, 113, 113, 0.3)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#f87171",
                  fontSize: "12px",
                }}
              >
                <AlertTriangle size={18} />
                <span>
                  <strong>Quota Warning:</strong> Exceeds 1,500 daily requests. You will receive 429 Too Many Requests on free tier. Enable client caching or throttle requests.
                </span>
              </div>
            ) : (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(0, 245, 160, 0.08)",
                  border: "1px solid rgba(0, 245, 160, 0.25)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#00f5a0",
                  fontSize: "12px",
                }}
              >
                <ShieldCheck size={18} />
                <span>
                  <strong>100% Free Tier Safe:</strong> Your application runs inside the permanent Google AI Studio free tier with zero infrastructure costs.
                </span>
              </div>
            )}
          </div>

          {/* Student Python Snippet */}
          <div
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "24px",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Terminal size={15} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-1)", fontFamily: "var(--font-mono)" }}>
                  Zero-Quota-Exhaustion Python Pattern
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                style={{
                  padding: "4px 10px",
                  background: "var(--bg-0)",
                  border: "1px solid var(--border)",
                  borderRadius: "5px",
                  color: copiedCode ? "#00f5a0" : "var(--text-2)",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                {copiedCode ? "Copied" : "Copy Code"}
              </button>
            </div>

            <pre
              style={{
                background: "var(--bg-0)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "14px",
                fontSize: "11px",
                fontFamily: "var(--font-mono)",
                color: "#e2e8f0",
                lineHeight: "1.5",
                overflowX: "auto",
                margin: 0,
              }}
            >
              {samplePythonCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
