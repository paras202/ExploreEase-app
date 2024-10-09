"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import Destination from './Destination';


// Dynamically import the Map component with SSR disabled
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

// Define the TouristPlace interface
interface TouristPlace {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  image: string;
  website: string;
  address: string;
}

const API_URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';
const options = {
  params: {
    tr_longitude: '76.78', // Top-right longitude (Eastern Punjab)
    tr_latitude: '32.55', // Top-right latitude (Northern Punjab)
    bl_longitude: '73.85', // Bottom-left longitude (Western Punjab)
    bl_latitude: '29.93', // Bottom-left latitude (Southern Punjab)
    limit: 30, // Increased limit to get more places for featured destinations
  },
  headers: {
    'x-rapidapi-key': '9e73649d8emsha08d129c09456f7p143b76jsnfe4090fc2a73',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
};

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const { data: { data } } = await axios.get(API_URL, options);
        const transformedData = data
          .filter((place: any) => !isNaN(parseFloat(place.latitude)) && !isNaN(parseFloat(place.longitude)))
          .map((place: any) => ({
            id: place.location_id,
            name: place.name,
            latitude: parseFloat(place.latitude),
            longitude: parseFloat(place.longitude),
            description: place.description || 'No description available',
            image: place.photo?.images?.large?.url || '/placeholder-image.jpg',
            website: place.website || '#',
            address: place.address || 'Address not available'
          }));
        setPlaces(transformedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tourist places');
        setLoading(false);
      }
    };
    fetchPlacesData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    // You might want to filter the places based on the searchQuery
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
          {/* Hero Section with Search Bar */}
          <section className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 text-white py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h2>
              <p className="text-xl text-gray-200 mb-8">Explore the worlds most exciting destinations with ExploreEase</p>
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center relative">
                  <input
                    type="text"
                    placeholder="Search for a place..."
                    className="w-full px-4 py-3 pr-12 rounded-full text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 bg-transparent text-blue-700 text-2xl hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                  >
                    <CiSearch />
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-16 px-4 md:px-16 max-w-4/5 mx-auto relative z-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Explore Tourist Places</h2>
              <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
                {loading ? (
                  <p>Loading map...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <DynamicMap places={places} />
                )}
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Discover the beauty of worlds top tourist attractions.
              </div>
            </div>
          </section>

          {/* Featured Destinations */}
          {/* <section className="py-16 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800 relative z-20">
            <div className="container mx-auto px-6">
              <Link href="/destination">
                <h3 className="text-3xl font-bold text-purple-700 dark:text-gray-200 mb-8 cursor-pointer hover:text-indigo-500 transition duration-200">
                  Featured Destinations
                </h3>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {places.slice(0, 6).map((place) => (
                  <div key={place.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      width={800}
                      height={600}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-semibold mb-2">
                        <Link href={`/places/${place.id}`}>
                          {place.name}
                        </Link></h4>
                      <p className="text-gray-600 mb-2">{place.description}</p>
                      <p className="text-sm text-gray-500 mb-2">{place.address}</p>
                      <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Visit Website</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* Featured Destinations */}
          <section className="py-16 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800 relative z-20">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-bold text-purple-700 dark:text-gray-200 mb-8">
                Featured Destinations
              </h3>
              <Destination />
              <div className="mt-8 text-center">
                <Link href="/destination" className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300">
                  Explore More Destinations
                </Link>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 bg-gradient-to-r from-green-300 via-purple-400 to-blue-500 dark:from-green-700 dark:to-blue-800 relative z-20">
            <div className="container mx-auto px-6">
              <Link href="/about">
                <h3 className="text-3xl font-bold text-purple-700 dark:text-gray-200 mb-8 cursor-pointer hover:text-indigo-500 transition duration-200">
                  About ExploreEase
                </h3>
              </Link>
              <p className="text-lg text-black dark:text-gray-300 mb-6">
                ExploreEase is your gateway to unforgettable travel experiences. We curate the best destinations,
                activities, and accommodations to ensure your journey is nothing short of extraordinary.
              </p>
              <p className="text-lg text-black dark:text-gray-300">
                With ExploreEase, you can discover hidden gems, immerse yourself in local cultures, and create
                memories that will last a lifetime. Let us guide you to your next adventure!
              </p>
            </div>
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-950">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to ExploreEase</h1>
            <p className="text-lg text-gray-700 dark:text-white mb-6">A comprehensive web platform for travel and tourism.</p>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                Sign In to Explore
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}