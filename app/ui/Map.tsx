import React, { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

// Define type for tourist place
interface TouristPlace {
  id: number;
  name: string;
  position: [number, number];
  description: string;
}

interface MapProps {
  selectedCity: string;
}

const defaultCenter: [number, number] = [30.7333, 76.7794]; // Default to Chandigarh
const defaultZoom = 12;

const cityCoordinates: { [key: string]: [number, number] } = {
  "Paris": [48.8566, 2.3522],
  "Tokyo": [35.6762, 139.6503],
  "New York": [40.7128, -74.0060],
  "Chandigarh": [30.7333, 76.7794],
};

const dummyTouristPlaces: { [key: string]: TouristPlace[] } = {
  "Paris": [
    { id: 1, name: "Eiffel Tower", position: [48.8584, 2.2945], description: "Iconic iron tower" },
    { id: 2, name: "Louvre Museum", position: [48.8606, 2.3376], description: "World's largest art museum" },
  ],
  "Tokyo": [
    { id: 1, name: "Tokyo Tower", position: [35.6586, 139.7454], description: "Communications and observation tower" },
    { id: 2, name: "Senso-ji Temple", position: [35.7147, 139.7966], description: "Ancient Buddhist temple" },
  ],
  "New York": [
    { id: 1, name: "Statue of Liberty", position: [40.6892, -74.0445], description: "Iconic neoclassical sculpture" },
    { id: 2, name: "Central Park", position: [40.7829, -73.9654], description: "Urban park in Manhattan" },
  ],
  "Chandigarh": [
    { id: 1, name: "Rock Garden", position: [30.7512, 76.8065], description: "Unique rock sculptures and art pieces" },
    { id: 2, name: "Sukhna Lake", position: [30.7421, 76.8181], description: "Artificial lake and popular recreational spot" },
    { id: 3, name: "Rose Garden", position: [30.7531, 76.7867], description: "Large rose garden with over 1600 species" },
    { id: 4, name: "Capitol Complex", position: [30.7595, 76.8074], description: "UNESCO World Heritage site designed by Le Corbusier" },
    { id: 5, name: "Elante Mall", position: [30.7050, 76.8010], description: "Large shopping mall and entertainment complex" },
  ],
};

const Map: React.FC<MapProps> = ({ selectedCity }) => {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mapInstance = L.map('map').setView(defaultCenter, defaultZoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="/">ExploreEase</a> contributors'
      }).addTo(mapInstance);
      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, []);  // defaultCenter is now defined outside the component, so it's not needed in the dependency array

  const updateMapView = useCallback(() => {
    if (map && selectedCity) {
      const coordinates = cityCoordinates[selectedCity];
      if (coordinates) {
        map.setView(coordinates, 12);
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        dummyTouristPlaces[selectedCity]?.forEach((place) => {
          L.marker(place.position)
            .addTo(map)
            .bindPopup(`<b>${place.name}</b><br>${place.description}`);
        });
      }
    }
  }, [map, selectedCity]);

  useEffect(() => {
    updateMapView();
  }, [updateMapView]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Explore Tourist Places</h2>
      <div id="map" className="w-full h-[500px] rounded-lg overflow-hidden shadow-md"></div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Discover the beauty of worlds top tourist attractions.
      </div>
    </div>
  );
}

export default Map;