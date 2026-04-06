import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SentinelLogo } from "./components/SentinelLogo";
import { UsbStatus } from "./components/UsbStatus";
import { AlertCircle, ShieldAlert } from "lucide-react";

type AppState = "idle" | "verifying" | "verified";

// Generate a unique ID for this specific tab/session
const SESSION_DEVICE_ID = Math.random().toString(36).slice(2, 8).toUpperCase();

export default function App() {
  const [state, setState] = useState<AppState>("idle");
  const [progress, setProgress] = useState(0);
  const [showTakeoverAlert, setShowTakeoverAlert] = useState(false);

  const resetSystem = useCallback(() => {
    setState("idle");
    setProgress(0);
    localStorage.removeItem("sentinel_active");
  }, []);

  const forceLogout = useCallback(() => {
    setState("idle");
    setProgress(0);
    setShowTakeoverAlert(true);
    // Auto-hide alert after 5 seconds
    setTimeout(() => setShowTakeoverAlert(false), 5000);
  }, []);

  const handleInsertKey = () => {
    if (state === "idle") {
      setShowTakeoverAlert(false);
      setState("verifying");
      setProgress(0);

      // Set this device as the active one in localStorage
      localStorage.setItem("sentinel_active", JSON.stringify({
        sentinelId: "SENTINEL-001",
        deviceId: SESSION_DEVICE_ID,
        timestamp: Date.now()
      }));
    }
  };

  // Listen for storage changes (multi-tab/device simulation)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sentinel_active" && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          if (data.deviceId !== SESSION_DEVICE_ID) {
            // Another tab/device took over
            if (state !== "idle") {
              forceLogout();
            }
          }
        } catch (e) {
          console.error("Failed to parse sentinel storage data", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [state, forceLogout]);

  useEffect(() => {
    if (state === "verifying") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
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
      {/* Device ID Indicator */}
      <div className="absolute top-4 left-4 opacity-20 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <p className="text-[10px] font-mono tracking-widest uppercase">Device: {SESSION_DEVICE_ID}</p>
      </div>

      {/* Takeover Alert Popup */}
      <AnimatePresence>
        {showTakeoverAlert && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute top-12 z-50 w-full max-w-xs p-4 bg-red-950/80 border border-red-500/50 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.2)] flex items-start gap-4"
          >
            <ShieldAlert className="text-red-500 shrink-0" size={24} />
            <div className="space-y-1">
              <p className="text-red-500 font-bold text-xs uppercase tracking-wider">Security Alert</p>
              <p className="text-white/80 text-[10px] leading-relaxed">
                Session taken over by another device. Hardware key disconnected from this terminal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div className="flex justify-between items-start">
                  <p className="text-gold/60 uppercase tracking-[0.2em] text-[10px]">Attached Device:</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[8px] text-green-500/80 font-mono">ACTIVE</p>
                  </div>
                </div>
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
              onClick={resetSystem}
              className="mt-6 text-gold/30 text-[10px] uppercase tracking-widest hover:text-gold/60 transition-colors"
            >
              Disconnect Sentinel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
