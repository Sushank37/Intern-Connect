import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Octahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

const FloatingObject = ({ 
  position, 
  geometry, 
  color, 
  rotationSpeed,
  floatSpeed,
  floatRange 
}: {
  position: [number, number, number];
  geometry: 'sphere' | 'box' | 'octahedron' | 'torus';
  color: string;
  rotationSpeed: number;
  floatSpeed: number;
  floatRange: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Rotation animation
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;
      meshRef.current.rotation.z += rotationSpeed * 0.3;

      // Floating animation
      meshRef.current.position.y = initialY + Math.sin(clock.elapsedTime * floatSpeed) * floatRange;
    }
  });

  const renderGeometry = () => {
    const props = {
      ref: meshRef,
      position,
      scale: 1
    };

    switch (geometry) {
      case 'sphere':
        return (
          <Sphere {...props}>
            <meshStandardMaterial color={color} transparent opacity={0.8} />
          </Sphere>
        );
      case 'box':
        return (
          <Box {...props}>
            <meshStandardMaterial color={color} transparent opacity={0.8} />
          </Box>
        );
      case 'octahedron':
        return (
          <Octahedron {...props}>
            <meshStandardMaterial color={color} transparent opacity={0.8} />
          </Octahedron>
        );
      case 'torus':
        return (
          <Torus {...props} args={[1, 0.3, 16, 32]}>
            <meshStandardMaterial color={color} transparent opacity={0.8} />
          </Torus>
        );
      default:
        return null;
    }
  };

  return renderGeometry();
};

const FloatingObjects = () => {
  // Pre-calculated objects to avoid Math.random() in render
  const objects = [
    {
      position: [-6, 2, -5] as [number, number, number],
      geometry: 'sphere' as const,
      color: '#8b5cf6',
      rotationSpeed: 0.01,
      floatSpeed: 1.2,
      floatRange: 0.5
    },
    {
      position: [6, -2, -3] as [number, number, number],
      geometry: 'box' as const,
      color: '#ec4899',
      rotationSpeed: 0.015,
      floatSpeed: 0.8,
      floatRange: 0.7
    },
    {
      position: [-4, -3, -7] as [number, number, number],
      geometry: 'octahedron' as const,
      color: '#06b6d4',
      rotationSpeed: 0.02,
      floatSpeed: 1.5,
      floatRange: 0.4
    },
    {
      position: [4, 3, -6] as [number, number, number],
      geometry: 'torus' as const,
      color: '#10b981',
      rotationSpeed: 0.008,
      floatSpeed: 1.0,
      floatRange: 0.6
    },
    {
      position: [0, 4, -8] as [number, number, number],
      geometry: 'sphere' as const,
      color: '#f59e0b',
      rotationSpeed: 0.012,
      floatSpeed: 0.9,
      floatRange: 0.3
    },
    {
      position: [-7, 0, -4] as [number, number, number],
      geometry: 'box' as const,
      color: '#ef4444',
      rotationSpeed: 0.018,
      floatSpeed: 1.3,
      floatRange: 0.8
    }
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, -5]} intensity={0.5} color="#ec4899" />

      {/* Floating Objects */}
      {objects.map((obj, index) => (
        <FloatingObject key={index} {...obj} />
      ))}
    </>
  );
};

export default FloatingObjects;
