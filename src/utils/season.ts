export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * 日付から季節を判定する
 * 3-5月: 春, 6-9月: 夏, 10-11月: 秋, 12-2月: 冬
 */
export function getSeason(date: Date = new Date()): Season {
  const month = date.getMonth() + 1; // 0-based to 1-based

  if (month >= 3 && month <= 5) {
    return 'spring';
  } else if (month >= 6 && month <= 9) {
    return 'summer';
  } else if (month >= 10 && month <= 11) {
    return 'autumn';
  } else {
    return 'winter';
  }
}

/**
 * 天気文字列を正規化する
 */
export function normalizeWeather(weather: string): 'sunny' | 'cloudy' | 'rainy' | 'snowy' {
  const weatherLower = weather.toLowerCase();

  // OpenWeatherMapのmain値をマッピング
  if (weatherLower === 'clear') {
    return 'sunny';
  } else if (weatherLower === 'clouds') {
    return 'cloudy';
  } else if (
    weatherLower === 'rain' ||
    weatherLower === 'drizzle' ||
    weatherLower === 'thunderstorm'
  ) {
    return 'rainy';
  } else if (weatherLower === 'snow') {
    return 'snowy';
  } else {
    // その他（霧、もや等）はcloudyとして扱う
    return 'cloudy';
  }
}

// 背景画像パターン定義
export type BackgroundPattern = {
  desktop: string;
  mobile: string;
};

/**
 * 季節と天気から背景画像を決定する
 */
export function getBackgroundImage(
  season: Season,
  weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy'
): BackgroundPattern {
  const patterns: Record<Season, Record<string, string[]>> = {
    spring: {
      sunny: ['komorebi', 'angels-ladder'],
      cloudy: ['komorebi', 'angels-ladder'],
      rainy: ['rain'],
      snowy: ['snow'],
    },
    summer: {
      sunny: ['komorebi', 'angels-ladder'],
      cloudy: ['komorebi', 'angels-ladder'],
      rainy: ['rain'],
      snowy: ['snow'],
    },
    autumn: {
      sunny: ['momiji', 'inaho'],
      cloudy: ['momiji', 'inaho'],
      rainy: ['rain'],
      snowy: ['snow'],
    },
    winter: {
      sunny: ['sunlight', 'snow'],
      cloudy: ['sunlight', 'snow'],
      rainy: ['snow'],
      snowy: ['snow'],
    },
  };

  const options = patterns[season][weather] || patterns[season].sunny;
  const selectedImage = options[Math.floor(Math.random() * options.length)];

  return {
    desktop: `/${selectedImage}.png`,
    mobile: `/${selectedImage}-sp.png`,
  };
}
