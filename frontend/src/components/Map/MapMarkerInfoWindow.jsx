import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  IconButton,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaStar, FaDirections, FaRegBookmark } from 'react-icons/fa';

const MapMarkerInfoWindow = ({
  selectedMarker,
  onMouseEnter,
  onMouseLeave,
}) => {
  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<Icon as={FaStar} color="yellow.500" boxSize="3" key={i} />);
    }
    return stars;
  };

  return (
    <InfoWindow
      position={selectedMarker.position}
      options={{
        disableAutoPan: true,
        pixelOffset: new window.google.maps.Size(0, -90),
      }}
      onCloseClick={null} // Disable the close button
    >
      <VStack
        align="start"
        spacing={1}
        width="300px"
        height="230px"
        p={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Image Section */}
        <Image
          src={selectedMarker.photo}
          alt={`${selectedMarker.name} thumbnail`}
          width="300px"
          height="100px"
          objectFit="cover"
          borderTopRadius="md"
        />

        {/* Title and Icon Buttons */}
        <HStack justifyContent="space-between" width="100%" p={2} pt={1}>
          <Text fontWeight="bold" fontSize="md" noOfLines={1} isTruncated>
            {selectedMarker.name}
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<FaDirections />}
              size="sm"
              variant="ghost"
              aria-label="Get Directions"
            />
            <IconButton
              icon={<FaRegBookmark />}
              size="sm"
              variant="ghost"
              aria-label="Save Location"
            />
          </HStack>
        </HStack>

        {/* Rating Section */}
        <HStack spacing={1} px={2}>
          {renderStars(selectedMarker.rating)}
          <Text fontSize="xs" color="gray.500">
            ({selectedMarker.reviewCount})
          </Text>
        </HStack>

        {/* Status and Type */}
        <VStack align="start" spacing={0} px={2}>
          <Text
            fontSize="xs"
            color={useColorModeValue('gray.600', 'gray.300')}
            noOfLines={1}
          >
            {selectedMarker.type.join(', ')}
          </Text>
          <Text
            fontSize="xs"
            color={selectedMarker.isOpen ? 'green.500' : 'red.500'}
            noOfLines={1}
          >
            {selectedMarker.isOpen ? 'Open' : 'Closed'} - Opens{' '}
            {selectedMarker.closingTime}
          </Text>
        </VStack>
      </VStack>
    </InfoWindow>
  );
};

export default MapMarkerInfoWindow;
