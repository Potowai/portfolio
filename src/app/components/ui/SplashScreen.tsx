'use client';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
    isLoading: boolean;
}

export default function SplashScreen({ isLoading }: SplashScreenProps) {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            // Delay unmounting to allow fade-out animation
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 700); // 700ms matches the transition duration
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className="flex flex-col items-center gap-4">
                {/* Simple Loader Animation */}
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-white/80 font-mono text-sm tracking-widest animate-pulse">INITIALIZING</p>
            </div>
        </div>
    );
}
