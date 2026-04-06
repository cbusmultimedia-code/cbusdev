import { Usb } from "lucide-react";
import { motion } from "motion/react";

export const UsbStatus = ({ 
  status, 
  progress = 0,
  onClick,
  onDoubleClick
}: { 
  status: "idle" | "verifying" | "verified",
  progress?: number,
  onClick?: () => void,
  onDoubleClick?: () => void
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        disabled={status === "verifying"}
        className={`p-6 rounded-3xl border-2 transition-colors duration-500 ${
          status === "verified" 
            ? "border-gold bg-gold/10" 
            : "border-gold/40 bg-transparent"
        }`}
      >
        <Usb 
          size={48} 
          className={`${status === "verifying" ? "animate-pulse" : ""} text-gold`} 
        />
      </motion.button>
      
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gold font-medium italic tracking-wide text-center"
      >
        {status === "idle" && "Insert your Sentinel Key"}
        {status === "verifying" && (
          <div className="space-y-1">
            <p>Verifying Sentinel Key...</p>
          </div>
        )}
        {status === "verified" && (
          <div className="text-center">
            <p className="not-italic">Access Verified</p>
            <p className="not-italic font-bold">System: SECURE</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
