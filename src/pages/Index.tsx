import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { BlogCard, FeaturedCard } from "@/components/BlogCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { posts } from "@/data/posts";

export default function Index() {
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost.slug);

  const topThreePosts = otherPosts.slice(0, 3);
  const sidePosts = [
    otherPosts[3] || topThreePosts[0] || featuredPost,
    otherPosts[4] || topThreePosts[1] || featuredPost,
  ];
  const bottomThreePosts = otherPosts.slice(5, 8);

  return (
    <Layout>
      <Helmet>
        <title>Adithya AI Hub — Minimal Editorial Portfolio & Blog</title>
        <meta
          name="description"
          content="AI Learning & Blog Platform by Adithya Kuppusamy. Building AI systems and writing about the process from Tamil Nadu, India."
        />
        <meta property="og:title" content="Adithya AI Hub — Building AI systems. Writing about the process." />
        <meta property="og:description" content="AI Learning & Blog Platform by Adithya Kuppusamy." />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/" />
      </Helmet>

      {/* Section 1 — Hero Header */}
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '64px 24px 48px',
        borderBottom: '1px solid var(--border)'
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '16px'
        }}>
          AI Engineer · Tamil Nadu, India
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: '700',
          color: 'var(--text-primary)',
          lineHeight: '1.1',
          letterSpacing: '-2px',
          maxWidth: '800px'
        }}>
          Building AI systems.<br/>
          Writing about the process.
        </h1>
      </div>

      {/* Section 2 — Magazine Grid */}
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '48px 24px'
      }}>

        {/* Top row — 3 columns equal */}
        <div className="magazine-grid-top" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '32px',
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border)'
        }}>
          {topThreePosts.map(post => (
            <BlogCard key={post.slug} post={post} size="small" />
          ))}
        </div>

        {/* Middle row — large center + 2 side */}
        <div className="magazine-grid-middle" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: '32px',
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border)'
        }}>
          {sidePosts[0] && <BlogCard post={sidePosts[0]} size="small" />}
          {featuredPost && <FeaturedCard post={featuredPost} />}
          {sidePosts[1] && <BlogCard post={sidePosts[1]} size="small" />}
        </div>

        {/* Bottom row — 3 columns */}
        <div className="magazine-grid-bottom" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '32px'
        }}>
          {bottomThreePosts.map(post => (
            <BlogCard key={post.slug} post={post} size="small" />
          ))}
        </div>

      </div>

      {/* Section 3 — Newsletter Subscriber Section */}
      <NewsletterForm />
    </Layout>
  );
}
