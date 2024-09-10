import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Center, useBreakpointValue, Box } from '@chakra-ui/react';
import Earth from '../../public/Earth';
import SaveTheWorldText from './SaveTheWorldText';

// Modular Orbit Controls with Zoom Limits
const CustomOrbitControls = ({ minDistance, maxDistance }) => {
  return (
    <OrbitControls
      enableZoom={true}
      minDistance={minDistance}
      maxDistance={maxDistance}
      enablePan={false} // Disable panning for a cleaner experience
      enableRotate={true} // Allow rotating
    />
  );
};

// Main Globe Component
const Globe = () => {
  // Responsive container size for the canvas
  const containerSize = useBreakpointValue({
    base: '300px', // Mobile devices
    sm: '400px', // Small screens (e.g., tablets)
    md: '600px', // Medium screens (e.g., small desktops)
    lg: '800px', // Large screens
  });

  // Zoom limits
  const minZoom = 5.5; // Minimum zoom level (Zoom out limit)
  const maxZoom = 8; // Maximum zoom level (Zoom in limit)

  return (
    <Box>
      <Center width={containerSize} height={containerSize} margin="auto">
        {/* R3F Canvas needs to only contain Three.js-compatible components */}
        <Canvas className="earthContainer">
          <ambientLight intensity={1} />
          <Suspense fallback={<div>Loading Earth...</div>}>
            <Earth /> {/* Earth model */}
          </Suspense>
          <CustomOrbitControls minDistance={minZoom} maxDistance={maxZoom} />
          <Environment preset="sunset" />
        </Canvas>
      </Center>
      {/* HTML components should be outside of the Canvas */}
      <SaveTheWorldText />
    </Box>
  );
};

export default Globe;
