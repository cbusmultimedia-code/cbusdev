import { motion } from "motion/react";

export const CircuitBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Vertical and Horizontal Circuit Lines */}
        <motion.path
          d="M50 0V200L100 250H300L350 300V800"
          stroke="#D4AF37"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M350 0V150L300 200H100L50 250V800"
          stroke="#D4AF37"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        
        {/* Random Circuit Nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 400}
            cy={Math.random() * 800}
            r="3"
            fill="#D4AF37"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}

        {/* Diagonal Lines */}
        <motion.path
          d="M0 100L100 200M400 100L300 200M0 700L100 600M400 700L300 600"
          stroke="#D4AF37"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Data Packets (Moving dots along paths) */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={`packet-${i}`}
            r="4"
            fill="#D4AF37"
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
            style={{
              offsetPath: "path('M50 0V200L100 250H300L350 300V800')",
              offsetRotate: "auto",
            }}
          />
        ))}
      </svg>
      
      {/* Blue Glow Overlay */}
      <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
    </div>
  );
};
