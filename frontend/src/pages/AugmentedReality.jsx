import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Box, VStack, Text, Button } from '@chakra-ui/react';

const AugmentedReality = () => {
  const canvasRef = useRef();

  // URL for the `.glb` and `.usdz` files hosted on AWS S3
  const gltfUrl =
    'https://mikhail-bonsai-model.s3-accelerate.amazonaws.com/ficus_bonsai.glb';
  // 'https://mikhail-bonsai-model.s3.us-east-1.amazonaws.com/pergolesi-side-chair.glb';
  const usdzUrl =
    'https://mikhail-bonsai-model.s3-accelerate.amazonaws.com/ficus_bonsai.usdz'; // For iOS devices

  // Detect if the user is on an iOS device
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Construct the AR viewer link based on the platform
  const arLink = isIOS
    ? usdzUrl // iOS uses .usdz files for Quick Look
    : `https://arvr.google.com/scene-viewer/1.0?file=${gltfUrl}&mode=ar-only`; // Android uses .glb files for Scene Viewer

  useEffect(() => {
    // Generate a QR code for the AR link
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
          View Bonsai in AR
        </Text>
        {/* Canvas element to render the QR Code */}
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
