import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { PostList, PaginationMeta } from '@/service';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    currentPosts?: PostList[];
    currentMeta?: PaginationMeta | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function SearchBar({ 
    onSearch, 
    placeholder = 'Search...', 
    currentPosts = [],
    currentMeta = null,
    searchQuery,
    setSearchQuery
}: SearchBarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        // Check if user is on macOS
        setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }, []);

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
            <div 
                className="relative max-w-md w-full md:w-96 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                {/* Container for the search bar */}
                <div className="relative group">
                    {/* Focus/Hover glow effect */}
                    <div className={`absolute -inset-[1px] bg-yellow-400/20 rounded-xl blur-sm transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'} group-hover:opacity-30 pointer-events-none`}></div>

                    {/* Inner container */}
                    <div className="relative flex items-center bg-retro-dark border-2 border-yellow-400/20 group-hover:border-yellow-400/40 rounded-xl backdrop-blur-sm transition-all duration-300">
                        <div className="flex items-center gap-2 w-full px-4 py-3 text-[#EAEAEA]/40 font-mono text-sm rounded-xl group-hover:text-[#EAEAEA]/60 transition-colors duration-300">
                            <Search className="w-4 h-4" />
                            <span>{placeholder}</span>
                        </div>
                        
                        {/* Keyboard shortcut hint */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-retro-black text-yellow-400 rounded border border-yellow-400/20 group-hover:border-yellow-400/40 transition-colors duration-300">
                                {isMac ? '⌘' : 'Ctrl'}
                            </kbd>
                            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-retro-black text-yellow-400 rounded border border-yellow-400/20 group-hover:border-yellow-400/40 transition-colors duration-300">
                                K
                            </kbd>
                        </div>

                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(255,216,102,0.03)_50%,_transparent_100%)] bg-[length:100%_4px] animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    </div>
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