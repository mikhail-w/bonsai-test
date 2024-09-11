import React from 'react';
import ModelViewer from '../components/ModelViewer';
import { Text } from '@chakra-ui/react';

function Trending() {
  return (
    <div>
      <h1>3D Model Viewer</h1>
      <ModelViewer modelUrl="../../public/ficus.glb" />
    </div>
  );
}

export default Trending;
