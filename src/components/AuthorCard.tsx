import { Github, Linkedin, Twitter, BookOpen } from "lucide-react";

export function AuthorCard() {
  return (
    <div className="mt-12 p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row gap-5">
      {/* Avatar */}
      <div className="flex-shrink-0 flex items-start">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow text-2xl font-bold text-primary-foreground select-none">
          AK
        </div>
      </div>

      {/* Bio */}
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-lg">Adithya Kuppusamy</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            AI Engineer
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          B.Tech AI &amp; Data Science graduate from Ambur, Tamil Nadu (CGPA 8.5). I build production
          ML systems — from multi-agent clinical AI to real estate intelligence platforms. Writing
          here to document what I learn and help other Tamil Nadu engineers break into AI roles.
        </p>

        {/* Social links */}
        <div className="mt-4 flex items-center gap-3">
          <a
            href="https://github.com/Adithya0805"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-smooth text-muted-foreground"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-smooth text-muted-foreground"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-smooth text-muted-foreground"
          >
            <BookOpen className="w-3.5 h-3.5" />
            More Posts
          </a>
        </div>
      </div>
    </div>
  );
}
