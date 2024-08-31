import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import {
  Box,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  Spinner,
  Heading,
  IconButton,
  Input,
  Image,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch, FaBars } from 'react-icons/fa';
import CustomMarker from '../assets/images/leaf-green.png';

const libraries = ['places'];
const mapContainerStyle = {
  height: '60vh',
  width: '100%',
};

const Map = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        error => {
          setError('Geolocation not enabled or denied.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && center.lat && center.lng) {
      const map = mapRef.current;
      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: '20000',
        type: ['store'],
        keyword: searchTerm || 'bonsai OR garden OR club OR potter',
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(
            results.map(place => ({
              id: place.place_id,
              name: place.name,
              position: place.geometry.location,
              type: place.types,
              address: place.vicinity,
              photo: place.photos
                ? place.photos[0].getUrl()
                : '/path/to/default-thumbnail.jpg', // Default thumbnail if no photo
            }))
          );
          setLocationList(results);
        } else {
          setError(`Error fetching places: ${status}`);
        }
      });
    }
  }, [isLoaded, center, searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setMarkers([]);
      setLocationList([]);
    }
  };

  if (loadError) return <Text color="red.500">Error loading maps</Text>;
  if (!isLoaded) return <Spinner size="xl" />;

  return (
    <Box display={{ md: 'flex' }}>
      {/* Sidebar for desktop view */}
      <Box
        width={{ base: '100%', md: '30%' }}
        display={{ base: 'none', md: 'block' }}
        overflowY="auto"
        maxH="60vh"
        bg={useColorModeValue('gray.50', 'gray.800')}
        p={4}
        boxShadow="lg"
      >
        <VStack spacing={4} align="stretch">
          <HStack>
            <Input
              placeholder="Search bonsai locations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              bg={useColorModeValue('white', 'gray.700')}
              borderRadius="md"
              boxShadow="sm"
            />
            <IconButton
              icon={<FaSearch />}
              onClick={handleSearch}
              colorScheme="green"
              aria-label="Search"
            />
          </HStack>

          <Box>
            <Heading size="md" mb={4} fontFamily="rale">
              Nearby Bonsai Locations:
            </Heading>
            <List spacing={4}>
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
                  }}
                >
                  <HStack>
                    <Image
                      boxSize="50px"
                      borderRadius="md"
                      src={
                        location.photos
                          ? location.photos[0].getUrl()
                          : '/path/to/default-thumbnail.jpg'
                      }
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
          </Box>
        </VStack>
      </Box>

      <Box flex="1" mb={{ base: 4, md: 0 }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          onLoad={map => (mapRef.current = map)}
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={{
                url: CustomMarker,
                scaledSize: new window.google.maps.Size(38, 95),
              }}
              onMouseOver={() => setSelectedMarker(marker)}
              onMouseOut={() => setSelectedMarker(null)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              options={{
                disableAutoPan: true,
                pixelOffset: new window.google.maps.Size(0, -30),
                closeBoxURL: '', // Hide the close button
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <Box>
                <Image
                  src={selectedMarker.photo}
                  alt={`${selectedMarker.name} thumbnail`}
                  boxSize="100px"
                  mb={2}
                />
                <Text fontFamily="rale" fontWeight="bold">
                  {selectedMarker.name}
                </Text>
                <Text fontFamily="rale">{selectedMarker.address}</Text>
              </Box>
            </InfoWindow>
          )}
        </GoogleMap>
      </Box>

      {/* Mobile view button to toggle location list */}
      <Box display={{ base: 'block', md: 'none' }} width="100%" mt={4}>
        <Button
          onClick={onOpen}
          colorScheme="green"
          size="lg"
          width="100%"
          leftIcon={<FaBars />}
        >
          Nearby Bonsai Locations
        </Button>
      </Box>

      {/* Mobile view drawer for the location list */}
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Nearby Bonsai Locations</DrawerHeader>
          <DrawerBody>
            <List spacing={4}>
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
                      src={
                        location.photos
                          ? location.photos[0].getUrl()
                          : '/path/to/default-thumbnail.jpg'
                      }
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
    </Box>
  );
};

export default Map;
