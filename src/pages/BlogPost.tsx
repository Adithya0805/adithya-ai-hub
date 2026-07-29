import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { posts } from "@/data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Adithya Kuppusamy",
      "url": "https://adithya-ai-hub.vercel.app/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Adithya AI Hub",
      "url": "https://adithya-ai-hub.vercel.app"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://adithya-ai-hub.vercel.app/blog/${post.slug}`
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | Adithya AI Hub</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://adithya-ai-hub.vercel.app/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Article layout — centered single column */}
      <article style={{
        maxWidth: 'var(--content-width)',
        margin: '0 auto',
        padding: '64px 24px'
      }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '32px' }}>
          <a href="/" style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'none' }}>Home</a>
          <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>/</span>
          <a href="/blog" style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'none' }}>Blog</a>
          <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>{post.title}</span>
        </nav>

        {/* Category tag */}
        <p style={{
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '16px'
        }}>
          {post.category}
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: '700',
          color: 'var(--text-primary)',
          lineHeight: '1.15',
          letterSpacing: '-1px',
          marginBottom: '24px'
        }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '48px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#c4b5a0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '700',
            color: '#fff'
          }}>A</div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Adithya Kuppusamy
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })} · {post.readTime}
            </p>
          </div>
        </div>

        {/* Article content */}
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author card at bottom */}
        <div style={{
          marginTop: '64px',
          padding: '32px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px'
        }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
            Adithya Kuppusamy
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '16px' }}>
            AI & Data Science Engineer from Ambur, Tamil Nadu. Building real AI systems with
            LangGraph, RAG, and AWS Bedrock. Writing weekly about ML, career, and the honest
            side of the job search.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://github.com/Adithya0805" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>GitHub →</a>
            <a href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/" style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>LinkedIn →</a>
          </div>
        </div>

      </article>
    </Layout>
  );
}
