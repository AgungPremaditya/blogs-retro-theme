"use client";

import { useEffect, useState } from "react";
import { blogService } from "@/service";
import type { Post } from "@/service/types";
import { RetroLoading } from "@/app/components/RetroLoading";
import Image from "next/image";

export default function BlogDetail({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

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

    if (isLoading) {
        return (
            <div className="bg-retro-black flex min-h-screen flex-col items-center justify-center font-mono text-gray-300">
                <RetroLoading text="Loading Post" progress={loadingProgress} />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="bg-retro-black flex min-h-screen flex-col items-center justify-center font-mono text-gray-300">
                <div className="text-2xl text-red-400">Error: {error || 'Post not found'}</div>
            </div>
        );
    }

    return (
        <div className="bg-retro-black min-h-screen font-mono">
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={post.cover_image?.url || `/placeholders/${post.category.name.toLowerCase()}.png`}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-retro-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 pixelated mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 bg-yellow-400 text-retro-black rounded pixelated">
                                {post.category.name}
                            </span>
                            <span className="text-paper-200">
                                By {post.author.username}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <article className="prose prose-lg prose-invert max-w-none">
                    <div className="bg-retro-dark p-8 rounded-lg shadow-lg">
                        <div className="text-paper-50 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}
