import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { posts } from "@/data/posts";

const CATEGORIES = ["All", "Machine Learning", "Python", "Interview Prep", "Career", "AWS"];

export default function Blog() {
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const filtered = useMemo(
    () => (cat === "All" ? posts : posts.filter((p) => p.category === cat)),
    [cat]
  );

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <Layout>
      <Helmet>
        <title>Blog | Adithya AI Hub</title>
        <meta
          name="description"
          content="Daily AI/ML tutorials, Python guides, interview prep, and career advice by Adithya Kuppusamy."
        />
        <meta property="og:title" content="Blog | Adithya AI Hub" />
        <meta property="og:description" content="Machine learning tutorials, career insights, and project breakdowns." />
      </Helmet>

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '64px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}>
            ARTICLES & TUTORIALS
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1.1',
            letterSpacing: '-1px',
            marginBottom: '16px'
          }}>
            AI Learning Hub
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px' }}>
            Deep dives on machine learning, LLMs, Python, and career advice for aspiring AI engineers.
          </p>
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setPage(1); }}
              style={{
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: '500',
                borderRadius: '4px',
                border: '1px solid var(--border)',
                backgroundColor: cat === c ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: cat === c ? 'var(--bg-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '48px 0', textAlign: 'center' }}>
            No posts in this category yet.
          </p>
        ) : (
          <div className="magazine-grid-top" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '32px',
            marginBottom: '48px'
          }}>
            {paginated.map((p) => (
              <BlogCard key={p.slug} post={p} size="small" />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <button
              onClick={() => setPage((p) => p + 1)}
              style={{
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--text-primary)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Load More Posts
            </button>
          </div>
        )}

        <NewsletterForm />
      </div>
    </Layout>
  );
}
