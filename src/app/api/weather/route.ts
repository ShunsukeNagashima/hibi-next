import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const FIXED_LAT = 35.3114;
const FIXED_LON = 135.5514;

export async function GET() {
  if (!WEATHER_API_KEY) {
    console.warn('OpenWeatherMap API key not configured. Using fallback weather.');
    return NextResponse.json({ weather: 'sunny' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${FIXED_LAT}&lon=${FIXED_LON}&appid=${WEATHER_API_KEY}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const weatherMain = data.weather[0]?.main?.toLowerCase();

    let mappedWeather: string;
    switch (weatherMain) {
      case 'clear':
        mappedWeather = 'sunny';
        break;
      case 'clouds':
        mappedWeather = 'cloudy';
        break;
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        mappedWeather = 'rainy';
        break;
      case 'snow':
        mappedWeather = 'snowy';
        break;
      default:
        mappedWeather = 'sunny';
    }

    return NextResponse.json({ weather: mappedWeather });
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return NextResponse.json({ weather: 'sunny' });
  }
}
