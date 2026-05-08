const GIPHY_KEY = "LDYUlfhPRBU6qW1Zy3dSPQ30pbcJH7wg";

export async function fetchGif(searchTerm) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${searchTerm}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch gif");
  }

  const data = await response.json();

  return data.data?.images?.original?.url ??null;
}

