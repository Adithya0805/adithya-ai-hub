import { Helmet } from "react-helmet-async";
import { ExternalLink, CheckCircle, Lock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { AdUnit, AdRectangle } from "@/components/AdSlot";
import { resourceTiers } from "@/data/resources";

const tierColors = {
  Beginner: {
    badge: "bg-green-500/10 text-green-400 border-green-500/20",
    border: "border-green-500/20",
    dot: "bg-green-500",
  },
  Intermediate: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    border: "border-blue-500/20",
    dot: "bg-blue-500",
  },
  Advanced: {
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    border: "border-purple-500/20",
    dot: "bg-purple-500",
  },
};

const Resources = () => {
  return (
    <Layout>
      <Helmet>
        <title>Free AI/ML Learning Resources 2026 | Adithya AI Hub</title>
        <meta
          name="description"
          content="Curated free AI and Machine Learning learning resources for 2026. From beginner Python to advanced LLMs and RAG systems. Handpicked by an AI engineer."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/resources" />
        <meta property="og:title" content="Free AI/ML Learning Resources 2026 | Adithya AI Hub" />
        <meta
          property="og:description"
          content="Curated free AI/ML resources from beginner to advanced — handpicked by an AI engineer who used them."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/resources" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Adithya AI Hub" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container py-20">
        {/* Header */}
        <div className="max-w-2xl mb-4">
          <p className="text-sm text-primary font-medium">Resources</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Free AI/ML Resources</h1>
          <p className="mt-4 text-muted-foreground">
            Every resource here is one I've personally used or vetted. No filler lists — just the
            best materials for going from zero to ML engineer. Organized from beginner to advanced.
          </p>
        </div>

        {/* Top leaderboard ad */}
        <AdUnit adFormat="horizontal" className="mb-10" />

        <div className="flex gap-8 items-start">
          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0 space-y-16">
            {resourceTiers.map((tier) => {
              const colors = tierColors[tier.tier];
              return (
                <section key={tier.tier}>
                  {/* Tier header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    <h2 className="text-2xl font-bold">{tier.tier}</h2>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${colors.badge}`}
                    >
                      {tier.resources.length} resources
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6 text-sm">{tier.description}</p>

                  <div className="space-y-4">
                    {tier.resources.map((r) => (
                      <div
                        key={r.name}
                        className={`p-5 rounded-2xl bg-card border ${colors.border} hover:shadow-card transition-smooth`}
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-semibold">{r.name}</h3>
                              {r.free ? (
                                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                                  <CheckCircle className="w-2.5 h-2.5" /> Free
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                  <Lock className="w-2.5 h-2.5" /> Paid
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-primary font-medium mb-2">{r.platform}</p>
                            <p className="text-sm text-muted-foreground">{r.why}</p>
                          </div>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-smooth shrink-0"
                          >
                            Visit <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="hidden xl:flex flex-col gap-6 w-72 shrink-0">
            {/* Quick tips card */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold mb-3">💡 Study Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Start with Python — everything else follows</li>
                <li>• Build one project per course, not just watch</li>
                <li>• Post your projects to GitHub with README</li>
                <li>• Write about what you learn (like this blog)</li>
                <li>• One deep specialization &gt; five shallow ones</li>
              </ul>
            </div>

            {/* Ad */}
            <div className="flex justify-center">
              <AdRectangle />
            </div>

            {/* My stack */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold mb-3">My Current Stack</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "LangGraph",
                  "Pinecone",
                  "AWS",
                  "FastAPI",
                  "React",
                  "Next.js",
                  "TensorFlow",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
