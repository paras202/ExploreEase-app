"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from './Map'; // Import the Map component

// Define the TouristPlace interface
interface TouristPlace {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  address: string;
  rating: string;
  num_reviews: string;
  ranking: string;
  image: string;
  website: string;
}

const API_URL = 'https://travel-advisor.p.rapidapi.com/attractions/get-details';

const options = (id: string) => ({
  params: {
    location_id: id
  },
  headers: {
    'x-rapidapi-key': '9e73649d8emsha08d129c09456f7p143b76jsnfe4090fc2a73',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
});

interface Props {
  id: string;
}

const TouristPlaceDetails = ({ id }: Props) => {
  const [place, setPlace] = useState<TouristPlace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPlaceDetails = async () => {
        try {
          const { data } = await axios.get(API_URL, options(id as string));
          setPlace({
            id: data.location_id,
            name: data.name,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            description: data.description || 'No description available',
            address: data.address,
            rating: data.rating || 'N/A',
            num_reviews: data.num_reviews || 'N/A',
            ranking: data.ranking || 'N/A',
            image: data.photo?.images.large.url || '', // Use large image if available
            website: data.website || '#'
          });
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch tourist place details');
          setLoading(false);
        }
      };
      fetchPlaceDetails();
    }
  }, [id]);

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (!place) return <p className="text-center py-4">No data found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{place.name}</h2>
        <p className="text-gray-600 mb-4">{place.description}</p>

        {/* Display image if available */}
        {place.image && (
          <div className="mb-6">
            <img
              src={place.image}
              alt={place.name}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        )}

        {/* Display address */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Address</h3>
          <p className="text-gray-600">{place.address}</p>
        </div>

        {/* Map with marker centered on the tourist place */}
        <Map places={[place]} />

        {/* Display additional details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <h3 className="text-lg font-semibold">Coordinates</h3>
            <p className="text-gray-600">
              Latitude: {place.latitude.toFixed(4)}, Longitude: {place.longitude.toFixed(4)}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Rating</h3>
            <p className="text-gray-600">
              {place.rating} ({place.num_reviews} reviews)
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Ranking</h3>
            <p className="text-gray-600">{place.ranking}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Website</h3>
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristPlaceDetails;
