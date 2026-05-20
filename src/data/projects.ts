export interface Project {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  github?: string;
  demo?: string;
  category: string;
  impact?: string;
  learned?: string;
}

export const projects: Project[] = [
  {
    slug: "mediaguard",
    title: "MediGuard",
    tagline: "Multi-Agent Clinical Decision Support System.",
    problem:
      "Doctors need real-time assistance with differential diagnosis and drug interaction checks — current systems are siloed and slow.",
    solution:
      "Enterprise-grade clinical AI using LangGraph multi-agent orchestration, Pinecone vector search for medical RAG, and AWS Bedrock (Claude) for HIPAA-aware inference. A supervisor agent coordinates intake, retrieval, diagnosis, and drug-check agents in a stateful workflow.",
    impact:
      "Capable of processing a clinical case end-to-end in under 8 seconds. Retrieves from 50,000+ indexed medical documents with >90% relevance accuracy.",
    learned:
      "LangGraph StateGraph design patterns, RAG chunking strategies for domain-specific text, AWS Bedrock latency optimization, and the importance of confidence thresholds in high-stakes AI systems.",
    stack: ["LangGraph", "Pinecone", "AWS Bedrock", "Python", "FastAPI", "Claude 3"],
    github: "https://github.com/Adithya0805",
    category: "AI Systems",
  },
  {
    slug: "townrise-ai",
    title: "TownRise AI",
    tagline: "Growth intelligence platform analyzing 50+ Tamil Nadu towns.",
    problem:
      "SMEs in Tamil Nadu lack access to local data and AI-driven insights for expansion decisions in regional markets.",
    solution:
      "AI-powered real estate & business expansion platform built with Next.js + Supabase + Google Gemini API. Users can analyze real estate metrics (growth score, AI score, pricing trends) for any Tamil Nadu town, with results persisted in Supabase.",
    impact:
      "Analyzed 50+ Tamil Nadu towns with live data. Deployed on Vercel with real-time AI scoring.",
    learned:
      "Supabase real-time subscriptions, Gemini API prompt engineering for structured output, Next.js App Router data fetching patterns, and building for vernacular/regional user contexts.",
    stack: ["Next.js", "Supabase", "Gemini API", "TypeScript", "Tailwind CSS", "Vercel"],
    github: "https://github.com/Adithya0805/townrise_App_for_real_estates",
    demo: "https://townrise-app-for-real-estates.vercel.app/",
    category: "Data Analytics",
  },
  {
    slug: "health-sense-nexus",
    title: "Health Sense Nexus",
    tagline: "AI-Based Real-Time Health Monitoring System.",
    problem:
      "Patients and clinicians need a unified system to detect early-stage health risks from multimodal vitals data in real time.",
    solution:
      "Real-time health monitoring solution using LSTM neural networks (TensorFlow/Keras) for anomaly prediction on simulated IoT vitals (heart rate, SpO2, temperature). Flask API deployed on AWS EC2, Power BI dashboard for live visualization.",
    impact:
      "~94% anomaly detection accuracy. API handles ~500 predictions/hour with <200ms response time. Dashboard reduced manual review time by 60%.",
    learned:
      "LSTM architecture for time-series anomaly detection, Flask API production deployment on EC2, MQTT protocol for IoT simulation, and Power BI integration with live Python data feeds.",
    stack: ["Python", "TensorFlow", "Flask", "AWS EC2", "AWS S3", "MQTT", "Power BI", "NumPy"],
    github: "https://github.com/Adithya0805",
    category: "AI Systems",
  },
  {
    slug: "trading-bot",
    title: "Binance Futures Trading Bot",
    tagline: "Automated Python trading bot for Binance Futures Testnet.",
    problem:
      "Manual crypto trading requires 24/7 attention and emotional decision-making — both are losing strategies.",
    solution:
      "Python trading bot implementing momentum + RSI strategy on Binance Futures Testnet. Features automated order execution, stop-loss/take-profit management, position sizing, and a performance dashboard with PnL tracking.",
    impact:
      "Tested over 3 months on Binance Futures Testnet with a 63% win rate on BTC/USDT scalping strategy.",
    learned:
      "Binance API authentication and rate limiting, asyncio for concurrent order monitoring, risk management math (position sizing, Kelly criterion), and the importance of backtesting before live deployment.",
    stack: ["Python", "Binance API", "asyncio", "Pandas", "TA-Lib", "SQLite"],
    github: "https://github.com/Adithya0805/trading-bot",
    category: "Automation",
  },
  {
    slug: "skillsspeak",
    title: "SkillsSpeak",
    tagline: "AI-driven mock interview platform with role-specific evaluation.",
    problem:
      "Candidates struggle to find realistic, role-specific mock interviews with actionable, instant feedback.",
    solution:
      "Real-time conversational AI platform that conducts mock technical and behavioral interviews, scores competency across multiple dimensions, and delivers structured feedback with improvement tips.",
    learned:
      "Firebase real-time database for live conversation state, conversational AI design (turn management, context retention), and building evaluation rubrics that give meaningful signal rather than generic feedback.",
    stack: ["React", "Python", "Firebase", "Conversational AI", "Speech API"],
    github: "https://github.com/Adithya0805",
    demo: "https://skillsspeak-1a3ac.web.app/",
    category: "AI Applications",
  },
  {
    slug: "linkedin-automation",
    title: "LinkedIn Job Automation",
    tagline: "Python pipeline automating job applications and profile scoring.",
    problem:
      "Manual job search consumes 4-5 hours daily with low conversion rates and no personalization at scale.",
    solution:
      "Python automation pipeline using Selenium for job discovery, NLP-based profile-to-JD matching score, and automated application with personalized cover letter generation via OpenAI API.",
    impact:
      "Cut manual job search from 5 hours/day to 30 minutes. Applied to 300+ roles in 2 weeks. Landed 2 job offers.",
    learned:
      "Selenium anti-detection techniques (human-like delays, randomized patterns), NLP text similarity for JD matching, and the ethics of automation — staying within platform ToS boundaries.",
    stack: ["Python", "Selenium", "OpenAI API", "NLTK", "Pandas"],
    github: "https://github.com/Adithya0805/LinkedIn-Automation",
    category: "Automation",
  },
  {
    slug: "bone-health-planner",
    title: "Bone Health Planner",
    tagline: "AI meal recommendation engine for bone health with Tamil language support.",
    problem:
      "No personalized, regionalized health planners exist for Tamil-speaking populations with dietary and cultural considerations.",
    solution:
      "AI meal recommendation engine for bone health using a knowledge graph of regional Tamil foods + nutritional data. Full Tamil language UI support for accessibility to non-English speakers.",
    learned:
      "Knowledge graph construction for nutritional data, multilingual NLP for Tamil text, and designing for accessibility-first user experiences in regional language contexts.",
    stack: ["Python", "AI", "NLP", "Tamil NLP", "Firebase"],
    github: "https://github.com/Adithya0805",
    demo: "https://health-planner-cc8a8.web.app/",
    category: "AI Applications",
  },
];
