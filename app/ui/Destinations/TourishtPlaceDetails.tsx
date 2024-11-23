"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Map from '../Map';
<<<<<<< HEAD
=======
import Link from 'next/link';
>>>>>>> 58203008a03f0f2b28d704f417584d672e1e7a45

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
  params: { location_id: id },
  headers: {
<<<<<<< HEAD
    'x-rapidapi-key': 'a9d6b71bf0msha66dedcd030fe02p1162e9jsn4541dd5fd368',
=======
    'x-rapidapi-key': '39b5c614c7msha8557f39ffaafbap12192bjsn26dc06ce52b0',
>>>>>>> 58203008a03f0f2b28d704f417584d672e1e7a45
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
          const { data } = await axios.get(API_URL, options(id));
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
            image: data.photo?.images.large.url || '',
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={place.image || '/placeholder-image.jpg'}
          alt={place.name}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-1000 ease-in-out opacity-70"
        />
<<<<<<< HEAD
        <div className="absolute inset-0 bg-white opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative  w-full mx-auto p-6 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-transparent  p-8 rounded-lg shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fadeIn">{place.name}</h2>
          <p className="text-gray-700 mb-6 animate-slideUp">{place.description}</p>
          
          <div className="mb-6 animate-slideUp ">
            <h3 className="text-2xl font-semibold text-gray-800">Address</h3>
            <p className="text-gray-700">{place.address}</p>
          </div>
          <div className="mb-6 h-64 w-full  animate-fadeIn">
            <Map places={[place]} />
          </div>
          

          <div className="grid mt-64 grid-cols-1 md:grid-cols-2 gap-4 text-left animate-slideUp">
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-gray-200">
=======
        <div className="absolute inset-0 bg-indigo-100 opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative  w-4/5 mx-auto p-6 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-transparent p-8 rounded-lg shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
        <div className="flex flex-col items-center mb-8 animate-fadeIn">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 animate-fadeIn hover:text-indigo-600 transition-colors duration-300 hover:scale-105">{place.name}</h2>
          <Link href={place.website} target='_blank'>
          <div className="relative bg-center w-72 h-72 mb-6 rounded-full overflow-hidden border-4 shadow-lg">
            <Image 
              src={place.image || '/placeholder-image.jpg'} 
              alt={place.name} 
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          </Link>
          </div>
          <div className='mb-4 animate-slideUp bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white '>
          <h3 className="text-2xl mb-3 font-semibold text-gray-800 animate-fadeIn hover:text-indigo-600 transition-colors duration-300">About</h3>
          <p className="hover:font-semibold text-gray-700 mb-6 animate-slideUp hover:text-yellow-700">{place.description}</p>
          </div>
          <div className="mb-6 animate-slideUp bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white ">
            <h3 className="text-2xl mb-3 font-semibold text-gray-800 animate-fadeIn hover:text-indigo-600 transition-colors duration-300">Address</h3>
            <p className="text-gray-700">{place.address}</p>
          </div>
          <div className="mb-6 h-64 w-full  animate-fadeIn">
            <Map places={[place]} />
          </div>
          

          <div className="grid mt-64 grid-cols-1 md:grid-cols-2 gap-4 text-left animate-slideUp">
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
>>>>>>> 58203008a03f0f2b28d704f417584d672e1e7a45
              <h3 className="text-lg font-semibold text-gray-800">Coordinates</h3>
              <p className="text-gray-700">
                Latitude: {place.latitude.toFixed(4)}, Longitude: {place.longitude.toFixed(4)}
              </p>
            </div>
<<<<<<< HEAD
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-gray-200">
=======
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
>>>>>>> 58203008a03f0f2b28d704f417584d672e1e7a45
              <h3 className="text-lg font-semibold text-gray-800">Rating</h3>
              <p className="text-gray-700">
                {place.rating} ({place.num_reviews} reviews)
              </p>
            </div>
<<<<<<< HEAD
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Ranking</h3>
              <p className="text-gray-700">{place.ranking}</p>
            </div>
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-gray-200">
=======
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Ranking</h3>
              <p className="text-gray-700">{place.ranking}</p>
            </div>
            <div className="bg-transparent p-4 rounded-lg transition-colors duration-300 hover:bg-white">
>>>>>>> 58203008a03f0f2b28d704f417584d672e1e7a45
              <h3 className="text-lg font-semibold text-gray-800">Website</h3>
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700 transition-colors duration-300"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristPlaceDetails;