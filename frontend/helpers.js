const endpoint = "http://localhost:5500";

export { endpoint, inputSearchChanged, sortBy, filterArtistChanged };
import { artists, displayArtists } from "./frontend.js";

function inputSearchChanged(event) {
  const value = event.target.value;
  const artistToShow = searchArtist(value);
  displayArtists(artistToShow);
}

const searchArtist = (searchValue) => {
  const searchValues = searchValue.toLowerCase();

  return artists.filter((artist) => artist.name.toLowerCase().includes(searchValues));
};

function sortBy(event) {
  const selectedValue = event.target.value;

  if (selectedValue === "name") {
    artists.sort((artist1, artist2) => artist1.name.localeCompare(artist2.name));
  } else if (selectedValue === "birthdate") {
    artists.forEach((artist) => {
      if (typeof artist.birthdate === "string") {
        artist.birthdate = new Date(artist.birthdate);
      }
    });
    artists.sort((artist1, artist2) => artist1.birthdate - artist2.birthdate);
  }

  displayArtists(artists);
}

async function filterArtistChanged(event) {
  const value = event.target.value;
  console.log(value);
  if (value === "favourites") {
    const artistToShow = await filterArtist(value);
    displayArtists(artistToShow);
  } else if (value === "allArtists") {
    displayArtists(artists);
  }
}

async function filterArtist() {
  const data = await fetch(`${endpoint}/favorites`);
  const artists = await data.json();
  displayArtists(artists);
  return artists;
}
