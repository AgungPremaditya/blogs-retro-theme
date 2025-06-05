"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const greetings = [
  "こんにちは!",
  "Hello!",
  "Hola!",
  "Ciao!",
  "Halo!",
];

const TypewriterText = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = greetings[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % greetings.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="inline-block overflow-hidden">
      <motion.div
        key={text}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight whitespace-nowrap"
      >
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="ml-1 -mr-2"
        >
          |
        </motion.span>
      </motion.div>
    </div>
  );
};

export default TypewriterText; 