import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { AdUnit, AdRectangle } from "@/components/AdSlot";
import { NewsletterForm } from "@/components/NewsletterForm";
import { posts } from "@/data/posts";

const CATEGORIES = ["All", "Machine Learning", "Python", "Interview Prep", "Career", "AWS"];

const Blog = () => {
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
        <title>AI Learning Hub — Daily Posts | Adithya AI Hub</title>
        <meta
          name="description"
          content="Daily AI/ML tutorials, Python guides, interview prep, and career advice. Learn machine learning and get hired as an AI engineer."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/blog" />
        <meta property="og:title" content="AI Learning Hub — Daily Posts | Adithya AI Hub" />
        <meta property="og:description" content="Daily tutorials on ML, LangChain, Python, DSA interview prep, and career growth for AI engineers." />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Adithya AI Hub" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container py-20">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-sm text-primary font-medium">Blog</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">AI Learning Hub</h1>
          <p className="mt-4 text-muted-foreground">
            Deep dives on machine learning, LLMs, Python, and career advice for aspiring AI
            engineers. New posts regularly.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setPage(1); }}
              className={`px-4 py-1.5 text-xs rounded-full border transition-smooth font-medium ${
                cat === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-8 items-start">
          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">No posts in this category yet. Check back soon!</p>
            ) : (
              <>
                {/* First 6 posts */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginated.slice(0, 6).map((p) => (
                    <BlogCard key={p.slug} post={p} featured />
                  ))}
                </div>

                {/* In-feed ad between rows */}
                {paginated.length > 6 && (
                  <div className="my-6">
                    <AdUnit adFormat="auto" />
                  </div>
                )}

                {/* Rest of posts */}
                {paginated.length > 6 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {paginated.slice(6).map((p) => (
                      <BlogCard key={p.slug} post={p} featured />
                    ))}
                  </div>
                )}

                {/* Load more */}
                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="px-6 py-3 rounded-xl border border-border hover:border-primary hover:text-primary text-sm transition-smooth"
                    >
                      Load more posts
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Newsletter */}
            <div className="mt-16">
              <NewsletterForm />
            </div>
          </div>

          {/* ── SIDEBAR (desktop only) ── */}
          <aside className="hidden xl:flex flex-col gap-6 w-72 shrink-0">
            {/* About card */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-3">
                AK
              </div>
              <h3 className="font-semibold">Adithya Kuppusamy</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                AI &amp; Data Science engineer from Ambur, Tamil Nadu. Writing about what I build and
                learn on my way to becoming an ML engineer.
              </p>
              <a
                href="https://github.com/Adithya0805"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs text-primary hover:underline"
              >
                → GitHub @Adithya0805
              </a>
            </div>

            {/* Ad rectangle */}
            <div className="flex justify-center">
              <AdRectangle />
            </div>

            {/* Popular tags */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="text-sm font-semibold mb-3">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "LangChain", "RAG", "TCS NQT", "AWS", "Interview Prep", "Career"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      const matched = CATEGORIES.find((c) => c.toLowerCase() === t.toLowerCase());
                      if (matched) setCat(matched);
                    }}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border hover:border-primary hover:text-primary transition-smooth"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
