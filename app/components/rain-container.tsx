"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Raindrop, { RaindropState } from "./raindrop";
import Ripple, { RippleState } from "./ripple";

interface RainContainerProps {
  className?: string;
}

const RainContainer: React.FC<RainContainerProps> = ({ className = "" }) => {
  const [raindrops, setRaindrops] = useState<RaindropState[]>([]);

  useEffect(() => {
    // Create initial raindrops
    const initialRaindrops = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      animationDuration: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));

    setRaindrops(initialRaindrops);

    // Add new raindrops periodically
    const interval = setInterval(() => {
      const newRaindrop = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 2 + 1,
        delay: 0
      };

      setRaindrops(prev => [...prev.slice(-100), newRaindrop]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #020917 0%, #040d1f 25%, #061326 50%, #081830 75%, #0a192f 100%)',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence>
        {raindrops.map((drop) => (
          <Raindrop
            key={drop.id}
            left={drop.left}
            animationDuration={drop.animationDuration}
            delay={drop.delay}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export const RippleEffect: React.FC = () => {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRipple = {
        id: Date.now(),
        left: Math.random() * 100,
        width: Math.random() * 30 + 20
      };

      setRipples(prev => {
        const updated = [...prev, newRipple];
        return updated.slice(-30);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      bottom: '2vh',
      left: 0,
      width: '100%',
      height: '150px',
      transformStyle: 'preserve-3d',
      perspective: '1000px',
      overflowX: 'hidden'
    }}>
      <motion.div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'rotateX(75deg)',
          transformOrigin: 'bottom'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <AnimatePresence>
          {ripples.map((ripple) => (
            <Ripple
              key={ripple.id}
              left={ripple.left}
              width={ripple.width}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RainContainer; 