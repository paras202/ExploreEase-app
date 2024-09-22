"use client";

import React, { useState } from 'react';
import Map from './Map';
import Image from "next/image";
import SearchBox from './SearchBox';

interface City{
  name: string;
  image: string;
}

export default function Homepage() {
  const [selectedPlace, setSelectedPlace] = useState<string>('');
  const cities = [
    { name: 'Paris', image: '/paris.jpg' },
    { name: 'Tokyo', image: '/tokyo.jpg' },
    { name: 'New York', image: '/newyork.jpg' },
  ];


  const handlePlaceChange = (place: string) => {
    setSelectedPlace(place);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section with Search Bar */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-700 dark:to-indigo-900 text-white py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-5xl font-bold dark:text-gray-200 mb-4">Discover Your Next Adventure</h2>
              <p className="text-xl text-gray-200 dark:text-gray-400 mb-8">Explore the worlds most exciting destinations with ExploreEase</p>
              <SearchBox onPlaceChange={handlePlaceChange} />
            </div>
          </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-purple-700 dark:text-gray-200 mb-8 cursor-pointer">Featured Destinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cities.map((city) => (
              <div key={city.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={city.image}
                  alt={`${city.name} skyline`}
                  width={800}
                  height={800}
                  className="w-full h-60 object-cover"
                />
                <div className="p-2">
                  <h4 className="text-xl font-semibold mb-2">{city.name}</h4>
                  <p className="text-gray-600">Experience the magic of {city.name} with our exclusive travel packages.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Conditions */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-bold text-purple-700 cursor-pointer dark:text-gray-200 mb-8">Weather Conditions</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {selectedPlace ? `Weather conditions for ${selectedPlace} would be displayed here.` : 'Select a place to see weather conditions.'}
                </p>
              </div>
            </div>
          </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold  dark:text-gray-200 mb-8 text-purple-700 cursor-pointer">Explore Destinations</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              This section would display an interactive map.
              You could integrate with a mapping service like Google Maps or Mapbox.
            </p>
            <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Map Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-white dark:text-gray-200 mb-8">About ExploreEase</h3>
          <p className="text-lg text-gray-200 dark:text-gray-300 mb-6">
            ExploreEase is your gateway to unforgettable travel experiences. We curate the best destinations,
            activities, and accommodations to ensure your journey is nothing short of extraordinary.
          </p>
          <p className="text-lg text-gray-200 dark:text-gray-300">
            With ExploreEase, you can discover hidden gems, immerse yourself in local cultures, and create
            memories that will last a lifetime. Let us guide you to your next adventure!
          </p>
        </div>
      </section>
    </div>
    
    </>
  );
}