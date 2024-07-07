import { Hono } from "hono";
import moviesRoute from "./routes/movies";
import genresRoute from "./routes/genres";
import actorsRoute from "./routes/actors";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Movie API",
    URL: "/movies",
  });
});

app.route("/movies", moviesRoute);
app.route("/genres", genresRoute);
app.route("/actors", actorsRoute);

const port = 3000;
console.log(`Rest genres run in PORT: ${port}`);

export default app;
