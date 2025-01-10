import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { debounce } from 'lodash';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box, Spinner, HStack, Text } from '@chakra-ui/react';
import CustomMarker from '../../assets/images/leaf-green.png';
import ActiveMarker from '../../assets/images/leaf-red.png';
import useMapLogic from '../../hooks/useMapLogic';
import MapMarkerInfoWindow from './MapMarkerInfoWindow';
import DefaultImg from '../../assets/images/bonsai-tree-logo.png';

const mapContainerStyle = {
  height: '90%',
  width: '100%',
};

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795,
};

const MapContainer = ({
  center,
  setCenter,
  markers,
  setMarkers,
  locationList,
  setLocationList,
  searchTerm,
  setPanTo,
  selectedMarker,
  setSelectedMarker,
  activeMarker,
}) => {
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useMapLogic();
  const [error, setError] = useState('');
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [cachedResults, setCachedResults] = useState(new Map());
  const hoverTimeoutRef = useRef(null);

  // Define handler functions using useCallback to prevent recreation
  const handleMouseOver = useCallback(
    marker => {
      clearTimeout(hoverTimeoutRef.current);
      setSelectedMarker(marker);
      setInfoWindowVisible(true);
    },
    [setSelectedMarker]
  );

  const handleMouseOut = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setInfoWindowVisible(false);
      setSelectedMarker(null);
    }, 200);
  }, [setSelectedMarker]);

  const handleInfoWindowMouseOver = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
    setInfoWindowVisible(true);
  }, []);

  const handleInfoWindowMouseOut = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setInfoWindowVisible(false);
      setSelectedMarker(null);
    }, 200);
  }, [setSelectedMarker]);

  // Memoize markers after handler functions are defined
  const memoizedMarkers = useMemo(
    () =>
      markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={{
            url: selectedMarker?.id === marker.id ? ActiveMarker : CustomMarker,
            scaledSize: new window.google.maps.Size(38, 95),
          }}
          zIndex={selectedMarker?.id === marker.id ? 999 : 1}
          onMouseOver={() => handleMouseOver(marker)}
          onMouseOut={handleMouseOut}
          onClick={() => {
            setSelectedMarker(marker);
            setInfoWindowVisible(true);
            clearTimeout(hoverTimeoutRef.current);
          }}
        />
      )),
    [markers, selectedMarker, handleMouseOver, handleMouseOut]
  );

  useEffect(() => {
    if (!center.lat && !center.lng) {
      setCenter(defaultCenter);
    }
  }, [center, setCenter]);

  useEffect(() => {
    setPanTo((latLng, zoom = 20) => {
      if (mapRef.current) {
        mapRef.current.panTo(latLng);
        mapRef.current.setZoom(zoom);
      }
    });
  }, [setPanTo]);

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
          setCenter(defaultCenter);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setCenter(defaultCenter);
    }
  }, [setCenter]);

  useEffect(() => {
    if (isLoaded && center.lat && center.lng) {
      const map = mapRef.current;
      const service = new window.google.maps.places.PlacesService(map);

      const refinedSearchTerm =
        searchTerm ||
        'bonsai OR bonsai trees OR bonsai nursery OR garden OR bonsai club OR bonsai potter OR plant nursery';

      const cacheKey = `${center.lat},${center.lng}-${refinedSearchTerm}`;

      if (cachedResults.has(cacheKey)) {
        const cached = cachedResults.get(cacheKey);
        const cacheAge = Date.now() - cached.timestamp;
        if (cacheAge < 30 * 60 * 1000) {
          setMarkers(cached.markers);
          if (!locationList.length) {
            setLocationList(cached.locations);
          }
          return;
        }
      }

      const request = {
        location: new window.google.maps.LatLng(center.lat, center.lng),
        radius: '20000',
        type: ['store', 'plant_nursery', 'florist', 'park'],
        keyword: refinedSearchTerm,
      };

      const handleSearch = debounce(() => {
        setIsLoadingPlaces(true);
        setError('');

        service.nearbySearch(request, (results, status) => {
          setIsLoadingPlaces(false);

          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const filteredResults = results.filter(
              place =>
                place.name.toLowerCase().includes('bonsai') ||
                place.types.includes('store')
            );

            const processedMarkers = filteredResults.map(place => ({
              id: place.place_id,
              name: place.name,
              position: place.geometry.location,
              type: place.types || [],
              address: place.vicinity,
              photo: place.photos?.[0]?.getUrl({ maxWidth: 200 }) || DefaultImg,
              rating: place.rating || 0,
              reviewCount: place.user_ratings_total || 0,
              isOpen: place.opening_hours?.isOpen() || false,
              closingTime:
                place.opening_hours?.periods?.[0]?.close?.time || 'N/A',
            }));

            setCachedResults(prev =>
              prev.set(cacheKey, {
                markers: processedMarkers,
                locations: filteredResults,
                timestamp: Date.now(),
              })
            );

            setMarkers(processedMarkers);
            if (!locationList.length) {
              setLocationList(filteredResults);
            }
          } else if (
            status ===
            window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
          ) {
            setError('No Bonsai-related locations found nearby.');
          } else {
            setError(`Error fetching places: ${status}`);
          }
        });
      }, 1000);

      handleSearch();
      return () => handleSearch.cancel();
    }
  }, [
    isLoaded,
    center.lat,
    center.lng,
    searchTerm,
    setMarkers,
    setLocationList,
    locationList.length,
  ]);

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      flex="1"
      mb={{ base: 0, md: 0 }}
      height={{ base: 'calc(100vh - 56px)', md: '100vh' }}
      overflow="hidden"
      position="relative"
    >
      {isLoaded ? (
        <>
          {isLoadingPlaces && (
            <Box
              position="absolute"
              top="4"
              left="50%"
              transform="translateX(-50%)"
              zIndex="1000"
              bg="white"
              p="2"
              borderRadius="md"
              boxShadow="lg"
            >
              <HStack spacing="2">
                <Spinner size="sm" color="green.500" />
                <Text>Loading nearby locations...</Text>
              </HStack>
            </Box>
          )}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            onLoad={map => (mapRef.current = map)}
            onClick={() => {
              setInfoWindowVisible(false);
              setSelectedMarker(null);
            }}
          >
            {memoizedMarkers}
            {selectedMarker && infoWindowVisible && selectedMarker.position && (
              <MapMarkerInfoWindow
                selectedMarker={selectedMarker}
                onMouseEnter={handleInfoWindowMouseOver}
                onMouseLeave={handleInfoWindowMouseOut}
              />
            )}
          </GoogleMap>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Spinner size="xl" color="green.500" />
        </Box>
      )}
    </Box>
  );
};

export default MapContainer;
