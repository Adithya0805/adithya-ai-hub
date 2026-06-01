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
  flagship?: boolean;
}

export const projects: Project[] = [
  {
    slug: "mediaguard",
    title: "MediGuard V2",
    tagline: "Enterprise Multi-Agent Clinical Decision Support System (CDSS).",
    problem:
      "Clinicians need real-time, multi-disciplinary decision support—spanning patient triage, symptom severity tracking, RAG-driven differential diagnosis, and allergy-to-drug safety cross-referencing—all within a unified, secure flow.",
    solution:
      "An enterprise-grade stateful Multi-Agent clinical helper designed via LangGraph. Under a clinical supervisor orchestrator, five dedicated agents (Intake, Symptom/Red-Flag, RAG Diagnosis over 50k+ papers, Drug Specialist, and Transcription Report) process patient records, compiling high-fidelity medical PDFs and HL7 FHIR R4 standard composition bundles.",
    impact:
      "Processes full patient records end-to-end in <8s. Operates live with complete Vercel edge reverse-proxies bypassing regional CORS blocks and JioFiber DNS limits.",
    learned:
      "LangGraph StateGraph patterns, production-ready JWT authorization mapping over HTTP edge rewrites, Zustand store localStorage synchronization, and dynamic PDF filtering to eliminate physiological vitals N/A clutter.",
    stack: ["LangGraph", "FastAPI", "Next.js 14", "AWS Bedrock", "Pinecone", "Supabase", "Vercel", "Railway"],
    github: "https://github.com/adithya-kuppusamy/mediguard-v2",
    demo: "https://mediguard-v2.vercel.app",
    category: "AI Systems",
    flagship: true,
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
    flagship: true,
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
