import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Workaround for marker icons
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

// Define types for ChangeView props
interface ChangeViewProps {
  center: L.LatLngExpression;
  zoom: number;
}

// Define type for tourist place
interface TouristPlace {
  id: number;
  name: string;
  position: L.LatLngTuple;
  description: string;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Dummy data for tourist places in Chandigarh
const dummyTouristPlaces: TouristPlace[] = [
  { id: 1, name: "Rock Garden", position: [30.7512, 76.8065], description: "Unique rock sculptures and art pieces" },
  { id: 2, name: "Sukhna Lake", position: [30.7421, 76.8181], description: "Artificial lake and popular recreational spot" },
  { id: 3, name: "Rose Garden", position: [30.7531, 76.7867], description: "Large rose garden with over 1600 species" },
  { id: 4, name: "Capitol Complex", position: [30.7595, 76.8074], description: "UNESCO World Heritage site designed by Le Corbusier" },
  { id: 5, name: "Elante Mall", position: [30.7050, 76.8010], description: "Large shopping mall and entertainment complex" },
];

const Map: React.FC = () => {
  const center: L.LatLngTuple = [30.7333, 76.7794]; // Chandigarh coordinates
  const zoom = 12;
  const [touristPlaces, setTouristPlaces] = useState<TouristPlace[]>([]);

  useEffect(() => {
    // Simulating API call with setTimeout
    setTimeout(() => {
      setTouristPlaces(dummyTouristPlaces);
    }, 1000);
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Find Your Tourist Place</h2>
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <ChangeView center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {touristPlaces.map((place) => (
            <Marker key={place.id} position={place.position}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-lg mb-1">{place.name}</h3>
                  <p className="text-gray-600">{place.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Discover the beauty of World's top tourist attractions.
      </div>
    </div>
  );
}

export default Map;