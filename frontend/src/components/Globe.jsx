import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../public/Earth';
import { Center } from '@chakra-ui/react';

function Globe() {
  return (
    <Canvas>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} />
      <Earth />
    </Canvas>
  );
}

export default Globe;
