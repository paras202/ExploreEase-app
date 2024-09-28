"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FaCity } from "react-icons/fa"
import { CiSearch } from "react-icons/ci";

// Dynamically import the Map component with SSR disabled
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const cities = [
    { name: 'Paris', image: '/paris.jpg', coordinates: [48.8566, 2.3522] },
    { name: 'Tokyo', image: '/tokyo.jpg', coordinates: [35.6762, 139.6503] },
    { name: 'New York', image: '/newyork.jpg', coordinates: [40.7128, -74.0060] },
    { name: 'Chandigarh', image: '/chandigarh.jpg', coordinates: [30.7333, 76.7794] },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const city = cities.find(c => c.name.toLowerCase() === searchQuery.toLowerCase());
    if (city) {
      setSelectedCity(city.name);
    } else {
      alert("City not found. Please try another city.");
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
              <p className="text-xl text-gray-200 mb-8">Explore the worlds most exciting destinations with ExploreEase</p>
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center relative">
                  <input
                    type="text"
                    placeholder="Search for a city..."
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
          <section className="py-16 px-4 md:px-16 max-w-4/5 mx-auto">
            <DynamicMap selectedCity={selectedCity} />
          </section>
     {/* Featured Destinations */}
     <section className="py-16 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800">
        <div className="container mx-auto px-6">
        <Link href="/destination">
                <h3 className="text-3xl font-bold text-purple-700 dark:text-gray-200 mb-8 cursor-pointer hover:text-indigo-500 transition duration-200">
                  Featured Destinations
                </h3>
              </Link>
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

      {/* About Us */}
      <section className="py-16 bg-gradient-to-r from-green-300 via-purple-400 to-blue-500 dark:from-green-700 dark:to-blue-800">
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