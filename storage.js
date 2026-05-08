const KEYS = {
LAST_LOCATION : "weather_last_location",
LAST_WEATHER : "weather_last_result",
UNIT : "weather_unit_celsius",
};

export function saveLocation(location) {
  localStorage.setItem(KEYS.LAST_LOCATION, location);
}

export function loadLocation() {
  return localStorage.getItem(KEYS.LAST_LOCATION) ?? "";
}

export function saveWeather(weatherData) {
  localStorage.setItem(KEYS.LAST_WEATHER, JSON.stringify(weatherData));
}

export function loadWeather() {
  const raw = localStorage.getItem(KEYS.LAST_WEATHER);
   if (!raw) return null;

   try {
    return JSON.parse(raw);
   } catch {
    return null;
   }
}

export function saveUnit(isCelsius) {
localStorage.setItem(KEYS.UNIT, JSON.stringify(isCelsius));
}

export function loadUnit() {
  const raw = localStorage.getItem(KEYS.UNIT);

  if (raw === null) return true;

  try {
    return JSON.parse(raw);
  } catch {
    return true;
  }
}