"use client";

import React from "react";
import RainContainer, { RippleEffect } from "./components/rain-container";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <RainContainer className="-z-10" />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-white pb-[200px]">
        <div className="max-w-3xl w-full space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-tight">
              Welcome to My Space
            </h1>
            <p className="text-xl text-blue-200">
              A place where creativity meets technology
            </p>
          </section>

          {/* Content Cards */}
          <section className="grid md:grid-cols-2 gap-8">
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
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-8 space-y-6">
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
          <section className="text-center space-y-4">
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
