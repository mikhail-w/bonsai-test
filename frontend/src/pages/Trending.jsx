import React from 'react';
import ModelViewer from '../components/ModelViewer';
import { Text } from '@chakra-ui/react';

function Trending() {
  return (
    // <>
    //   <div>Trending</div>
    // </>
    <div>
      <Text ml={10} fontFamily={'lato'} fontSize={'3rem'} fontWeight={300}>
        3D Model Viewer
      </Text>
      {/* Provide the correct URL to the .glb file */}
      <ModelViewer modelUrl="../../public/ficus_bonsai.glb" />
    </div>
  );
}

export default Trending;
