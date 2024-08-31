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
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
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
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);

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
    <HStack
      spacing={4}
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 10 }}
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Box width={{ base: '100%', md: '30%' }} overflowY="auto" maxH="60vh">
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

      <Box flex="1">
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
              onMouseOver={() => setHoveredMarkerId(marker.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
            >
              {hoveredMarkerId === marker.id && (
                <InfoWindow>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    {marker.name}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </Box>
    </HStack>
  );
};

export default Map;
