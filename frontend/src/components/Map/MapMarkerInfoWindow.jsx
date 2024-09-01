import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

const MapMarkerInfoWindow = ({ selectedMarker }) => {
  return (
    <InfoWindow
      position={selectedMarker.position}
      options={{
        disableAutoPan: true,
        pixelOffset: new window.google.maps.Size(0, -90),
        closeBoxURL: '',
      }}
      onCloseClick={() => setInfoWindowVisible(false)}
    >
      <Box
        p={2}
        borderRadius="md"
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.700')}
        minWidth="350px"
      >
        <HStack spacing={2} align="start">
          <Box flexShrink={0} borderRadius="md" overflow="hidden">
            <Image
              src={selectedMarker.photo}
              alt={`${selectedMarker.name} thumbnail`}
              boxSize="100px"
              objectFit="cover"
            />
          </Box>
          <VStack align="start" spacing={1} flex="1">
            <Text
              fontFamily="rale"
              fontWeight="bold"
              fontSize="md"
              noOfLines={1}
              isTruncated
            >
              {selectedMarker.name}
            </Text>
            <Text fontFamily="rale" fontSize="sm" color="yellow.500">
              ★ {selectedMarker.rating} ({selectedMarker.reviewCount})
            </Text>
            <Text
              fontFamily="rale"
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.300')}
              noOfLines={1}
              isTruncated
            >
              {selectedMarker.type.join(', ')}
            </Text>
            <Text
              fontFamily="rale"
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.300')}
              mt={1}
              noOfLines={1}
              isTruncated
            >
              {selectedMarker.address}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </InfoWindow>
  );
};

export default MapMarkerInfoWindow;
