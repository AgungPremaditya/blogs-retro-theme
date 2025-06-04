"use client";

import React from "react";
import { motion } from "framer-motion";

export interface RaindropProps {
  left: number;
  animationDuration: number;
  delay: number;
}

export interface RaindropState extends RaindropProps {
  id: number;
}

const Raindrop: React.FC<RaindropProps> = ({ left, animationDuration, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      top: '-20px',
      left: `${left}%`,
      width: '2px',
      height: '20px',
      background: 'linear-gradient(transparent, rgba(99, 179, 237, 0.8))',
      boxShadow: '0 0 4px rgba(99, 179, 237, 0.3)'
    }}
    initial={{ y: -20, opacity: 0 }}
    animate={{ 
      y: ["0vh", "100vh"],
      opacity: [0, 1, 0.3]
    }}
    transition={{
      y: {
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
        times: [0, 1]
      },
      opacity: {
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 1]
      },
      delay: delay
    }}
  />
);

export default Raindrop; 