import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Earth(props) {
  const earthRef = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01; // Adjust the rotation speed here
    }
  });

  return (
    <mesh ref={earthRef} {...props}>
      {/* Your Earth geometry and materials go here */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default Earth;
