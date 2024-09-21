import React from 'react';
import { SignInButton } from "@clerk/nextjs";
import Image from 'next/image';
import DesktopImageCarousel from './DesktopCarousel';
import MobileImageCarousel from './MobileCarousol';

const LandingPage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Mobile background image */}
    <div className="object-cover block md:hidden">
        <MobileImageCarousel/>
    </div>
      
     {/* Desktop image carousel */}
    <div className="hidden md:block h-full w-full">
       <DesktopImageCarousel />
    </div>
      
      
      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
          Welcome to ExploreEase
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 text-center max-w-2xl">
          Your comprehensive travel and tourism platform. Start your journey today!
        </p>
        <SignInButton mode="modal">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg md:text-xl transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default LandingPage;