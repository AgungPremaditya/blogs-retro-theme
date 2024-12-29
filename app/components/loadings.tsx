"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingWrapper() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    return 100;
                }
                const newProgress = oldProgress + 10;
                return Math.min(newProgress, 100);
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center text-white font-mono">
            <div className="w-72 h-16 border-4 border-yellow-400 relative overflow-hidden p-2">
                <motion.div
                    className="h-full bg-yellow-200"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                />
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="absolute top-0 bottom-0 w-1 bg-navy-900"
                        style={{ left: `${(index + 1) * 33.5}%` }}
                    />
                ))}
            </div>
            <p className="mt-4 text-xl">LOADING {progress}%</p>
        </div>
    );
}
