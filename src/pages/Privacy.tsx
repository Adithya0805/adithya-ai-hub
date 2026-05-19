import { Layout } from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <section className="container py-20 max-w-3xl prose-invert">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
        <p>This Privacy Policy describes how Adithya ("we", "our", "us") collects, uses, and protects information when you visit this website.</p>

        <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
        <p>We may collect basic analytics data (pages visited, device type, country) and any information you voluntarily submit through forms (name, email, message).</p>

        <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
        <p>We use cookies to improve your browsing experience and measure traffic. You can disable cookies in your browser settings at any time.</p>

        <h2 className="text-xl font-semibold text-foreground">Third-party services</h2>
        <p>This site may use third-party services such as Google Analytics and Google AdSense, which may set their own cookies and collect data subject to their respective privacy policies.</p>

        <h2 className="text-xl font-semibold text-foreground">Advertising</h2>
        <p>We may display ads served by Google AdSense or similar networks. These providers may use cookies to serve ads based on your prior visits to this and other websites.</p>

        <h2 className="text-xl font-semibold text-foreground">Your rights</h2>
        <p>You have the right to access, correct, or request deletion of any personal information you have shared with us. Contact us anytime to exercise these rights.</p>

        <h2 className="text-xl font-semibold text-foreground">Contact</h2>
        <p>Questions about this policy? Reach out at hello@adithya.dev.</p>
      </div>
    </section>
  </Layout>
);

export default Privacy;
