"use strict";

// let artists;
// const endpoint = "https://artist-api-32971-default-rtdb.europe-west1.firebasedatabase.app/";
// window.addEventListener("load", start);

// function start() {
//   console.log("Velkommen!");
//   getArtists();
// }

// async function getArtists() {
//   const response = await fetch(`${endpoint}.json`);
//   const data = await response.json();
//   console.log(data);

//   const artists = await artistData(data);
//   displayArtists(artists);
// }

let artists;
window.addEventListener("load", start);

function start() {
  console.log("Velkommen!");
  getArtists();
}

async function getArtists() {
  const response = await fetch(`/data/artists.json`);
  const data = await response.json();
  const artists = await artistData(data);
  displayArtists(artists);
}

async function artistData(dataObject) {
  const artistArray = [];
  for (const key in dataObject) {
    const artist = dataObject[key];
    artist.id = key;
    artistArray.push(artist);
  }
  return artistArray;
}

function displayArtists(listOfArtists) {
  document.querySelector("#artists").innerHTML = "";
  for (const artists of listOfArtists) {
    showArtists(artists);
  }
}

function showArtists(artistObject) {
  const html = /*html*/ `
    <article class="grid-item">
      <img src= "${artistObject.image}"/>
      <div class="grid-info">
        <h2>${artistObject.id}</h2>
        <h3>${artistObject.name}</h3>
         <p>${artistObject.birthdate}</p>
      </div>
      <div class="btns">
        <button class="btn-update">Opdater</button>
        <button class="btn-delete">Slet</button>
      </div>
    </article>
  `;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
  document.querySelector("#artists article:last-child").addEventListener("click", () => artistClicked(artistObject));
}
//-------------------Show Dialog----------------------//
function artistClicked(artistObject) {
  console.log("Detail view opened");
  showDialog(artistObject);
  document.querySelector("#dialog-show").showModal();
}

function showDialog(artistObject) {
  document.querySelector("#image").src = artistObject.image;
  document.querySelector("#name").textContent = artistObject.name;
  document.querySelector("#shortDescription").textContent = artistObject.shortDescription;
  document.querySelector("#birthdate").textContent = artistObject.birthdate;
  document.querySelector("#genres").textContent = artistObject.genres;
  document.querySelector("#activeSince").textContent = artistObject.activeSince; // Ændret til "activeSince"
  document.querySelector("#website").textContent = artistObject.website;
}
