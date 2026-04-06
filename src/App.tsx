import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SentinelLogo } from "./components/SentinelLogo";
import { SentinelKeyLogo } from "./components/SentinelKeyLogo";
import { UsbStatus } from "./components/UsbStatus";

type AppState = "idle" | "verifying" | "verified";

export default function App() {
  const [state, setState] = useState<AppState>("idle");
  const [progress, setProgress] = useState(0);

  const handleInsertKey = () => {
    if (state === "idle") {
      setState("verifying");
      setProgress(0);
    }
  };

  useEffect(() => {
    if (state === "verifying") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setState("verified");
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-sentinel-bg flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
      {/* New Monochrome Logo at the top corner or center top */}
      <div className="w-full flex justify-end">
        <SentinelKeyLogo className="w-16 h-16 opacity-40 hover:opacity-100 transition-opacity" />
      </div>

      <AnimatePresence mode="wait">
        {state !== "verified" ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center flex-1 gap-24"
          >
            <SentinelLogo size="large" />
            <UsbStatus status={state} progress={progress} onClick={handleInsertKey} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full max-w-md h-full flex-1"
          >
            <div className="mb-12">
              <SentinelLogo size="small" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-12 text-center">
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
              
              {/* Secondary Logo in Dashboard */}
              <div className="mt-4">
                <SentinelKeyLogo className="w-24 h-24" />
              </div>
            </div>

            <div className="mt-auto pt-12">
              <UsbStatus status="verified" />
            </div>
            
            <button 
              onClick={() => {
                setState("idle");
                setProgress(0);
              }}
              className="mt-6 text-gold/30 text-xs hover:text-gold/60 transition-colors"
            >
              Reset System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
