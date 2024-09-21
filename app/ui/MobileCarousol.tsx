"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  "/main.jpg",
  "/mount.jpg",
  "/beach.jpg",
];

const MobileImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Mobile Welcome Image ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default MobileImageCarousel;