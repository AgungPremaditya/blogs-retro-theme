'use client';

import { useEffect, useState } from 'react';

interface RetroLoadingProps {
    text?: string;
    progress: number;
}

export function RetroLoading({ 
    text = 'Loading',
    progress
}: RetroLoadingProps) {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + '.' : '');
        }, 200);

        return () => {
            clearInterval(dotsInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center space-y-4 font-mono">
            <div className="text-2xl text-yellow-400 pixelated">
                {text}{dots}
            </div>
            <div className="w-96 relative">
                {/* Main border */}
                <div className="border-4 border-yellow-400 p-2">
                    <div 
                        className="h-6 bg-yellow-400 transition-all duration-100 relative"
                        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                    >
                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/10 to-transparent animate-scan" />
                    </div>
                </div>

                {/* Progress text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-yellow-400 font-bold pixelated z-10 mix-blend-difference">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </div>
    );
} 