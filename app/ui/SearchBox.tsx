import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

interface SearchBoxProps {
  onPlaceChange: (place: string) => void;
}

export default function SearchBox({ onPlaceChange }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function handleInputChange(value: string) {
    setSearchQuery(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError('');
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setSearchQuery(value);
    setShowSuggestions(false);
    onPlaceChange(value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length == 0) {
      setError('Location not found');
    } else {
      setError('');
      onPlaceChange(searchQuery);
      setShowSuggestions(false);
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex">
        <div className='w-full px-4 flex py-3 rounded-full bg-white
         text-gray-800 dark:text-gray-200 dark:bg-gray-700'>
        <button type="submit" className=" text-purple-600 rounded-r-full   ">
          <AiOutlineSearch className="text-xl" />
        </button>
        <input
          type="text"                                                                                                                           
          placeholder="Search for destinations, activities, or accommodations..."
      className="border-none rounded-full w-full focus:outline-none focus:ring-0 focus:border-transparent"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
        />
        
        </div>
      </form>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 max-h-60 overflow-auto">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-2">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}