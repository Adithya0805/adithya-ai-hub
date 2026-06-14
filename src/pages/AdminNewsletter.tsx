import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { posts } from "@/data/posts";
import { toast } from "sonner";
import { Send, Lock, Loader2, MailCheck } from "lucide-react";

const AdminNewsletter = () => {
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug || "");
  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedPost = posts.find((p) => p.slug === selectedSlug);

  const handleLaunchCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) {
      toast.error("Please select a post to send.");
      return;
    }
    if (!secretKey) {
      toast.error("Newsletter secret key is required.");
      return;
    }

    setIsLoading(true);

    try {
      // Determine base URL, works locally and in prod
      const baseUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : ""; // empty means relative path for Vercel

      const response = await fetch(`${baseUrl}/api/send-newsletter`, {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to launch campaign.");
      }

      toast.success(data.message || "Campaign launched successfully!");
      setSecretKey(""); // Clear secret for safety
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Something went wrong.");
      // Check for JSON parse issues if local dev server returns HTML
      if (error.message.includes("Unexpected token '<'")) {
        toast.error("Local dev error: Make sure to run 'vercel dev' instead of 'npm run dev' to test APIs locally.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Dashboard | Adithya AI Hub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container py-20 max-w-3xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium border rounded-full border-primary/20 text-primary bg-primary/5">
            <Lock className="w-3.5 h-3.5" /> Secure Admin Route
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Campaign <span className="text-gradient-primary">Studio</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Automate your newsletter distribution. Select a blog post, enter your
            secure master password, and broadcast it to all your subscribers instantly.
          </p>
        </div>

        <div className="p-1 border bg-card/50 backdrop-blur-xl border-border/50 rounded-3xl">
          <form onSubmit={handleLaunchCampaign} className="p-6 md:p-8 space-y-8">
            
            {/* Post Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-foreground">
                Select Blog Post
              </label>
              <div className="relative">
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  className="w-full h-14 pl-4 pr-10 text-sm transition-all border appearance-none outline-none rounded-xl bg-background border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-foreground"
                >
                  {posts.map((post) => (
                    <option key={post.slug} value={post.slug}>
                      {post.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground">
                  ▼
                </div>
              </div>
            </div>

            {/* Preview Card */}
            {selectedPost && (
              <div className="p-5 border rounded-2xl bg-secondary/30 border-border/50">
                <p className="text-xs font-medium tracking-widest text-primary mb-2 uppercase">
                  Email Preview
                </p>
                <h3 className="font-semibold text-lg mb-2">{selectedPost.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {selectedPost.excerpt}
                </p>
              </div>
            )}

            {/* Secret Key */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-foreground">
                Master Password (NEWSLETTER_SECRET)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter your Vercel secret key..."
                  className="w-full h-14 pl-11 pr-4 text-sm transition-all border outline-none rounded-xl bg-background border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex items-center justify-center w-full h-14 gap-2 font-bold text-white transition-all shadow-lg rounded-xl bg-gradient-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Broadcasting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  Launch Campaign
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <MailCheck className="w-4 h-4 text-primary" />
              Emails will be sent to all active "AI Hub Subscribers" via Resend
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminNewsletter;
