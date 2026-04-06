import { motion } from "motion/react";

export const SentinelLogo = ({ size = "large" }: { size?: "small" | "large" }) => {
  const isLarge = size === "large";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <div className={`relative ${isLarge ? 'w-48 h-56' : 'w-16 h-20'} mb-4`}>
        {/* Shield Shape using SVG */}
        <svg 
          viewBox="0 0 100 120" 
          className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A6E2F" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6E2F" />
            </linearGradient>
            <filter id="innerShadow">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="2" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.8" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          
          {/* Outer Shield Border */}
          <path 
            d="M50 0 L95 20 V60 C95 90 50 120 50 120 C50 120 5 90 5 60 V20 L50 0Z" 
            fill="#1a1a1a"
            stroke="#D4AF37"
            strokeWidth="2"
          />
          
          {/* Inner Shield */}
          <path 
            d="M50 8 L87 25 V60 C87 85 50 110 50 110 C50 110 13 85 13 60 V25 L50 8Z" 
            fill="url(#shieldGradient)"
            filter="url(#innerShadow)"
          />
          
          {/* Keyhole */}
          <circle cx="50" cy="45" r="8" fill="black" />
          <path d="M44 45 L56 45 L60 70 L40 70 Z" fill="black" />
        </svg>
      </div>
      
      <div className="text-center">
        <h1 className={`${isLarge ? 'text-4xl' : 'text-xl'} font-bold tracking-widest text-gold`}>SENTINEL</h1>
        <p className={`${isLarge ? 'text-lg' : 'text-xs'} text-gold/80 font-medium`}>Secure Beyond Password</p>
      </div>
    </motion.div>
  );
};
