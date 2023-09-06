"use strict";

let artists;
const endpoint = "http://localhost:5000";
window.addEventListener("load", start);

async function start() {
  console.log("Velkommen!");
  await getArtists();
  updateGrid();
  console.log(artists);

  //Create Artist
  document.querySelector("#create-dialog-show").addEventListener("click", showCreateArtist);
}

async function getArtists() {
  const response = await fetch(`${endpoint}/artist`);
  const data = await response.json();
  artists = data;
  displayArtists(artists);
}

//-------------------Update Grid----------------------//

async function updateGrid() {
  await getArtists();
  displayArtists(artists);
}

function displayArtists(listOfArtist) {
  document.querySelector("#artists").innerHTML = "";
  for (const artist of listOfArtist) {
    showArtists(artist);
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

//-------------------Create Artist----------------------//

async function createArtist(image, name, shortDescription, birthdate, genres, activeSince, website) {
  const newArtist = {
    image: image,
    name: name,
    shortDescription: shortDescription,
    birthdate: birthdate,
    genres: genres,
    activeSince: activeSince,
    website: website,
  };
  const postAsJson = JSON.stringify(newArtist);

  const response = await fetch(`${endpoint}/artist`, { method: "POST", body: postAsJson });

  return response;
}

function showCreateArtist() {
  const dialog = document.querySelector("#show-artist");

  console.log("Create Artist Dialog Opened");

  dialog.showModal();

  document.querySelector("#create-artist").addEventListener("submit", createArtistClicked);

  dialog.querySelector(".close").addEventListener("click", () => {
    dialog.close();
  });
}

async function createArtistClicked(event) {
  event.preventDefault();

  const form = event.target;

  const image = form.image.value;
  const name = form.name.value;
  const shortDescription = form.shortDescription.value;
  const birthdate = form.birthdate.value;
  const genres = form.genres.value;
  const activeSince = form.activeSince.value;
  const website = form.website.value;

  const response = await createArtist(image, name, shortDescription, birthdate, genres, activeSince, website);

  if (response.ok) {
    form.reset();
    updateGrid();
  }
  document.querySelector("#show-artist").close();
}

//-------------------Delete Artist----------------------//
