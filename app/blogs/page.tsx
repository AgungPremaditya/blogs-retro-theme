"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Blogs() {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [visiblePosts, setVisiblePosts] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(["en-de"], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(["en-ID"], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const posts = [
        {
            id: 1,
            image: "https://cdn.myanimelist.net/images/anime/1782/128859l.jpg",
            title: "Backend Optimization (Case: PAMA Project)",
            slug: "backend-optimization-case-pama-project",
            shordDesc:
                "Pengalaman pertama melakukan optimasi di salah satu project besar dan berumur. Project ini menggunakan dotnet dan mssql dengan versi yang sudah outdated.",
            tags: ["Backend", ".Net", "C#", "MSSQL"],
        },
        {
            id: 2,
            image: "https://cdn.myanimelist.net/images/anime/1782/128859l.jpg",
            title: "Journey with v0.dev frontend building",
            slug: "journey-with-v0-dev-frontend-building",
            shordDesc:
                "Pengalaman pertama melakukan optimasi di salah satu project besar dan berumur. Project ini menggunakan dotnet dan mssql dengan versi yang sudah outdated.",
            tags: ["FrontEnd", "Nextjs", "v0.dev"],
        },
    ];

    const loadMorePosts = () => {
        setVisiblePosts((prevVisible) =>
            Math.min(prevVisible + 3, posts.length),
        );
    };

    return (
        <div className="bg-navy-900 flex min-h-screen flex-col font-mono text-gray-300">
            <main className="container mx-auto flex-grow px-4 py-8">
                <section className="mb-12 text-left">
                    <h2 className="pixelated mb-4 text-3xl font-bold text-yellow-400 md:text-5xl">
                        <span className="text-yellow-100">Its Now</span>{" "}
                        {currentTime ? formatTime(currentTime) : "Loading..."}
                        <br />{" "}
                        {currentTime ? formatDate(currentTime) : "Loading..."}
                    </h2>
                    <p className="text-lg md:text-xl">
                        Wanna explore somethings?
                    </p>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(0, visiblePosts).map((post) => (
                        <article
                            key={post.id}
                            className="border-2 border-yellow-400 p-4 hover:bg-navy-800 transition-colors flex flex-col"
                        >
                            <div className="mb-4 relative h-48">
                                <Image
                                    src={`${post.image}`}
                                    alt={`Cover image for ${post.title}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-yellow-400 pixelated">
                                {post.title}
                            </h3>
                            <div className="mb-4 flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-yellow-400 text-indigo-900 text-xs rounded pixelated"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="flex-grow mb-4">
                                This is a preview of the blog post about{" "}
                                {post.title.toLowerCase()}. Click to read more!
                            </p>
                            <div>
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="inline-block px-4 py-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-indigo-900 transition-colors pixelated font-bold"
                                >
                                    Read More &gt;
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>

                {visiblePosts < posts.length && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={loadMorePosts}
                            className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy-900 transition-colors pixelated font-bold text-lg"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </main>

            <footer className="mt-auto p-4 text-center text-gray-400">
                <p>&copy; 2024 Schias. All rights reserved.</p>
            </footer>
        </div>
    );
}
