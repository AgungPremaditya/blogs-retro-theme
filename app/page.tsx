/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Github, Twitter, ExternalLink } from "lucide-react";
import Layer2 from "@/app/assets/layer2.svg";
import Layer3 from "@/app/assets/layer3.svg";

interface ParallaxLayerProps {
    speed?: number;
    children: React.ReactNode;
    className?: string;
}

const PixelatedImage = ({ src = "", alt = "", className = "" }) => (
    <div
        className={`pixelated-image ${className}`}
        style={{
            backgroundImage: `url(${src})`,
        }}
        role="img"
        aria-label={alt}
    />
);

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
    speed = 0,
    children,
    className = "",
}) => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={className}
            style={{
                transform: `translateY(${offsetY * speed}px)`,
                transition: "transform 0.1s ease-out",
            }}
        >
            {children}
        </div>
    );
};

export default function RetroParallaxLandingPage() {
    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const projects = [
        {
            name: "Project 1",
            description:
                "A web application for task management with real-time updates and collaborative features.",
            link: "#",
        },
        {
            name: "Project 2",
            description:
                "An e-commerce platform with real-time inventory tracking and AI-powered recommendations.",
            link: "#",
        },
        {
            name: "Project 3",
            description:
                "A social media dashboard for content creators, featuring analytics and scheduling tools.",
            link: "#",
        },
        {
            name: "Project 4",
            description:
                "A machine learning model for predictive analytics in financial markets.",
            link: "#",
        },
    ];

    return (
        <div className="min-h-screen font-pixel relative">
            {/* Grain overlay */}
            <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]"></div>
            
            {/* Radial gradient background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_center,_#111_0%,_#000_100%)]"></div>

            <div className="relative h-screen overflow-hidden z-20">
                <ParallaxLayer
                    speed={scrollY * 0.0062}
                    className="absolute inset-0 left-[42em] -bottom-[12em]"
                >
                    <PixelatedImage
                        src={Layer2.src}
                        alt="Pixelated layer 2"
                        className="w-full h-full"
                    />
                </ParallaxLayer>
                <ParallaxLayer
                    speed={scrollY * 0.0082}
                    className="absolute inset-0 right-[42em] bottom-[12em]"
                >
                    <PixelatedImage
                        src={Layer2.src}
                        alt="Pixelated layer 2"
                        className="w-full h-full"
                    />
                </ParallaxLayer>
                <ParallaxLayer
                    speed={scrollY * 0.0072}
                    className="absolute inset-0 z-20 -bottom-[4em]"
                >
                    <PixelatedImage
                        src={Layer2.src}
                        alt="Pixelated layer 2"
                        className="w-full h-full bg-cover bg repeat"
                    />
                </ParallaxLayer>
                <ParallaxLayer
                    speed={scrollY * 0.0028}
                    className="absolute inset-0 left-8 top-96 xl:top-[26em] xl:left-96 lg:top-[24em] lg:left-72 md:top-[26em] md:left-48 z-30"
                >
                    <PixelatedImage
                        src={Layer3.src}
                        alt="Pixelated background"
                        className="w-full xl:w-[40em] xl:h-[32em] lg:w-[28em] lg:h-[21em] md:w-[20em] md:h-[16em] h-[18em] w-[22em]"
                    />
                </ParallaxLayer>
                <div className="absolute inset-0 flex items-top justify-center z-40 top-48">
                    <div className="text-center space-y-4">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-mono font-bold bg-[#ffd700] text-[#0a192f]/90 px-6 py-4 shadow-[4px_4px_0px_0px_rgba(10,25,47,0.9)] hover:shadow-[6px_6px_0px_0px_rgba(10,25,47,0.9)] transition-all duration-300 border-2 border-[#0a192f]/90 tracking-wider">
                            SCHIAS
                        </h1>
                        <p className="text-2xl md:text-3xl font-mono font-bold bg-[#ffd700] text-[#0a192f]/90 px-4 py-3 shadow-[3px_3px_0px_0px_rgba(10,25,47,0.9)] inline-block border-2 border-[#0a192f]/90 tracking-wide">
                            FULL-STACK DEVELOPER
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-20">
                <section className="mb-16">
                    <h2 className="text-3xl mb-8 pixelated text-[#EAEAEA]">About Me</h2>
                    <p className="pixelated text-lg text-[#EAEAEA]">
                        I&apos;m a passionate full-stack developer with a love
                        for creating innovative web applications. My expertise
                        spans across various technologies, allowing me to build
                        comprehensive solutions from front-end to back-end.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl mb-8 pixelated text-[#EAEAEA]">Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            "JavaScript",
                            "React",
                            "Node.js",
                            "Python",
                            "SQL",
                            "Git",
                            "AWS",
                            "Docker",
                        ].map((skill) => (
                            <div
                                key={skill}
                                className="bg-[#ffd700] text-[#0a192f] p-4 text-center pixelated rounded"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl mb-8 pixelated text-[#EAEAEA]">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, _) => (
                            <div
                                key={project.name}
                                className="bg-[#0a192f] border border-[#ffd700] p-6 rounded-lg"
                            >
                                <h3 className="text-2xl mb-4 pixelated text-[#EAEAEA]">
                                    {project.name}
                                </h3>
                                <p className="pixelated mb-6 text-[#EAEAEA]">
                                    {project.description}
                                </p>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center pixelated bg-[#ffd700] text-[#0a192f] px-4 py-2 rounded"
                                >
                                    View Project{" "}
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl mb-8 pixelated text-[#EAEAEA]">Contact</h2>
                    <p className="pixelated mb-6 text-lg text-[#EAEAEA]">
                        Feel free to reach out to me for collaborations or
                        opportunities!
                    </p>
                    <div className="flex justify-center space-x-8">
                        <a href="#" className="pixelated-icon text-[#EAEAEA]">
                            <Github className="w-12 h-12" />
                        </a>
                        <a href="#" className="pixelated-icon text-[#EAEAEA]">
                            <Twitter className="w-12 h-12" />
                        </a>
                    </div>
                </section>

                <footer className="text-center pixelated text-[#EAEAEA]">
                    <p>&copy; 2023 Schias. All rights reserved.</p>
                </footer>
            </div>

            <style jsx global>{`
                @keyframes grain {
                    0%, 100% { transform: translate(0, 0) }
                    10% { transform: translate(-2%, -2%) }
                    20% { transform: translate(2%, 2%) }
                    30% { transform: translate(-1%, 1%) }
                    40% { transform: translate(1%, -1%) }
                    50% { transform: translate(-2%, 2%) }
                    60% { transform: translate(2%, -2%) }
                    70% { transform: translate(-1%, -1%) }
                    80% { transform: translate(1%, 1%) }
                    90% { transform: translate(-2%, -2%) }
                }

                .font-pixel {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    letter-spacing: 0.1em;
                }

                .pixelated {
                    image-rendering: pixelated;
                    -webkit-font-smoothing: none;
                    text-shadow: 2px 2px 0px rgba(10, 25, 47, 0.2);
                }

                .pixelated-icon {
                    image-rendering: pixelated;
                    -webkit-font-smoothing: none;
                    filter: brightness(0) invert(1);
                    transition: transform 0.3s ease;
                }

                .pixelated-icon:hover {
                    transform: scale(1.1);
                }

                .pixelated-image {
                    image-rendering: pixelated;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            `}</style>
        </div>
    );
}
