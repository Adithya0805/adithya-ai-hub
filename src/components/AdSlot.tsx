export const AdSlot = ({ label = "Advertisement", className = "" }: { label?: string; className?: string }) => (
  <div className={`my-8 rounded-xl border border-dashed border-border/70 bg-card/40 p-6 text-center text-xs uppercase tracking-widest text-muted-foreground ${className}`}>
    {label}
  </div>
);
