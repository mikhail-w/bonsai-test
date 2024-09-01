import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const MapMarkerInfoWindow = ({
  selectedMarker,
  onMouseEnter,
  onMouseLeave,
  onCloseClick,
}) => {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    selectedMarker.address
  )}`;

  return (
    <InfoWindow
      position={selectedMarker.position}
      options={{
        disableAutoPan: true,
        pixelOffset: new window.google.maps.Size(0, -90),
      }}
      onCloseClick={onCloseClick}
    >
      <Box
        p={2}
        borderRadius="md"
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.700')}
        minWidth="300px"
        maxWidth="400px"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <VStack align="start" spacing={2}>
          <Image
            src={selectedMarker.photo}
            alt={`${selectedMarker.name} thumbnail`}
            borderRadius="md"
            width="100%"
            height="150px"
            objectFit="cover"
          />
          <Text fontWeight="bold" fontSize="lg" noOfLines={1} isTruncated>
            {selectedMarker.name}
          </Text>
          <HStack spacing={1}>
            <Text fontSize="sm" color="yellow.500">
              ★
            </Text>
            <Text fontSize="sm">{selectedMarker.rating}</Text>
            <Text fontSize="sm" color="gray.500">
              ({selectedMarker.reviewCount})
            </Text>
          </HStack>
          <Text
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.300')}
            noOfLines={1}
            isTruncated
          >
            {selectedMarker.type.join(', ')}
          </Text>
          <Text
            fontSize="sm"
            color={selectedMarker.isOpen ? 'green.500' : 'red.500'}
            noOfLines={1}
            isTruncated
          >
            {selectedMarker.isOpen ? 'Open' : 'Closed'} - Closes at{' '}
            {selectedMarker.closingTime}
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.300')}
            mt={1}
            noOfLines={2}
            isTruncated
          >
            {selectedMarker.address}
          </Text>
          <Button
            as="a"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="green"
            size="sm"
            width="full"
            mt={2}
          >
            Get Directions
          </Button>
        </VStack>
      </Box>
    </InfoWindow>
  );
};

export default MapMarkerInfoWindow;
