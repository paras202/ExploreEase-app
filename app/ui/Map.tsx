"use client"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, ScaleControl, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation2Icon, MapPinIcon } from 'lucide-react';

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
  const [routeCoordinates, setRouteCoordinates] = useState<L.LatLngTuple[]>([]);
  const [navigationEnabled, setNavigationEnabled] = useState(false);

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

  const toggleNavigation = async () => {
    if (!userLocation || places.length === 0) return;

    if (!navigationEnabled) {
      try {
        // Use OSRM (Open Source Routing Machine) for routing
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${places[0].longitude},${places[0].latitude}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord: number[]) => [coord[1], coord[0]] as L.LatLngTuple
          );
          setRouteCoordinates(coordinates);
          setNavigationEnabled(true);
        }
      } catch (error) {
        console.error('Routing error:', error);
        // Fallback to direct line if routing fails
        setRouteCoordinates([
          [userLocation.lat, userLocation.lng],
          [places[0].latitude, places[0].longitude]
        ]);
        setNavigationEnabled(true);
      }
    } else {
      // Disable navigation
      setRouteCoordinates([]);
      setNavigationEnabled(false);
    }
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
        {routeCoordinates.length > 0 && (
          <Polyline 
            positions={routeCoordinates} 
            color={navigationEnabled ? 'green' : 'transparent'}
            weight={5}
          />
        )}
        <ZoomControl position="topright" />
        <ScaleControl position="bottomright" />
        {/* <LocationFinder onLocationFound={handleLocationFound} /> */}
        <MapControls 
          onLocationFind={handleLocationFound}
          onToggleNavigation={toggleNavigation} 
          isNavigating={navigationEnabled}
          hasUserLocation={!!userLocation}
          hasDestination={places.length > 0}
        />
      </MapContainer>
    </div>
  );
}

// Consolidated Map Controls Component
const MapControls: React.FC<{
  onLocationFind: (e: L.LocationEvent) => void,
  onToggleNavigation: () => void,
  isNavigating: boolean,
  hasUserLocation: boolean,
  hasDestination: boolean
}> = ({ 
  onLocationFind, 
  onToggleNavigation, 
  isNavigating, 
  hasUserLocation,
  hasDestination 
}) => {
  const map = useMap();

  const findLocation = () => {
    map.locate({ setView: false });
    map.on('locationfound', onLocationFind);
  };

  return (
    <div className="leaflet-top leaflet-left flex flex-col space-y-2 p-2">
      {/* Location Finding Button */}
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={(e) => {
            e.preventDefault();
            findLocation();
          }}
          className="
            w-10 h-10 
            bg-white 
            shadow-md 
            rounded-lg 
            flex items-center justify-center
            hover:bg-gray-100
            transition-colors
          "
          title="Find my location"
          aria-label="Find my location"
        >
          📍
        </button>
      </div>

      {/* Navigation Button - Only show if user location and destination exist */}
      {hasUserLocation && hasDestination && (
        <div className="leaflet-control leaflet-bar">
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleNavigation();
            }}
            className={`
              w-10 h-10 
              shadow-md 
              rounded-lg 
              flex items-center justify-center
              transition-all duration-300
              ${isNavigating 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-white text-black hover:bg-gray-100'}
            `}
            title={isNavigating ? "Disable Navigation" : "Enable Navigation"}
            aria-label={isNavigating ? "Disable Navigation" : "Enable Navigation"}
          >
            {isNavigating ? <MapPinIcon size={20} /> : <Navigation2Icon size={20} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;