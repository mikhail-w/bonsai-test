import React, { useState } from 'react';
import {
  Box,
  HStack,
  VStack,
  List,
  ListItem,
  IconButton,
  Text,
  Image,
  useColorModeValue,
  Input,
} from '@chakra-ui/react';
import { FaSearch, FaChevronRight } from 'react-icons/fa';

const MapSidebar = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  locationList,
  setCenter,
  panTo,
  handleIconClick,
  setSelectedMarker,
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  return (
    <Box
      width={{ base: '100%', md: '30%' }}
      minW={{ md: '450px' }}
      display={{ base: 'none', md: 'block' }}
      maxH="90vh"
      bg={useColorModeValue('gray.50', 'gray.800')}
      p={4}
      boxShadow="lg"
      overflowY="auto"
    >
      <Box
        position="sticky"
        top="-5"
        bg={useColorModeValue('gray.50', 'gray.800')}
        zIndex="1"
        p={4}
      >
        <HStack>
          <Input
            placeholder="Search bonsai locations..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="lg"
            boxShadow="sm"
            _focus={{ borderColor: 'green.400' }}
          />
          <IconButton
            icon={<FaSearch />}
            onClick={handleSearch}
            colorScheme="green"
            aria-label="Search"
          />
        </HStack>
        <Text size="md" mt={4} fontFamily="rale">
          Nearby Bonsai Locations:
        </Text>
      </Box>
      <Box mt={4}>
        <List spacing={0} pl={0}>
          {locationList.map(location => (
            <ListItem
              key={location.id || location.place_id} // Ensure a unique key
              p={0}
              mt={5}
              borderRadius="lg"
              width="100%"
              bg={
                selectedLocationId === location.place_id ? 'green.100' : 'white'
              }
              transition="all 0.3s"
              _hover={{
                bg:
                  selectedLocationId === location.place_id
                    ? 'green.100'
                    : 'green.100',
                transform: 'scale(1.02)',
                boxShadow: 'xl',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelectedLocationId(location.place_id); // Update the selected location
                if (location.geometry && location.geometry.location) {
                  const latLng = {
                    lat: location.geometry.location.lat(),
                    lng: location.geometry.location.lng(),
                  };
                  if (panTo) {
                    panTo(latLng);
                  } else {
                    setCenter(latLng);
                  }
                  setSelectedMarker({
                    id: location.place_id,
                    ...location,
                  });
                } else {
                  console.error(
                    'Location geometry or location is undefined:',
                    location
                  );
                }
              }}
            >
              <HStack align="center" width="100%" spacing={0} px={4} py={2}>
                <Box
                  boxSize={'100px'}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.200"
                >
                  <Image
                    boxSize="100%"
                    objectFit="cover"
                    src={location.photos ? location.photos[0].getUrl() : null}
                    alt={`${location.name} thumbnail`}
                  />
                </Box>
                <VStack align="start" spacing={1} flex="1" ml={4}>
                  <Text
                    fontFamily="rale"
                    fontWeight="bold"
                    fontSize={{ base: 'md', md: 'lg' }}
                    color={'black'}
                  >
                    {location.name}
                  </Text>
                  <Text
                    fontFamily="rale"
                    fontSize={{ base: 'sm', md: 'md' }}
                    color="gray.600"
                  >
                    {location.vicinity}
                  </Text>
                </VStack>
                <IconButton
                  icon={<FaChevronRight />}
                  aria-label="More details"
                  colorScheme="green"
                  variant="ghost"
                  size="sm"
                  display={{ base: 'none', md: 'inline-flex' }}
                  _hover={{
                    transform: 'scale(1.2)',
                  }}
                  transition="transform 0.2s"
                  onClick={() => handleIconClick(location)}
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MapSidebar;
