import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setShow(true);
  }, []);

  if (!show) return null;
  const accept = () => {
    localStorage.setItem("cookie-consent", "1");
    setShow(false);
  };

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-4 md:max-w-md z-50 glass rounded-xl p-4 shadow-elegant">
      <div className="flex items-start gap-3">
        <p className="text-sm text-muted-foreground flex-1">
          We use cookies to improve your experience and analyze traffic.
          By continuing, you agree to our use of cookies.
        </p>
        <button onClick={() => setShow(false)} aria-label="Dismiss" className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="hero" onClick={accept}>Accept</Button>
        <Button size="sm" variant="ghost" onClick={() => setShow(false)}>Decline</Button>
      </div>
    </div>
  );
};
