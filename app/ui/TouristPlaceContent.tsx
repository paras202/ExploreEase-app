"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

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

interface TouristPlacesContextType {
  places: TouristPlace[];
  setPlaces: React.Dispatch<React.SetStateAction<TouristPlace[]>>;
  initialPlacesFetched: boolean;
  setInitialPlacesFetched: React.Dispatch<React.SetStateAction<boolean>>;
}

const TouristPlacesContext = createContext<TouristPlacesContextType | undefined>(undefined);

export const TouristPlacesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [initialPlacesFetched, setInitialPlacesFetched] = useState(false);

  return (
    <TouristPlacesContext.Provider value={{ places, setPlaces, initialPlacesFetched, setInitialPlacesFetched }}>
      {children}
    </TouristPlacesContext.Provider>
  );
};

export const useTouristPlaces = () => {
  const context = useContext(TouristPlacesContext);
  if (context === undefined) {
    throw new Error('useTouristPlaces must be used within a TouristPlacesProvider');
  }
  return context;
};