export interface Resource {
  name: string;
  url: string;
  platform: string;
  why: string;
  free: boolean;
}

export interface ResourceTier {
  tier: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  resources: Resource[];
}

export const resourceTiers: ResourceTier[] = [
  {
    tier: "Beginner",
    description:
      "Start here if you're new to AI/ML. Zero math anxiety required — these resources explain concepts visually before showing formulas.",
    resources: [
      {
        name: "CS50's Introduction to AI with Python",
        url: "https://cs50.harvard.edu/ai/",
        platform: "Harvard / edX",
        why:
          "The gold standard free intro course. Covers search, knowledge, uncertainty, optimization, and ML with hands-on Python projects. Takes 6-8 weeks.",
        free: true,
      },
      {
        name: "fast.ai — Practical Deep Learning for Coders",
        url: "https://course.fast.ai/",
        platform: "fast.ai",
        why:
          "Top-down approach: you build working models first, then understand the math. Best for engineers who want results fast. The notebook-first style is addictive.",
        free: true,
      },
      {
        name: "Kaggle Learn — Python + Pandas + ML",
        url: "https://www.kaggle.com/learn",
        platform: "Kaggle",
        why:
          "Micro-courses you can finish in hours, not weeks. Python, Pandas, Scikit-learn, data visualization — all free with completion certificates.",
        free: true,
      },
      {
        name: "3Blue1Brown — Neural Networks (YouTube)",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
        platform: "YouTube",
        why:
          "The most beautiful visual explanation of how neural networks learn. Watch this before any other DL course. 4 videos, ~1 hour total.",
        free: true,
      },
      {
        name: "Python for Everybody (Coursera)",
        url: "https://www.coursera.org/specializations/python",
        platform: "Coursera",
        why:
          "If you're not comfortable with Python yet, do this first. Dr. Chuck's teaching style is exceptionally beginner-friendly. Audit for free.",
        free: true,
      },
    ],
  },
  {
    tier: "Intermediate",
    description:
      "You can code in Python and understand basic ML. Now go deeper into specific domains and build deployable systems.",
    resources: [
      {
        name: "Andrew Ng's Machine Learning Specialization",
        url: "https://www.deeplearning.ai/courses/machine-learning-specialization/",
        platform: "Coursera / deeplearning.ai",
        why:
          "The classic. Updated in 2022 with Python (no more Octave). Covers supervised, unsupervised, and RL. The math is accessible without being dumbed down.",
        free: false,
      },
      {
        name: "Hugging Face NLP Course",
        url: "https://huggingface.co/learn/nlp-course/",
        platform: "Hugging Face",
        why:
          "If you want to work with LLMs, transformers, or NLP — this is THE course. Covers tokenization, fine-tuning BERT/GPT models, and the full Hugging Face ecosystem.",
        free: true,
      },
      {
        name: "LangChain Documentation + Tutorials",
        url: "https://python.langchain.com/docs/tutorials/",
        platform: "LangChain",
        why:
          "Best way to learn LangChain is through their official tutorials. RAG, agents, memory — all covered with working code examples.",
        free: true,
      },
      {
        name: "AWS Skill Builder — Cloud Practitioner",
        url: "https://explore.skillbuilder.aws/learn/",
        platform: "AWS",
        why:
          "Free official AWS training. The Cloud Practitioner path (10 hours) prepares you for the CLF-C02 cert, which is a great resume signal for AI/ML roles.",
        free: true,
      },
      {
        name: "Made With ML — MLOps Course",
        url: "https://madewithml.com/",
        platform: "Made With ML",
        why:
          "Learn how to take an ML model from notebook to production: testing, CI/CD, monitoring, serving. Taught by a former Apple ML lead. Absolutely free.",
        free: true,
      },
      {
        name: "Neetcode.io — DSA Roadmap",
        url: "https://neetcode.io/roadmap",
        platform: "Neetcode",
        why:
          "The best structured DSA resource for technical interviews. Neetcode's videos are cleaner than most paid courses. Essential if you're targeting SDE/ML roles at product companies.",
        free: true,
      },
    ],
  },
  {
    tier: "Advanced",
    description:
      "For engineers who already ship ML systems and want to go to the frontier — LLM internals, research papers, system design at scale.",
    resources: [
      {
        name: "Andrej Karpathy — Neural Networks: Zero to Hero",
        url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
        platform: "YouTube",
        why:
          "Karpathy builds GPT from scratch in Python, from micrograd (autograd engine) to nanoGPT. If you want to understand transformers at the implementation level, there's nothing better.",
        free: true,
      },
      {
        name: "Papers With Code",
        url: "https://paperswithcode.com/",
        platform: "Papers With Code",
        why:
          "The best place to find ML research papers paired with open-source implementations. Browse by task (text generation, object detection, etc.). Essential for staying current.",
        free: true,
      },
      {
        name: "Stanford CS231n — CNNs for Visual Recognition",
        url: "https://cs231n.stanford.edu/",
        platform: "Stanford",
        why:
          "The definitive course on computer vision and CNNs. Lecture notes alone are worth their weight in gold. Assignments are challenging but transform your understanding.",
        free: true,
      },
      {
        name: "LangGraph Documentation",
        url: "https://langchain-ai.github.io/langgraph/",
        platform: "LangChain",
        why:
          "Multi-agent systems are the frontier of applied AI. LangGraph is how you build them properly with stateful, cyclical graphs. The official docs + cookbook are excellent.",
        free: true,
      },
      {
        name: "Chip Huyen — Designing Machine Learning Systems",
        url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
        platform: "O'Reilly",
        why:
          "The best book on production ML systems. Covers data pipelines, training, serving, monitoring, and ML system design interviews. Read this before any system design round.",
        free: false,
      },
      {
        name: "The Batch — deeplearning.ai Newsletter",
        url: "https://www.deeplearning.ai/the-batch/",
        platform: "deeplearning.ai",
        why:
          "Andrew Ng's weekly newsletter. Best way to stay current with AI research and industry without drowning in hype. Curated, opinionated, and consistently excellent.",
        free: true,
      },
    ],
  },
];
