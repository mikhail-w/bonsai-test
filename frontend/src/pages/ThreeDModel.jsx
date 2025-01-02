import React, { Suspense, useRef, useEffect, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
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
      modelRef.current.position.copy(center).multiplyScalar(-1);
    }
  }, [scene]);

  return <primitive object={scene} ref={modelRef} />;
});

function Scene({ url }) {
  const { camera } = useThree();
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Adjust camera distance based on model size
      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim * 2.5;

      // Position the camera
      camera.position.set(center.x, center.y + size.y / 2, cameraDistance);
      camera.lookAt(center);
    }
  }, [camera, modelRef]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model url={url} ref={modelRef} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 0.5, 0]} // Adjust dynamically based on the model
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
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Scene url="/bonsairoom.glb" /> */}
          <Scene url="https://mikhail-bonsai.s3.us-east-1.amazonaws.com/media/bonsairoom.glb" />
        </Suspense>
      </Canvas>
    </Box>
  );
}
