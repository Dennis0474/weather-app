import { fetchGif } from "./gifService.js";

export const weatherThemes = {
  Rain: {
    background: "#5f6c7b",
    icon: "🌧️",
    gif: "rain"
  },

  Clear: {
    background: "#ffd166",
    icon: "☀️",
    gif: "sunny"
  },

  Cloudy: {
    background: "#adb5bd",
    icon: "☁️",
    gif: "clouds"
  },

  Snow: {
    background: "#caf0f8",
    icon: "❄️",
    gif: "snow"
  }
};


export function getTheme(condition) {
  const c = condition.toLowerCase();

  if (c.includes("rain")) {
    return weatherThemes.Rain;
  }

  if (c.includes("clear")) {
    return weatherThemes.Clear;
  }

  if (c.includes("cloud")) {
    return weatherThemes.Cloudy;
  }

  if (c.includes("snow")) {
    return weatherThemes.Snow;
  }

  return weatherThemes.Clear;
}

export function applyTheme(theme) {

  if (!theme) return;

  document.body.style.backgroundColor = theme.background;

  document.querySelector("#weather-icon").textContent = theme.icon;
}

export async function updateGif(theme) {
  const gif = document.querySelector("#weather-gif");
  
  gif.src = "";

  try {

  const gifUrl = await fetchGif(theme.gif);

  if (gifUrl) {
  gif.src = gifUrl;
}
  } catch(err) {
    console.warn("Gif failed to load", err);
  }
}

 export function renderWeather(data, tempConverter, isCelsius) {
  const container = document.querySelector("#weather");
 container.innerHTML = `
 <h2>${data.location}</h2>
 <p>${data.condition}</p>
 <p>${tempConverter(data.temp).toFixed(1)}${isCelsius ? "°C" : "°F"}</p>
 `;
}

