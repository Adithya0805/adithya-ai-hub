import { Layout } from "@/components/Layout";

const About = () => (
  <Layout>
    <section className="container py-20 max-w-3xl">
      <p className="text-sm text-primary font-medium">About</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold">From Tamil Nadu to Production AI</h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          I'm Adithya K — a B.Tech Artificial Intelligence and Data Science graduate from Ambur, Tamil Nadu (Dhanalakshmi Srinivasan College of Engineering, CGPA: 8.5). My path started with curiosity about how machines could reason, and quickly evolved into building real systems that solve meaningful problems.
        </p>
        <p>
          While most freshers showcase classroom projects, I focus on shipping production ML systems. Over the last few years I've shipped projects spanning predictive modeling, cloud-native deployments, and LLM-powered automation — from multi-agent clinical AI to automated job-search pipelines.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4">Engineering Philosophy</h2>
        <p>
          My engineering philosophy is simple: build things that actually run in the real world. Every project on this portfolio has a live URL, real users, and measurable outcomes.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4">Career Objective</h2>
        <p>
          A collaborative problem-solver seeking an entry-level AI/Data Science role to apply technical skills and contribute to data-driven decision-making. Targeting ML Engineer, Data Scientist, and AI Developer roles at Wipro, Infosys, Cognizant, and startups pushing the edge of AI.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4">What I care about</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Solving real-world problems with applied AI</li>
          <li>Clean, production-grade engineering</li>
          <li>Teaching and lifting the community</li>
          <li>Responsible, transparent AI</li>
        </ul>
        <h2 className="text-2xl font-semibold text-foreground pt-4">Languages</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>English (Professional)</li>
          <li>Tamil (Native)</li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default About;
