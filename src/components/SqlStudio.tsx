import React, { useState } from "react";
import {
  Database,
  Play,
  Copy,
  Check,
  Zap,
  Layers,
  ArrowRight,
  Code2,
  Table2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SqlPreset {
  id: string;
  question: string;
  description: string;
  sql: string;
  plan: string[];
  indexRecommendation: string;
}

const SQL_PRESETS: SqlPreset[] = [
  {
    id: "churn-risk",
    question: "Find customers in Chennai with >3 orders who haven't purchased in the last 30 days",
    description: "Identifies high-value dormant customer cohort for targeted re-engagement campaigns.",
    sql: `WITH high_value_customers AS (
  SELECT 
    c.id AS customer_id,
    c.full_name,
    c.city,
    COUNT(o.id) AS total_orders,
    MAX(o.created_at) AS last_order_date,
    SUM(o.total_amount) AS lifetime_value
  FROM customers c
  JOIN orders o ON o.customer_id = c.id
  WHERE c.city ILIKE 'Chennai'
    AND o.status = 'COMPLETED'
  GROUP BY c.id, c.full_name, c.city
  HAVING COUNT(o.id) > 3
)
SELECT 
  customer_id,
  full_name,
  city,
  total_orders,
  last_order_date,
  lifetime_value,
  ROUND(EXTRACT(EPOCH FROM (NOW() - last_order_date)) / 86400) AS days_since_last_order
FROM high_value_customers
WHERE last_order_date < NOW() - INTERVAL '30 days'
ORDER BY lifetime_value DESC;`,
    plan: [
      "1. Index Scan on idx_customers_city using Filter: (city ILIKE 'Chennai')",
      "2. Hash Join on orders (customer_id = customers.id) with condition (status = 'COMPLETED')",
      "3. HashAggregate on (customer_id, full_name, city) filtering HAVING COUNT > 3",
      "4. Final Filter: last_order_date < NOW() - 30 days",
      "5. Sort by lifetime_value DESC (Cost: 14.2ms)",
    ],
    indexRecommendation: "CREATE INDEX CONCURRENTLY idx_orders_customer_status_date ON orders (customer_id, status, created_at DESC);",
  },
  {
    id: "mrr-growth",
    question: "Calculate monthly recurring revenue (MRR) and month-over-month growth percentage",
    description: "Computes financial trajectory metrics using PostgreSQL window functions.",
    sql: `WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', created_at)::DATE AS revenue_month,
    SUM(amount) AS mrr,
    COUNT(DISTINCT organization_id) AS active_subscribers
  FROM subscriptions
  WHERE status IN ('ACTIVE', 'TRIALING')
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
  revenue_month,
  mrr,
  active_subscribers,
  LAG(mrr) OVER (ORDER BY revenue_month) AS previous_month_mrr,
  ROUND(
    ((mrr - LAG(mrr) OVER (ORDER BY revenue_month)) / NULLIF(LAG(mrr) OVER (ORDER BY revenue_month), 0)) * 100, 
    2
  ) AS mom_growth_pct
FROM monthly_revenue
ORDER BY revenue_month DESC;`,
    plan: [
      "1. Bitmap Index Scan on idx_subscriptions_status (ACTIVE, TRIALING)",
      "2. HashAggregate grouped by DATE_TRUNC('month', created_at)",
      "3. WindowAgg computing LAG(mrr) OVER (ORDER BY revenue_month)",
      "4. Output sorted by revenue_month DESC (Cost: 8.7ms)",
    ],
    indexRecommendation: "CREATE INDEX CONCURRENTLY idx_subscriptions_status_date ON subscriptions (status, created_at) INCLUDE (amount, organization_id);",
  },
  {
    id: "inventory-stockout",
    question: "Identify dairy products with stock below reorder threshold and pending orders",
    description: "Critical cold-chain inventory query for Aranya Organic Dairy automated replenishment.",
    sql: `SELECT
  p.id AS product_id,
  p.name AS product_name,
  p.current_stock_litres,
  p.reorder_threshold_litres,
  COALESCE(SUM(oi.quantity), 0) AS pending_ordered_litres,
  (p.current_stock_litres - COALESCE(SUM(oi.quantity), 0)) AS projected_net_stock
FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
LEFT JOIN orders o ON o.id = oi.order_id AND o.status IN ('PENDING_DISPATCH', 'PROCESSING')
WHERE p.is_active = TRUE
GROUP BY p.id, p.name, p.current_stock_litres, p.reorder_threshold_litres
HAVING (p.current_stock_litres - COALESCE(SUM(oi.quantity), 0)) < p.reorder_threshold_litres
ORDER BY projected_net_stock ASC;`,
    plan: [
      "1. Seq Scan on products WHERE is_active = true",
      "2. Left Join on order_items and orders (Filter: status IN ('PENDING_DISPATCH', 'PROCESSING'))",
      "3. GroupAggregate on p.id",
      "4. Filter projected_net_stock < reorder_threshold_litres",
    ],
    indexRecommendation: "CREATE INDEX CONCURRENTLY idx_orders_dispatch_status ON orders (status) WHERE status IN ('PENDING_DISPATCH', 'PROCESSING');",
  },
  {
    id: "agent-telemetry",
    question: "Rank AI agents by p95 latency, error count, and token efficiency over past 24 hours",
    description: "Production telemetry monitoring query for multi-agent systems (MediGuard V2).",
    sql: `SELECT
  agent_name,
  COUNT(run_id) AS total_invocations,
  COUNT(CASE WHEN status = 'FAILED' THEN 1 END) AS error_count,
  ROUND(
    (COUNT(CASE WHEN status = 'FAILED' THEN 1.0 END) / COUNT(run_id)) * 100, 
    2
  ) AS error_rate_pct,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY execution_latency_ms) AS p95_latency_ms,
  ROUND(AVG(total_tokens_consumed)) AS avg_tokens_per_run
FROM agent_telemetry_logs
WHERE logged_at >= NOW() - INTERVAL '24 hours'
GROUP BY agent_name
ORDER BY error_rate_pct ASC, p95_latency_ms ASC;`,
    plan: [
      "1. Index Range Scan on idx_agent_logs_timestamp WHERE logged_at >= NOW() - 24 hours",
      "2. HashAggregate on agent_name with PERCENTILE_CONT calculation",
      "3. Sort by error_rate_pct ASC, p95_latency_ms ASC (Cost: 6.4ms)",
    ],
    indexRecommendation: "CREATE INDEX CONCURRENTLY idx_agent_logs_logged_at ON agent_telemetry_logs (logged_at DESC) INCLUDE (agent_name, execution_latency_ms, total_tokens_consumed, status);",
  },
];

export function SqlStudio() {
  const [selectedPresetId, setSelectedPresetId] = useState(SQL_PRESETS[0].id);
  const [customQuery, setCustomQuery] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [activeView, setActiveView] = useState<"sql" | "plan">("sql");

  const currentPreset = SQL_PRESETS.find((p) => p.id === selectedPresetId) || SQL_PRESETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPreset.sql);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          padding: "16px 20px",
          background: "rgba(200, 169, 110, 0.06)",
          border: "1px solid rgba(200, 169, 110, 0.2)",
          borderRadius: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Database size={20} style={{ color: "var(--accent)" }} />
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-1)" }}>
              Natural Language SQL & Schema Studio
            </h4>
            <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
              Convert natural language business queries into production-grade PostgreSQL with query execution plans and index recommendations.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            background: isCopied ? "#166534" : "rgba(200, 169, 110, 0.15)",
            border: `1px solid ${isCopied ? "#22c55e" : "var(--accent)"}`,
            borderRadius: "6px",
            color: isCopied ? "#86efac" : "var(--accent)",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
          {isCopied ? "Copied SQL" : "Copy SQL"}
        </button>
      </div>

      {/* Preset Query Cards */}
      <div>
        <label
          style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "var(--text-3)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Select Real-World Question or Cohort
        </label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "10px",
          }}
        >
          {SQL_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPresetId(preset.id)}
                style={{
                  padding: "12px 14px",
                  background: isSelected ? "rgba(200, 169, 110, 0.12)" : "var(--bg-0)",
                  border: `1px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "6px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <Sparkles size={12} style={{ color: isSelected ? "var(--accent)" : "var(--text-3)" }} />
                  <span style={{ fontSize: "12px", fontWeight: "600", color: isSelected ? "var(--accent)" : "var(--text-1)" }}>
                    {preset.question}
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "var(--text-3)", lineHeight: "1.4" }}>
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* SQL Output & Plan View Tabs */}
      <div
        style={{
          background: "#080809",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            background: "rgba(255, 255, 255, 0.02)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => setActiveView("sql")}
              style={{
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 10px",
                borderRadius: "4px",
                background: activeView === "sql" ? "rgba(200, 169, 110, 0.2)" : "transparent",
                color: activeView === "sql" ? "var(--accent)" : "var(--text-3)",
                border: "none",
                cursor: "pointer",
              }}
            >
              PostgreSQL Code
            </button>
            <button
              type="button"
              onClick={() => setActiveView("plan")}
              style={{
                fontSize: "12px",
                fontWeight: "600",
                padding: "4px 10px",
                borderRadius: "4px",
                background: activeView === "plan" ? "rgba(200, 169, 110, 0.2)" : "transparent",
                color: activeView === "plan" ? "var(--accent)" : "var(--text-3)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Simulated Execution Plan (EXPLAIN ANALYZE)
            </button>
          </div>

          <span style={{ fontSize: "10px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            PostgreSQL 16 / Supabase Optimized
          </span>
        </div>

        {activeView === "sql" ? (
          <pre
            style={{
              padding: "16px",
              margin: 0,
              fontSize: "12px",
              lineHeight: "1.6",
              color: "#e2e8f0",
              fontFamily: "var(--font-mono)",
              overflowX: "auto",
              maxHeight: "360px",
              whiteSpace: "pre-wrap",
            }}
          >
            {currentPreset.sql}
          </pre>
        ) : (
          <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {currentPreset.plan.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  color: "#94a3b8",
                  fontFamily: "var(--font-mono)",
                  padding: "6px 10px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "4px",
                }}
              >
                <Zap size={14} style={{ color: "var(--accent)" }} />
                <span>{step}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Index Recommendation Box */}
      <div
        style={{
          padding: "14px 18px",
          background: "rgba(200, 169, 110, 0.05)",
          border: "1px solid rgba(200, 169, 110, 0.2)",
          borderRadius: "6px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px" }}>
          Recommended Concurrent B-Tree Index for Zero Table Locks:
        </span>
        <code style={{ fontSize: "12px", color: "#f1f5f9", fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>
          {currentPreset.indexRecommendation}
        </code>
      </div>
    </div>
  );
}
