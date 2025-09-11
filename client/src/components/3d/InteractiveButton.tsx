import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import * as THREE from "three";

const InteractiveButton = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle pulsing animation
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(scale);

      // Rotation animation
      meshRef.current.rotation.y = Math.sin(clock.elapsedTime) * 0.1;
      meshRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.7) * 0.05;

      // Hover effect
      if (hovered) {
        meshRef.current.position.z = Math.sin(clock.elapsedTime * 4) * 0.2;
      }
    }
  });

  return (
    <>
      {/* Lighting for the button */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <pointLight position={[-2, -2, 2]} intensity={0.5} color="#8b5cf6" />

      {/* Interactive 3D element behind button */}
      <Box
        ref={meshRef}
        args={[4, 1, 0.5]}
        position={[0, 0, -1]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#ec4899" : "#8b5cf6"}
          transparent
          opacity={0.3}
          emissive={hovered ? "#ec4899" : "#8b5cf6"}
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Glowing effect */}
      <Box
        args={[4.2, 1.2, 0.3]}
        position={[0, 0, -1.1]}
      >
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          emissive="#8b5cf6"
          emissiveIntensity={0.1}
        />
      </Box>
    </>
  );
};

export default InteractiveButton;
