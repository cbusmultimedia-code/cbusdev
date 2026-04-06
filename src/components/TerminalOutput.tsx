import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SENTINEL_LINES = [
  "u0_a215@sentinel: ~> init sentinel-core",
  "Reading package lists... Done",
  "Building dependency tree... Done",
  "Reading state information... Done",
  "Checking hardware key signature...",
  "Verifying RSA-4096 encrypted handshake...",
  "Accessing secure vault: /data/sentinel/vault/",
  "Sentinel Key detected: ID_SENTINEL_001",
  "Establishing secure tunnel...",
  "Syncing encrypted databases...",
  "System: SECURE",
  "u0_a215@sentinel: ~> access-granted"
];

export const TerminalOutput = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < SENTINEL_LINES.length) {
        setVisibleLines((prev) => [...prev, SENTINEL_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400); // New line every 400ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md h-48 font-mono text-[10px] text-gold/60 overflow-hidden bg-black/40 p-4 rounded-lg border border-gold/10 backdrop-blur-sm">
      <div className="flex flex-col gap-1">
        <AnimatePresence initial={false}>
          {visibleLines.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${line.includes("SECURE") ? "text-gold font-bold" : ""}`}
            >
              <span className="text-blue-400 mr-2">$</span>
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-gold/60 inline-block ml-1"
        />
      </div>
    </div>
  );
};
