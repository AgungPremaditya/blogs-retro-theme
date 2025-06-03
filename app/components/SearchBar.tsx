import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { Post, PaginationMeta } from '@/service';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    currentPosts?: Post[];
    currentMeta?: PaginationMeta | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function SearchBar({ 
    onSearch, 
    placeholder = 'Search documentation...', 
    currentPosts = [],
    currentMeta = null,
    searchQuery,
    setSearchQuery
}: SearchBarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Check if CMD/CTRL + K is pressed
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsModalOpen(prev => !prev);
        }
        // Check if Escape is pressed
        if (e.key === 'Escape') {
            setIsModalOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <div className="relative max-w-md w-full md:w-96 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                {/* Main search container */}
                <div className="relative flex items-center bg-[#1a1a1a]/80 rounded-xl backdrop-blur-sm group">
                    {/* Search input (display only) */}
                    <div className="flex-1 px-4 py-3 text-[#EAEAEA]/40 font-mono text-sm">
                        {placeholder}
                    </div>

                    {/* Keyboard shortcut */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        <kbd className="px-2 py-1 text-xs font-mono bg-[#252525] text-[#EAEAEA]/70 rounded border border-[#333333]">
                            ⌘K
                        </kbd>
                    </div>

                    {/* Hover effects */}
                    <div className="absolute inset-0 rounded-xl border border-[#333333] group-hover:border-[#444444] transition-colors duration-300 pointer-events-none"></div>
                    
                    {/* Subtle glow effect on hover */}
                    <div className={`absolute -inset-[1px] bg-[#ffffff]/5 rounded-xl blur-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none`}></div>
                </div>
            </div>

            <SearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSearch={onSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                currentPosts={currentPosts}
                currentMeta={currentMeta}
            />
        </>
    );
} 