import { Hono } from "hono";
import { getmovieById, getmoviesAll } from "./data/config";
import { dataMovies } from "./data/movies";
import { jsx } from "hono/jsx";

const app = new Hono();

app.get("/", (c) => {
	return c.json({
		message: "Movie API",
		movies: "/movies",
	});
});
app.get("/movies", getmoviesAll);

app.get("/movies/:id", getmovieById);

app.post("/movies/add", (c) => c.text("Created!", 201));

app.delete("/movies/:id", (c) => {
	let movies = dataMovies;
	const id = Number(c.req.param("id"));
	const movie = movies.find((movies) => movies.id === id);

	if (!movie) {
		c.status(404);
		return c.json({ message: "Movies Not Found" });
	}

	movies = movies.filter((movies) => movies.id !== id);

	return c.json(`movies number ${id} id deleted`);
});

app.post("/movies", (c) => {
	let movie = dataMovies;

	const nextId = movie[movie.length - 1].id + 1;

	const newMovie = {
		id: nextId,
		title: "crime",
	};

	movie = [...movie, newMovie];

	return c.json({ movie: newMovie });
});

export default app;
