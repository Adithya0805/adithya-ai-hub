import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";

const Terms = () => (
  <Layout>
    <Helmet>
      <title>Terms of Service | Adithya AI Hub</title>
      <meta
        name="description"
        content="Read the Terms of Service for using Adithya AI Hub. Understand standard terms of service, usage conditions, and policy disclosures for our code snippets and AI tutorials."
      />
      <link rel="canonical" href="https://adithya-ai-hub.vercel.app/terms" />
      <meta property="og:title" content="Terms of Service | Adithya AI Hub" />
      <meta
        property="og:description"
        content="Read the Terms of Service and usage conditions for using Adithya AI Hub's free code snippets and tutorials."
      />
      <meta property="og:url" content="https://adithya-ai-hub.vercel.app/terms" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Adithya AI Hub" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>

    <section className="container py-20 max-w-3xl">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
        <p>By accessing this website, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the site.</p>

        <h2 className="text-xl font-semibold text-foreground">Content</h2>
        <p>All content on this site is provided for educational and informational purposes. While we strive for accuracy, we make no warranties regarding completeness or reliability.</p>

        <h2 className="text-xl font-semibold text-foreground">Intellectual property</h2>
        <p>All articles, code samples, and visuals are the property of the author unless otherwise stated. You may share excerpts with proper attribution and a link back.</p>

        <h2 className="text-xl font-semibold text-foreground">Use of code samples</h2>
        <p>Code samples are provided under the MIT license unless explicitly noted. Use at your own risk.</p>

        <h2 className="text-xl font-semibold text-foreground">Limitation of liability</h2>
        <p>We are not liable for any damages arising from the use of this site or its content.</p>

        <h2 className="text-xl font-semibold text-foreground">Changes</h2>
        <p>These terms may be updated at any time. Continued use of the site constitutes acceptance of any changes.</p>
      </div>
    </section>
  </Layout>
);

export default Terms;
