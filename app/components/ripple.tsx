"use client";

import React from "react";
import { motion } from "framer-motion";

export interface RippleProps {
  left: number;
  width: number;
}

export interface RippleState extends RippleProps {
  id: number;
}

const Ripple: React.FC<RippleProps> = ({ left, width }) => (
  <motion.div
    style={{
      position: 'absolute',
      bottom: '0',
      left: `${left}%`,
      width: `${width}px`,
      height: `${width / 2}px`,
      background: 'rgba(99, 179, 237, 0.3)',
      border: '1px solid rgba(144, 205, 244, 0.6)',
      borderRadius: '50%',
      transformOrigin: 'center bottom',
      boxShadow: '0 0 10px rgba(99, 179, 237, 0.3)',
      willChange: 'transform, opacity'
    }}
    initial={{ 
      scaleX: 0.1,
      scaleY: 0.1,
      opacity: 1
    }}
    animate={{ 
      scaleX: 3,
      scaleY: 1,
      opacity: 0
    }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 1.5,
      ease: "easeOut"
    }}
  />
);

export default Ripple; 