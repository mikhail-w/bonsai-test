import React, { useState } from 'react';
import { Box, Text, useDisclosure, Spinner } from '@chakra-ui/react';
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
  const [sideImg, setSideImg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [panTo, setPanTo] = useState(null);

  // Load the Google Maps API script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const handleMarkerMouseOver = marker => {
    setSelectedMarker(marker);
    setInfoWindowVisible(true);
  };

  const handleSelectLocation = location => {
    console.log('Location:', location);
    // setSelectedMarker(marker);
    setInfoWindowVisible(true);
  };

  const handleMarkerMouseOut = () => {
    setInfoWindowVisible(false);
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
        handleSelectLocation={handleSelectLocation}
      />

      <MapContainer
        setCenter={setCenter}
        searchTerm={searchTerm}
        center={center}
        markers={markers}
        setMarkers={setMarkers} // Pass setMarkers here
        locationList={locationList}
        setLocationList={setLocationList} // Pass setLocationList here
        handleMarkerMouseOver={handleMarkerMouseOver}
        handleMarkerMouseOut={handleMarkerMouseOut}
        selectedMarker={selectedMarker}
        infoWindowVisible={infoWindowVisible}
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
    </Box>
  );
}

export default MapPage;
