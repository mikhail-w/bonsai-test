import React from 'react';
import {
  Box,
  VStack,
  Image,
  Text,
  Button,
  useColorModeValue,
  CloseButton,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

const MapDetailsPanel = ({ selectedLocation, closePanel }) => {
  return (
    <Box
      p={4}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="xl"
      height="100%"
      width={{ base: '100%', md: '400px' }}
      position="fixed"
      top={20}
      right={0}
    >
      <CloseButton
        onClick={closePanel}
        position={'absolute'}
        right={5}
        color={'white'}
        filter="brightness(3.2) contrast(1.1)"
        bg="rgba(0, 0, 0, 0.7)"
        _hover={{ transform: 'scale(1.2)' }}
      />
      {selectedLocation && (
        <VStack align="start" spacing={4}>
          <Box width={'100%'} height={'300px'}>
            <Image
              src={selectedLocation.photo}
              alt={`${selectedLocation.name} thumbnail`}
              borderRadius="md"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
          <Text fontFamily="rale" fontWeight="bold" fontSize="lg">
            {selectedLocation.name}
          </Text>
          <Text fontFamily="rale" fontSize="md">
            Address: {selectedLocation.vicinity}
          </Text>
          <Text fontFamily="rale" fontSize="md">
            Currently:{' '}
            {selectedLocation.opening_hours.isOpen() ? 'Open Now' : 'Closed'}
          </Text>
          <Text fontFamily="rale" fontSize="md">
            Status: {selectedLocation.business_status}
          </Text>
          <Button
            as="a"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              selectedLocation.vicinity
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<FaChevronRight />}
            colorScheme="green"
            width="full"
          >
            Get Directions
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default MapDetailsPanel;
