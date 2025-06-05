"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaTimes
} from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub size={24} />,
    url: 'https://github.com/yourusername',
    color: 'hover:bg-gray-800'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin size={24} />,
    url: 'https://linkedin.com/in/yourusername',
    color: 'hover:bg-blue-600'
  },
  {
    name: 'Twitter',
    icon: <FaTwitter size={24} />,
    url: 'https://twitter.com/yourusername',
    color: 'hover:bg-blue-400'
  },
  {
    name: 'Email',
    icon: <FaEnvelope size={24} />,
    url: 'mailto:your.email@example.com',
    color: 'hover:bg-red-500'
  }
];

const ContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mainButtonVariants = {
    closed: { 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    open: { 
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.15,
        staggerDirection: -1,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 0,
      scale: 0.97,
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 0.9],
        opacity: {
          duration: 0.7,
          ease: "easeOut"
        },
        scale: {
          duration: 0.7,
          ease: "easeOut"
        }
      }
    },
    visible: { 
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 0.9],
        opacity: {
          duration: 0.7,
          ease: "easeOut"
        },
        scale: {
          duration: 0.7,
          ease: "easeOut"
        }
      }
    },
    hover: {
      scale: 1.1,
      y: -4,
      transition: {
        duration: 0.3,
        ease: [0.32, 0.72, 0.29, 0.95]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  const toggleContact = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        {/* Main Contact Button */}
        <motion.button
          onClick={toggleContact}
          className={`px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full 
                     transition-all duration-300 text-white font-medium z-10 shadow-lg
                     ${isOpen ? 'bg-blue-700 hover:bg-blue-800' : ''}`}
          variants={mainButtonVariants}
          animate={isOpen ? "open" : "closed"}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            Contact Me
          </motion.div>
        </motion.button>
        <div className='mb-8' />

        {/* Social Media Buttons */}
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 flex justify-center gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm ${social.color}
                            flex items-center justify-center text-white transition-colors shadow-lg`}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactButtons; 