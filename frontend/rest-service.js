"use strict";

export { endpoint, getArtists, createArtist, deleteArtist };

const endpoint = "http://localhost:5500";

async function getArtists() {
  const response = await fetch(`${endpoint}/artist`);
  const data = await response.json();
  return data;
}

async function createArtist(id, image, name, shortDescription, birthdate, genres, activeSince, website) {
  const newArtist = {
    id: id,
    image: image,
    name: name,
    shortDescription: shortDescription,
    birthdate: birthdate,
    genres: genres,
    activeSince: activeSince,
    website: website,
  };
  const postAsJson = JSON.stringify(newArtist);

  const response = await fetch(`${endpoint}/artist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: postAsJson,
  });

  return response;
}

async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artist/${id}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  return response;
}
