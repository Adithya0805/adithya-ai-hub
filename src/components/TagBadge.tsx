import { clsx } from "clsx";

const tagColors: Record<string, string> = {
  "Machine Learning": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Python": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Interview Prep": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Career": "bg-green-500/10 text-green-400 border-green-500/20",
  "AWS": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "AI": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "LangChain": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "RAG": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "DSA": "bg-red-500/10 text-red-400 border-red-500/20",
  "TCS": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Amazon": "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const defaultColor = "bg-primary/10 text-primary border-primary/20";

interface TagBadgeProps {
  tag: string;
  small?: boolean;
}

export function TagBadge({ tag, small = false }: TagBadgeProps) {
  const color = tagColors[tag] ?? defaultColor;
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border font-medium",
        small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        color
      )}
    >
      {tag}
    </span>
  );
}
