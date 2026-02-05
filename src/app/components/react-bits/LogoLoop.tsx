'use client';
import * as React from 'react';
import type { ReactNode, CSSProperties, RefObject } from 'react';
import './LogoLoop.css';

interface LogoItem {
    node?: ReactNode;
    src?: string;
    srcSet?: string;
    sizes?: string;
    width?: string | number;
    height?: string | number;
    alt?: string;
    title?: string;
    href?: string;
    ariaLabel?: string;
}

interface LogoLoopProps {
    logos: LogoItem[];
    speed?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    width?: string | number;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    renderItem?: (item: LogoItem, index: string) => ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: CSSProperties;
}

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (value: string | number | undefined) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback: () => void, elements: RefObject<HTMLElement | null>[], dependencies: any[]) => {
    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!window.ResizeObserver) {
            const handleResize = () => callback();
            window.addEventListener('resize', handleResize);
            callback();
            return () => window.removeEventListener('resize', handleResize);
        }
        const observers = elements.map(ref => {
            if (!ref.current) return null;
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return observer;
        });
        callback();
        return () => {
            observers.forEach(observer => observer?.disconnect());
        };
    }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef: RefObject<HTMLElement | null>, onLoad: () => void, dependencies: any[]) => {
    React.useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? [];
        if (images.length === 0) {
            onLoad();
            return;
        }
        let remainingImages = images.length;
        const handleImageLoad = () => {
            remainingImages -= 1;
            if (remainingImages === 0) onLoad();
        };
        images.forEach(img => {
            const htmlImg = img as HTMLImageElement;
            if (htmlImg.complete) {
                handleImageLoad();
            } else {
                htmlImg.addEventListener('load', handleImageLoad, { once: true });
                htmlImg.addEventListener('error', handleImageLoad, { once: true });
            }
        });
        return () => {
            images.forEach(img => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
    }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (trackRef: RefObject<HTMLElement | null>, targetVelocity: number, seqWidth: number, seqHeight: number, isHovered: boolean, hoverSpeed: number | undefined, isVertical: boolean) => {
    const rafRef = React.useRef<number | null>(null);
    const lastTimestampRef = React.useRef<number | null>(null);
    const offsetRef = React.useRef(0);
    const velocityRef = React.useRef(0);

    React.useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const seqSize = isVertical ? seqHeight : seqWidth;

        if (seqSize > 0) {
            offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
            const transformValue = isVertical
                ? `translate3d(0, ${-offsetRef.current}px, 0)`
                : `translate3d(${-offsetRef.current}px, 0, 0)`;
            track.style.transform = transformValue;
        }

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            if (seqSize > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;

                const transformValue = isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
                track.style.transform = transformValue;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            lastTimestampRef.current = null;
        };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

export const LogoLoop = React.memo(
    ({
        logos,
        speed = 120,
        direction = 'left',
        width = '100%',
        logoHeight = 28,
        gap = 32,
        pauseOnHover,
        hoverSpeed,
        fadeOut = false,
        fadeOutColor,
        scaleOnHover = false,
        renderItem,
        ariaLabel = 'Partner logos',
        className,
        style
    }: LogoLoopProps) => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        const trackRef = React.useRef<HTMLDivElement>(null);
        const seqRef = React.useRef<HTMLUListElement>(null);

        const [seqWidth, setSeqWidth] = React.useState(0);
        const [seqHeight, setSeqHeight] = React.useState(0);
        const [copyCount, setCopyCount] = React.useState(ANIMATION_CONFIG.MIN_COPIES);
        const [isHovered, setIsHovered] = React.useState(false);

        const effectiveHoverSpeed = React.useMemo(() => {
            if (hoverSpeed !== undefined) return hoverSpeed;
            if (pauseOnHover === true) return 0;
            if (pauseOnHover === false) return undefined;
            return 0;
        }, [hoverSpeed, pauseOnHover]);

        const isVertical = direction === 'up' || direction === 'down';

        const targetVelocity = React.useMemo(() => {
            const magnitude = Math.abs(speed);
            let directionMultiplier;
            if (isVertical) {
                directionMultiplier = direction === 'up' ? 1 : -1;
            } else {
                directionMultiplier = direction === 'left' ? 1 : -1;
            }
            const speedMultiplier = speed < 0 ? -1 : 1;
            return magnitude * directionMultiplier * speedMultiplier;
        }, [speed, direction, isVertical]);

        const updateDimensions = React.useCallback(() => {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const sequenceRect = seqRef.current?.getBoundingClientRect?.();
            const sequenceWidth = sequenceRect?.width ?? 0;
            const sequenceHeight = sequenceRect?.height ?? 0;
            if (isVertical) {
                const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
                if (containerRef.current && parentHeight > 0) {
                    const targetHeight = Math.ceil(parentHeight);
                    if (containerRef.current.style.height !== `${targetHeight}px`)
                        containerRef.current.style.height = `${targetHeight}px`;
                }
                if (sequenceHeight > 0) {
                    setSeqHeight(Math.ceil(sequenceHeight));
                    const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
                    const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
                    setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
                }
            } else if (sequenceWidth > 0) {
                setSeqWidth(Math.ceil(sequenceWidth));
                const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
                setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
            }
        }, [isVertical]);

        useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

        useImageLoader(seqRef as RefObject<HTMLElement>, updateDimensions, [logos, gap, logoHeight, isVertical]);

        useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

        const cssVariables = React.useMemo(
            () => ({
                '--logoloop-gap': `${gap}px`,
                '--logoloop-logoHeight': `${logoHeight}px`,
                ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
            }),
            [gap, logoHeight, fadeOutColor]
        );

        const rootClassName = React.useMemo(
            () =>
                [
                    'logoloop',
                    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
                    fadeOut && 'logoloop--fade',
                    scaleOnHover && 'logoloop--scale-hover',
                    className
                ]
                    .filter(Boolean)
                    .join(' '),
            [isVertical, fadeOut, scaleOnHover, className]
        );

        const handleMouseEnter = React.useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(true);
        }, [effectiveHoverSpeed]);
        const handleMouseLeave = React.useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(false);
        }, [effectiveHoverSpeed]);

        const renderLogoItem = React.useCallback(
            (item: LogoItem, key: string) => {
                if (renderItem) {
                    return (
                        <li className="logoloop__item" key={key} role="listitem">
                            {renderItem(item, key)}
                        </li>
                    );
                }
                const isNodeItem = 'node' in item;
                const content = isNodeItem ? (
                    <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
                        {item.node}
                    </span>
                ) : (
                    <img
                        src={item.src}
                        srcSet={item.srcSet}
                        sizes={item.sizes}
                        width={item.width}
                        height={item.height}
                        alt={item.alt ?? ''}
                        title={item.title}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                    />
                );
                const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
                const itemContent = item.href ? (
                    <a
                        className="logoloop__link"
                        href={item.href}
                        aria-label={itemAriaLabel || 'logo link'}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {content}
                    </a>
                ) : (
                    content
                );
                const tooltip = item.title ? (
                    <span className="logoloop__tooltip">{item.title}</span>
                ) : null;

                return (
                    <li className="logoloop__item" key={key} role="listitem">
                        {itemContent}
                        {tooltip}
                    </li>
                );
            },
            [renderItem]
        );

        const logoLists = React.useMemo(
            () =>
                Array.from({ length: copyCount }, (_, copyIndex) => (
                    <ul
                        className="logoloop__list"
                        key={`copy-${copyIndex}`}
                        role="list"
                        aria-hidden={copyIndex > 0}
                        ref={copyIndex === 0 ? seqRef : undefined}
                    >
                        {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
                    </ul>
                )),
            [copyCount, logos, renderLogoItem]
        );

        const containerStyle = React.useMemo(
            () => ({
                width: isVertical
                    ? toCssLength(width) === '100%'
                        ? undefined
                        : toCssLength(width)
                    : (toCssLength(width) ?? '100%'),
                ...cssVariables,
                ...style
            }),
            [width, cssVariables, style, isVertical]
        );

        return (
            <div ref={containerRef} className={rootClassName} style={containerStyle as CSSProperties} role="region" aria-label={ariaLabel}>
                <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {logoLists}
                </div>
            </div>
        );
    }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
