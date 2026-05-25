import { useEffect } from "react";

interface AdUnitProps {
  adSlot?: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdUnit({
  adSlot = "2786234025",
  adFormat = "auto",
  className = "",
  style,
}: AdUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded (dev mode)
    }
  }, []);

  return (
    <div className={`ad-container my-6 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={style ?? { display: "block" }}
        data-ad-client="ca-pub-3472487398342700"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Named leaderboard shortcut (728×90 equivalent)
export function AdLeaderboard({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      adSlot="auto"
      adFormat="horizontal"
      className={className}
      style={{ display: "block", width: "100%", height: "90px" }}
    />
  );
}

// Named rectangle shortcut (300×250 equivalent)
export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      adSlot="auto"
      adFormat="rectangle"
      className={className}
      style={{ display: "block", width: "300px", height: "250px" }}
    />
  );
}

// Legacy export for backward compatibility
export const AdSlot = AdUnit;
