import React, { useRef, useEffect, useState } from 'react';
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
              rating: place.rating || 0,
              reviewCount: place.user_ratings_total || 0,
              isOpen: place.opening_hours?.isOpen() || false,
              closingTime: place.opening_hours?.periods
                ? place.opening_hours.periods[0]?.close?.time || 'N/A'
                : 'N/A', // Default to 'N/A' if periods or close time isn't available
            }))
          );
          if (!locationList.length) {
            setLocationList(results);
          }
        } else {
          setError(`Error fetching places: ${status}`);
        }
      });
    }
  }, [
    isLoaded,
    center.lat,
    center.lng,
    searchTerm,
    setMarkers,
    setLocationList,
    DefaultImg,
  ]);

  const handleMouseOver = marker => {
    clearTimeout(hoverTimeoutRef.current); // Clear any existing timeout
    setSelectedMarker(marker); // Correctly use the setSelectedMarker function
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
