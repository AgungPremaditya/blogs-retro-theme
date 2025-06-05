"use client";

import React from "react";
import RainContainer, { RippleEffect } from "./components/rain-container";
import TypewriterText from "./components/typewriter-text";
import ScrollButton from "./components/scroll-button";
import Skills from "./components/skills";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaGithub,
  FaExternalLinkAlt 
} from 'react-icons/fa';

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and TailwindCSS, featuring a unique rain animation and glass-effect design.",
    tech: ["Next.js", "React", "TailwindCSS"],
    github: "https://github.com/yourusername/portfolio",
    live: "https://your-portfolio.com",
    image: "/projects/portfolio.png"
  },
  {
    title: "Blog Platform",
    description: "A full-stack blog platform with markdown support, user authentication, and a clean, minimalist design.",
    tech: ["Node.js", "MongoDB", "React"],
    github: "https://github.com/yourusername/blog",
    live: "https://your-blog.com",
    image: "/projects/blog.png"
  }
];

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <main className="relative">
      <RainContainer className="-z-10" />
      
      {/* Hero Section - Full height */}
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
          <section className="max-w-5xl mx-auto">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <TypewriterText />
            </div>
            <p className="text-gray-300 max-w-3xl text-base sm:text-lg md:text-xl">
              Well known as <span className="text-white font-medium underline">Schias</span> on the internet. A Nocturnal that really like coffee. 
              A weebs that still learning to become a better human. Also like to playing Games.
            </p>
          </section>
        </div>
        <ScrollButton targetId="content-section" />
      </div>

      {/* Content Sections */}
      <div id="content-section" className="min-h-screen flex items-center">
        {/* Main Grid Section */}
        <section className="w-full">
          <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div 
              className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={staggerContainer}
            >
              {/* Left Column - About Me and Projects */}
              <div className="lg:col-span-2 space-y-6">
                {/* About Me */}
                <motion.div 
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <h2 className="text-2xl font-semibold mb-6">About Me</h2>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-xl overflow-hidden shrink-0">
                      <Image
                        src="https://res.cloudinary.com/ddy65wooa/image/upload/v1749090966/blog-images/d6sfs6moaktgxmdtnulk.jpg"
                        alt="Profile picture"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 128px"
                      />
                    </div>
                    <p className="text-blue-100">
                      I'm a passionate developer who loves creating beautiful and functional web experiences.
                      Always exploring new technologies and pushing the boundaries of what's possible.
                    </p>
                  </div>
                </motion.div>

                {/* Projects */}
                <motion.div 
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <h2 className="text-2xl font-semibold mb-6">Projects</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                      <motion.div 
                        key={project.title}
                        className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all"
                        variants={fadeInUp}
                        custom={index}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <a 
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                            >
                              <FaGithub size={24} />
                            </a>
                            <a 
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                            >
                              <FaExternalLinkAlt size={20} />
                            </a>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                          <p className="text-blue-100 text-sm mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span 
                                key={tech}
                                className="text-xs px-2 py-1 rounded-full bg-white/5 text-blue-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Skills */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <Skills />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <section className="py-20">
        <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-xl p-8 transition-all text-center">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Interested in working together? Let's connect and create something amazing! Feel free to reach out for collaborations or just a friendly chat.
              </p>
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors text-white font-medium">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ripple Effect positioned at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <RippleEffect />
      </div>
    </main>
  );
}
