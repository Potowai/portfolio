/*
 *  Copyright (c) Alexis Fiolleau <fiolleaua@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

import { useRef, forwardRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import variables from '../../style/variables.module.scss';

export const Duck = forwardRef(({ onToggleLight, duckRotation = [0, 0, 0], ...props }, ref) => {
  const { nodes, materials } = useGLTF('/assets/3d-models/rubber_duck.glb');
  const duck = useRef();
  const [hovered, setHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const { cursor, pointer } = variables;

  // Add slow Z-axis spinning animation and fast X-axis spin on click
  useFrame((state, delta) => {
    if (duck.current) {
      duck.current.rotation.z += delta * 0.2; // Slow spin speed (0.2 radians per second)
      
      // Fast X-axis spin when clicked
      if (isSpinning) {
        duck.current.rotation.x += delta * 8; // Fast spin speed (8 radians per second)
      }
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? pointer : cursor;
  }, [hovered]);

  const handleClick = (e) => {
    e.stopPropagation();

    // Start fast X-axis spinning
    setIsSpinning(true);
    
    // Stop spinning after 2 seconds
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);

    // Toggle ambient light
    if (onToggleLight) onToggleLight();

    // Play sound
    const squeak = new Audio('/assets/sounds/squeak.mp3');
    squeak.playbackRate = 1.35;
    squeak.play().catch((err) => {
      console.warn('Autoplay prevented or error playing sound:', err);
    });

    // Dispatch a custom event
    window.dispatchEvent(new CustomEvent('duckClicked'));
  };

  return (
    <group {...props} ref={duck} dispose={null} scale={[0.01, 0.01, 0.01]} rotation={duckRotation} position={[0, 0, 0]}>
      {Object.values(nodes).map((node, index) => {
        if (node.isMesh && node.geometry) {
          return (
            <mesh
              key={index}
              ref={index === 0 ? ref : null}
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
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[1, 1, 1]}
            />
          );
        }
        return null;
      })}
    </group>
  );
});

useGLTF.preload('/assets/3d-models/Mallard-duck_by_get3dmodels.glb');
