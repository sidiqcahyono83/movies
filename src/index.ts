import { Hono } from "hono";
import { deletemovieById, getmovieById, getmoviesAll } from "./data/config";

const app = new Hono();

app.get("/", (c) => {
	return c.json({
		message: "Movie API",
		movies: "/movies",
	});
});
app.get("/movies", getmoviesAll);

app.get("/movies/:id", getmovieById);

app.delete("/movies/:id", deletemovieById);

export default app;
