import { type BackgroundPattern, getBackgroundImage, getSeason, normalizeWeather } from './season';

/**
 * 天気データを取得して背景画像パターンを決定する
 * 京都府南丹市美山町の天気を固定で取得
 * @returns 背景画像パターン
 */
export async function getWeatherBackgroundImages(): Promise<BackgroundPattern> {
  try {
    const response = await fetch('/api/weather', {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Weather API failed: ${response.status}`);
    }

    const data = await response.json();
    const season = getSeason(new Date());
    const weather = normalizeWeather(data.weather);

    console.log('Weather data retrieved', {
      weather: data.weather,
      season,
      normalizedWeather: weather,
    });

    // シード値として現在の日を使用（一日中同じ画像）
    const today = new Date();
    const seed = today.getFullYear() * 1000 + today.getMonth() * 31 + today.getDate();

    return getBackgroundImage(season, weather, seed);
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
