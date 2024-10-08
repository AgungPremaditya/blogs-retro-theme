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
        <div className="min-h-screen bg-[#0a192f] text-[#ffd700] font-pixel">
            <div
                className="relative h-screen overflow-hidden"
                // style={{ background: "aqua" }}
            >
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
                    <div className="text-center">
                        <h1 className="text-6xl mb-4 pixelated bg-[#ffd700] text-[#0a192f] p-3">
                            Schias
                        </h1>
                        <p className="text-2xl pixelated bg-[#ffd700] text-[#0a192f] p-3">
                            Full-stack Developer
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <section className="mb-16">
                    <h2 className="text-3xl mb-8 pixelated">About Me</h2>
                    <p className="pixelated text-lg">
                        I&apos;m a passionate full-stack developer with a love
                        for creating innovative web applications. My expertise
                        spans across various technologies, allowing me to build
                        comprehensive solutions from front-end to back-end.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl mb-8 pixelated">Skills</h2>
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
                    <h2 className="text-3xl mb-8 pixelated">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, _) => (
                            <div
                                key={project.name}
                                className="bg-[#0a192f] border border-[#ffd700] p-6 rounded-lg"
                            >
                                <h3 className="text-2xl mb-4 pixelated">
                                    {project.name}
                                </h3>
                                <p className="pixelated mb-6">
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
                    <h2 className="text-3xl mb-8 pixelated">Contact</h2>
                    <p className="pixelated mb-6 text-lg">
                        Feel free to reach out to me for collaborations or
                        opportunities!
                    </p>
                    <div className="flex justify-center space-x-8">
                        <a href="#" className="pixelated-icon">
                            <Github className="w-12 h-12" />
                        </a>
                        <a href="#" className="pixelated-icon">
                            <Twitter className="w-12 h-12" />
                        </a>
                    </div>
                </section>

                <footer className="text-center pixelated">
                    <p>&copy; 2023 Schias. All rights reserved.</p>
                </footer>
            </div>

            <style jsx global>{`
                @font-face {
                    font-family: "PixelFont";
                    src: url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
                }

                .font-pixel {
                    font-family: "PixelFont", monospace;
                }

                .pixelated {
                    image-rendering: pixelated;
                    -webkit-font-smoothing: none;
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
