// components/Weather.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Modal, Card, Spinner, Button } from "flowbite-react";
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiCloudy,
  WiNightClear,
  WiDayCloudyHigh,
} from "react-icons/wi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
  };
  dt: number; // timestamp
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

interface WeatherProps {
  location: { lat: number; lon: number; name?: string } | null;
  isOpen: boolean;
  onClose: () => void;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default function Weather({ location, isOpen, onClose }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        );
        if (!weatherRes.ok) throw new Error("Weather data fetch failed");
        const weatherData: WeatherData = await weatherRes.json();
        setWeather(weatherData);

        // Fetch forecast data
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        );
        if (!forecastRes.ok) throw new Error("Forecast data fetch failed");
        const forecastData: ForecastData = await forecastRes.json();
        setForecast(forecastData);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && location) {
      fetchWeather();
    }
  }, [location, isOpen]);

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return <WiDaySunny className="text-6xl text-yellow-400" />;
    } else if (lowerCondition.includes("rain")) {
      return <WiRain className="text-6xl text-blue-400" />;
    } else if (lowerCondition.includes("snow")) {
      return <WiSnow className="text-6xl text-blue-200" />;
    } else if (lowerCondition.includes("night")) {
      return <WiNightClear className="text-6xl text-blue-900" />;
    } else if (lowerCondition.includes("cloud")) {
      return <WiDayCloudyHigh className="text-6xl text-gray-400" />;
    } else {
      return <WiCloudy className="text-6xl text-gray-400" />;
    }
  };

  // Helper to format date from timestamp
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Filter forecast to get one entry per day
  const getDailyForecast = () => {
    if (!forecast) return [];
    
    const dailyForecasts: { [key: string]: any } = {};
    
    forecast.list.forEach(forecastItem => {
      const date = formatDate(forecastItem.dt);
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = forecastItem;
      }
    });

    return Object.values(dailyForecasts).slice(0, 5);
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="4xl">
      <Modal.Header>Weather Information</Modal.Header>
      <Modal.Body>
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Spinner size="xl" />
          </div>
        )}

        {error && <div className="text-red-500 text-center p-4">{error}</div>}

        {weather && (
          <div className="space-y-6">
            <Card>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <HiOutlineLocationMarker className="text-2xl text-blue-500" />
                  <div>
                    <h3 className="text-2xl font-bold">{weather.name}</h3>
                    <p className="text-gray-500">{weather.sys.country}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(weather.dt * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  {getWeatherIcon(weather.weather[0].main)}
                  <p className="mt-2 text-gray-600">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <div className="flex items-center gap-3">
                  <FaTemperatureHigh className="text-2xl text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-xl font-bold">{weather.main.temp}°C</p>
                    <p className="text-sm text-gray-400">
                      Feels like {weather.main.feels_like}°C
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <WiHumidity className="text-2xl text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-xl font-bold">{weather.main.humidity}%</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <FaWind className="text-2xl text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
                  </div>
                </div>
              </Card>
            </div>

            {forecast && (
              <Card>
                <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
                <div className="grid grid-cols-5 gap-2">
                  {getDailyForecast().map((forecastItem, index) => (
                    <div 
                      key={index} 
                      className="text-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
                    >
                      <p className="font-medium">
                        {formatDate(forecastItem.dt)}
                      </p>
                      {getWeatherIcon(forecastItem.weather[0].main)}
                      <p className="text-sm">
                        {forecastItem.main.temp.toFixed(1)}°C
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {forecastItem.weather[0].description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}