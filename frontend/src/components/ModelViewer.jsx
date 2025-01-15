import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Box, Spinner } from '@chakra-ui/react';

// Model component that loads and displays the GLB model
function Model() {
  const { scene } = useGLTF(
    `${import.meta.env.VITE_S3_PATH}/media/ficus_bonsai.glb`
  );
  return <primitive object={scene} scale={0.5} />;
}

// Fallback component for the 3D canvas
function LoadingSpinner() {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Spinner size="xl" />
    </Box>
  );
}

const ModelViewer = () => {
  return (
    <Box w="100%" h="80vh" border="1px solid #ccc" position="relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <OrbitControls enableDamping dampingFactor={0.05} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      <Suspense fallback={<LoadingSpinner />}>
        <Model />
      </Suspense>
    </Box>
  );
};

export default ModelViewer;
