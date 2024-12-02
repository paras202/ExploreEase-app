// weatherService.js
const OPENWEATHER_API_KEY = 'eacc43da01bcb37209825edba2ad93ba'; // Replace with your actual OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat, lon) => {
  try {
    // Get current weather
    const currentWeatherResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const currentWeather = await currentWeatherResponse.json();

    // Get 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    // Process forecast data to get daily forecasts
    const dailyForecasts = forecastData.list
      .filter((item, index) => index % 8 === 0) // Get one reading per day (every 8th item is 24 hours)
      .slice(0, 5); // Get only 5 days

    return {
      current: {
        temp: Math.round(currentWeather.main.temp),
        feelsLike: Math.round(currentWeather.main.feels_like),
        humidity: currentWeather.main.humidity,
        windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
        condition: currentWeather.weather[0].main,
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
        sunrise: new Date(currentWeather.sys.sunrise * 1000),
        sunset: new Date(currentWeather.sys.sunset * 1000),
      },
      forecast: dailyForecasts.map(day => ({
        date: new Date(day.dt * 1000),
        temp: Math.round(day.main.temp),
        condition: day.weather[0].main,
        icon: day.weather[0].icon,
      })),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};