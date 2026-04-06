import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SentinelLogo } from "./components/SentinelLogo";
import { UsbStatus } from "./components/UsbStatus";

type AppState = "idle" | "verifying" | "verified";

export default function App() {
  const [state, setState] = useState<AppState>("idle");
  const [progress, setProgress] = useState(0);

  const resetSystem = () => {
    setState("idle");
    setProgress(0);
  };

  const handleInsertKey = () => {
    if (state === "idle") {
      setState("verifying");
      setProgress(0);
    }
  };

  useEffect(() => {
    if (state === "verifying") {
      // 5 seconds = 5000ms. 100 steps. 50ms per step.
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Add a small delay after 100% before showing dashboard
            setTimeout(() => setState("verified"), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [state]);

  return (
    <div className="relative min-h-screen bg-sentinel-bg flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {state !== "verified" ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center flex-1 gap-12 z-10 w-full"
          >
            <div className="relative">
              {state === "verifying" && (
                <motion.div 
                  className="absolute -inset-20 bg-gold/5 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <SentinelLogo size={state === "verifying" ? "small" : "large"} />
            </div>

            <UsbStatus status={state} progress={progress} onClick={handleInsertKey} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full max-w-md h-full flex-1 z-10"
          >
            <div className="mb-12">
              <SentinelLogo size="small" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-12 text-center w-full">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 w-full p-6 border border-gold/10 bg-gold/5 rounded-xl backdrop-blur-sm"
              >
                <p className="text-gold/60 uppercase tracking-[0.2em] text-[10px]">Attached Device:</p>
                <div className="space-y-1">
                  <p className="text-gold font-bold text-xl tracking-widest">THIS DEVICE ATTACHED</p>
                  <p className="text-gold italic text-lg opacity-80">Verify Just Now</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 w-full p-6 border border-gold/10 bg-transparent rounded-xl"
              >
                <p className="text-gold/60 uppercase tracking-[0.2em] text-[10px]">Not Attached Device:</p>
                <div className="space-y-2">
                  <p className="text-gold/80 font-bold tracking-widest hover:text-gold transition-colors cursor-pointer">BACKUP KEY</p>
                  <p className="text-gold/80 font-bold tracking-widest hover:text-gold transition-colors cursor-pointer">EMERGENCY KEY</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-auto pt-12">
              <UsbStatus status="verified" onDoubleClick={resetSystem} />
            </div>
            
            <button 
              onClick={() => {
                setState("idle");
                setProgress(0);
              }}
              className="mt-6 text-gold/30 text-[10px] uppercase tracking-widest hover:text-gold/60 transition-colors"
            >
              Reset System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
