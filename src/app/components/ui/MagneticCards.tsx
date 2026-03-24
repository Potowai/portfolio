'use client';
import { useRef, useState, useEffect } from 'react';
import { projectList } from '@/app/data/projects';

interface MagneticCardsProps {
    onLoaded?: () => void;
}

export default function MagneticCards({ onLoaded }: MagneticCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '-50px' }
        );

        const cards = containerRef.current?.querySelectorAll('.magnetic-card');
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        onLoaded?.();
    }, [onLoaded]);

    return (
        <div ref={containerRef} className="w-full">
            <div className="flex flex-wrap gap-6 justify-start px-4">
                {projectList.slice(0, 8).map((project, index) => (
                    <div
                        key={project.name}
                        className="magnetic-card w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                        style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                    >
                        <MagneticCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
}

interface MagneticCardProps {
    project: typeof projectList[0];
}

function MagneticCard({ project }: MagneticCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const link = project.deployment || project.repository || '#';

    return (
        <div
            ref={cardRef}
            className="relative h-[320px] rounded-2xl overflow-hidden cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.4s ease-out',
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                style={{
                    backgroundImage: `url(${project.image})`,
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top - Title */}
                <div
                    style={{
                        transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                        opacity: isHovered ? 1 : 0.8,
                        transition: 'all 0.3s ease-out'
                    }}
                >
                    <h3 className="text-xl font-bold text-white mb-1">
                        {project.name}
                    </h3>
                    <p
                        className="text-sm text-white/70"
                        style={{
                            transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                            opacity: isHovered ? 0.9 : 0,
                            transition: 'all 0.3s ease-out'
                        }}
                    >
                        {project.summary}
                    </p>
                </div>

                {/* Bottom - Tech Stack & Link */}
                <div>
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.split(',').map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20"
                            >
                                {tech.trim()}
                            </span>
                        ))}
                    </div>

                    {/* Arrow Link */}
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        View Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
