"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { blogService, type Post, type PaginationMeta } from "@/service";
import { RetroLoading } from "@/app/components/RetroLoading";

const getPostImage = (post: Post): string => {
    // Array of placeholder images with different designs
    const placeholders = [
        `https://placehold.co/600x400/1a1b26/ffd866/png?text=${encodeURIComponent(post.category.name)}`,
        `https://placehold.co/600x400/1a1b26/ffd866/png?text=${encodeURIComponent(post.title.substring(0, 20))}`,
        `https://placehold.co/600x400/1a1b26/ffd866/png?text=Blog+Post`,
    ];

    // If post has a cover_image, use its URL
    if (post.cover_image?.url) {
        return post.cover_image.url;
    }

    // Return a placeholder based on the post ID (to keep it consistent for the same post)
    const placeholderIndex = post.id.charCodeAt(0) % placeholders.length;
    return placeholders[placeholderIndex];
};

export default function Blogs() {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await blogService.getAllPosts(currentPage);
                setPosts(prevPosts => currentPage === 1 ? response.data : [...prevPosts, ...response.data]);
                setMeta(response.meta);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch posts');
                console.error('Error fetching posts:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

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

    const loadMorePosts = () => {
        if (meta && currentPage < meta.totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    if (isLoading && posts.length === 0) {
        return (
            <div className="bg-navy-900 flex min-h-screen flex-col items-center justify-center font-mono text-gray-300">
                <RetroLoading text="Loading Posts" duration={2000} />
            </div>
        );
    }

    if (error && posts.length === 0) {
        return (
            <div className="bg-navy-900 flex min-h-screen flex-col items-center justify-center font-mono text-gray-300">
                <div className="text-2xl text-red-400">Error: {error}</div>
            </div>
        );
    }

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
                <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="border-2 border-yellow-400 p-4 hover:bg-navy-800 transition-colors flex flex-col"
                        >
                            <div className="mb-4 relative h-48 group overflow-hidden">
                                <Image
                                    src={getPostImage(post)}
                                    alt={`Cover image for ${post.title}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded transition-transform duration-300 group-hover:scale-110"
                                    priority={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-yellow-400 pixelated">
                                {post.title}
                            </h3>
                            <div className="mb-4 flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-yellow-400 text-indigo-900 text-xs rounded pixelated">
                                    {post.category.name}
                                </span>
                            </div>
                            <p className="flex-grow mb-4">
                                {post.content.substring(0, 150)}...
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm text-gray-400">
                                    By {post.author.username}
                                </span>
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

                {meta && currentPage < meta.totalPages && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={loadMorePosts}
                            className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy-900 transition-colors pixelated font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="scale-75">
                                    <RetroLoading text="Loading More" duration={2000} />
                                </div>
                            ) : (
                                "Load More"
                            )}
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
