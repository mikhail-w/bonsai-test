import React, { useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box, Spinner } from '@chakra-ui/react';
import CustomMarker from '../../assets/images/leaf-green.png';
import ActiveMarker from '../../assets/images/leaf-red.png';
import useMapLogic from '../../hooks/useMapLogic';
import MapMarkerInfoWindow from './MapMarkerInfoWindow';
import DefaultImg from '../../assets/images/bonsai-tree-logo.png';

const mapContainerStyle = {
  height: '90%',
  width: '100%',
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
  selectedMarker, // Receiving selectedMarker
  setSelectedMarker, // Receiving setSelectedMarker
}) => {
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useMapLogic();
  const [error, setError] = useState('');
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    setPanTo((latLng, zoom = 17) => {
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

      const refinedSearchTerm =
        searchTerm ||
        'bonsai OR bonsai trees OR bonsai nursery OR garden OR bonsai club OR bonsai potter OR plant nursery';

      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: '40000', // 20km radius
        type: ['store', 'plant_nursery', 'florist', 'park'], // Add more relevant types
        keyword: refinedSearchTerm,
      };

      const handleSearch = debounce(() => {
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const filteredResults = results.filter(
              place =>
                place.name.toLowerCase().includes('bonsai') ||
                place.types.includes('store')
            );

            setMarkers(
              filteredResults.map(place => ({
                id: place.place_id,
                name: place.name,
                position: place.geometry.location,
                type: place.types || [],
                address: place.vicinity,
                photo: place.photos ? place.photos[0].getUrl() : DefaultImg,
                rating: place.rating || 0,
                reviewCount: place.user_ratings_total || 0,
                isOpen: place.opening_hours?.isOpen() || false,
                closingTime: place.opening_hours?.periods
                  ? place.opening_hours.periods[0]?.close?.time || 'N/A'
                  : 'N/A', // Default to 'N/A' if periods or close time isn't available
              }))
            );

            // Set the location list only on the initial load or search
            if (!locationList.length) {
              setLocationList(filteredResults);
            }
          } else if (
            status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS
          ) {
            setError('No Bonsai-related locations found nearby.');
          } else {
            setError(`Error fetching places: ${status}`);
          }
        });
      }, 500); // Debounce to avoid excessive API calls

      handleSearch();

      // Cleanup debounce on component unmount
      return () => {
        handleSearch.cancel();
      };
    }
  }, [
    isLoaded,
    center.lat,
    center.lng,
    searchTerm,
    DefaultImg,
    setLocationList,
  ]);

  const handleMouseOver = marker => {
    clearTimeout(hoverTimeoutRef.current);
    setSelectedMarker(marker);
    setInfoWindowVisible(true);
  };

  const handleMouseOut = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setInfoWindowVisible(false);
      setSelectedMarker(null);
    }, 200); // Adjust the delay as needed
  };

  const handleInfoWindowMouseOver = () => {
    clearTimeout(hoverTimeoutRef.current); // Clear the timeout to prevent the info window from disappearing
    setInfoWindowVisible(true);
  };

  const handleInfoWindowMouseOut = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setInfoWindowVisible(false);
      setSelectedMarker(null);
    }, 200); // Adjust the delay as needed
  };

  return (
    <Box
      flex="1"
      mb={{ base: 0, md: 0 }}
      height={{ base: 'calc(100vh - 56px)', md: '100vh' }}
      overflow="hidden"
    >
      {isLoaded ? (
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
                url:
                  selectedMarker?.id === marker.id
                    ? ActiveMarker
                    : CustomMarker, // Change icon based on selection
                scaledSize: new window.google.maps.Size(38, 95),
              }}
              zIndex={selectedMarker?.id === marker.id ? 999 : 1} // Set zIndex based on selection
              onMouseOver={() => handleMouseOver(marker)}
              onMouseOut={handleMouseOut}
              onClick={() => {
                setSelectedMarker(marker); // Ensure the selected marker is updated when clicked
              }}
            />
          ))}
          {selectedMarker && infoWindowVisible && selectedMarker.position && (
            <MapMarkerInfoWindow
              selectedMarker={selectedMarker}
              onMouseEnter={handleInfoWindowMouseOver}
              onMouseLeave={handleInfoWindowMouseOut}
            />
          )}
        </GoogleMap>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
};

export default MapContainer;
