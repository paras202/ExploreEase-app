"use client"
import Destinations from '@/app/ui/Destinationsf/Destinations'; // Assuming Destinations component is in the same directory

// // Dynamically import the Map component with SSR disabled
  import React from 'react';
  import dynamic from 'next/dynamic'; // Assuming Destinations component is in the same directory
  
  // Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import('@/app/ui/Map'), {
 
    ssr: false,
    loading: () => <p>Loading Map...</p>
  });
  
  // Define the TouristPlace interface
  interface TouristPlace {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    description?: string;
  }
  
  export default function DestinationPage() {
    const [places, setPlaces] = React.useState<TouristPlace[]>([]);
  
    // Callback function to receive places data from Destinations component
    const onPlacesUpdate = (updatedPlaces: TouristPlace[]) => {
      setPlaces(updatedPlaces);
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Explore Tourist Attractions
        </h1>
        
        <div className="mb-8">
          <Map places={places} />
        </div>
        
        <Destinations onPlacesUpdate={onPlacesUpdate} />
      </div>
    );
  }