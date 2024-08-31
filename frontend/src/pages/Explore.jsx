import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../public/Earth';
import Map from '../components/Map';

function Explore() {
  return (
    <>
      <div className="container">
        <Canvas className="earthContainer">
          <ambientLight intensity={1} />
          <OrbitControls enableZoom={false} />
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Earth />
          {/* </Suspense> */}
          <Environment preset="sunset" />
        </Canvas>
      </div>
      <div>
        <Map />
      </div>
    </>
  );
}

export default Explore;
