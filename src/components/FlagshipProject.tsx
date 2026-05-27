import { ExternalLink, Github, Mic, Target, Star, Zap, Users, Brain } from "lucide-react";

const features = [
  "AI-powered mock interviews (Technical + Behavioral)",
  "Role-specific question banks (SDE, DS, ML, PM)",
  "Multi-dimensional competency scoring",
  "Real-time structured feedback with improvement tips",
  "Speech-to-text answer transcription",
  "Turn management & context retention",
  "Tone and confidence analysis",
  "Session history & progress tracking",
  "Interview difficulty levels (Fresher → Senior)",
  "Company-specific interview modes (TCS, Cognizant, MAANG)",
];

const stack = ["React", "Python", "Firebase", "Conversational AI", "Speech API", "NLP", "FastAPI", "WebRTC"];

export function FlagshipProject() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-primary/40 shadow-[0_0_60px_rgba(6,182,212,0.2)]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-float-blob" />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float-blob"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative p-8 md:p-12">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold tracking-wide">
                <Star className="w-3.5 h-3.5" />
                FLAGSHIP PROJECT
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" />
                10 Features Built
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                Live Demo Available
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 border border-primary/30">
                <Mic className="w-5 h-5 text-primary" />
              </span>
              SkillsSpeak AI
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              AI-driven mock interview platform with role-specific evaluation, real-time competency scoring, and structured feedback — built to get engineers hired.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://github.com/Adithya0805"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-200 text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
            <a
              href="https://skillsspeak-1a3ac.web.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 text-sm font-semibold shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <ExternalLink className="w-4 h-4" />
              Try Live Demo
            </a>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Problem + Solution */}
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-card/60 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-destructive" />
                <h3 className="text-xs font-semibold text-destructive uppercase tracking-wider">Problem</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Candidates (especially from Tier-3 colleges) struggle to find realistic, role-specific mock interviews with actionable, instant feedback. Generic platforms don't simulate real company interviews.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-card/60 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Solution</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time conversational AI that conducts technical and behavioral mock interviews, scores competency across multiple dimensions (clarity, depth, relevance), and delivers structured feedback with concrete improvement steps.
              </p>
            </div>

            {/* Stack */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Feature list */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Key Features</h3>
            <ul className="space-y-2.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground group">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 text-[10px] font-bold text-primary group-hover:bg-primary/25 transition-colors">
                    {i + 1}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
