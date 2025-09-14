'use server';

import { logDebug, logError, logInfo } from './logger';
import { type BackgroundPattern, getBackgroundImage, getSeason, normalizeWeather } from './season';

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const FIXED_LAT = 35.3114;
const FIXED_LON = 135.5514;

/**
 * 天気データを取得して背景画像パターンを決定する
 * 京都府南丹市美山町の天気を固定で取得
 * @returns 背景画像パターン
 */
export async function getWeatherBackgroundImages(): Promise<BackgroundPattern> {
  try {
    if (!WEATHER_API_KEY) {
      console.warn('OpenWeatherMap API key not configured. Using fallback weather.');
      const season = getSeason(new Date());
      return getBackgroundImage(season, 'sunny');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${FIXED_LAT}&lon=${FIXED_LON}&appid=${WEATHER_API_KEY}`;
    logDebug('Fetching weather from OpenWeatherMap API', { url });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();

    const weatherMain = data.weather[0]?.main?.toLowerCase();

    const season = getSeason(new Date());
    const weather = normalizeWeather(weatherMain);

    const backgroundImages = getBackgroundImage(season, weather);

    logInfo('Weather data successfully retrieved', {
      apiResponse: data,
      weather: weatherMain,
      season,
      normalizedWeather: weather,
      backgroundImages,
    });

    return backgroundImages;
  } catch (error) {
    const season = getSeason(new Date());

    logError(
      'Weather API failed, using fallback',
      error instanceof Error ? error : new Error(String(error)),
      {
        season,
        fallbackWeather: 'sunny',
      }
    );

    return getBackgroundImage(season, 'sunny');
  }
}
