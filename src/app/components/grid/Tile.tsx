import { ReactNode } from 'react';

interface TileProps {
    children: ReactNode;
    className?: string; // For grid-area assignment (e.g., 'col-span-2')
    id?: string;
}

export default function Tile({ children, className = '', id }: TileProps) {
    return (
        <div
            id={id}
            className={`
        relative overflow-hidden rounded-[24px] 
        bg-white/50 backdrop-blur-[10px] 
        border border-white/20 shadow-sm
        transition-all duration-300 hover:scale-[1.01] hover:shadow-md
        dark:bg-black/30 dark:border-white/10
        pointer-events-auto
        ${className}
      `}
        >
            {children}
        </div>
    );
}
