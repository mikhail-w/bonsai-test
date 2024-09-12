import React from 'react';
import ModelViewer from '../components/ModelViewer';
import { Center, Text } from '@chakra-ui/react';

function Trending() {
  return (
    <div>
      <Center mt={30}>
        <Text fontWeight={300} fontFamily={'lato'} fontSize={'2rem'}>
          3D Model Viewer test
        </Text>
      </Center>
      <ModelViewer modelUrl="../../public/ficus.glb" />
    </div>
  );
}

export default Trending;
