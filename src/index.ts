import { Hono } from "hono";
import { dataMovies } from "./data/movies";

const app = new Hono();
let movies = dataMovies;

app.get("/", (c) => {
	return c.json({
		message: "Movie API",
		URL: "/movies",
	});
});

app.get("/movies", (c) => {
	return c.json(movies);
});

app.get("/movies/:id", (c) => {
	const id = Number(c.req.param("id"));
	const movie = dataMovies.find((movies) => movies.id === id);
	if (!movie) {
		return c.json({ message: "movie not found" });
	}
	return c.json(movie);
});

app.delete("/movies/:id", (c) => {
	
	const id = Number(c.req.param("id"));
	const movie = movies.find((movies) => movies.id === id);

	if (!movie) {
		return c.json({ message: "Movies Not Found" });
	}

	movies = movies.filter((movies) => movies.id !== id);

	return c.json(`movies by ID ${id} deleted`);
});

app.post("/movies", async (c) => {

	const { title, duration } = await c.req.json();

	const nextId = movies[movies.length - 1].id + 1;

	const newMovie = {
		id: nextId,
		title,
		duration,
	};

	movies = [...movies, newMovie];

	return c.json(newMovie);
});


app.put("movies/:id", async (c) => {

	const id = Number(c.req.param("id"));
	const movie = movies.find((movie) => movie.id === id);

	if (!movie) {
		return c.json({ massage: `Movie by ${id} not found` });
	}
	const { title, duration } = await c.req.json();

	const newMovie = {
		id,
		title,
		duration,
	};

	movies = movies.map((movie)=>{
		if(movie.id === id){
			return newMovie
		}else{
			return movie
		}
	})
	return c.json(newMovie);
});

export default app;
