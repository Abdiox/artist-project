"use strict";

import { endpoint, getArtists, createArtist, deleteArtist, updateArtist } from "./rest-service.js";

endpoint;
window.addEventListener("load", start);
let artists;

async function start() {
  console.log("Velkommen!");
  await getArtists();
  updateGrid();

  //Create Artist
  document.querySelector("#create-dialog-show").addEventListener("click", showCreateArtist);

  //Update Artist
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);

  //Delete Artist
  document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
  document.querySelector("#form-delete-artist").addEventListener("click", deleteArtistClickedNo);
}

//-------------------Update Grid----------------------//

async function updateGrid() {
  artists = await getArtists();
  displayArtists(artists);
  console.log(artists);
}

//------------------- Get Artist  ----------------------//

getArtists();

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

  document.querySelector("#artists article:last-child .btn-update").addEventListener("click", (event) => {
    event.stopPropagation();
    updateClicked(artistObject);
  });

  document.querySelector("#artists article:last-child .btn-delete").addEventListener("click", (event) => {
    event.stopPropagation();
    deleteClicked(artistObject);
  });

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

function showCreateArtist() {
  const dialog = document.querySelector("#dialog-create-artist");

  console.log("Create Artist Dialog Opened");

  dialog.showModal();

  document.querySelector("#createArtist").addEventListener("submit", createArtistClicked);

  dialog.querySelector(".close").addEventListener("click", () => {
    dialog.close();
  });
}

async function createArtistClicked(event) {
  event.preventDefault();

  const form = event.target;

  const id = form.id.value;
  const image = form.image.value;
  const name = form.name.value;
  const shortDescription = form.shortDescription.value;
  const birthdate = form.birthdate.value;
  const genres = form.genres.value;
  const activeSince = form.activeSince.value;
  const website = form.website.value;

  const response = await createArtist(id, image, name, shortDescription, birthdate, genres, activeSince, website);

  if (response.ok) {
    form.reset();
    updateGrid();
  }
  document.querySelector("#dialog-create-artist").close();
}

//-------------------Update Artist----------------------//
function updateClicked(artistObject) {
  console.log("Update button clicked");
  const updateForm = document.querySelector("#form-update-artist");
  const dialog = document.querySelector("#dialog-update-artist");

  updateForm.image.value = artistObject.image;
  updateForm.name.value = artistObject.name;
  updateForm.shortDescription.value = artistObject.shortDescription;
  updateForm.birthdate.value = artistObject.birthdate;
  updateForm.genres.value = artistObject.genres;
  updateForm.activeSince.value = artistObject.activeSince;
  updateForm.website.value = artistObject.website;
  document.querySelector("#form-update-artist").setAttribute("data-id", artistObject.id);
  dialog.showModal();

  dialog.querySelector(".close").addEventListener("click", () => {
    dialog.close();
    console.log("Update view closed");
  });
}

async function updateArtistClicked(event) {
  console.log("Update button clicked");
  event.preventDefault();
  const form = event.target;
  const id = event.target.getAttribute("data-id");

  const image = form.image.value;
  const name = form.name.value;
  const shortDescription = form.shortDescription.value;
  const birthdate = form.birthdate.value;
  const genres = form.genres.value;
  const activeSince = form.activeSince.value;
  const website = form.website.value;

  const response = await updateArtist(image, name, shortDescription, birthdate, genres, activeSince, website); // use values to create a new post
  if (response.ok) {
    console.log("Artist have been updated");
    updateGrid();
    updateArtist(id, image, name, shortDescription, birthdate, genres, activeSince, website);
  }
  document.querySelector("#dialog-update-artist").close();
}

//-------------------Delete Artist----------------------//

function deleteClicked(artist) {
  console.log("Delete button clicked");
  document.querySelector("#artistName").textContent = `Do you want to delete: ${artist.name} from the database?`;
  document.querySelector("#form-delete-artist").setAttribute("data-id", artist.id);
  document.querySelector("#dialog-delete-artist").showModal();
}

async function deleteArtistClicked(event) {
  console.log(event);
  const id = event.target.getAttribute("data-id");
  const response = await deleteArtist(id);
  if (response.ok) {
    deleteArtist(id);
    updateGrid();
  }
  document.querySelector("#dialog-delete-artist").close();
}

function deleteArtistClickedNo() {
  console.log("Close delete dialog");
  document.querySelector("#dialog-delete-artist").close();
}
