import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  HStack,
  VStack,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

const MapDrawer = ({ isOpen, onClose, locationList, setCenter }) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Nearby Bonsai Locations</DrawerHeader>
        <DrawerBody>
          <List spacing={4} pl={0}>
            {locationList.map(location => (
              <ListItem
                key={location.place_id}
                p={3}
                borderRadius="md"
                boxShadow="sm"
                bg={useColorModeValue('white', 'gray.700')}
                _hover={{
                  bg: useColorModeValue('gray.100', 'gray.600'),
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setCenter({
                    lat: location.geometry.location.lat(),
                    lng: location.geometry.location.lng(),
                  });
                  onClose(); // Close the drawer after selecting a location
                }}
              >
                <HStack>
                  <Image
                    boxSize="50px"
                    borderRadius="md"
                    src={location.photos ? location.photos[0].getUrl() : null}
                    alt={`${location.name} thumbnail`}
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontFamily="rale" fontWeight="bold">
                      {location.name}
                    </Text>
                    <Text fontFamily="rale" fontSize="sm">
                      {location.vicinity}
                    </Text>
                  </VStack>
                </HStack>
              </ListItem>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
