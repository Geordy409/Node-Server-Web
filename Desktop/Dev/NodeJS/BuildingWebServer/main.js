import Fastify from "fastify";
import menuItems from "./menuItems.js";
import operatingHour from "./operatingHour.js";

const app = Fastify();
const port = 3001;

app.get("/", async (request, reply) => {
  return "Welcome to What's Fair is fair";
});

app.get("/menu", async (request, reply) => {
  return reply.send(menuItems);
});

app.get("/hours", async (request, reply) => {
  return reply.send(operatingHour);
});

await app.listen({ port });
console.log(`Web server at http://localhost:${port}`);
