import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

const AnimatedBackground = () => {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const group3Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.elapsedTime;

    // Rotate different groups at different speeds
    if (group1Ref.current) {
      group1Ref.current.rotation.y = elapsedTime * 0.1;
      group1Ref.current.rotation.x = elapsedTime * 0.05;
    }

    if (group2Ref.current) {
      group2Ref.current.rotation.y = -elapsedTime * 0.15;
      group2Ref.current.rotation.z = elapsedTime * 0.08;
    }

    if (group3Ref.current) {
      group3Ref.current.rotation.x = elapsedTime * 0.12;
      group3Ref.current.rotation.y = elapsedTime * 0.07;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      <pointLight position={[-5, -5, 5]} intensity={0.2} color="#8b5cf6" />
      <pointLight position={[5, -5, 5]} intensity={0.2} color="#ec4899" />

      {/* Group 1 - Large distant objects */}
      <group ref={group1Ref}>
        <Sphere position={[-15, 10, -20]} scale={2}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            transparent 
            opacity={0.1}
            wireframe
          />
        </Sphere>
        <Torus position={[15, -8, -25]} args={[3, 1, 16, 32]} scale={1.5}>
          <meshStandardMaterial 
            color="#ec4899" 
            transparent 
            opacity={0.08}
            wireframe
          />
        </Torus>
      </group>

      {/* Group 2 - Medium objects */}
      <group ref={group2Ref}>
        <Box position={[12, 12, -15]} scale={1.5}>
          <meshStandardMaterial 
            color="#06b6d4" 
            transparent 
            opacity={0.12}
            wireframe
          />
        </Box>
        <Sphere position={[-12, -10, -18]} scale={1.8}>
          <meshStandardMaterial 
            color="#10b981" 
            transparent 
            opacity={0.1}
            wireframe
          />
        </Sphere>
      </group>

      {/* Group 3 - Small close objects */}
      <group ref={group3Ref}>
        <Torus position={[8, -5, -10]} args={[1.5, 0.5, 16, 32]}>
          <meshStandardMaterial 
            color="#f59e0b" 
            transparent 
            opacity={0.15}
            wireframe
          />
        </Torus>
        <Box position={[-8, 6, -12]} scale={1.2}>
          <meshStandardMaterial 
            color="#ef4444" 
            transparent 
            opacity={0.12}
            wireframe
          />
        </Box>
        <Sphere position={[0, -8, -14]} scale={1}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            transparent 
            opacity={0.2}
            wireframe
          />
        </Sphere>
      </group>

      {/* Additional atmospheric spheres */}
      <Sphere position={[0, 0, -30]} scale={8}>
        <meshStandardMaterial 
          color="#4c1d95" 
          transparent 
          opacity={0.03}
        />
      </Sphere>
      <Sphere position={[0, 0, -40]} scale={12}>
        <meshStandardMaterial 
          color="#7c2d92" 
          transparent 
          opacity={0.02}
        />
      </Sphere>
    </>
  );
};

export default AnimatedBackground;
