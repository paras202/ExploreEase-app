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

const API_KEY = 'c95d6d5ad4msh1e6bd14a1839407p166751jsne4fccb50d62b';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialPlaces = async () => {
      try {
        const response = await axios.get('https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary', {
          params: {
            tr_longitude: '76.78',
            tr_latitude: '32.55',
            bl_longitude: '73.85',
            bl_latitude: '29.93',
            limit: '10',
          },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });

        const transformedData = response.data.data
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
      } catch (err) {
        console.error('Failed to fetch initial places:', err);
        setError('Failed to fetch tourist places');
      }
    };

    fetchInitialPlaces();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      // First, search for the location
      const locationSearchOptions = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/locations/search',
        params: {
          query: searchQuery,
          limit: '10',
          offset: '0',
          units: 'km',
          location_id: '1',
          currency: 'USD',
          sort: 'relevance',
          lang: 'en_US'
          
          
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };

      const locationResponse = await axios.request(locationSearchOptions);
      const locationData = locationResponse.data.data[0];

      if (locationData) {
        // If it's a city, search for attractions
        if (locationData.result_type === "geos") {
          const attractionsOptions = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/attractions/list',
            params: {
              location_id: locationData.result_object.location_id,
              currency: 'USD',
              lang: 'en_US',
              lunit: 'km',
              sort: 'recommended'
            },
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          };

          const attractionsResponse = await axios.request(attractionsOptions);
          const attractions = attractionsResponse.data.data;
  
          const transformedAttractions = attractions
            .filter((attraction: any) => 
              attraction.latitude != null && 
              attraction.longitude != null &&
              !isNaN(parseFloat(attraction.latitude)) && 
              !isNaN(parseFloat(attraction.longitude))
            )
            .map((attraction: any) => ({
              id: attraction.location_id,
              name: attraction.name,
              latitude: parseFloat(attraction.latitude),
              longitude: parseFloat(attraction.longitude),
              description: attraction.description || 'No description available',
              image: attraction.photo?.images?.large?.url || '/placeholder-image.jpg',
              website: attraction.website || '#',
              address: attraction.address || 'Address not available'
            }));
  
          setSearchResults(transformedAttractions);
          setPlaces(transformedAttractions);
        } 
        // If it's a specific place, just return its details
        else {
          const place = {
            id: locationData.result_object.location_id,
            name: locationData.result_object.name,
            latitude: parseFloat(locationData.result_object.latitude),
            longitude: parseFloat(locationData.result_object.longitude),
            description: locationData.result_object.description || 'No description available',
            image: locationData.result_object.photo?.images?.large?.url || '/placeholder-image.jpg',
            website: locationData.result_object.website || '#',
            address: locationData.result_object.address || 'Address not available'
          };
  
          if (isFinite(place.latitude) && isFinite(place.longitude)) {
            setSearchResults([place]);
            setPlaces([place]);
          } else {
            setError('Invalid coordinates for the selected place.');
          }
        }
      } else {
        setError('No results found for your search query.');
      }
    } catch (error) {
      console.error('Error searching:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
          {/* Hero Section with Search Bar */}
          <section className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 text-white py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h2>
              <p className="text-xl text-gray-200 mb-8">{"Explore the world's most exciting destinations with ExploreEase"}</p>
              <form id="searchbar" onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center relative">
                  <input
                    type="text"
                    placeholder="Search for a city or tourist place..."
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

          {/* Search Results */}
          {loading && <p className="text-center mt-4">Loading results...</p>}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}
          {searchResults.length > 0 && (
            <section className="py-8 px-4 md:px-16">
              <h2 className="text-2xl font-bold mb-4">Search Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {searchResults.map((place) => (
                  <div key={place.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <Image src={place.image} alt={place.name} width={300} height={300} className="w-full h-48 object-cover" />
                    <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                <Link href={`/places/${place.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {place.name}
                </Link>
              </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{place.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Coordinates: {place.latitude}, {place.longitude}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

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
               {" Discover the beauty of world's top tourist attractions."}
              </div>
            </div>
          </section>

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