import { motion } from "motion/react";

export const SentinelKeyLogo = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative ${className}`}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-gold fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagon Border */}
        <path 
          d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 L50 5Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        
        {/* Stylized 'S' / Circuit Pattern */}
        <path 
          d="M20 35 L80 35 L80 45 L20 45 Z" 
          className="opacity-90"
        />
        <path 
          d="M20 55 L80 55 L80 65 L20 65 Z" 
          className="opacity-90"
        />
        
        {/* Key Icon at top */}
        <circle cx="50" cy="25" r="5" />
        <rect x="48" y="28" width="4" height="4" />
        
        {/* Circuit Lines (Simplified) */}
        <path d="M70 45 L70 50 L85 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M75 45 L75 52 L85 52" fill="none" stroke="currentColor" strokeWidth="1.5" />
        
        <path d="M30 55 L30 50 L15 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M25 55 L25 48 L15 48" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="mt-2 text-center">
        <p className="text-[8px] font-bold tracking-[0.3em] uppercase opacity-80">Sentinel | Key System</p>
      </div>
    </motion.div>
  );
};
