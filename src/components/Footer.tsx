import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Sparkles, BookOpen, FolderGit2, Info, BookMarked } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-card/40 mt-24">
    <div className="container py-12 grid gap-10 md:grid-cols-4">
      {/* Brand */}
      <div className="md:col-span-2">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </span>
          <span className="text-gradient">Adithya AI Hub</span>
        </Link>
        <p className="mt-4 text-sm text-muted-foreground max-w-md">
          AI Learning &amp; Blog Platform by Adithya Kuppusamy — B.Tech AI &amp; Data Science
          engineer from Ambur, Tamil Nadu. Writing about ML, LLMs, and the journey to getting hired.
        </p>
        <div className="flex gap-3 mt-5">
          <a
            href="https://github.com/Adithya0805"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-md border border-border hover:border-primary hover:text-primary transition-smooth"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-md border border-border hover:border-primary hover:text-primary transition-smooth"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:adithyaadhi0805@gmail.com"
            aria-label="Email"
            className="p-2 rounded-md border border-border hover:border-primary hover:text-primary transition-smooth"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Explore */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Explore</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <Link to="/projects" className="hover:text-primary flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5" /> Projects
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-primary flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Blog
            </Link>
          </li>
          <li>
            <Link to="/resources" className="hover:text-primary flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" /> Resources
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-primary flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> About
            </Link>
          </li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Legal</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border/60">
      <div className="container py-5 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Adithya Kuppusamy. All rights reserved.</p>
        <p>
          Built by Adithya ·{" "}
          <span className="text-gradient font-medium">Powered by React + Vite</span>
        </p>
      </div>
    </div>
  </footer>
);
