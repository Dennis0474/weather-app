const API_KEY = "FB2TQXM2STATXNU3S2WHNENFE";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function fetchWeather(location) {
const response = await fetch(
  `${BASE_URL}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}`
);

if (!response.ok) {
  throw new Error("Failed to fetch weather");
}
return response.json();
}

export function processWeatherData(data) {
  return {
    temp: data.currentConditions.temp,
    condition: data.currentConditions.conditions,
    location: data.resolvedAddress,
  };
}
