"use strict";

const endpoint = "http://localhost:5500";

export { endpoint, inputSearchChanged, searchArtist };
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
