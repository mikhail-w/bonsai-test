import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';


function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

function Experience({ modelPath }) {
  return (
    <Canvas style={{ height: '500px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />
      <Suspense fallback={null}>
        <Model modelPath='/ficus_bonsai (1).glb' />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default Experience;