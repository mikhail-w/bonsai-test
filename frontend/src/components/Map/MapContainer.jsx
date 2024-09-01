import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import CustomMarker from '../../assets/images/leaf-green.png';
import useMapLogic from '../../hooks/useMapLogic';
import MapMarkerInfoWindow from './MapMarkerInfoWindow';

const mapContainerStyle = {
  height: '90%',
  width: '100%',
};

const MapContainer = ({
  center,
  markers,
  handleMarkerMouseOver,
  handleMarkerMouseOut,
  selectedMarker,
  infoWindowVisible,
}) => {
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useMapLogic();

  if (loadError) return <Spinner size="xl" />;

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
                url: CustomMarker,
                scaledSize: new window.google.maps.Size(38, 95),
              }}
              onMouseOver={() => handleMarkerMouseOver(marker)}
              onMouseOut={handleMarkerMouseOut}
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
