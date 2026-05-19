import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { posts } from "@/data/posts";
import { AdSlot } from "@/components/AdSlot";
import { ArrowLeft } from "lucide-react";

function renderContent(md: string) {
  const blocks = md.trim().split(/\n\n+/);
  return blocks.map((b, i) => {
    if (b.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-10 mb-3">{b.slice(3)}</h2>;
    if (b.startsWith("```")) {
      const code = b.replace(/```[a-z]*\n?/, "").replace(/```$/, "");
      return (
        <pre key={i} className="my-5 rounded-xl bg-secondary/60 border border-border p-4 overflow-x-auto text-sm font-mono">
          <code>{code}</code>
        </pre>
      );
    }
    if (b.startsWith("- ")) {
      const items = b.split("\n").map((l) => l.replace(/^- /, ""));
      return <ul key={i} className="list-disc pl-6 space-y-1 my-4 text-muted-foreground">{items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    }
    return <p key={i} className="my-4 text-muted-foreground leading-relaxed">{b}</p>;
  });
}

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const toc = post.content.split("\n").filter((l) => l.startsWith("## ")).map((l) => l.slice(3));

  return (
    <Layout>
      <article className="container py-20 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
        <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">{post.category}</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
        <p className="mt-4 text-muted-foreground">{post.readTime} read · {new Date(post.date).toLocaleDateString()}</p>

        <div className="mt-8 aspect-[16/8] rounded-2xl bg-hero grid-bg border border-border" />

        {toc.length > 0 && (
          <nav className="mt-10 p-5 rounded-xl bg-card border border-border">
            <p className="text-sm font-semibold mb-3">Table of contents</p>
            <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal pl-5">
              {toc.map((t) => <li key={t}>{t}</li>)}
            </ol>
          </nav>
        )}

        <div className="mt-8">{renderContent(post.content)}</div>

        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-secondary">#{t}</span>
          ))}
        </div>

        <AdSlot />

        <section className="mt-10 p-6 rounded-xl bg-card border border-border">
          <h3 className="font-semibold">Comments</h3>
          <p className="text-sm text-muted-foreground mt-2">Comments are coming soon. In the meantime, reach out via the contact page.</p>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
