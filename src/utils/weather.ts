'use server';

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
      const today = new Date();
      const seed = today.getFullYear() * 1000 + today.getMonth() * 31 + today.getDate();
      return getBackgroundImage(season, 'sunny', seed);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${FIXED_LAT}&lon=${FIXED_LON}&appid=${WEATHER_API_KEY}`;
    console.log('Fetching weather from:', url);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenWeatherMap API response:', JSON.stringify(data, null, 2));

    const weatherMain = data.weather[0]?.main?.toLowerCase();
    console.log('Weather main:', weatherMain);

    const season = getSeason(new Date());
    const weather = normalizeWeather(weatherMain);

    // シード値として現在の日を使用（一日中同じ画像）
    const today = new Date();
    const seed = today.getFullYear() * 1000 + today.getMonth() * 31 + today.getDate();

    const backgroundImages = getBackgroundImage(season, weather, seed);

    console.log('Weather data retrieved', {
      apiResponse: data,
      weather: weatherMain,
      season,
      normalizedWeather: weather,
      seed,
      backgroundImages,
    });

    return backgroundImages;
  } catch (error) {
    const season = getSeason(new Date());

    console.error('Weather API failed, using fallback', error, {
      season,
      fallbackWeather: 'sunny',
    });

    // フォールバック時も同じシード値を使用
    const today = new Date();
    const seed = today.getFullYear() * 1000 + today.getMonth() * 31 + today.getDate();

    return getBackgroundImage(season, 'sunny', seed);
  }
}
