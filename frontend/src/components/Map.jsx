import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import {
  Box,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  Spinner,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const libraries = ['places'];
const mapContainerStyle = {
  height: '50vh',
  width: '100%',
};

const Map = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');
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
        radius: '10000',
        type: ['store'],
        keyword: 'bonsai OR garden OR club OR potter',
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
            }))
          );
          setLocationList(results);
        } else {
          setError(`Error fetching places: ${status}`);
        }
      });
    }
  }, [isLoaded, center]);

  if (loadError) return <Text color="red.500">Error loading maps</Text>;
  if (!isLoaded) return <Spinner size="xl" />;

  return (
    <Box
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 10 }}
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderRadius="lg"
      boxShadow="lg"
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        onLoad={map => (mapRef.current = map)}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            label={marker.name}
          />
        ))}
      </GoogleMap>

      <Box mt={6}>
        <Heading size="md" mb={4} fontFamily="rale">
          Nearby Bonsai Locations:
        </Heading>
        <List spacing={4} fontFamily="rale">
          {locationList.map(location => (
            <ListItem
              fontFamily="rale"
              key={location.place_id}
              p={2}
              borderRadius="md"
              bg={useColorModeValue('white', 'gray.700')}
            >
              <HStack justify="space-between">
                <Text fontFamily="rale" fontWeight="bold">
                  {location.name}
                </Text>
                <Text fontFamily="rale">{location.vicinity}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Map;
