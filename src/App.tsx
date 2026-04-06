import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SentinelLogo } from "./components/SentinelLogo";
import { UsbStatus } from "./components/UsbStatus";

type AppState = "idle" | "verifying" | "verified";

export default function App() {
  const [state, setState] = useState<AppState>("idle");

  const handleInsertKey = () => {
    if (state === "idle") {
      setState("verifying");
    }
  };

  useEffect(() => {
    if (state === "verifying") {
      const timer = setTimeout(() => {
        setState("verified");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-sentinel-bg flex flex-col items-center justify-between py-20 px-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {state !== "verified" ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center flex-1 gap-32"
          >
            <SentinelLogo size="large" />
            <UsbStatus status={state} onClick={handleInsertKey} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full max-w-md h-full"
          >
            <div className="mb-20">
              <SentinelLogo size="small" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-16 text-center">
              <div className="space-y-4">
                <p className="text-gold/60 uppercase tracking-[0.2em] text-sm">Attached Device:</p>
                <div className="space-y-1">
                  <p className="text-gold font-bold text-xl tracking-widest">THIS DEVICE ATTACHED</p>
                  <p className="text-gold italic text-lg">Verify Just Now</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gold/60 uppercase tracking-[0.2em] text-sm">Not Attached Device:</p>
                <div className="space-y-2">
                  <p className="text-gold/80 font-bold tracking-widest">BACKUP KEY</p>
                  <p className="text-gold/80 font-bold tracking-widest">EMERGENCY KEY</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-20">
              <UsbStatus status="verified" />
            </div>
            
            <button 
              onClick={() => setState("idle")}
              className="mt-8 text-gold/30 text-xs hover:text-gold/60 transition-colors"
            >
              Reset System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
