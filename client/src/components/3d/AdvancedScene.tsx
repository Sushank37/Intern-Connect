import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Laptop Component
function Laptop({ position, ...props }: { position: [number, number, number] }) {
  const gltf = useGLTF('/models/laptop.glb');
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5) * 0.1;
      
      // Mouse interaction - subtle rotation toward mouse
      const rotationX = mouse.y * 0.1;
      const rotationY = mouse.x * 0.1;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotationX, 0.02);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotationY, 0.02);
      
      // Hover effect
      const targetScale = hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      {...props}
    >
      <primitive object={gltf.scene.clone()} scale={0.5} />
    </group>
  );
}

// Documents Component
function Documents({ position, ...props }: { position: [number, number, number] }) {
  const gltf = useGLTF('/models/documents.glb');
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      // Floating animation with different timing
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7 + 1) * 0.15;
      meshRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.05;
      
      // Mouse interaction
      const rotationX = mouse.y * 0.05;
      const rotationY = mouse.x * 0.05;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotationX, 0.02);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotationY + Math.PI / 4, 0.02);
      
      // Hover effect
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      {...props}
    >
      <primitive object={gltf.scene.clone()} scale={0.3} />
    </group>
  );
}

// Office Environment Component
function OfficeEnvironment({ position, ...props }: { position: [number, number, number] }) {
  const gltf = useGLTF('/models/office-environment.glb');
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Very subtle movement for the office environment
      meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={meshRef} position={position} {...props}>
      <primitive object={gltf.scene.clone()} scale={1.2} />
    </group>
  );
}

// Main Advanced Scene Component
const AdvancedScene = () => {
  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.4} color="#f0f0ff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[10, -10, -5]} intensity={0.8} color="#ec4899" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#06b6d4"
        castShadow
      />

      {/* HDR Environment for realistic reflections */}
      <Environment preset="city" background={false} />

      {/* Contact Shadows for realism */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={20}
        blur={1}
        far={10}
        resolution={256}
        color="#000000"
      />

      {/* 3D Models positioned around the scene */}
      <OfficeEnvironment position={[0, -1, -8]} />
      <Laptop position={[-4, 1, -2]} />
      <Laptop position={[4, 2, -3]} />
      <Documents position={[-6, 2, -4]} />
      <Documents position={[6, 0, -2]} />
      <Documents position={[0, 3, -5]} />

      {/* Additional floating elements for depth */}
      <mesh position={[-8, 1, -6]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} />
      </mesh>
      <mesh position={[8, -1, -4]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ec4899" transparent opacity={0.8} />
      </mesh>
      <mesh position={[2, 4, -7]} castShadow>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
      </mesh>
    </>
  );
};

// Preload all models
useGLTF.preload('/models/laptop.glb');
useGLTF.preload('/models/documents.glb');
useGLTF.preload('/models/office-environment.glb');

export default AdvancedScene;