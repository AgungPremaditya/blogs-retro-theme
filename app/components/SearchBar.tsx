import { useEffect, useState, useCallback } from 'react';
import { SearchModal } from './SearchModal';
import type { Post, PaginationMeta } from '@/service';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
    currentPosts?: Post[];
    currentMeta?: PaginationMeta | null;
}

export function SearchBar({ 
    onSearch, 
    placeholder = "Search posts...", 
    className = "",
    currentPosts = [],
    currentMeta = null
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = useCallback((value: string) => {
        setSearchQuery(value);
        onSearch(value);
    }, [onSearch]);

    // Handle keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check for Cmd/Ctrl + K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsModalOpen(true);
            }
            // Close on Escape
            if (e.key === 'Escape') {
                setIsModalOpen(false);
                setSearchQuery('');
                onSearch('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onSearch]);

    return (
        <>
            <div 
                className={`relative max-w-md w-full md:w-96 ${className} cursor-pointer`}
                onClick={() => setIsModalOpen(true)}
            >
                {/* Container for the search bar */}
                <div className="relative group">
                    {/* Focus/Hover glow effect - more subtle */}
                    <div className={`absolute -inset-[1px] bg-yellow-400/20 rounded-xl blur-sm transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'} group-hover:opacity-30 pointer-events-none`}></div>

                    {/* Inner container */}
                    <div className="relative flex items-center bg-[#1a1a1a]/80 rounded-xl backdrop-blur-sm">
                        <div
                            className="relative w-full px-4 py-3 text-[#EAEAEA]/40 font-mono text-sm rounded-xl"
                        >
                            Search posts...
                        </div>
                        
                        {/* Keyboard shortcut hint */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                            <kbd className="px-2 py-1 text-xs font-mono bg-[#252525] text-[#EAEAEA]/70 rounded border border-[#333333] group-hover:bg-[#2a2a2a] transition-colors duration-300">
                                {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
                            </kbd>
                            <kbd className="px-2 py-1 text-xs font-mono bg-[#252525] text-[#EAEAEA]/70 rounded border border-[#333333] group-hover:bg-[#2a2a2a] transition-colors duration-300">
                                K
                            </kbd>
                        </div>

                        {/* Subtle border effect */}
                        <div className="absolute inset-0 rounded-xl border border-yellow-400/20 group-hover:border-yellow-400/40 transition-colors duration-300 pointer-events-none"></div>

                        {/* Scanline effect - more subtle */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(255,216,102,0.03)_50%,_transparent_100%)] bg-[length:100%_4px] animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <SearchModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSearchQuery('');
                    onSearch('');
                }}
                onSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                currentPosts={currentPosts}
                currentMeta={currentMeta}
            />
        </>
    );
} 