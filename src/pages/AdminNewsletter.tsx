import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { posts } from "@/data/posts";
import { toast } from "sonner";
import {
  Send,
  Lock,
  Loader2,
  MailCheck,
  Users,
  Download,
  ExternalLink,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface SubscriberContact {
  id?: number;
  email: string;
  createdAt?: string;
  emailBlacklisted?: boolean;
}

const AdminNewsletter = () => {
  const [activeTab, setActiveTab] = useState<"broadcast" | "subscribers">("broadcast");
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug || "");
  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Subscribers state
  const [subscribers, setSubscribers] = useState<SubscriberContact[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isFetchingSubscribers, setIsFetchingSubscribers] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [isSubscribingTest, setIsSubscribingTest] = useState(false);
  const [ipError, setIpError] = useState(false);

  const selectedPost = posts.find((p) => p.slug === selectedSlug);

  const safeJsonParse = async (response: Response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      if (!response.ok) {
        throw new Error(
          `Server Error (${response.status}): ${
            text.includes("A server error")
              ? "Vercel function error. Check your BREVO_API_KEY and NEWSLETTER_SECRET environment variables."
              : text.slice(0, 140)
          }`
        );
      }
      return {};
    }
  };

  // Fetch live subscribers from Brevo via /api/subscribers
  const fetchSubscribers = async () => {
    if (!secretKey) {
      toast.error("Please enter your Master Password (NEWSLETTER_SECRET) first.");
      return;
    }

    setIsFetchingSubscribers(true);
    try {
      const response = await fetch("/api/subscribers", {
        headers: {
          "x-secret-key": secretKey,
        },
      });

      const data = await safeJsonParse(response);

      if (!response.ok) {
        if (data.error && (data.error.includes("IP") || data.error.includes("authorised_ips"))) {
          setIpError(true);
        }
        throw new Error(data.error || `Failed to fetch subscribers (HTTP ${response.status}).`);
      }

      setIpError(false);
      setSubscribers(data.contacts || []);
      setTotalCount(data.count ?? (data.contacts ? data.contacts.length : 0));
      toast.success(`Fetched ${data.count || 0} subscribers from Brevo List #3!`);
    } catch (err: any) {
      if (err.message && (err.message.includes("IP") || err.message.includes("authorised_ips"))) {
        setIpError(true);
      }
      toast.error(err.message || "Failed to fetch subscribers.");
    } finally {
      setIsFetchingSubscribers(false);
    }
  };

  // Export subscribers to CSV
  const exportToCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export yet.");
      return;
    }

    const headers = "ID,Email,SubscribedAt,Status\n";
    const rows = subscribers
      .map(
        (s) =>
          `"${s.id || ""}","${s.email}","${s.createdAt || new Date().toISOString()}","${
            s.emailBlacklisted ? "Unsubscribed" : "Active"
          }"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `adithya_ai_hub_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscribers list exported as CSV!");
  };

  // Add test subscriber directly
  const handleAddTestSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || !testEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribingTest(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail.trim(), name: "Admin Test" }),
      });
      const data = await safeJsonParse(res);
      if (res.ok && data.success) {
        toast.success(`Success! ${testEmail} added to Brevo List #3.`);
        setTestEmail("");
        if (secretKey) fetchSubscribers();
      } else {
        toast.error(data.error || "Failed to add subscriber to Brevo.");
      }
    } catch (err: any) {
      toast.error(err.message || "Network error adding subscriber.");
    } finally {
      setIsSubscribingTest(false);
    }
  };

  // Launch newsletter broadcast campaign
  const handleLaunchCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) {
      toast.error("Please select a post to broadcast.");
      return;
    }
    if (!secretKey) {
      toast.error("Master Password (NEWSLETTER_SECRET) is required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": secretKey,
        },
        body: JSON.stringify({
          postTitle: selectedPost.title,
          postSlug: selectedPost.slug,
          postExcerpt: selectedPost.excerpt,
          postCategory: selectedPost.category,
          postReadTime: selectedPost.readTime,
        }),
      });

      const data = await safeJsonParse(response);

      if (!response.ok) {
        throw new Error(data.error || `Failed to broadcast campaign (HTTP ${response.status}).`);
      }

      toast.success(data.message || "Broadcast complete! Emails delivered to Brevo subscribers.");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong broadcasting campaign.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Newsletter & Subscriber Hub | Adithya AI Hub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container py-20 max-w-4xl" style={{ margin: "0 auto", padding: "100px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "36px", borderBottom: "1px solid var(--border)", paddingBottom: "24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 12px", borderRadius: "100px", border: "1px solid rgba(200,169,110,0.3)", background: "rgba(200,169,110,0.08)", marginBottom: "16px" }}>
            <Lock size={12} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>
              Secure Admin Hub · Brevo List #3
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: "400", color: "var(--text-1)", letterSpacing: "-1px", margin: 0 }}>
            Newsletter & <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Audience Studio.</span>
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-2)", marginTop: "12px", lineHeight: "1.6", maxWidth: "680px" }}>
            Manage active subscribers in Brevo List #3, test subscriptions, export audience lists to CSV,
            and broadcast instant email dispatches for published blog posts.
          </p>
        </div>

        {/* Brevo IP Whitelist Alert */}
        {ipError && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              marginBottom: "28px",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
            }}
          >
            <AlertCircle size={20} style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }} />
            <div style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--text-1)" }}>
              <div style={{ color: "#f87171", fontWeight: "700", marginBottom: "4px" }}>
                Action Required: Brevo IP Blocking is Active
              </div>
              <p style={{ margin: "0 0 12px", color: "var(--text-2)" }}>
                Brevo is blocking Vercel cloud requests because &quot;Blocking unauthorized IP addresses&quot; is turned on in your Brevo account. Because Vercel uses cloud servers with dynamic IPs, you must deactivate IP blocking in Brevo so your website and visitors can connect.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href="https://app.brevo.com/security/authorised_ips"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 14px",
                    background: "#ef4444",
                    color: "#ffffff",
                    borderRadius: "6px",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontSize: "12px",
                  }}
                >
                  <span>Open Brevo Security Settings</span>
                  <ExternalLink size={12} />
                </a>
                <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
                  Click <strong>Deactivate for API</strong> and <strong>Deactivate for SMTP</strong>.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "32px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("broadcast")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "8px",
              border: activeTab === "broadcast" ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: activeTab === "broadcast" ? "rgba(200, 169, 110, 0.15)" : "var(--bg-1)",
              color: activeTab === "broadcast" ? "var(--accent)" : "var(--text-2)",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <Send size={15} /> Broadcast New Post
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("subscribers")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "8px",
              border: activeTab === "subscribers" ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: activeTab === "subscribers" ? "rgba(200, 169, 110, 0.15)" : "var(--bg-1)",
              color: activeTab === "subscribers" ? "var(--accent)" : "var(--text-2)",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <Users size={15} /> Manage Subscribers & CSV ({totalCount !== null ? totalCount : "Brevo"})
          </button>
        </div>

        {/* Global Master Password Input (shared across both tabs) */}
        <div style={{ padding: "16px 20px", background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "10px", marginBottom: "28px" }}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
            Master Password (NEWSLETTER_SECRET)
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter your Vercel NEWSLETTER_SECRET..."
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "var(--bg-0)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-1)",
                fontSize: "13px",
                outline: "none",
              }}
            />
            {activeTab === "subscribers" && (
              <button
                type="button"
                onClick={fetchSubscribers}
                disabled={isFetchingSubscribers || !secretKey}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  background: "var(--accent)",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: isFetchingSubscribers || !secretKey ? "not-allowed" : "pointer",
                  opacity: isFetchingSubscribers || !secretKey ? 0.6 : 1,
                  flexShrink: 0,
                }}
              >
                {isFetchingSubscribers ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                {isFetchingSubscribers ? "Connecting..." : "Fetch Brevo List #3"}
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: BROADCAST CAMPAIGN STUDIO */}
        {activeTab === "broadcast" && (
          <div style={{ background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px" }}>
            <form onSubmit={handleLaunchCampaign} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-2)", display: "block", marginBottom: "8px" }}>
                  Select Blog Post to Broadcast
                </label>
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--bg-0)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text-1)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                >
                  {posts.map((post) => (
                    <option key={post.slug} value={post.slug}>
                      {post.title} ({post.category} · {post.readTime})
                    </option>
                  ))}
                </select>
              </div>

              {/* Email Preview */}
              {selectedPost && (
                <div style={{ padding: "20px", background: "var(--bg-0)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                  <span style={{ fontSize: "10px", color: "var(--accent)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "700" }}>
                    EMAIL BROADCAST PREVIEW
                  </span>
                  <h3 style={{ fontSize: "18px", color: "var(--text-1)", margin: "8px 0 6px", fontFamily: "var(--font-serif)" }}>
                    {selectedPost.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: "1.6", margin: "0 0 12px" }}>
                    {selectedPost.excerpt}
                  </p>
                  <span style={{ fontSize: "11px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                    Target: https://adithya-ai-hub.vercel.app/blog/{selectedPost.slug}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  background: "var(--accent)",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {isLoading ? "Broadcasting to Brevo List #3..." : "Launch Email Campaign"}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", fontSize: "12px", color: "var(--text-3)" }}>
                <MailCheck size={14} style={{ color: "#4ade80" }} />
                <span>Sends automated notification email to all active contacts in Brevo List #3</span>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: SUBSCRIBERS MANAGER & CSV EXPORT */}
        {activeTab === "subscribers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Quick Actions Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", padding: "16px 20px", background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Users size={18} style={{ color: "var(--accent)" }} />
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-1)", margin: 0 }}>
                    Brevo List #3: AI Hub Subscribers
                  </h4>
                  <p style={{ fontSize: "12px", color: "var(--text-3)", margin: "2px 0 0" }}>
                    Total active contacts: <strong>{totalCount !== null ? totalCount : "Click 'Fetch' above"}</strong>
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={exportToCSV}
                  disabled={subscribers.length === 0}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: subscribers.length === 0 ? "var(--text-3)" : "var(--text-1)",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: subscribers.length === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  <Download size={14} /> Export CSV
                </button>

                <a
                  href="https://app.brevo.com/contact/list-listing/id/3"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    background: "rgba(200, 169, 110, 0.15)",
                    border: "1px solid var(--accent)",
                    borderRadius: "6px",
                    color: "var(--accent)",
                    fontSize: "12px",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  <span>Open Brevo Dashboard</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Test Add Subscriber */}
            <form
              onSubmit={handleAddTestSubscriber}
              style={{
                display: "flex",
                gap: "10px",
                padding: "16px 20px",
                background: "var(--bg-1)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                alignItems: "center",
              }}
            >
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Add subscriber email to Brevo List #3..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "var(--bg-0)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  color: "var(--text-1)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={isSubscribingTest || !testEmail}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  background: "var(--accent)",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: isSubscribingTest || !testEmail ? "not-allowed" : "pointer",
                  opacity: isSubscribingTest || !testEmail ? 0.6 : 1,
                }}
              >
                {isSubscribingTest ? <Loader2 size={14} className="animate-spin" /> : <PlusCircle size={14} />}
                {isSubscribingTest ? "Adding..." : "Add to List #3"}
              </button>
            </form>

            {/* Subscribers Table */}
            <div style={{ background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-1)" }}>
                  Subscriber Email Registry
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  {subscribers.length} contacts loaded
                </span>
              </div>

              {subscribers.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-3)" }}>
                  <p style={{ fontSize: "14px", marginBottom: "8px" }}>No contacts loaded yet.</p>
                  <p style={{ fontSize: "12px" }}>
                    Enter your <code>NEWSLETTER_SECRET</code> above and tap <strong>Fetch Brevo List #3</strong>, or add a test subscriber.
                  </p>
                </div>
              ) : (
                <div style={{ maxHeight: "360px", overflowY: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
                        <th style={{ textAlign: "left", padding: "10px 20px", color: "var(--text-3)", fontSize: "11px", textTransform: "uppercase" }}>Email</th>
                        <th style={{ textAlign: "left", padding: "10px 20px", color: "var(--text-3)", fontSize: "11px", textTransform: "uppercase" }}>Added On</th>
                        <th style={{ textAlign: "right", padding: "10px 20px", color: "var(--text-3)", fontSize: "11px", textTransform: "uppercase" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((contact, idx) => (
                        <tr key={contact.id || idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "12px 20px", color: "var(--text-1)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                            {contact.email}
                          </td>
                          <td style={{ padding: "12px 20px", color: "var(--text-3)", fontSize: "12px" }}>
                            {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "Active"}
                          </td>
                          <td style={{ padding: "12px 20px", textAlign: "right" }}>
                            <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "100px", background: "rgba(74, 222, 128, 0.1)", color: "#4ade80", fontWeight: "600" }}>
                              SUBSCRIBED
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminNewsletter;
