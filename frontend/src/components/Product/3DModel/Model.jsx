import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('../../public/ficus.glb');
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <OrbitControls enableZoom={true} minDistance={0.6} maxDistance={3} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <primitive object={scene} scale={0.8} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default Model;
