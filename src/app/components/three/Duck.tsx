'use client';

import { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Group, Mesh } from 'three';

// Preload the specific model we use
useGLTF.preload('/assets/3d-models/rubber_duck.glb');

interface DuckProps {
    onToggleLight?: () => void;
    duckRotation?: [number, number, number];
    scale?: [number, number, number];
}

export function Duck({ onToggleLight, duckRotation = [0, 0, 0], ...props }: DuckProps) {
    const { nodes, materials } = useGLTF('/assets/3d-models/rubber_duck.glb') as any;
    const duckRef = useRef<Group>(null);
    const [hovered, setHovered] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    // Rotate configuration
    useFrame((state, delta) => {
        if (duckRef.current) {
            duckRef.current.rotation.z += delta * 0.2; // Slow ambient spin

            if (isSpinning) {
                duckRef.current.rotation.x += delta * 8; // Fast spin on click
            }
        }
    });

    // Cursor handling
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
        return () => {
            document.body.style.cursor = 'auto'; // Cleanup
        };
    }, [hovered]);

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();

        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 500);

        if (onToggleLight) onToggleLight();

        // Play sound
        const squeak = new Audio('/assets/sounds/squeak.mp3');
        squeak.playbackRate = 1.35;
        squeak.play().catch((err) => console.warn('Audio play failed', err));
    };

    return (
        <group {...props} ref={duckRef} dispose={null} rotation={duckRotation}>
            {Object.values(nodes).map((node: any, index: number) => {
                if (node.isMesh && node.geometry) {
                    return (
                        <mesh
                            key={index}
                            geometry={node.geometry}
                            material={node.material}
                            onClick={handleClick}
                            onPointerOver={(e) => {
                                e.stopPropagation();
                                setHovered(true);
                            }}
                            onPointerOut={(e) => {
                                e.stopPropagation();
                                setHovered(false);
                            }}
                        />
                    );
                }
                return null;
            })}
        </group>
    );
}
