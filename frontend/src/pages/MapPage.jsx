import React, { useState, useRef } from 'react';
import {
  Box,
  Text,
  Button,
  useDisclosure,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useLoadScript } from '@react-google-maps/api';
import MapContainer from '../components/Map/MapContainer';
import MapSidebar from '../components/Map/MapSidebar';
import MapDetailsPanel from '../components/Map/MapDetailsPanel';
import MapDrawer from '../components/Map/MapDrawer';

function MapPage() {
  const [markers, setMarkers] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false); // Track if the mouse is over the marker or InfoWindow
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [panTo, setPanTo] = useState(null);
  const closeTimeoutRef = useRef(null);

  // Load the Google Maps API script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  // Determine if the screen size is mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleMouseOver = marker => {
    clearTimeout(closeTimeoutRef.current);
    setSelectedMarker(marker);
    setInfoWindowVisible(true);
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    // Set a timeout to close the InfoWindow after a delay if the mouse isn't over the marker or InfoWindow
    closeTimeoutRef.current = setTimeout(() => {
      if (!isMouseOver) {
        setInfoWindowVisible(false);
        setSelectedMarker(null);
      }
    }, 200); // Adjust the delay as needed
  };

  const handleInfoWindowMouseOver = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsMouseOver(true);
  };

  const handleInfoWindowMouseOut = () => {
    setIsMouseOver(false);
    // If the mouse leaves the window and the marker, hide the InfoWindow after a delay
    closeTimeoutRef.current = setTimeout(() => {
      if (!isMouseOver) {
        setInfoWindowVisible(false);
        setSelectedMarker(null);
      }
    }, 200); // Adjust the delay as needed
  };

  const handleInfoWindowCloseClick = () => {
    // Close the InfoWindow when the close button is clicked
    setInfoWindowVisible(false);
    setSelectedMarker(null);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setMarkers([]);
      setLocationList([]);
    }
  };

  const handleIconClick = location => {
    setSelectedLocation({
      ...location,
      photo: location.photos ? location.photos[0].getUrl() : null, // Ensure the photo is included
    });
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  if (loadError) return <Text color="red.500">Error loading maps</Text>;
  if (!isLoaded) return <Spinner size="xl" />;

  return (
    <Box
      display={{ md: 'flex' }}
      height="90vh"
      position="relative"
      overflow="hidden"
    >
      <MapSidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        locationList={locationList}
        setCenter={setCenter}
        panTo={panTo} // Pass the panTo method
        setSelectedMarker={setSelectedMarker}
        handleIconClick={handleIconClick}
        handleSelectLocation={handleMouseOver} // Use the same function for clicking a location
      />

      <MapContainer
        setCenter={setCenter}
        searchTerm={searchTerm}
        center={center}
        markers={markers}
        setMarkers={setMarkers} // Pass setMarkers here
        locationList={locationList}
        setLocationList={setLocationList} // Pass setLocationList here
        handleMouseOver={handleMouseOver} // Unified mouse over event for marker and InfoWindow
        handleMouseOut={handleMouseOut} // Unified mouse out event for marker and InfoWindow
        handleInfoWindowCloseClick={handleInfoWindowCloseClick} // Handle close click event for InfoWindow
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        infoWindowVisible={infoWindowVisible}
        onInfoWindowMouseOver={handleInfoWindowMouseOver} // Handle mouse over for InfoWindow
        onInfoWindowMouseOut={handleInfoWindowMouseOut} // Handle mouse out for InfoWindow
        setPanTo={setPanTo} // Pass setPanTo to MapContainer
      />

      <MapDetailsPanel
        selectedLocation={selectedLocation}
        closePanel={closePanel}
        isPanelOpen={isPanelOpen}
      />

      <MapDrawer
        isOpen={isOpen}
        onClose={onClose}
        locationList={locationList}
        setCenter={setCenter}
      />

      {isMobile && (
        <Button
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          colorScheme="green"
          onClick={onOpen}
          zIndex="1000"
        >
          Show Locations
        </Button>
      )}
    </Box>
  );
}

export default MapPage;
