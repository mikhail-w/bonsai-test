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

// Options to reduce initial loading time
const mapOptions = {
  disableDefaultUI: true, // Disable default UI controls
  gestureHandling: 'greedy',
  clickableIcons: false, // Disable default POI clicks
  maxZoom: 18,
  minZoom: 3,
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
  const searchTimeoutRef = useRef(null);

  // Memoize marker icon options
  const markerIcons = useMemo(
    () => ({
      default: {
        url: CustomMarker,
        scaledSize: new window.google.maps.Size(38, 95),
      },
      active: {
        url: ActiveMarker,
        scaledSize: new window.google.maps.Size(38, 95),
      },
    }),
    []
  );

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

  // Optimized marker rendering with lazy loading
  const memoizedMarkers = useMemo(
    () =>
      markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={
            selectedMarker?.id === marker.id
              ? markerIcons.active
              : markerIcons.default
          }
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
    [markers, selectedMarker, handleMouseOver, handleMouseOut, markerIcons]
  );

  // Set up geolocation immediately
  useEffect(() => {
    if (!center.lat && !center.lng) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCenter({ lat: latitude, lng: longitude });
          },
          () => setCenter(defaultCenter),
          { timeout: 5000, maximumAge: 60000 }
        );
      } else {
        setCenter(defaultCenter);
      }
    }
  }, [center.lat, center.lng, setCenter]);

  // Optimized places search with error handling
  useEffect(() => {
    if (!isLoaded || !center.lat || !center.lng) return;

    const map = mapRef.current;
    const service = new window.google.maps.places.PlacesService(map);

    const refinedSearchTerm =
      searchTerm ||
      'bonsai OR bonsai trees OR bonsai nursery OR garden OR bonsai club OR bonsai potter OR plant nursery';

    const cacheKey = `${center.lat},${center.lng}-${refinedSearchTerm}`;

    // Check cache first
    if (cachedResults.has(cacheKey)) {
      const cached = cachedResults.get(cacheKey);
      if (Date.now() - cached.timestamp < 30 * 60 * 1000) {
        setMarkers(cached.markers);
        !locationList.length && setLocationList(cached.locations);
        return;
      }
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
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

          if (filteredResults.length === 0) {
            // No results found - stay at current location and clear existing markers/locations
            setError(
              'No Bonsai-related locations found nearby. Showing current location.'
            );
            setMarkers([]);
            setLocationList([]);
            // Only clear selected marker if it no longer exists in the results
            if (
              selectedMarker &&
              !filteredResults.find(
                place => place.place_id === selectedMarker.id
              )
            ) {
              setSelectedMarker(null);
              setInfoWindowVisible(false);
            }
            return;
          }

          const processedMarkers = filteredResults.map(place => ({
            id: place.place_id,
            name: place.name,
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            type: place.types || [],
            address: place.vicinity,
            photo: place.photos?.[0]?.getUrl({ maxWidth: 200 }) || DefaultImg,
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total || 0,
            isOpen: place.opening_hours?.isOpen() || false,
          }));

          setCachedResults(prev =>
            prev.set(cacheKey, {
              markers: processedMarkers,
              locations: filteredResults,
              timestamp: Date.now(),
            })
          );

          // Update markers and location list while preserving selection
          setMarkers(processedMarkers);
          setLocationList(filteredResults);

          // If there's a selected marker, update its data but maintain selection
          if (selectedMarker) {
            const updatedSelectedMarker = processedMarkers.find(
              marker => marker.id === selectedMarker.id
            );
            if (updatedSelectedMarker) {
              setSelectedMarker(updatedSelectedMarker);
              setInfoWindowVisible(true);
            }
          }
        } else if (
          status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
        ) {
          setError(
            'No Bonsai-related locations found nearby. Showing current location.'
          );
        } else {
          setError(`Error fetching places: ${status}`);
        }
      });
    }, 500); // Reduced debounce time

    searchTimeoutRef.current = setTimeout(handleSearch, 100);
    return () => {
      clearTimeout(searchTimeoutRef.current);
      handleSearch.cancel();
    };
  }, [
    isLoaded,
    center.lat,
    center.lng,
    searchTerm,
    setMarkers,
    setLocationList,
    locationList.length,
  ]);

  if (loadError) {
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500">
          Error loading Google Maps. Please try again later.
        </Text>
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
            options={mapOptions}
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
                onMouseEnter={() => clearTimeout(hoverTimeoutRef.current)}
                onMouseLeave={handleMouseOut}
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
