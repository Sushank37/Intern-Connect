import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Pre-calculate particle positions to avoid Math.random() in render
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  // Pre-calculate random values for animation
  const particleData = useMemo(() => {
    return Array.from({ length: 2000 }, () => ({
      speed: Math.random() * 0.02 + 0.005,
      amplitude: Math.random() * 2 + 0.5,
      frequency: Math.random() * 2 + 0.5
    }));
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.length; i++) {
        const { speed, amplitude, frequency } = particleData[i];
        
        // Create gentle floating motion
        positions[i * 3 + 1] += Math.sin(clock.elapsedTime * frequency) * speed;
        positions[i * 3] += Math.cos(clock.elapsedTime * frequency * 0.5) * speed * 0.5;
        
        // Reset particles that drift too far
        if (positions[i * 3 + 1] > 25) {
          positions[i * 3 + 1] = -25;
        }
        if (positions[i * 3 + 1] < -25) {
          positions[i * 3 + 1] = 25;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      {/* Ambient lighting for particles */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />
      
      {/* Main particle system */}
      <Points ref={pointsRef} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Secondary particle system with different color */}
      <Points positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ec4899"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>

      {/* Tertiary particle system for depth */}
      <Points positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </>
  );
};

export default ParticleSystem;
