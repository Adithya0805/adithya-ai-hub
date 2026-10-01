import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { posts } from "@/data/posts";
import { Search, X } from "lucide-react";

const CATEGORIES = ["All", "AI Engineering", "Machine Learning", "Python", "Interview Prep", "Career"];

export default function Blog() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const filtered = useMemo(() => {
    let result = posts;

    if (cat !== "All") {
      result = result.filter((p) => p.category === cat);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [cat, search]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <Layout>
      <Helmet>
        <title>AI & Machine Learning Blog | Tutorials & Roadmaps | Adithya AI Hub</title>
        <meta
          name="description"
          content="Production AI/ML tutorials, LangGraph multi-agent guides, Python no-GIL deep dives, AWS Bedrock systems, and honest fresher career advice by Adithya Kuppusamy."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/blog" />
        <meta property="og:title" content="AI & Machine Learning Blog | Adithya AI Hub" />
        <meta
          property="og:description"
          content="Deep dives on machine learning, LangGraph, Python, AWS, and AI Engineering."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "80px 24px 64px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px", borderBottom: "1px solid var(--border)", paddingBottom: "32px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "16px",
            }}
          >
            EDITORIAL ARTICLES & PRODUCTION GUIDES
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: "400",
              color: "var(--text-1)",
              lineHeight: "1.1",
              letterSpacing: "-1.5px",
              marginBottom: "16px",
            }}
          >
            AI Engineering Hub
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "680px", lineHeight: "1.7" }}>
            Real-world tutorials on LangGraph multi-agent systems, AWS Bedrock, Python 3.14 free-threading,
            RAG retrieval pipelines, and honest roadmaps for aspiring AI engineers.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative", maxWidth: "420px", width: "100%" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-3)",
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by topic, keyword, or technology..."
              style={{
                width: "100%",
                padding: "10px 38px 10px 40px",
                fontSize: "13px",
                background: "var(--bg-1)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-1)",
                outline: "none",
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-3)",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter categories */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCat(c);
                  setPage(1);
                }}
                style={{
                  padding: "6px 16px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  border: `1px solid ${cat === c ? "var(--accent)" : "var(--border)"}`,
                  backgroundColor: cat === c ? "rgba(200, 169, 110, 0.15)" : "var(--bg-1)",
                  color: cat === c ? "var(--accent)" : "var(--text-2)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {c}
              </button>
            ))}

            <span style={{ fontSize: "12px", color: "var(--text-3)", marginLeft: "auto" }}>
              Showing {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </span>
          </div>
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "64px 24px",
              textAlign: "center",
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              marginBottom: "48px",
            }}
          >
            <p style={{ color: "var(--text-1)", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
              No articles found
            </p>
            <p style={{ color: "var(--text-3)", fontSize: "14px", marginBottom: "16px" }}>
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setCat("All");
                setSearch("");
              }}
              style={{
                padding: "8px 18px",
                background: "var(--accent)",
                color: "var(--bg-0)",
                border: "none",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="magazine-grid-top"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {paginated.map((p) => (
              <BlogCard key={p.slug} post={p} size="small" />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <button
              onClick={() => setPage((p) => p + 1)}
              style={{
                padding: "12px 32px",
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor: "var(--bg-1)",
                color: "var(--text-1)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-1)";
              }}
            >
              Load More Articles ({filtered.length - paginated.length} remaining)
            </button>
          </div>
        )}

        <NewsletterForm />
      </div>
    </Layout>
  );
}
