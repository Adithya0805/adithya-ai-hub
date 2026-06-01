import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { posts } from "@/data/posts";
import { AdUnit, AdRectangle } from "@/components/AdSlot";
import { ReadingProgress } from "@/components/ReadingProgress";
import { AuthorCard } from "@/components/AuthorCard";
import { BlogCard } from "@/components/BlogCard";
import { TagBadge } from "@/components/TagBadge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { calculateReadTime } from "@/lib/utils";

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTimeDynamic = calculateReadTime(post.content);

  // Related posts: same category, exclude current
  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Auto-split content at "mid" point for in-article ad
  const splitContent = (html: string) => {
    // Find the 3rd occurrence of </p> to inject ad after it
    let count = 0;
    let splitIdx = -1;
    for (let i = 0; i < html.length - 3; i++) {
      if (html.slice(i, i + 4) === "</p>") {
        count++;
        if (count === 3) {
          splitIdx = i + 4;
          break;
        }
      }
    }
    if (splitIdx === -1) return { part1: html, part2: "" };
    return { part1: html.slice(0, splitIdx), part2: html.slice(splitIdx) };
  };

  const { part1, part2 } = splitContent(post.content);

  // Table of contents from h2 tags
  const headings = [...post.content.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(
    (m) => m[1].replace(/<[^>]+>/g, "")
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "wordCount": wordCount,
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
      <ReadingProgress />

      <Helmet>
        <title>{post.title} | Adithya AI Hub</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://adithya-ai-hub.vercel.app/blog/${post.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="container py-20">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb text-xs text-muted-foreground mb-6 flex items-center gap-1.5 select-none" aria-label="breadcrumb">
            <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary transition-smooth">Blog</Link>
            <span>/</span>
            <span className="text-foreground/80 font-medium truncate max-w-[240px]">{post.title}</span>
          </nav>

          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Header */}
          <TagBadge tag={post.category} />
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground border-b border-border/40 pb-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {readTimeDynamic}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              Published: {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              Last updated: {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>

          {/* Hero image placeholder */}
          <div className="mt-8 aspect-[16/7] rounded-2xl bg-hero grid-bg border border-border overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Adithya AI Hub</span>
            </div>
          </div>

          {/* Ad: below title */}
          {wordCount > 600 && <AdUnit adSlot="1234567890" adFormat="horizontal" className="mt-8" />}

          {/* Table of contents */}
          {headings.length > 0 && (
            <nav className="mt-8 p-5 rounded-xl bg-card border border-border">
              <p className="text-sm font-semibold mb-3">Table of Contents</p>
              <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal pl-5">
                {headings.map((h, i) => (
                  <li key={i} className="hover:text-primary transition-smooth cursor-pointer">
                    {h}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Article content — Part 1 */}
          <div
            className="mt-8 prose-blog"
            dangerouslySetInnerHTML={{ __html: part1 }}
          />

          {/* Mid-article ad (after 3rd paragraph) */}
          {part2 && (
            <>
              {wordCount > 600 && (
                <div className="my-8 flex justify-center">
                  <AdRectangle />
                </div>
              )}
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: part2 }}
              />
            </>
          )}

          {/* Ad: above related posts */}
          {wordCount > 600 && <AdUnit adSlot="1234567890" adFormat="horizontal" className="mt-10" />}

          {/* Author card */}
          <AuthorCard />
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto mt-14">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} featured />
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;
