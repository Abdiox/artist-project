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

function showArtists(dataObject) {
  const html = /*html*/ `
    <article class="grid-item">
      <img src= "${dataObject.image}"/>
      <div class="grid-info">
        <h2>${dataObject.id}</h2>
        <h3>${dataObject.name}</h3>
         <p>${dataObject.birthdate}</p>
      </div>
      <div class="btns">
        <button class="btn-update">Opdater</button>
        <button class="btn-delete">Slet</button>
      </div>
    </article>
  `;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
}
