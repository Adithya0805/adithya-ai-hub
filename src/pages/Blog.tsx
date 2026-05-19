import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { posts } from "@/data/posts";
import { AdSlot } from "@/components/AdSlot";

const categories = ["All", "AI", "Machine Learning", "Python", "AWS", "Career Preparation", "Interview Experience", "Project Tutorials"];

const Blog = () => {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? posts : posts.filter((p) => p.category === cat);

  return (
    <Layout>
      <section className="container py-20">
        <p className="text-sm text-primary font-medium">Blog</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Articles & Tutorials</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Deep dives on machine learning, AWS, Python, and career advice for aspiring AI engineers.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-smooth ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-smooth">
              <div className="aspect-[16/9] bg-hero relative">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded bg-background/80 backdrop-blur">{p.category}</div>
              </div>
              <div className="p-5">
                <h2 className="font-semibold leading-snug group-hover:text-primary transition-smooth">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{p.readTime} read · {new Date(p.date).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>

        <AdSlot />
      </section>
    </Layout>
  );
};

export default Blog;
