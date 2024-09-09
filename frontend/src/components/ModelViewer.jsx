import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Box, Spinner } from '@chakra-ui/react';

// Model component that loads and displays the GLB model
function Model({ url }) {
  const { scene } = useGLTF('../../public/ficus.glb'); // Load the model
  return <primitive object={scene} scale={0.5} />;
}

const ModelViewer = ({ modelUrl }) => {
  return (
    <Box w="100%" h="500px" border="1px solid #ccc">
      <Canvas>
        {/* Add orbit controls for model interaction */}
        <OrbitControls />
        {/* Add lighting to the scene */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} />
        {/* Load environment for realistic lighting */}
        <Suspense fallback={<Spinner />}>
          <Model url={modelUrl} />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </Box>
  );
};

export default ModelViewer;
