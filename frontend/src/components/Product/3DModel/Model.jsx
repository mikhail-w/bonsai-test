import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

const Model = () => {
  console.log(
    'MODEL: ',
    `${import.meta.env.VITE_S3_PATH}${'/media/ficus.glb'}`
  );
  const { scene } = useGLTF(
    `${import.meta.env.VITE_S3_PATH}${'/media/ficus.glb'}`
  );
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <OrbitControls enableZoom={true} minDistance={0.4} maxDistance={3} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <primitive object={scene} scale={0.8} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default Model;
