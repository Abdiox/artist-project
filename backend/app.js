import express, { response } from "express";
import fs from "fs/promises";
import cors from "cors";
import { request } from "http";

const app = express();
const port = 5500;

app.use(express.json());
app.use(cors());

//-------------------Get Artist backend----------------------//

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("./artists.json"); // Læs filen som tekst (utf8)
  const artist = JSON.parse(data);
  response.json(artist);
  console.log(artist);
});

//-------------------Post Artist backend----------------------//

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();
  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  console.log(newArtist);
  fs.writeFile("./artists.json", JSON.stringify(artists));
  response.json(artists);
  console.log(artists);
});

//-------------------Put Artist backend----------------------//

app.put("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);

  let artistToUpdate = artists.find((artist) => artist.id === id);

  if (!artistToUpdate) {
    return response.status(404).json({ error: "Kunstneren blev ikke fundet." });
  }

  const body = request.body;

  console.log(body);

  // Opdater kunstnerens egenskaber
  artistToUpdate.image = body.image;
  artistToUpdate.name = body.name;
  artistToUpdate.shortDescription = body.shortDescription;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.genres = body.genres;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.website = body.website;

  // Gem opdaterede data til filen
  await fs.writeFile("./artists.json", JSON.stringify(artists));

  // Send opdaterede data som svar
  response.json(artists);
  console.log(artists);
});

//-------------------Delete Artist backend----------------------//

app.delete("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const data = await fs.readFile("./artists.json");
  const artists = JSON.parse(data);
  const newArtist = artists.filter((artist) => artist.id !== id);
  fs.writeFile("artists.json", JSON.stringify(newArtist));
  response.json(artists);
  console.log(artists);
});

//-------------------Favorites Artist backend----------------------//

app.get("/favorites", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const data = await fs.readFile("./artists.json"); // Læs favoritartister fra favorites.json
  const artists = JSON.parse(data);
  const favArtists = artists.filter((artists) => artists.favourite === true);
  response.json(favArtists);
  console.log(favArtists);
});

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("./artists.json");
  const artist = JSON.parse(data);
  response.json(artist);
  console.log(artist);
});

app.listen(port, () => {
  console.log(`Serveren kører på http://localhost:${port}`);
});
