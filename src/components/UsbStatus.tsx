import { Usb } from "lucide-react";
import { motion } from "motion/react";

export const UsbStatus = ({ 
  status, 
  onClick 
}: { 
  status: "idle" | "verifying" | "verified",
  onClick?: () => void
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
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
      
      <motion.p
        key={status}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gold font-medium italic tracking-wide"
      >
        {status === "idle" && "Insert your Sentinel Key"}
        {status === "verifying" && "Verifying Sentinel Key..."}
        {status === "verified" && (
          <div className="text-center">
            <p className="not-italic">Access Verified</p>
            <p className="not-italic font-bold">System: SECURE</p>
          </div>
        )}
      </motion.p>
    </div>
  );
};
