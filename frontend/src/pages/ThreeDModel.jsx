import React, { Suspense, useRef, useEffect, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useColorModeValue, Box } from '@chakra-ui/react';

const Model = forwardRef(({ url }, ref) => {
  const { scene } = useGLTF(url);
  const modelRef = ref || useRef();

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Scale the model to fit within a predefined size (2 units)
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      modelRef.current.scale.set(scale, scale, scale);

      // Center the model
      box.setFromObject(modelRef.current);
      const adjustedCenter = box.getCenter(new THREE.Vector3());
      modelRef.current.position.copy(adjustedCenter).multiplyScalar(-1);
    }
  }, [scene]);

  return <primitive object={scene} ref={modelRef} />;
});

function Scene({ url }) {
  const { camera } = useThree(); // Access the camera
  const modelRef = useRef(); // Reference for the model

  useEffect(() => {
    if (modelRef.current) {
      // Calculate the model's bounding box
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Camera closeness (distance from the model)
      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim * 2; // Adjust multiplier for closeness

      // Camera height (above the model)
      const cameraHeight = center.y + 3; // Increase for higher camera positioning

      // Set camera position
      camera.position.set(center.x, cameraHeight, cameraDistance);

      // Camera angle (focus point)
      camera.lookAt(center.x, center.y, center.z); // Focus on the model's center
    }
  }, [camera, modelRef]); // Re-run if camera or modelRef changes

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      {/* Model */}
      <Model url={url} ref={modelRef} />

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 0.5, 0]} // Match model's center for smoother controls
      />
    </>
  );
}

export default function ThreeDModel() {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      w="100%"
      h="100vh"
      bgColor={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Canvas>
        <Suspense
          fallback={
            <Html center>
              <div>Loading...</div>
            </Html>
          }
        >
          {/* <Scene url="/bonsairoom.glb" /> */}
          <Scene
            url={`${import.meta.env.VITE_API_BASE_URL}/media/bonsairoom.glb`}
          />
        </Suspense>
      </Canvas>
    </Box>
  );
}
