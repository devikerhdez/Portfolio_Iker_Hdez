import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'auto'; // Re-enable scroll if disabled
      }}
      style={{ pointerEvents: 'none' }}
    >
      <motion.div 
        className="text-red-primary font-display text-4xl animate-glitch"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        LOADING_
      </motion.div>
    </motion.div>
  );
}
