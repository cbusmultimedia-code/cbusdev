import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SentinelLogo } from "./components/SentinelLogo";
import { SentinelKeyLogo } from "./components/SentinelKeyLogo";
import { UsbStatus } from "./components/UsbStatus";
import { CircuitBackground } from "./components/CircuitBackground";

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
          return prev + 1; // Slower, more deliberate progress
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [state]);

  return (
    <div className="relative min-h-screen bg-sentinel-bg flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
      {/* High-tech animated background during verification */}
      <AnimatePresence>
        {state === "verifying" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <CircuitBackground />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Status */}
      <div className="w-full flex justify-between items-start z-10">
        <div className="flex items-center gap-3">
          <div className="sm:block">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">Sentinel</p>
            <p className="text-[8px] tracking-[0.2em] uppercase text-gold/60">Key System</p>
          </div>
        </div>
        <div className="opacity-40">
          <p className="text-[10px] font-mono">SECURE_LINK: ACTIVE</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state !== "verified" ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center flex-1 gap-24 z-10"
          >
            <div className="relative">
              {state === "verifying" && (
                <motion.div 
                  className="absolute -inset-20 bg-gold/5 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <SentinelLogo size="large" />
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
              <UsbStatus status="verified" />
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
