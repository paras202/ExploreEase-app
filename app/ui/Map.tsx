import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Workaround for marker icons
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

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

  useEffect(() => {
    if (places.length > 0) {
      setCenter([places[0].latitude, places[0].longitude]);
    }
  }, [places]);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true} // Enable scroll wheel zoom
        className="w-full h-full"
        zoomControl={false} // Disable default zoom control
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
        <ZoomControl position="topright" /> {/* Add zoom control */}
        <ScaleControl position="bottomright" /> {/* Add scale control */}
        <LocationFinder /> {/* Add custom control for finding user's location */}
      </MapContainer>
    </div>
  );
}

// Custom control for finding user's location
const LocationFinder: React.FC = () => {
  const map = useMap();

  const handleLocationFound = (e: L.LocationEvent) => {
    map.flyTo(e.latlng, map.getZoom());
  };

  const findLocation = () => {
    map.locate({ setView: false });
    map.on('locationfound', handleLocationFound);
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