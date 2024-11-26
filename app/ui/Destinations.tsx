import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Next.js Link for routing
import Map from './Map'; // Assuming your Map component is in components directory

const API_URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';

const options = (page: number) => ({
  params: {
    tr_longitude : '76.78', // Top-right longitude (Eastern Punjab)
    tr_latitude :'32.55', // Top-right latitude (Northern Punjab)
    bl_longitude: '73.85', // Bottom-left longitude (Western Punjab)
    bl_latitude :'29.93', // Bottom-left latitude (Southern Punjab)
    
    limit: 10,          // Limit to 10 places per page
    offset: (page - 1) * 10
  },
  headers: {
    'x-rapidapi-key': '9e73649d8emsha08d129c09456f7p143b76jsnfe4090fc2a73',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
});

interface TouristPlace {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

const Destination: React.FC = () => {
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // State to track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const { data: { data, paging } } = await axios.get(API_URL, options(page));
        console.log(data);
        const transformedData = data.map((place: any) => ({
          id: place.location_id,
          name: place.name,
          latitude: parseFloat(place.latitude),
          longitude: parseFloat(place.longitude),
          description: place.description || 'No description available'
        })).filter((place: any) => !isNaN(place.latitude) && !isNaN(place.longitude));
        
        setPlaces(transformedData);
        setTotalPages(Math.ceil(paging.total_results / 10)); // Calculate total pages based on API response
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tourist places');
        setLoading(false);
      }
    };

    fetchPlacesData();
  }, [page]); // Re-fetch data whenever the page changes

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Discover Tourist Places</h2>

      {/* Map showing current places */}
      <Map places={places} />

      {/* Grid of places */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {places.map((place) => (
          <div key={place.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              {/* Link to the detailed page */}
        {/* Use Link without the <a> tag */}
        <Link className="text-blue-600 hover:text-blue-800 cursor-pointer" href={`/places/${place.id}`}>
        {place.name}
      </Link>
            </h3>
            <p className="text-gray-600 mb-2">{place.description}</p>
            <p className="text-sm text-gray-500">
              Coordinates: {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">{page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
      <div className="mt-8 border-t pt-4">
        <h3 className="text-xl font-semibold mb-4">All Tourist Places</h3>
        <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {places.map((place) => (
        <li key={place.id} className="text-blue-600 hover:text-blue-800 cursor-pointer">
        {/* Use Link without the <a> tag */}
        <Link href={`/places/${place.id}`}>
        {place.name}
      </Link>
    </li>
  ))}
</ul>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Discover the beauty of the worlds top tourist attractions.
      </div>
    </div>
  );
};

export default Destination;




