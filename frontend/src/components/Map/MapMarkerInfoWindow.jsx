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

const MapMarkerInfoWindow = ({ selectedMarker, onClose }) => {
  return (
    <InfoWindow
      position={selectedMarker.position}
      options={{
        disableAutoPan: true,
        pixelOffset: new window.google.maps.Size(0, -90),
        closeBoxURL: '', // Remove the default close button
      }}
      onCloseClick={onClose} // Call onClose when the InfoWindow is closed
    >
      <Box
        p={2}
        borderRadius="md"
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.700')}
        minWidth="300px"
        maxWidth="400px"
      >
        <VStack align="start" spacing={2}>
          {/* Image and Title */}
          <Image
            src={selectedMarker.photo}
            alt={`${selectedMarker.name} thumbnail`}
            borderRadius="md"
            width="100%"
            height="150px"
            objectFit="cover"
          />
          <Text
            fontFamily="rale"
            fontWeight="bold"
            fontSize="lg"
            noOfLines={1}
            isTruncated
          >
            {selectedMarker.name}
          </Text>

          {/* Rating and Review Count */}
          <HStack spacing={1}>
            <Text fontFamily="rale" fontSize="sm" color="yellow.500">
              ★
            </Text>
            <Text fontFamily="rale" fontSize="sm">
              {selectedMarker.rating}
            </Text>
            <Text fontFamily="rale" fontSize="sm" color="gray.500">
              ({selectedMarker.reviewCount})
            </Text>
          </HStack>

          {/* Type of Place */}
          <Text
            fontFamily="rale"
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.300')}
            noOfLines={1}
            isTruncated
          >
            {selectedMarker.type.join(', ')}
          </Text>

          {/* Open/Closed Status */}
          <Text
            fontFamily="rale"
            fontSize="sm"
            color={selectedMarker.isOpen ? 'green.500' : 'red.500'}
            noOfLines={1}
            isTruncated
          >
            {selectedMarker.isOpen ? 'Open' : 'Closed'} - Closes at{' '}
            {selectedMarker.closingTime}
          </Text>

          {/* Address */}
          <Text
            fontFamily="rale"
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.300')}
            mt={1}
            noOfLines={2}
            isTruncated
          >
            {selectedMarker.address}
          </Text>
        </VStack>
      </Box>
    </InfoWindow>
  );
};

export default MapMarkerInfoWindow;
