import ejs from "ejs";
import Fastify from "fastify";
import fastifyview from "@fastify/view";
import fastifyStatic from "@fastify/static"; // <-- ajout
import { join } from "path"; // <-- ajout
import menuItems from "./menuItems.js";
import operatingHour from "./operatingHour.js";
import aboutInfo from "./about.js";

const app = Fastify();

// Définir le chemin du dossier public
const publicPath = join(process.cwd(), "public");

// Enregistrer le plugin pour servir les fichiers statiques
app.register(fastifyStatic, {
  root: publicPath,
  prefix: "/public/", // tous les fichiers statiques seront accessibles via /public/
});

// Enregistrer le moteur EJS
app.register(fastifyview, {
  engine: { ejs: ejs },
});

// Page d’accueil
app.get("/", (req, reply) => {
  reply.view("views/index.ejs", { name: "What's FAIR ?" });
});

// Page menu (EJS)
app.get("/menu", (req, reply) => {
  reply.view("views/menu.ejs", { menuItems });
});

// Page horaires (EJS)
app.get("/hours", (req, reply) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const todayIndex = new Date().getDay();
  const today = days[(todayIndex + 6) % 7]; // décale dimanche à la fin

  reply.view("views/hours.ejs", { operatingHour, days, today });
});

app.get("/about", (req, reply) => {
  reply.view("views/about.ejs", { aboutInfo });
});

// API JSON des horaires
app.get("/hours/json", async (request, reply) => {
  return operatingHour;
});

app.listen({ port: 3001 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});
