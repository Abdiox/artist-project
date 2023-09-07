const endpoint = "http://localhost:5500";

export { endpoint, inputSearchChanged, sortBy };
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
    // Konverterer fødselsdatoerne til Date-objekter, hvis de ikke allerede er det
    artists.forEach((artist) => {
      if (typeof artist.birthdate === "string") {
        artist.birthdate = new Date(artist.birthdate);
      }
    });

    // Sorter kunstnerne efter fødselsdato
    artists.sort((artist1, artist2) => artist1.birthdate - artist2.birthdate);

    // Nu er din 'artists'-liste sorteret efter fødselsdato
  }

  displayArtists(artists);
}
