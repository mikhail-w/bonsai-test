import React, { Suspense, useRef, useEffect, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Use forwardRef to allow ref passing to the Model component
const Model = forwardRef(({ url }, ref) => {
  const { scene } = useGLTF(url);
  const modelRef = ref || useRef();

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      modelRef.current.scale.set(scale, scale, scale);

      // Adjust the position of the model to be centered
      box.setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
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

      // Adjust camera position based on the model's bounding box size
      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim * 2; // Adjust this factor to control zoom

      // Lower the camera position on the y-axis to make the model appear higher
      camera.position.set(center.x, center.y - size.y * 0.5, cameraDistance);

      // Make the camera look at the center of the model
      camera.lookAt(center);
    }
  }, [camera]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model url={url} ref={modelRef} /> {/* Pass ref to Model */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 1, 0]} // You can adjust the target dynamically
      />
    </>
  );
}

export default function ThreeDModel() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene url="/bonsairoom.glb" />
        </Suspense>
      </Canvas>
    </div>
  );
}
