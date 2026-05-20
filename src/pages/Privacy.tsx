import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <Helmet>
      <title>Privacy Policy | Adithya AI Hub</title>
      <meta
        name="description"
        content="Privacy Policy for Adithya AI Hub — how we collect data, use cookies, and work with Google AdSense."
      />
    </Helmet>

    <div className="container py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-10 text-sm">
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="space-y-10 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong className="text-foreground">Adithya AI Hub</strong> ("Site", "we",
            "us", or "our"). This Privacy Policy explains how we collect, use, and protect
            information when you visit adithya-ai-hub.vercel.app. By using this Site, you agree to
            the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Email addresses</strong> — voluntarily provided
              when you subscribe to our newsletter via the subscription form.
            </li>
            <li>
              <strong className="text-foreground">Contact form data</strong> — name, email, and
              message submitted through the contact form on the About page.
            </li>
            <li>
              <strong className="text-foreground">Usage data</strong> — automatically collected via
              Google Analytics (page views, session duration, referral sources, browser type).
            </li>
            <li>
              <strong className="text-foreground">Cookies</strong> — set by Google Analytics and
              Google AdSense for analytics and advertising purposes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To send you newsletters and blog updates (only if you subscribed).</li>
            <li>To respond to messages sent through the contact form.</li>
            <li>To understand Site traffic and improve content.</li>
            <li>To serve relevant advertisements through Google AdSense.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            4. Google AdSense &amp; Third-Party Advertising
          </h2>
          <p className="mb-3">
            This Site uses <strong className="text-foreground">Google AdSense</strong> (Publisher
            ID: <code className="text-primary">ca-pub-3472487398342700</code>) to display
            advertisements. Google may use cookies to serve ads based on your prior visits to this
            and other websites.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Google's use of advertising cookies enables it to serve ads based on your visit to
              this site and other sites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              For more information about how Google uses data, visit{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Google Privacy Policy
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
          <p>
            We use cookies through Google Analytics and Google AdSense. These cookies collect
            information about your use of the Site, such as pages visited and links clicked. You can
            control cookie settings through your browser. Disabling cookies may affect some
            functionality of the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            6. Third-Party Services
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Formspree</strong> — processes contact form and
              newsletter submissions. See{" "}
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Formspree Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong className="text-foreground">Google Analytics</strong> — collects anonymized
              usage data. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Google Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> — hosting provider. May collect
              server-side logs. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Vercel Privacy Policy
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Data Retention</h2>
          <p>
            Email addresses collected for newsletters are retained until you unsubscribe. Contact
            form messages are retained only as long as necessary to respond to your inquiry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal
            data. To exercise these rights, contact us at{" "}
            <a
              href="mailto:adithyaadhi0805@gmail.com"
              className="text-primary hover:underline"
            >
              adithyaadhi0805@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Children's Privacy</h2>
          <p>
            This Site is not directed to children under 13. We do not knowingly collect personal
            information from children under 13. If you believe a child has provided us with personal
            information, contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected by an
            updated "Last updated" date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
          <p>
            For privacy-related questions, email:{" "}
            <a
              href="mailto:adithyaadhi0805@gmail.com"
              className="text-primary hover:underline"
            >
              adithyaadhi0805@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </Layout>
);

export default Privacy;
