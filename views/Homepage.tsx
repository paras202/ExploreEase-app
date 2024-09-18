"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { useUser, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Sidebar from "../components/Sidebar";

export default function Homepage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);

  return (
    <>
       <SignedIn>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
        <div className={`min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 relative ${isSidebarOpen ? 'ml-64' : ''}`}>
          {/* Sidebar Toggle Button */}
     
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full m-4">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                Hi, {user?.username || "Guest"}!
              </h1>
              
              {user?.imageUrl ? (
                <div className="flex justify-center mb-6">
                  <Image
                    src={user.imageUrl}
                    alt="User Avatar"
                    className="rounded-full"
                    width={120}
                    height={120}
                  />
                </div>
              ) : (
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-300 rounded-full w-28 h-28 flex items-center justify-center">
                    <span className="text-gray-700">No Image</span>
                  </div>
                </div>
              )}
              
              <div className="text-left space-y-4">
                <p className="text-lg">
                  <span className="font-semibold">Username: </span>{user?.username || "N/A"}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email: </span>{user?.primaryEmailAddress?.emailAddress || "N/A"}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Phone: </span>{user?.phoneNumbers?.[0]?.phoneNumber || "N/A"}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Account Verified: </span>
                  {user?.emailAddresses?.[0]?.verification?.status === 'verified' ? "Yes" : "No"}
                </p>
              </div>
              
              <div className="border-t-2 border-gray-200 my-6"></div>
              
              <p className="text-center text-gray-600 text-sm">
                Thank you for visiting!
              </p>
            </div>
          </div>
        </div>
      </SignedIn>
      
      <SignedOut>
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to ExploreEase</h1>
            <p className="text-lg text-gray-700 mb-6">A comprehensive web platform for travel and tourism.</p>
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                Sign In to Explore
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  );
}