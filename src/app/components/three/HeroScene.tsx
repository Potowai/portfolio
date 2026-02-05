'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { Duck } from './Duck';

export default function HeroScene() {
    const [ambientOn, setAmbientOn] = useState(false);

    // Default responsive scale logic
    const [duckScale, setDuckScale] = useState(0.01); // Micro duck

    useEffect(() => {
        const handleResize = () => {
            // Adjust scale based on container/window
            setDuckScale(window.innerWidth > 768 ? 0.015 : 0.01); // Very small
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const duckRotation: [number, number, number] = [
        (234 * Math.PI) / 180,
        (-15 * Math.PI) / 180,
        (32 * Math.PI) / 180
    ];

    return (
        <div className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing">
            <Canvas
                camera={{ position: [2, 3, 4], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true }}
            >
                {ambientOn && <ambientLight intensity={0.5} />}
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                <hemisphereLight args={['#ffffff', '#ffc900', 1.5]} />

                <Float
                    speed={2}
                    rotationIntensity={1}
                    floatIntensity={1}
                    floatingRange={[-0.1, 0.1]}
                >
                    <Duck
                        scale={[duckScale, duckScale, duckScale]}
                        onToggleLight={() => setAmbientOn(!ambientOn)}
                        duckRotation={duckRotation}
                    />
                </Float>
            </Canvas>
        </div>
    );
}
