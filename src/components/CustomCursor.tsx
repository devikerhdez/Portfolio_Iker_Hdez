import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-red-glow rounded-full pointer-events-none z-9999 mix-blend-difference"
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 6,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 800,
        mass: 0.05
      }}
    />
  );
}
