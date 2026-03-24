'use client';
import { useEffect, useRef } from 'react';

export default function InvertedDotCursor() {
    const elRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const posRef = useRef({ x: -100, y: -100 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            // Lerp for smooth follow without lag
            posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.35;
            posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.35;
            el.style.transform = `translate(${posRef.current.x - 6}px, ${posRef.current.y - 6}px)`;
            rafRef.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={elRef}
            className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white"
        />
    );
}
