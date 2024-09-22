"use client";

import React, { useState } from 'react';
import Map from './Map';
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const cities = [
    { name: 'Paris', image: '/paris.jpg' },
    { name: 'Tokyo', image: '/tokyo.jpg' },
    { name: 'New York', image: '/newyork.jpg' },
  ];


  return (
    <>
    <SignedIn>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section with Search Bar */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold dark:text-gray-200 mb-4">Discover Your Next Adventure</h2>
          <p className="text-xl text-gray-200 dark:text-gray-400 mb-8">Explore the worlds most exciting destinations with ExploreEase</p>
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search for destinations, activities, or accommodations..."
              className="w-full px-4 py-3 rounded-full text-gray-800 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Featured Destinations</h3>
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
      <section className="py-16 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800 ">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Weather Conditions</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              This section would display current weather conditions for selected destinations.
              You could integrate with a weather API to show real-time data.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 md:px-16 max-w-4/5 mx-auto bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-800">
  <Map />
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