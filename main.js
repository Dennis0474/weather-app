import { fetchWeather, processWeatherData } from "./weatherService.js";
import { getTheme, applyTheme, updateGif, renderWeather } from "./themeService.js";
import { 
  saveLocation,
  loadLocation,
  saveWeather,
  loadWeather,
  saveUnit,
  loadUnit,
} from "./storage.js";

const status = document.querySelector("#status");
const form = document.querySelector("#weather-form");
const toggleBtn = document.querySelector("#toggle-unit");
const locationInput = document.querySelector("#location");

let currentWeather = null;
let isCelsius = loadUnit();

function convertTemp(temp) {
return isCelsius ? temp : (temp * 9/5) + 32;
}

async function displayWeather(data) {
  renderWeather(data, convertTemp, isCelsius);
  const theme = getTheme(data.condition);
  applyTheme(theme);
  await updateGif(theme);
}

toggleBtn.addEventListener("click", async () => {
isCelsius = !isCelsius;

if (currentWeather) {
await displayWeather(currentWeather);
}
});

form.addEventListener("submit", async (e) => {
e.preventDefault();

const location = locationInput.value.trim();

if (!location) {
  status.textContent = "Please enter a location";
  return;
}

try {
  status.textContent = "Loading...";

  const rawData = await fetchWeather(location);

  const weather = processWeatherData(rawData);

  currentWeather = weather;
  saveWeather(weather);
  saveLocation(location);

  await displayWeather(weather);

  status.textContent = "";

} catch (err) {
status.textContent = "Something went wrong!";
console.error(err);
} finally {
  locationInput.value = "";
}
});

(async () => {
const savedLocation = loadLocation();

if (savedLocation) locationInput.placeholder = `Last: ${savedLocation}`;

const savedWeather = loadWeather();

if (savedWeather) {
  currentWeather = savedWeather;
  await displayWeather(savedWeather);
}
})();