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
  Slide,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { FaSearch, FaBars, FaChevronRight } from 'react-icons/fa';
import CustomMarker from '../assets/images/leaf-green.png';
import DefaultImg from '../assets/images/bonsai-tree-logo.png';

const libraries = ['places'];
const mapContainerStyle = {
  height: '80vh',
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
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [sideImg, setSideImg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Handle errors in loading Google Maps
  useEffect(() => {
    if (loadError) {
      console.error('Error loading Google Maps:', loadError);
      setError('Error loading Google Maps');
    }
  }, [loadError]);

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
              type: place.types || [],
              address: place.vicinity,
              photo: place.photos ? place.photos[0].getUrl() : DefaultImg,
            }))
          );
          // Only set this once on initial load or search, prevent unnecessary updates
          if (!locationList.length) {
            setLocationList(results);
          }
        } else {
          setError(`Error fetching places: ${status}`);
        }
      });
    }
  }, [isLoaded, center.lat, center.lng, searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setMarkers([]); // Clear markers to repopulate
      setLocationList([]); // Clear list to repopulate
    }
  };

  const handleMarkerMouseOver = marker => {
    setSelectedMarker(marker);
    setInfoWindowVisible(true);
  };

  const handleMarkerMouseOut = () => {
    setInfoWindowVisible(false);
  };

  const handleIconClick = location => {
    setSelectedLocation(location);
    setPanelOpen(true); // Open the panel
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  if (error) return <Text color="red.500">{error}</Text>;
  if (!isLoaded) return <Spinner size="xl" />;

  return (
    <Box
      display={{ md: 'flex' }}
      height="90vh"
      position="relative"
      overflow="hidden"
    >
      {/* Sidebar for desktop view */}
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
        {/* Sticky container for the search bar and heading */}
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
                key={location.place_id}
                p={0}
                mt={5}
                borderRadius="lg"
                width="100%"
                bg={useColorModeValue('white', 'gray.700')}
                transition="all 0.3s"
                _hover={{
                  bg: useColorModeValue('green.50', 'gray.600'),
                  transform: 'scale(1.02)',
                  boxShadow: 'xl',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setCenter({
                    lat: location.geometry.location.lat(),
                    lng: location.geometry.location.lng(),
                  });
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
                      // src={location.photo}
                      src={
                        location.photos
                          ? location.photos[0].getUrl()
                          : selectedMarker.photo
                      }
                      alt={`${location.name} thumbnail`}
                    />
                  </Box>
                  <VStack align="start" spacing={1} flex="1" ml={4}>
                    <Text
                      fontFamily="rale"
                      fontWeight="bold"
                      fontSize={{ base: 'md', md: 'lg' }}
                    >
                      {location.name}
                    </Text>
                    <Text
                      fontFamily="rale"
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={useColorModeValue('gray.600', 'gray.300')}
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
                      transform: 'scale(1.2)', // Increase size by 20% on hover
                    }}
                    transition="transform 0.2s" // Smooth transition
                    onClick={() => {
                      setSideImg(location.photos[0].getUrl());
                      handleIconClick(location);
                    }}
                  />
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Box
        flex="1"
        mb={{ base: 0, md: 0 }}
        height={{ base: 'calc(100vh - 56px)', md: '100vh' }}
        overflow="hidden"
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
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
                onMouseOver={() => handleMarkerMouseOver(marker)}
                onMouseOut={handleMarkerMouseOut}
              />
            ))}
            {selectedMarker && infoWindowVisible && (
              <InfoWindow
                position={selectedMarker.position}
                options={{
                  disableAutoPan: true,
                  pixelOffset: new window.google.maps.Size(0, -90),
                  closeBoxURL: '', // Hide the close button
                }}
                onCloseClick={() => setInfoWindowVisible(false)}
              >
                <Box
                  p={2}
                  borderRadius="md"
                  boxShadow="lg"
                  bg={useColorModeValue('white', 'gray.700')}
                  minWidth="350px" // Set a maximum width for the InfoWindow
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
                      <HStack spacing={1}>
                        <Text
                          fontFamily="rale"
                          fontSize="sm"
                          color="yellow.500"
                        >
                          ★
                        </Text>
                        <Text fontFamily="rale" fontSize="sm">
                          4.7
                        </Text>
                        <Text fontFamily="rale" fontSize="sm" color="gray.500">
                          (72)
                        </Text>
                      </HStack>
                      <Text
                        fontFamily="rale"
                        fontSize="sm"
                        color={useColorModeValue('gray.600', 'gray.300')}
                        noOfLines={1}
                        isTruncated
                      >
                        Florist
                      </Text>
                      <HStack spacing={2} mt={1}>
                        <Text
                          fontFamily="rale"
                          fontSize="xs"
                          color={useColorModeValue('green.500', 'green.300')}
                        >
                          Open
                        </Text>
                        <Text fontFamily="rale" fontSize="xs" color="gray.500">
                          · Closes 6 PM
                        </Text>
                      </HStack>
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
            )}
          </GoogleMap>
        )}
      </Box>

      {/* Slide panel for more information */}
      <Slide direction="right" in={isPanelOpen} style={{ zIndex: 10 }}>
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
            _hover={{
              transform: 'scale(1.2)',
            }}
          />
          {selectedLocation && (
            <VStack align="start" spacing={4}>
              <Box width={'100%'}>
                <Image
                  src={sideImg}
                  alt={`${selectedLocation.name} thumbnail`}
                  borderRadius="md"
                  width="100%" // Ensures the image takes up the full width of the Box
                  height="auto" // Maintains the aspect ratio
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
                {selectedLocation.opening_hours.isOpen()
                  ? 'Open Now'
                  : 'Closed'}
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
      </Slide>

      {/* Mobile view button to toggle location list */}
      <Box
        display={{ base: 'block', md: 'none' }}
        width="100%"
        position="absolute"
        bottom="0"
      >
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
                      src={
                        location.photos
                          ? location.photos[0].getUrl()
                          : selectedMarker.photo
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
