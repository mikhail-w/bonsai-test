import React from 'react';
import { useGLTF } from '@react-three/drei';

const FicusBonsai = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);

  return <primitive object={scene} scale={[1, 1, 1]} />;
};

export default FicusBonsai;