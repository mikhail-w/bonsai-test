import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Center, useBreakpointValue, Box, Spinner } from '@chakra-ui/react';
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

// Loading Spinner for the Earth Model
const LoadingFallback = () => (
  <Center width="100%" height="100%">
    <Spinner size="xl" color="teal.500" />
  </Center>
);

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
        {/* Chakra-based spinner outside of Canvas */}
        <Suspense fallback={<LoadingFallback />}>
          {/* R3F Canvas, containing only Three.js-compatible components */}
          <Canvas className="earthContainer">
            <ambientLight intensity={1} />
            <Earth /> {/* Earth model */}
            <CustomOrbitControls minDistance={minZoom} maxDistance={maxZoom} />
            <Environment preset="sunset" />
          </Canvas>
        </Suspense>
      </Center>
      {/* Save the world text is regular HTML */}
      <SaveTheWorldText />
    </Box>
  );
};

export default Globe;
