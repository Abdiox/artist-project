import express, { response } from "express";
import fs from "fs/promises";
import cors from "cors";
import { request } from "http";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/artist", async (request, response) => {
  const data = await fs.readFile("data/artists.json"); // Læs filen som tekst (utf8)
  const artist = JSON.parse(data);
  response.json(artist);
  console.log(artist);
});

app.post("/artist", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();
  const data = await fs.readFile("data/artists.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  console.log(newArtist);
  fs.writeFile("data/artists.json", JSON.stringify(artists));
  response.json(artists);
  console.log(artists);
});

app.put("/artist/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const data = await fs.readFile("data/artists.json");
  const artists = JSON.parse(data);
  let artistsToUpdate = artists.find((artist) => artist.id === id);
  const body = request.body;
  console.log(body);
  artistsToUpdate.image = body.image;
  artistsToUpdate.mail = body.mail;
  artistsToUpdate.name = body.name;
  artistsToUpdate.title = body.title;
  fs.writeFile("data/data.json", JSON.stringify(artists));
  response.json(artists);
});

app.delete("/artist/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const data = await fs.readFile("data/artists.json");
  const artists = JSON.parse(data);
  const newArtist = artists.filter((artist) => artist.id !== id);
  fs.writeFile("data/artists.json", JSON.stringify(newArtist));

  response.json(artists);
});

app.listen(port, () => {
  console.log(`Serveren kører på http://localhost:${port}`);
});

// import express from "express";
// import fs from "fs/promises";
// import cors from "cors";

// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(cors());

// app.get("/artist", async (request, response) => {
//   const data = await fs.readFile("artists.json"); // Læs filen som tekst (utf8)
//   const artists = JSON.parse(data);
//   response.json(artists);
//   console.log(artists);
// });

// app.listen(port, () => {
//   console.log(`Serveren kører på http://localhost:${port}`);
// });
