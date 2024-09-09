import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// BonsaiViewer component
const BonsaiViewer = () => {
  // Load the GLB model
  const { scene } = useGLTF('/src/assets/images/ficus_bonsai (1).glb'); // Make sure the path is correct

  return (
    <Canvas camera={{ position: [0, 5, 1], fov: 35 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <primitive object={scene} scale={2.5} position={[0, -1, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

// Necessary hook to preload the GLTF file
useGLTF.preload('/src/assets/images/ficus_bonsai (1).glb');

export default BonsaiViewer;
