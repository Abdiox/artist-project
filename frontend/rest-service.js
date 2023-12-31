"use strict";

export { endpoint, getArtists, createArtist, deleteArtist, updateArtist };

const endpoint = "http://localhost:5500";

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

//-------------------Create Artist----------------------//

async function createArtist(image, name, shortDescription, birthdate, genres, activeSince, website) {
  const newArtist = {
    // id: id,
    image: image,
    name: name,
    shortDescription: shortDescription,
    birthdate: birthdate,
    genres: genres,
    activeSince: activeSince,
    website: website,
  };
  const postAsJson = JSON.stringify(newArtist);

  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: postAsJson,
  });

  return response;
}

//-------------------Update Artist----------------------//

async function updateArtist(id, image, name, shortDescription, birthdate, genres, activeSince, website) {
  const updatedArtist = {
    image: image,
    name: name,
    shortDescription: shortDescription,
    birthdate: birthdate,
    genres: genres,
    activeSince: activeSince,
    website: website,
  };

  const json = JSON.stringify(updatedArtist);
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "PUT",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

//-------------------Delete Artist----------------------//

async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  return response;
}
