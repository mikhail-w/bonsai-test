import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../public/Earth';
import { Center, useBreakpointValue } from '@chakra-ui/react';
import SaveTheWorldText from './SaveTheWorldText';

function Globe() {
  const containerSize = useBreakpointValue({
    base: '300px', // Mobile devices
    sm: '400px', // Small screens (e.g., tablets)
    md: '600px', // Medium screens (e.g., small desktops)
    lg: '800px', // Large screens
  });

  return (
    <div>
      <Center
        // boxShadow={'outline'}
        width={containerSize}
        height={containerSize}
        margin={'auto'}
      >
        <Canvas className="earthContainer">
          <ambientLight intensity={1} />
          <OrbitControls enableZoom={true} />
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Earth />
          {/* </Suspense> */}
          <Environment preset="sunset" />
        </Canvas>
      </Center>
      <SaveTheWorldText />
    </div>
  );
}

export default Globe;
