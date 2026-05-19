import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isTouchDevice = useMemo(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    return hasTouch && !isFinePointer;
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

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
