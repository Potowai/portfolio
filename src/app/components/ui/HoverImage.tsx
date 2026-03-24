'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface HoverImageProps {
    text: string;
    src: string;
    alt?: string;
    className?: string;
}

export default function HoverImage({ text, src, alt = "Hover image", className = "" }: HoverImageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const spanRef = useRef<HTMLSpanElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Clamp position to keep popup within viewport
        const POPUP_WIDTH = 192; // w-48 = 12rem ≈ 192px
        const POPUP_HEIGHT = 128; // h-32 = 8rem ≈ 128px
        const OFFSET = 16;
        const x = Math.min(e.clientX, window.innerWidth - POPUP_WIDTH - OFFSET);
        const y = Math.min(e.clientY, window.innerHeight - POPUP_HEIGHT - OFFSET);
        setMousePos({ x: Math.max(OFFSET, x), y: Math.max(OFFSET, y) });
    };

    const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');

    return (
        <span
            ref={spanRef}
            className={`cursor-help underline decoration-dotted underline-offset-4 decoration-gray-400 hover:decoration-blue-500 hover:text-blue-500 transition-colors duration-200 relative inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {text}
            {isHovered && (
                <div
                    className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-[50%]"
                    style={{
                        left: mousePos.x,
                        top: mousePos.y,
                    }}
                >
                    <div className="bg-white dark:bg-zinc-800 p-2 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700">
                        <div className="relative w-48 h-32 overflow-hidden rounded-md bg-gray-100 dark:bg-zinc-900">
                            {isVideo ? (
                                <video
                                    src={src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    unoptimized={src.endsWith('.gif')}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </span>
    );
}
