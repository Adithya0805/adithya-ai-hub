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
}

export const projects: Project[] = [
  {
    slug: "health-sense-nexus",
    title: "Health Sense Nexus",
    tagline: "AI-Based Real-Time Health Monitoring System.",
    problem: "Patients and clinicians need a unified system to detect early-stage health risks from multimodal vitals data.",
    solution: "Developed a real-time health monitoring solution using AI and simulated IoT sensors to track patient vitals (heart rate, SpO2, temperature) and detect anomalies automatically. Built LSTM neural networks using TensorFlow/Keras for anomaly prediction; deployed a Flask API on AWS EC2 and designed a Power BI dashboard for live visualisation.",
    impact: "Achieved ~94% anomaly detection accuracy; API handles ~500 predictions/hour with <200 ms response time; dashboard reduced manual review time by 60%.",
    stack: ["Python", "TensorFlow", "Flask", "AWS (EC2, S3, IAM)", "MQTT", "Power BI", "Pandas", "NumPy"],
    github: "https://github.com/Adithya0805",
    category: "AI Systems",
  },
  {
    slug: "mediguard",
    title: "MediGuard",
    tagline: "Multi-Agent Clinical Decision Support System.",
    problem: "Doctors need real-time assistance with differential diagnosis and drug interaction checks.",
    solution: "Enterprise-grade clinical AI using LangGraph multi-agent orchestration, Pinecone vector search for medical RAG, and AWS Bedrock for HIPAA-aware inference. Designed to assist doctors with differential diagnosis and drug interaction checks in real time.",
    stack: ["LangGraph", "Pinecone", "AWS Bedrock", "Python"],
    github: "https://github.com/Adithya0805",
    category: "AI Systems",
  },
  {
    slug: "skillsspeak",
    title: "SkillsSpeak",
    tagline: "AI-driven mock interview platform with role-specific evaluation.",
    problem: "Candidates struggle to find realistic, role-specific mock interviews with actionable feedback.",
    solution: "Built a real-time conversational AI that analyzes responses, scores competency, and delivers actionable feedback.",
    stack: ["React", "Python", "Conversational AI"],
    github: "https://github.com/Adithya0805",
    demo: "https://skillsspeak-1a3ac.web.app/",
    category: "AI Applications",
  },
  {
    slug: "townrise-ai",
    title: "TownRise AI",
    tagline: "Growth intelligence platform analyzing 50+ Tamil Nadu towns.",
    problem: "SMEs lack access to local data and insights for expansion decisions in regional areas.",
    solution: "AI-powered insights platform for SME expansion decisions — solving a real regional problem with local data.",
    stack: ["React", "AI Insights", "Data Analysis"],
    github: "https://github.com/Adithya0805/townrise_App_for_real_estates",
    demo: "https://townrise-app-for-real-estates.vercel.app/",
    category: "Data Analytics",
  },
  {
    slug: "linkedin-automation",
    title: "LinkedIn Automation",
    tagline: "Python pipeline automating job applications and profile scoring.",
    problem: "Manual job search consumes excessive time with low conversion rates.",
    solution: "Developed a Python pipeline automating job applications, profile scoring, and follow-ups.",
    impact: "Cut manual job search from 5 hours/day to 30 minutes — and landed 2 job offers.",
    stack: ["Python", "Automation", "Selenium"],
    github: "https://github.com/Adithya0805/LinkedIn-Automation",
    category: "Automation",
  },
  {
    slug: "bone-health-planner",
    title: "Bone Health Planner",
    tagline: "AI meal recommendation engine for bone health with full Tamil language support.",
    problem: "Lack of regionalized health planners for Tamil-speaking populations.",
    solution: "Created an AI meal recommendation engine for bone health, addressing a real health gap for regional populations.",
    stack: ["Python", "AI", "NLP"],
    github: "https://github.com/Adithya0805",
    demo: "https://health-planner-cc8a8.web.app/",
    category: "AI Applications",
  },
  {
    slug: "personal-ai-chatbot",
    title: "Personal AI Chatbot with NLP Engine",
    tagline: "Conversational AI chatbot responding accurately to queries.",
    problem: "Need for an intelligent chatbot to respond accurately to user queries and casual conversation.",
    solution: "Designed the full NLP pipeline — tokenisation, stop-word removal, TF-IDF vectorisation, and intent-based response system. Implemented using NLTK and Scikit-learn; packaged with a Tkinter desktop GUI for easy user interaction.",
    impact: "Achieved 89% query-response accuracy across 200+ test cases.",
    stack: ["Python", "NLTK", "spaCy", "Scikit-learn", "Tkinter"],
    github: "https://github.com/Adithya0805",
    category: "NLP",
  },
];
