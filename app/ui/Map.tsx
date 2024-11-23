"use client"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Workaround for marker icons
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

// Custom red icon for user location
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface ChangeViewProps {
  center: L.LatLngExpression;
  zoom: number;
}

interface TouristPlace {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const Map: React.FC<{ places: TouristPlace[] }> = ({ places = [] }) => {
  const [center, setCenter] = useState<L.LatLngTuple>([30.7333, 76.7794]); // Default coordinates for Punjab
  const [zoom, setZoom] = useState(10);
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);
  const [locationName, setLocationName] = useState<string>('');

  useEffect(() => {
    if (places.length > 0) {
      setCenter([places[0].latitude, places[0].longitude]);
    }
  }, [places]);

  const handleLocationFound = (e: L.LocationEvent) => {
    setUserLocation(e.latlng);
    setCenter([e.latlng.lat, e.latlng.lng]);
    setZoom(10);
    
    // Reverse geocoding to get location name
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
      .then(response => response.json())
      .then(data => {
        setLocationName(data.display_name);
      })
      .catch(error => console.error('Error fetching location name:', error));
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">ExploreEase</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((place) => (
          <Marker key={place.id} position={[place.latitude, place.longitude]}>
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-lg mb-1">{place.name}</h3>
                <p className="text-gray-600">{place.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation} icon={redIcon}>
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-lg mb-1">Your Location</h3>
                <p>{locationName || 'Location name not available'}</p>
              </div>
            </Popup>
          </Marker>
        )}
        <ZoomControl position="topright" />
        <ScaleControl position="bottomright" />
        <LocationFinder onLocationFound={handleLocationFound} />
      </MapContainer>
    </div>
  );
}

// Custom control for finding user's location
const LocationFinder: React.FC<{ onLocationFound: (e: L.LocationEvent) => void }> = ({ onLocationFound }) => {
  const map = useMap();

  const findLocation = () => {
    map.locate({ setView: false });
    map.on('locationfound', onLocationFound);
  };

  return (
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control leaflet-bar">
        <a
          href="#"
          title="Find my location"
          role="button"
          aria-label="Find my location"
          onClick={(e) => {
            e.preventDefault();
            findLocation();
          }}
          className="leaflet-control-zoom-in"
        >
          📍
        </a>
      </div>
    </div>
  );
};

export default Map;
