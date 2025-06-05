"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleState {
  id: number;
  size: number;
}

interface ClickRippleProps {
  color?: string;
}

export const ClickRipple: React.FC<ClickRippleProps> = ({ color = "rgba(99, 179, 237, 0.3)" }) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  useEffect(() => {
    const element = document.getElementById('ripple-target');
    if (!element) return;

    const handleClick = () => {
      const rect = element.getBoundingClientRect();
      // Make the ripple 4 times larger than the button for an extended effect
      const size = Math.max(rect.width, rect.height) * 4;

      const newRipple = {
        id: Date.now(),
        size,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Clean up old ripples
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      }, 1000);
    };

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="absolute inset-[-100%] flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.75,
            }}
            animate={{
              width: ripple.size,
              height: ripple.size,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: color,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}; 