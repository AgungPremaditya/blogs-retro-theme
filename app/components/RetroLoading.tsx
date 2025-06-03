'use client';

import { useEffect, useState } from 'react';

interface RetroLoadingProps {
    text?: string;
    duration?: number; // Duration in milliseconds
}

export function RetroLoading({ 
    text = 'Loading',
    duration = 2000 // Default to 2 seconds to match our simulated delay
}: RetroLoadingProps) {
    const [progress, setProgress] = useState(0);
    const [dots, setDots] = useState('');

    useEffect(() => {
        // Calculate the interval based on the duration
        // We want 100 steps, so divide duration by 100
        const stepDuration = duration / 100;
        
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + 1;
            });
        }, stepDuration);

        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length < 3 ? prev + '.' : '');
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(dotsInterval);
        };
    }, [duration]);

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