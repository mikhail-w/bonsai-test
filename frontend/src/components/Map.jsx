import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "50vh",
  width: "100%",
};

const Map = () => {
  const mapRef = useRef(null); // references to google map instance
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState("");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // grabs secret key
    libraries,
  });

  const [center, setCenter] = useState({
    lat: 37.7749, // defaults to San Francisco 
    lng: -122.4194, // defaults to San Francisco 
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const map = mapRef.current;
      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: "100000", //size of how far we grab the info
        type: ["place"], //places of type 'store'
        keyword: "plants", //finding places that have the word 'plants'
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(
            results.map((place) => ({
              id: place.place_id, 
              name: place.name, //grab the place name and set the marker to that name
              position: place.geometry.location, //grab position
            }))
          );
        } else {
          setError(`Error fetching plant shops: ${status}`);
        }
      });
    }
  }, [isLoaded, center]); 

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        onLoad={(map) => (mapRef.current = map)}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            label={marker.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
