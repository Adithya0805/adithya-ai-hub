import { useState } from "react";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";
import { Github, Linkedin, Mail, MessageCircle, Send, Copy, ArrowUpRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  message: z.string().trim().min(8, "Message is too short").max(2000),
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }

    const subject = encodeURIComponent(`Inquiry from ${form.name.trim()} via Adithya AI Hub`);
    const body = encodeURIComponent(
      `Hi Adithya,\n\n${form.message.trim()}\n\n---\nFrom: ${form.name.trim()}\nEmail: ${form.email.trim()}`
    );

    // Launch default email client
    window.location.href = `mailto:adithyaadhi0805@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    toast.success("Opening your email client to send message to Adithya!");
  };

  const handleSendWhatsApp = () => {
    const text = form.message.trim()
      ? `Hi Adithya, my name is ${form.name || "a visitor"} (${form.email || "email"}). ${form.message}`
      : "Hi Adithya, I visited your AI portfolio and would like to discuss an opportunity/project!";
    window.open(`https://wa.me/918825714576?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("adithyaadhi0805@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Adithya Kuppusamy | AI & Data Science Engineer</title>
        <meta
          name="description"
          content="Get in touch with Adithya Kuppusamy, AI & Data Science Engineer. Let's discuss AI models, freelance projects, collaborations, or job opportunities."
        />
        <link rel="canonical" href="https://adithya-ai-hub.vercel.app/contact" />
        <meta property="og:title" content="Contact Adithya Kuppusamy | AI Engineer" />
        <meta
          property="og:description"
          content="Get in touch with Adithya Kuppusamy. Available for full-time AI/ML roles and freelance development."
        />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/contact" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "100px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "64px", borderBottom: "1px solid var(--border)", paddingBottom: "32px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "var(--accent)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Direct Communication
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: "400",
              color: "var(--text-1)",
              letterSpacing: "-1.5px",
              lineHeight: "1.1",
              marginBottom: "16px",
            }}
          >
            Let's build something <span style={{ color: "var(--accent)", fontStyle: "italic" }}>extraordinary.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-2)", maxWidth: "560px", lineHeight: "1.7" }}>
            Whether you are hiring for a full-time AI/ML role, need a production web platform for your business,
            or want to consult on generative AI & RAG architectures — I respond within 24 hours.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "56px",
            alignItems: "start",
          }}
          className="flagship-grid"
        >
          {/* Left Column — Direct Channels */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "24px",
                color: "var(--text-1)",
                marginBottom: "20px",
                fontWeight: "400",
              }}
            >
              Direct Channels
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "var(--bg-1)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Mail size={18} style={{ color: "var(--accent)" }} />
                  <div>
                    <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase" }}>Primary Email</p>
                    <p style={{ fontSize: "14px", color: "var(--text-1)", fontWeight: "500" }}>adithyaadhi0805@gmail.com</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--text-2)",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {copied ? <CheckCircle2 size={13} style={{ color: "#4ade80" }} /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <a
                href="https://wa.me/918825714576"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "rgba(37, 211, 102, 0.05)",
                  border: "1px solid rgba(37, 211, 102, 0.2)",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <MessageCircle size={18} style={{ color: "#25D366" }} />
                  <div>
                    <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase" }}>Instant Chat</p>
                    <p style={{ fontSize: "14px", color: "var(--text-1)", fontWeight: "500" }}>WhatsApp (+91 88257 14576)</p>
                  </div>
                </div>
                <span style={{ fontSize: "12px", color: "#25D366", fontWeight: "600" }}>Chat Now →</span>
              </a>

              <a
                href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "var(--bg-1)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Linkedin size={18} style={{ color: "#0A66C2" }} />
                  <div>
                    <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase" }}>Professional Network</p>
                    <p style={{ fontSize: "14px", color: "var(--text-1)", fontWeight: "500" }}>LinkedIn Profile</p>
                  </div>
                </div>
                <ArrowUpRight size={16} style={{ color: "var(--text-3)" }} />
              </a>

              <a
                href="https://github.com/Adithya0805"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "var(--bg-1)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Github size={18} style={{ color: "var(--text-1)" }} />
                  <div>
                    <p style={{ fontSize: "11px", color: "var(--text-3)", textTransform: "uppercase" }}>Open Source</p>
                    <p style={{ fontSize: "14px", color: "var(--text-1)", fontWeight: "500" }}>github.com/Adithya0805</p>
                  </div>
                </div>
                <ArrowUpRight size={16} style={{ color: "var(--text-3)" }} />
              </a>
            </div>

            <div
              style={{
                padding: "20px",
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-1)", marginBottom: "4px" }}>
                📍 Location & Relocation
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: "1.6" }}>
                Based in Ambur, Tamil Nadu. Actively open to immediate relocation to Bengaluru, Chennai, Hyderabad, Pune,
                or remote engineering positions globally.
              </p>
            </div>
          </div>

          {/* Right Column — Interactive Inquiry Form */}
          <div
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "40px 32px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "24px",
                color: "var(--text-1)",
                marginBottom: "8px",
                fontWeight: "400",
              }}
            >
              Send an Inquiry
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "28px" }}>
              Fill this in to draft an email directly or start an instant chat.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--text-2)", marginBottom: "6px" }}>
                  Your Name / Company *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma or Tech Startup Inc."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: "var(--text-1)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--text-2)", marginBottom: "6px" }}>
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@company.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: "var(--text-1)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "var(--text-2)", marginBottom: "6px" }}>
                  Message / Project Details *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the role, project, timeline, or idea..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: "var(--text-1)",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: "1.6",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px 24px",
                    background: "var(--text-1)",
                    color: "var(--bg-0)",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  <Send size={15} /> Send via Email
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px 20px",
                    background: "rgba(37, 211, 102, 0.1)",
                    color: "#25D366",
                    border: "1px solid rgba(37, 211, 102, 0.3)",
                    borderRadius: "6px",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  <MessageCircle size={15} /> Send WhatsApp
                </button>
              </div>

              {submitted && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(74, 222, 128, 0.08)",
                    border: "1px solid rgba(74, 222, 128, 0.2)",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "#4ade80",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CheckCircle2 size={16} /> Email client opened! If it didn't trigger, you can email directly to{" "}
                  <strong>adithyaadhi0805@gmail.com</strong>.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
