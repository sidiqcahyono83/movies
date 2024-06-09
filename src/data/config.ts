import { Hono } from "hono";
import { dataMovies } from "./movies";

const movie = new Hono();

export const getmoviesAll = (c: any) => {
	return c.json(dataMovies);
};

export const getmovieById = (c: any) => {
	const id = Number(c.req.param("id"));
	const movie = dataMovies.find((movie) => movie.id === id);
	if (!movie) {
		return c.json({ message: "movie not found" });
	}
	return c.json(movie);
};

export const deletemovieById = (c: any) => {
	const id = Number(c.req.param("id"));
	const movie = dataMovies.find((movie) => movie.id === id);
	if (!movie) {
		return c.json({ message: "movie not found" });
	}
	return c.json(movie);
};

// export const createmovie = (c: any) => {
// 	const movie = new movie();
// 	return c.json(movie);
// };
