import { Layout } from "@/components/Layout";

const About = () => (
  <Layout>
    <section className="container py-20 max-w-3xl">
      <p className="text-sm text-primary font-medium">About</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold">My journey into AI & Data Science</h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          I'm Adithya — a final-year engineering student specializing in Artificial Intelligence
          and Data Science. My path started with curiosity about how machines could reason, and
          quickly evolved into building real systems that solve meaningful problems.
        </p>
        <p>
          Over the last few years I've shipped projects spanning predictive modeling, cloud-native
          deployments, and LLM-powered automation. I learn by building: every concept I study
          becomes a project, every project becomes a story to share.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4">Growth mindset</h2>
        <p>
          I believe the best engineers stay students forever. I spend my mornings on theory,
          afternoons on code, and evenings teaching what I've learned through tutorials and posts.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4">Career objective</h2>
        <p>
          To join a high-velocity team where I can apply machine learning to real, measurable
          impact — and continue growing into a senior AI engineer.
        </p>
        <h2 className="text-2xl font-semibold text-foreground pt-4">What I care about</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Solving real-world problems with applied AI</li>
          <li>Clean, production-grade engineering</li>
          <li>Teaching and lifting the community</li>
          <li>Responsible, transparent AI</li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default About;
