import { Helmet } from "react-helmet-async";
import { ExternalLink, CheckCircle, Lock, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";
import { AdUnit, AdRectangle } from "@/components/AdSlot";

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

const intro = `
  These are the exact resources I used during my journey from a Tamil Nadu engineering 
  student to building production AI systems with LangGraph, AWS Bedrock, and Pinecone. 
  I have filtered out the noise — every resource here is one I personally completed 
  or regularly reference. No filler, no paid promotions.
`;

const categories = [
  {
    title: "Getting Started — Python & ML Basics",
    description: "Start here if you're new to coding or AI. Zero math anxiety required — these resources explain concepts visually before showing any code.",
    resources: [
      {
        name: "CS50P — Python Programming by Harvard",
        url: "https://cs50.harvard.edu/python",
        platform: "edX / Harvard",
        difficulty: "Beginner" as const,
        myTake: "The best free Python course available anywhere. David Malan explains concepts with real examples, not abstract theory. I recommend this to every Tamil Nadu student who wants to learn Python properly from scratch. Complete it before touching any ML library.",
        free: true
      },
      {
        name: "Kaggle Learn — Python & Pandas Micro-courses",
        url: "https://www.kaggle.com/learn",
        platform: "Kaggle",
        difficulty: "Beginner" as const,
        myTake: "These micro-courses are perfect for building muscle memory fast. You get hands-on coding environments directly in your browser without setting up local tools. I used Pandas and Data Cleaning tracks to get comfortable with data manipulation in a weekend.",
        free: true
      },
      {
        name: "3Blue1Brown — Neural Networks Playlist",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
        platform: "YouTube",
        difficulty: "Beginner" as const,
        myTake: "The most beautiful visual explanation of how neural networks, backpropagation, and gradient descent actually work. Watch this series before you write a single line of deep learning code. It builds an intuitive geometric understanding of the math.",
        free: true
      },
      {
        name: "CS50's Introduction to Artificial Intelligence with Python",
        url: "https://cs50.harvard.edu/ai/",
        platform: "Harvard / edX",
        difficulty: "Beginner" as const,
        myTake: "An incredible introduction to classic AI algorithms. It covers search algorithms (like minimax for game playing), constraint satisfaction, and machine learning foundations. The projects are challenging but deeply satisfying to build.",
        free: true
      }
    ]
  },
  {
    title: "Intermediate — Deep Learning & NLP",
    description: "You can code in Python and understand basic ML. Now go deeper into neural network architectures and natural language processing.",
    resources: [
      {
        name: "Andrew Ng's Machine Learning Specialization",
        url: "https://www.deeplearning.ai/courses/machine-learning-specialization/",
        platform: "Coursera / deeplearning.ai",
        difficulty: "Intermediate" as const,
        myTake: "The ultimate classic that everyone in AI has taken. Andrew Ng's ability to explain complex mathematical concepts with simple analogies is unmatched. It was recently updated with Python, making it completely modern and practical.",
        free: true
      },
      {
        name: "fast.ai — Practical Deep Learning for Coders",
        url: "https://course.fast.ai/",
        platform: "fast.ai",
        difficulty: "Intermediate" as const,
        myTake: "A top-down course that teaches you to build and deploy high-performance deep learning models from day one, before diving into the underlying math. Jeremy Howard is a fantastic teacher who focuses on what actually works in production.",
        free: true
      },
      {
        name: "Hugging Face NLP Course",
        url: "https://huggingface.co/learn/nlp-course/",
        platform: "Hugging Face",
        difficulty: "Intermediate" as const,
        myTake: "The absolute best course for learning modern natural language processing. It covers everything from tokenization and model architectures (BERT, GPT) to fine-tuning transformers for your own custom datasets. A must-do for modern AI roles.",
        free: true
      },
      {
        name: "AWS Skill Builder — Cloud Practitioner",
        url: "https://explore.skillbuilder.aws/learn/",
        platform: "AWS",
        difficulty: "Intermediate" as const,
        myTake: "Free official training directly from AWS. It covers all key cloud concepts, IAM security, and core computing services. Cleared my foundations and helped me pass the CLF-C02 certification, which is highly valued by Indian recruiters.",
        free: true
      }
    ]
  },
  {
    title: "Advanced — LLMs, RAG & Agentic AI",
    description: "For engineers who want to go to the absolute frontier — building production RAG pipelines and stateful multi-agent architectures.",
    resources: [
      {
        name: "Andrej Karpathy — Neural Networks: Zero to Hero",
        url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
        platform: "YouTube",
        difficulty: "Advanced" as const,
        myTake: "Karpathy is a master educator. He builds GPT from scratch in Python, explaining every detail of the transformer architecture, backpropagation, and multi-head attention. It is by far the highest-quality technical content on the internet.",
        free: true
      },
      {
        name: "LangGraph Documentation & Cookbooks",
        url: "https://langchain-ai.github.io/langgraph/",
        platform: "LangChain",
        difficulty: "Advanced" as const,
        myTake: "Multi-agent systems represent the absolute frontier of applied AI engineering. LangGraph is how you build stateful, cyclical agent graphs with human-in-the-loop approvals. The official docs and reference cookbooks are goldmines of actual production patterns.",
        free: true
      },
      {
        name: "Pinecone Developer Docs & Vector Bootcamp",
        url: "https://www.pinecone.io/learn/",
        platform: "Pinecone",
        difficulty: "Advanced" as const,
        myTake: "Vector databases are the foundation of RAG systems. This bootcamp teaches you everything about semantic search, index types, metadata filtering, and sparse/dense vectors. Essential if you want to build systems like MediGuard.",
        free: true
      },
      {
        name: "Chip Huyen — Designing Machine Learning Systems",
        url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
        platform: "O'Reilly",
        difficulty: "Advanced" as const,
        myTake: "The single best book on production-grade machine learning. It covers data pipeline design, model training, monitoring, and operationalizing ML models at scale. Essential reading for system design interviews.",
        free: false
      }
    ]
  },
  {
    title: "Interview & Career Prep",
    description: "Resources for cracking placements, technical logical interviews, and presenting yourself professionally as a fresher in India.",
    resources: [
      {
        name: "NeetCode.io — DSA Roadmap",
        url: "https://neetcode.io/roadmap",
        platform: "NeetCode",
        difficulty: "Intermediate" as const,
        myTake: "The most structured and well-explained data structures and algorithms preparation roadmap. Neetcode's video solutions are incredibly clear, clean, and far more helpful than any expensive bootcamps. Absolutely vital for technical coding screens.",
        free: true
      },
      {
        name: "TCS iON Prep Track & Mock Assessments",
        url: "https://learning.tcsionhub.in/",
        platform: "TCS iON",
        difficulty: "Beginner" as const,
        myTake: "The official practice portal for TCS recruitment. It gives you actual mock tests matching the real TCS NQT pattern. Essential for practicing under time pressure and checking if your Python solutions pass their strict test cases.",
        free: true
      },
      {
        name: "IndiaBix — Quantitative & Logical Reasoning",
        url: "https://www.indiabix.com/",
        platform: "IndiaBix",
        difficulty: "Beginner" as const,
        myTake: "The absolute standard prep site for mass recruitment exams in India. I spent weeks practicing logical and mathematical questions here. The comment threads often have shortcut tips that will save you precious seconds during online assessments.",
        free: true
      },
      {
        name: "Tech Interview Handbook",
        url: "https://www.techinterviewhandbook.org/",
        platform: "Open Source",
        difficulty: "Intermediate" as const,
        myTake: "A complete free resource covering resume writing, coding templates, behavioral questions, and negotiation. It helped me structure my STAR stories and prepare for the non-technical aspects of engineering interviews.",
        free: true
      }
    ]
  }
];

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
        <div className="max-w-3xl mb-12">
          <p className="text-sm text-primary font-medium uppercase tracking-wider">Resources</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-white">Free AI/ML Resources</h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            {intro}
          </p>
        </div>

        {/* Top Leaderboard Ad Slot (Content-First compliant spacing) */}
        <div className="my-10">
          <AdUnit adFormat="horizontal" />
        </div>

        <div className="flex gap-8 items-start">
          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 min-w-0 space-y-16">
            {categories.map((category) => (
              <section key={category.title} className="scroll-mt-20">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-3 border-b border-border/60 pb-3">
                  <BookOpen className="w-5 h-5 text-primary shrink-0" />
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground font-mono">
                    {category.resources.length} items
                  </span>
                </div>
                <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
                  {category.description}
                </p>

                {/* Resource Cards Grid */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {category.resources.map((r) => {
                    const colors = tierColors[r.difficulty];
                    return (
                      <div
                        key={r.name}
                        className={`flex flex-col justify-between p-6 rounded-2xl bg-card border ${colors.border} hover:shadow-glow hover:border-primary/40 transition-smooth`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs font-mono text-primary font-semibold">
                              {r.platform}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${colors.badge}`}>
                                {r.difficulty}
                              </span>
                              {r.free ? (
                                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/25 font-bold">
                                  <CheckCircle className="w-2.5 h-2.5" /> Free
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 font-bold">
                                  <Lock className="w-2.5 h-2.5" /> Paid
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-smooth leading-snug">
                            {r.name}
                          </h3>

                          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/40 text-xs md:text-sm text-muted-foreground leading-relaxed italic">
                            <strong className="text-foreground/80 not-italic block mb-1 text-[11px] font-mono uppercase tracking-wider">My Recommendation:</strong>
                            "{r.myTake}"
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border/30">
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-black border border-border hover:border-primary transition-smooth text-foreground"
                          >
                            Access Resource <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="hidden xl:flex flex-col gap-6 w-72 shrink-0">
            {/* Quick tips card */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-white mb-3">💡 Study Tips</h3>
              <ul className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">Start with Python:</strong>
                  <br /> Master loops, functions, lists, and dicts before diving into ML.
                </li>
                <li>
                  <strong className="text-foreground">Build as You Learn:</strong>
                  <br /> Code every project from scratch. Avoid passive video watching.
                </li>
                <li>
                  <strong className="text-foreground">Document Online:</strong>
                  <br /> Write technical blogs or post daily learning updates on LinkedIn.
                </li>
                <li>
                  <strong className="text-foreground">Go Deep, Not Wide:</strong>
                  <br /> Master one specialization (e.g. NLP/RAG) rather than five basics.
                </li>
              </ul>
            </div>

            {/* Ad Compliant sidebar */}
            <div className="flex justify-center my-2">
              <AdRectangle />
            </div>

            {/* My stack */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-white mb-3">My Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "LangGraph",
                  "Pinecone",
                  "AWS Bedrock",
                  "FastAPI",
                  "React",
                  "Next.js",
                  "Docker",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-secondary border border-border text-muted-foreground"
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
