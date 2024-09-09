import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

// Component to render the 3D Model inside a Modal
const ThreeDModelViewer = () => {
  // Use `useGLTF` to load the model
  const { scene } = useGLTF('/ficus_bonsai.glb'); // Ensure this path is correct
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} />
      {/* Render the GLB model */}
      <primitive object={scene} scale={0.5} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

// This tells Vite to include .glb files in assets
// export const viteConfig = {
//   assetsInclude: ['**/*.glb'],
// };

export default ThreeDModelViewer;
