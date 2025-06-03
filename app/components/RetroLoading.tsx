'use client';

import { useEffect, useState } from 'react';

interface RetroLoadingProps {
    text?: string;
    progress: number;
}

export function RetroLoading({ 
    text = 'Loading',
    progress: rawProgress
}: RetroLoadingProps) {
    const [dots, setDots] = useState('');
    // Ensure progress is between 0 and 100
    const progress = Math.min(100, Math.max(0, rawProgress));

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
                        style={{ width: `${progress}%` }}
                    >
                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/10 to-transparent animate-scan" />
                    </div>
                </div>

                {/* Progress text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-yellow-400 font-bold pixelated z-10 mix-blend-difference">
                        {progress}%
                    </span>
                </div>
            </div>
        </div>
    );
} 