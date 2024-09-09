import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
// import Bonsai from '../assets/images/ficus_bonsai.glb';

const AugmentedReality = () => {
  const canvasRef = useRef();
  const gltfUrl = 'https://go.echo3d.co/qM5A';
  // const gltfUrl = Bonsai;
  // const gltfUrl = '../assets/images/ficus_bonsai.glb';
  // const gltfUrl =
  //   'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/BoomBox/glTF-Binary/BoomBox.glb';
  const usdzUrl =
    // 'https://developer.apple.com/augmented-reality/quick-look/models/teapot/teapot.usdz';
    'https://developer.apple.com/augmented-reality/quick-look/models/banjo/banjo.usdz';

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const arLink = isIOS
    ? usdzUrl // Directly open in AR Quick Look on iOS
    : `https://arvr.google.com/scene-viewer/1.0?file=${gltfUrl}&mode=ar-only`;

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, arLink, { width: 200 });
  }, [arLink]);

  return (
    <Box textAlign="center" fontSize="xl" p={5}>
      <VStack spacing={5}>
        <Text
          fontFamily={'rale'}
          fontSize="2xl"
          fontWeight="bold"
          color="green.600"
        >
          View 3D Model in AR
        </Text>
        <canvas ref={canvasRef} />
        <Button
          fontFamily={'rale'}
          colorScheme="green"
          as="a"
          href={arLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in AR
        </Button>
      </VStack>
    </Box>
  );
};

export default AugmentedReality;
