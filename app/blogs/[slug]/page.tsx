"use client";

import { useEffect, useState } from "react";
import { blogService } from "@/service";
import type { PostDetail } from "@/service/types";
import { RetroLoading } from "@/app/components/RetroLoading";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUp } from "lucide-react";

const getPostImage = (post: PostDetail): string => {
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

const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(["en-de"], {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default function BlogDetail({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<PostDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                setLoadingProgress(0);
                const response = await blogService.getPostBySlug(params.slug, {
                    onProgress: (progress: number) => {
                        console.log('Loading progress:', progress);
                        setLoadingProgress(progress);
                    }
                });
                
                if (!response.data) {
                    throw new Error('Post not found');
                }
                
                setPost(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch post');
                console.error('Error fetching post:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [params.slug]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-300 bg-retro-black">
                <RetroLoading text="Loading Post" progress={loadingProgress} />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-300 bg-retro-black">
                <div className="text-2xl text-red-400 mb-4">Error: {error || 'Post not found'}</div>
                <Link 
                    href="/blogs" 
                    className="px-4 py-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-retro-black transition-all duration-300 rounded"
                >
                    &lt; Back to Blog
                </Link>
            </div>
        );
    }

    const readingTime = calculateReadingTime(post.content);

    return (
        <div className="min-h-screen font-mono bg-retro-black text-paper-100">
            {/* Top timestamp bar */}
            <div className="border-b border-yellow-400/20 bg-retro-darker p-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
                <div className="container mx-auto px-2">
                    <div className="max-w-[960px] mx-auto">
                        <div className="text-yellow-400 text-sm">
                            Its Now {formatTime(currentTime)}
                            <br />
                            {formatDate(currentTime.toISOString())}
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="container mx-auto px-2">
                <div className="max-w-[960px] mx-auto py-6">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link 
                            href="/"
                            className="text-paper-200 hover:text-yellow-400 transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 text-paper-200" />
                        <Link 
                            href="/blogs"
                            className="text-paper-200 hover:text-yellow-400 transition-colors"
                        >
                            Blog
                        </Link>
                        <ChevronRight className="w-4 h-4 text-paper-200" />
                        <span className="text-yellow-400">
                            {post?.title || 'Loading...'}
                        </span>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-2">
                <div className="max-w-[960px] mx-auto py-8">
                    {/* Post Header */}
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-8 leading-tight">
                            {post.title}
                        </h1>
                        
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-transparent border border-yellow-400 text-yellow-400 rounded">
                                {post.category.name}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center gap-4 text-sm text-paper-200">
                            <span>By {post.author.username}</span>
                            <span>•</span>
                            <span>{formatDate(post.published_at)}</span>
                            <span>•</span>
                            <span>{readingTime} min read</span>
                        </div>
                    </div>

                    {/* Cover Image */}
                    {post.cover_image && (
                        <div className="relative h-[400px] w-full mb-12 rounded-lg overflow-hidden border border-yellow-400/20">
                            <Image
                                src={getPostImage(post)}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <article className="max-w-none">
                        <div className="space-y-8">
                            {post.content.split('\n\n').map((paragraph, index) => {
                                if (paragraph.startsWith('# ')) {
                                    return (
                                        <h2 key={index} className="text-4xl font-bold text-yellow-400 mt-16 mb-8">
                                            {paragraph.replace('# ', '')}
                                        </h2>
                                    );
                                }
                                
                                return (
                                    <p key={index} className="text-[1.125rem] leading-[1.75] text-paper-100">
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>
                    </article>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-yellow-400/20">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
                            <div className="text-yellow-400 text-sm">
                                Published on {formatDate(post.published_at)} by {post.author.username}
                            </div>
                            <Link 
                                href="/blogs" 
                                className="inline-flex items-center px-4 py-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-retro-black transition-all duration-300 rounded text-sm group"
                            >
                                <span className="group-hover:translate-x-[-4px] transition-transform duration-300">←</span>
                                <span className="ml-2">Back to Blog</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-4 bg-yellow-400 text-retro-black rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-300 ${
                    showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
                }`}
                aria-label="Back to top"
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
}
