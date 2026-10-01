import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { ReadingProgress } from "@/components/ReadingProgress";
import { NewsletterForm } from "@/components/NewsletterForm";
import { posts } from "@/data/posts";
import { toast } from "sonner";
import { Share2, Check, ArrowLeft, Twitter, Linkedin, Copy } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const postUrl = `https://adithya-ai-hub.vercel.app/blog/${post.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    toast.success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Adithya Kuppusamy",
      url: "https://adithya-ai-hub.vercel.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Adithya AI Hub",
      url: "https://adithya-ai-hub.vercel.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <Layout>
      <ReadingProgress />
      <Helmet>
        <title>{post.title} | Adithya AI Hub</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Article layout — centered single column */}
      <article
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "64px 24px 80px",
        }}
      >
        {/* Breadcrumb */}
        <nav
          style={{
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <Link
            to="/blog"
            style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ArrowLeft size={14} /> Back to all articles
          </Link>
          <span style={{ color: "var(--text-3)", margin: "0 4px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "13px", fontWeight: "500" }}>
            {post.category}
          </span>
        </nav>

        {/* Category tag */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          {post.category}
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: "400",
            color: "var(--text-1)",
            lineHeight: "1.15",
            letterSpacing: "-1px",
            marginBottom: "24px",
          }}
        >
          {post.title}
        </h1>

        {/* Meta & Share bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--border)",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                fontWeight: "700",
                color: "var(--accent)",
              }}
            >
              A
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-1)" }}>
                Adithya Kuppusamy
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {post.readTime}
              </p>
            </div>
          </div>

          {/* Social share actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy article link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                color: "var(--text-2)",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              {copied ? <Check size={13} style={{ color: "#4ade80" }} /> : <Copy size={13} />}
              {copied ? "Link Copied" : "Share"}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                post.title
              )}&url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on X"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                color: "var(--text-2)",
                borderRadius: "4px",
                padding: "6px 10px",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              <Twitter size={14} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                color: "var(--text-2)",
                borderRadius: "4px",
                padding: "6px 10px",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "48px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-1)",
          }}
        >
          <img
            src={
              post.coverImage ||
              `/blog/cover_${post.category.toLowerCase().replace(/ /g, "_")}.jpg`
            }
            onError={(e) => {
              e.currentTarget.src = "/blog/cover_machine_learning.jpg";
            }}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Article content */}
        <div className="article-prose" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Author card at bottom */}
        <div
          style={{
            marginTop: "64px",
            marginBottom: "48px",
            padding: "36px",
            backgroundColor: "var(--bg-1)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              fontWeight: "400",
              marginBottom: "8px",
              color: "var(--text-1)",
            }}
          >
            Adithya Kuppusamy
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-2)",
              lineHeight: "1.7",
              marginBottom: "20px",
            }}
          >
            AI & Data Science Engineer from Ambur, Tamil Nadu. Building production AI systems with
            LangGraph, Pinecone, and AWS Bedrock. Writing weekly in public about ML architectures,
            freelance projects, and honest career roadmaps for students.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a
              href="https://github.com/Adithya0805"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "600", textDecoration: "none" }}
            >
              GitHub →
            </a>
            <a
              href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "600", textDecoration: "none" }}
            >
              LinkedIn →
            </a>
            <Link
              to="/services"
              style={{ fontSize: "13px", color: "var(--text-1)", fontWeight: "600", textDecoration: "none" }}
            >
              Hire Me for AI Systems →
            </Link>
          </div>
        </div>

        {/* Inline Newsletter signup */}
        <NewsletterForm />
      </article>
    </Layout>
  );
}
