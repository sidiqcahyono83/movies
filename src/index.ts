import { Hono } from "hono";
import { stream, streamText, streamSSE } from "hono/streaming";
import { dataMovies } from "./data/movies";

const app = new Hono();

app.get("/", (c) => {
	return c.json({
		message: "Movie API",
		URL: "/movies",
	});
});

app.get("/movies", (c) => {
	return c.json(dataMovies);
});

app.get("/movies/:id", (c) => {
	const id = Number(c.req.param("id"));
	const movie = dataMovies.find((movie) => movie.id === id);
	if (!movie) {
		return c.json({ message: "movie not found" });
	}
	return c.json(movie);
});

app.delete("/movies/:id", (c) => {
	let movies = dataMovies;
	const id = Number(c.req.param("id"));
	const movie = movies.find((movies) => movies.id === id);

	if (!movie) {
		return c.json({ message: "Movies Not Found" });
	}

	movies = movies.filter((movies) => movies.id !== id);

	return c.json(`movies number ${id} id deleted`);
});

app.post("/movies", async (c) => {
	let movie = dataMovies;

	const { title, duration } = await c.req.json();
	const nextId = movie[movie.length - 1].id + 1;

	const newMovie = {
		id: nextId,
		title,
		duration,
	};

	movie = [...movie, newMovie];

	return c.json(newMovie);
});

app.get("/movies/stream", (c) => {
	let movies = dataMovies;
	return streamText(c, async (stream) => {
		for (const movie of movies) {
			await stream.writeln(JSON.stringify(movie));
		}
	});
});

export default app;
