import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

const Model = () => {
  // Construct the correct path - remove trailing slash if present
  // const baseUrl = import.meta.env.VITE_S3_PATH.replace(/\/$/, '');
  // const modelPath = `${baseUrl}/media/ficus_bonsai.glb`;

  // console.log('MODEL PATH: ', modelPath);

  const { scene } = useGLTF('/ficus_bonsai.glb');

  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <OrbitControls enableZoom={true} minDistance={0.4} maxDistance={3} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <primitive object={scene} scale={0.8} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

// Preload the model
useGLTF.preload(`/ficus_bonsai.glb`);

export default Model;
