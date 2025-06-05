"use client";

import React from "react";
import RainContainer, { RippleEffect } from "./components/rain-container";
import TypewriterText from "./components/typewriter-text";
import ScrollButton from "./components/scroll-button";

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
      <div id="content-section" className="w-full max-w-3xl mx-auto px-6 sm:px-8 pb-[200px]">
        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          {/* Content Cards */}
          <section className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all">
              <h2 className="text-2xl font-semibold mb-4">About Me</h2>
              <p className="text-blue-100">
                I'm a passionate developer who loves creating beautiful and functional web experiences.
                Always exploring new technologies and pushing the boundaries of what's possible.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all">
              <h2 className="text-2xl font-semibold mb-4">My Work</h2>
              <p className="text-blue-100">
                Specializing in modern web applications with a focus on user experience,
                performance, and beautiful design implementations.
              </p>
            </div>
          </section>

          {/* Feature Section */}
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <h2 className="text-3xl font-semibold text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-medium mb-2">Project {item}</h3>
                  <p className="text-blue-200">
                    A brief description of project {item} and its key features.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl font-semibold">Get in Touch</h2>
            <p className="text-blue-200">
              Interested in working together? Let's connect!
            </p>
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
              Contact Me
            </button>
          </section>
        </div>
      </div>

      {/* Ripple Effect positioned at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <RippleEffect />
      </div>
    </main>
  );
}
