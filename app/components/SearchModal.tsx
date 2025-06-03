import { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { blogService, type Post, type PaginationMeta } from '@/service';
import Link from 'next/link';

// Custom debounce function
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentPosts?: Post[];
    currentMeta?: PaginationMeta | null;
}

export function SearchModal({ 
    isOpen, 
    onClose, 
    onSearch, 
    searchQuery, 
    setSearchQuery,
    currentPosts = [], // Default to empty array
    currentMeta = null // Default to null
}: SearchModalProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (query: string) => {
            setIsLoading(true);
            setLoadingProgress(0);
            try {
                if (query.trim() === '') {
                    // If empty query, use current posts from main page
                    setPosts(currentPosts);
                    setMeta(currentMeta);
                } else {
                    // Otherwise, search through API
                    const response = await blogService.getAllPosts(1, (progress) => {
                        setLoadingProgress(progress);
                    }, query);
                    setPosts(response.data);
                    setMeta(response.meta);
                }
                setPage(1);
            } catch (error) {
                console.error('Error searching posts:', error);
                // On error, show empty state
                setPosts([]);
                setMeta(null);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        [currentPosts, currentMeta]
    );

    // Load more posts
    const loadMorePosts = async () => {
        if (!meta || page >= meta.totalPages || isLoading) return;

        setIsLoading(true);
        setLoadingProgress(0);
        try {
            const nextPage = page + 1;
            const response = await blogService.getAllPosts(nextPage, (progress) => {
                setLoadingProgress(progress);
            }, searchQuery);
            setPosts(prev => [...prev, ...response.data]);
            setMeta(response.meta);
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);
        onSearch(newQuery);
        debouncedSearch(newQuery);
    };

    // Handle infinite scroll
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
            loadMorePosts();
        }
    }, [loadMorePosts]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Use current posts from main page on initial open
            setPosts(currentPosts);
            setMeta(currentMeta);
            setPage(1);
        } else {
            document.body.style.overflow = 'unset';
            // Reset state when modal closes
            setPosts([]);
            setPage(1);
            setMeta(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, currentPosts, currentMeta]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative min-h-screen flex items-start justify-center p-4">
                <div className="relative w-full max-w-2xl mt-20 bg-[#1a1a1a] rounded-xl shadow-2xl border border-yellow-400/20">
                    {/* Search header */}
                    <div className="flex items-center justify-end p-2">
                        <kbd className="px-2 py-1 text-xs font-mono bg-[#252525] text-[#EAEAEA]/70 rounded border border-[#333333]">
                            Esc
                        </kbd>
                    </div>

                    {/* Search input */}
                    <div className="px-4 pb-4 flex items-center gap-3">
                        <Search className="w-5 h-5 text-[#EAEAEA]/40" />
                        <input
                            type="text"
                            className="flex-1 bg-transparent text-[#EAEAEA] placeholder-[#EAEAEA]/40 focus:outline-none font-mono text-sm"
                            placeholder="What are you searching for?"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            autoFocus
                        />
                    </div>

                    {/* Search results */}
                    <div 
                        className="px-2 pb-2 max-h-[60vh] overflow-y-auto"
                        onScroll={handleScroll}
                    >
                        {posts.length > 0 ? (
                            <div className="space-y-1">
                                {posts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blogs/${post.slug}`}
                                        onClick={onClose}
                                        className="block w-full p-2 text-left rounded-lg hover:bg-[#252525] group transition-colors duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-[#EAEAEA]/70 group-hover:text-[#EAEAEA]">📄</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-mono text-[#EAEAEA] group-hover:text-yellow-400 truncate">
                                                    {post.title}
                                                </div>
                                                <div className="text-xs text-[#EAEAEA]/50 flex items-center gap-2">
                                                    <span className="bg-yellow-400/10 px-2 py-0.5 rounded text-yellow-400">
                                                        {post.category.name}
                                                    </span>
                                                    <span className="truncate">{post.content.substring(0, 100)}...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-[#EAEAEA]/50 text-sm">
                                    {isLoading ? 'Loading posts...' : 'No posts found'}
                                </div>
                            </div>
                        )}
                        
                        {/* Loading indicator */}
                        {isLoading && posts.length > 0 && (
                            <div className="text-center py-4">
                                <div className="text-[#EAEAEA]/50 text-sm">
                                    Loading more posts... {loadingProgress}%
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 