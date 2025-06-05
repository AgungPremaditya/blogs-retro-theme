"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollButtonProps {
  targetId: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ targetId }) => {
  const scrollToContent = () => {
    const contentSection = document.getElementById(targetId);
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToContent}
      className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-blue-100 opacity-75 hover:opacity-100 transition-all
                p-3 sm:p-4 rounded-full bg-blue-500/10 backdrop-blur-sm hover:bg-blue-500/20"
      animate={{
        y: [0, 10, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      aria-label="Scroll to content"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 sm:h-8 sm:w-8"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M7 13l5 5 5-5"/>
        <path d="M7 6l5 5 5-5"/>
      </svg>
    </motion.button>
  );
};

export default ScrollButton; 