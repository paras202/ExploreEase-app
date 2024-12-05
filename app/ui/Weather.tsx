"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';
import { WiHumidity, WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

// Interfaces for Weather and Forecast data
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    main: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      main: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const WeatherComponent: React.FC<{ location?: string }> = ({ location = 'New Delhi' }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: location,
            appid: OPEN_WEATHER_API_KEY,
            units: 'metric'
          }
        });

        // Fetch 5-day forecast
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            q: location,
            appid: OPEN_WEATHER_API_KEY,
            units: 'metric'
          }
        });

        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError('Unable to fetch weather information');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-500 text-4xl" />;
      case 'Clouds':
        return <WiCloudy className="text-gray-500 text-4xl" />;
      case 'Rain':
        return <WiRain className="text-blue-500 text-4xl" />;
      case 'Snow':
        return <WiSnow className="text-white text-4xl" />;
      case 'Thunderstorm':
        return <WiThunderstorm className="text-purple-500 text-4xl" />;
      default:
        return <WiDaySunny className="text-yellow-500 text-4xl" />;
    }
  };

  // Helper to format date from timestamp
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Filter forecast to get one entry per day
  const getDailyForecast = () => {
    if (!forecastData) return [];
    
    const dailyForecasts: { [key: string]: any } = {};
    
    forecastData.list.forEach(forecast => {
      const date = formatDate(forecast.dt);
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = forecast;
      }
    });

    return Object.values(dailyForecasts).slice(0, 5);
  };

  if (loading) return <p className="text-center">Loading weather...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!weatherData) return null;

  const dailyForecast = getDailyForecast();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {/* Current Weather Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {weatherData.name} Weather
        </h3>
        {getWeatherIcon(weatherData.weather[0].main)}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <FaTemperatureHigh className="mr-2 text-red-500" />
          <span>Temperature: {weatherData.main.temp.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center">
          <WiHumidity className="mr-2 text-blue-500" />
          <span>Humidity: {weatherData.main.humidity}%</span>
        </div>
        <div className="flex items-center">
          <FaWind className="mr-2 text-gray-500" />
          <span>Wind: {weatherData.wind.speed} m/s</span>
        </div>
        <div className="flex items-center">
          <FaTint className="mr-2 text-blue-400" />
          <span>Feels Like: {weatherData.main.feels_like.toFixed(1)}°C</span>
        </div>
      </div>
      
      <p className="mb-4 text-gray-600 dark:text-gray-400 capitalize">
        {weatherData.weather[0].description}
      </p>

      {/* Forecast Section */}
      <div className="border-t pt-4">
        <h4 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
          5-Day Forecast
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {dailyForecast.map((forecast, index) => (
            <div 
              key={index} 
              className="text-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
            >
              <p className="font-medium">
                {formatDate(forecast.dt)}
              </p>
              {getWeatherIcon(forecast.weather[0].main)}
              <p className="text-sm">
                {forecast.main.temp.toFixed(1)}°C
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {forecast.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;