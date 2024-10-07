'use client';
import React, {useState, useEffect} from 'react';

import Homepage from "@/app/ui/Homepage";
import MobileLandingPage from "@/app/ui/MobileLanding";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {getPlacesData} from './ui/api/index';

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() =>{
    getPlacesData()
       .then((data)=>{
          console.log(data);
          setPlaces(data);
       })
  }, [])
  return (
    <>
      <SignedIn>
        <Homepage />
      </SignedIn>
      <SignedOut>
        <MobileLandingPage />
      </SignedOut>
    </>
  );
};

export default Home;
