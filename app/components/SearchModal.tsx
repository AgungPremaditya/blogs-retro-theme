import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { blogService, type Post, type PaginationMeta } from '@/service';
import { useDebounce } from '../hooks/useDebounce';

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
    currentPosts = [], 
    currentMeta = null
}: SearchModalProps) {
    const [displayPosts, setDisplayPosts] = useState<Post[]>(currentPosts);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    // Debounce the search query with 300ms delay
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Handle animation timing
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle search input changes
    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);
        
        if (newQuery.trim() === '') {
            setDisplayPosts(currentPosts);
            return;
        }

        setIsLoading(true);
        try {
            const response = await blogService.getAllPosts(1, undefined, newQuery);
            setDisplayPosts(response.data);
        } catch (error) {
            console.error('Error searching posts:', error);
            setDisplayPosts([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Reset to default posts when modal opens
    useEffect(() => {
        if (isOpen) {
            setDisplayPosts(currentPosts);
        }
    }, [isOpen, currentPosts]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop with blur */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative min-h-screen flex items-start justify-center p-4">
                <div 
                    className={`relative w-full max-w-2xl mt-20 bg-[#1a1a1a] rounded-xl shadow-2xl border border-yellow-400/20 transition-all duration-300 transform
                        ${isOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}`}
                >
                    {/* Search header */}
                    <div className="flex items-center justify-between p-2">
                        <div className="text-[#EAEAEA]/40 text-xs">
                            {isLoading ? 'Searching...' : ''}
                        </div>
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

                    {/* Search results with fade in animation */}
                    <div className="px-2 pb-2 max-h-[60vh] overflow-y-auto">
                        <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            {displayPosts.length > 0 ? (
                                <div className="space-y-1">
                                    {displayPosts.map((post, index) => (
                                        <Link
                                            key={post.id}
                                            href={`/blogs/${post.slug}`}
                                            onClick={onClose}
                                            className={`block w-full p-2 text-left rounded-lg hover:bg-[#252525] group transition-all duration-200
                                                transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                                                transition-all duration-200 delay-[${index * 50}ms]`}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 