import React, { useState } from 'react';
import { Box, Text, useDisclosure, Spinner } from '@chakra-ui/react';
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

  const handleMarkerMouseOver = marker => {
    setSelectedMarker(marker);
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
    setSelectedLocation(location);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

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
        handleIconClick={handleIconClick}
      />

      <MapContainer
        center={center}
        markers={markers}
        handleMarkerMouseOver={handleMarkerMouseOver}
        handleMarkerMouseOut={handleMarkerMouseOut}
        selectedMarker={selectedMarker}
        infoWindowVisible={infoWindowVisible}
      />

      <MapDetailsPanel
        selectedLocation={selectedLocation}
        closePanel={closePanel}
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
