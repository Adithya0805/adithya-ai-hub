import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-40 max-w-sm glass-premium rounded-xl p-4 shadow-2xl border border-white/10"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/90 font-medium mb-1">Privacy & Session Experience</p>
              <p className="text-xs text-white/60 leading-relaxed">
                This platform uses minimal local storage for preferences and sandbox states. No third-party ad trackers.
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              aria-label="Dismiss"
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-white/5">
            <button
              onClick={() => setShow(false)}
              className="px-3 py-1.5 text-xs text-white/60 hover:text-white transition-colors rounded-md"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-3 py-1.5 text-xs font-semibold text-black bg-[#c8a96e] hover:bg-[#d6b77c] transition-colors rounded-md shadow-sm"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
