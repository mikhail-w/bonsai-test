import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const Earth = () => {
  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, '/earth.gltf');

  // Reference to the Earth model
  const earthRef = useRef();

  // Rotate the Earth model
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01; // Rotate on the y-axis
    }
  });

  return (
    <primitive
      ref={earthRef}
      object={gltf.scene}
      scale={[3, 3, 3]} // Scale the model uniformly (3 times larger)
      rotation={[0, 0, 0]} // Initial rotation [x, y, z]
    />
  );
};

export default Earth;
