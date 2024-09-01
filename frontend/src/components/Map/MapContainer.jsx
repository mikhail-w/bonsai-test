import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
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
  setMarkers, // Receive setMarkers here
  locationList,
  setLocationList, // Receive setLocationList here
  handleMarkerMouseOver,
  handleMarkerMouseOut,
  selectedMarker,
  infoWindowVisible,
  searchTerm,
  // setSelectedMarker,
}) => {
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useMapLogic();
  const [error, setError] = useState('');

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
  }, [
    isLoaded,
    center.lat,
    center.lng,
    searchTerm,
    setMarkers,
    setLocationList,
    DefaultImg,
  ]);
  // }, [isLoaded, center.lat, center.lng, searchTerm]);

  return (
    <Box
      flex="1"
      mb={{ base: 0, md: 0 }}
      height={{ base: 'calc(100vh - 56px)', md: '100vh' }}
      overflow="hidden"
    >
      {isLoaded && (
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
              onMouseOver={() => handleMarkerMouseOver(marker)}
              onMouseOut={handleMarkerMouseOut}
              // onClick={() => setSelectedMarker(marker)}
            />
          ))}
          {selectedMarker && infoWindowVisible && (
            <MapMarkerInfoWindow selectedMarker={selectedMarker} />
          )}
        </GoogleMap>
      )}
    </Box>
  );
};

export default MapContainer;
