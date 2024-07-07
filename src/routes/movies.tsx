import { Hono } from "hono";
import prisma from "../lib/prisma";

export const app = new Hono();

app.post("/seed", async (c) => {
  const newMovie = await prisma.movie.createMany({
    data: [
      {
        title: "Inception",
        duration: 148,
        director: "Christopher Nolan",
        producedBy: "Warner Bros Pictures",
      },
      {
        title: "The Dark Knight",
        duration: 152,
        director: "Christopher Nolan",
        producedBy: "Warner Bros Pictures",
      },
      {
        title: "Sniper",
        duration: 98,
        director: "Luis Llosa",
        producedBy: "Warner Bros Pictures",
      },
      {
        title: "Planet of the Apes",
        duration: 121,
        director: "Tim Burton",
        producedBy: "Universal Pictures",
      },
    ],
  });

  return c.json(newMovie);
});

app.get("/", async (c) => {
  try {
    const allMovies = await prisma.movie.findMany({
      include: {
        actors: true,
        genres: true,
      },
    });
    return c.json(
      {
        success: true,
        massage: "List data movies",
        data: allMovies,
      },
      200
    );
  } catch (error) {
    console.error(`Error get movies : ${error}`);
  }
});

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const genreData = [];
    for (let i = 0; i < body.genres.length; i++) {
      genreData.push({
        where: { name: body.genres[i] },
        create: { name: body.genres[i] },
      });
    }

    const actorData = [];
    for (let i = 0; i < body.actors.length; i++) {
      actorData.push({
        where: { name: body.actors[i] },
        create: { name: body.actors[i] },
      });
    }
    const newMovie = await prisma.movie.create({
      data: {
        title: String(body.title),
        duration: Number(body.duration),
        director: String(body.director),
        genres: {
          connectOrCreate: genreData,
        },
        actors: {
          connectOrCreate: actorData,
        },
        producedBy: String(body.producedBy),
      },
    });

    return c.json(newMovie);
  } catch (error) {
    console.error(`Error get movies : ${error}`);
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const movie = await prisma.movie.findUnique({
      where: { id: id },
      include: {
        actors: true,
        genres: true,
      },
    });
    if (!movie) {
      return c.json(
        {
          success: false,
          massage: `movie not found!`,
        },
        404
      );
    }
    return c.json({
      success: true,
      message: `Detail movies ${movie.title}`,
      data: movie,
    });
  } catch (error) {
    console.error(`Error get movies : ${error}`);
  }
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const movie = await prisma.movie.delete({
    where: { id: id },
  });
  if (!id) {
    return c.json({ message: "Movies Not Found" });
  }
  return c.json(`movies by Title ${movie.title} deleted`);
});

app.delete("/", async (c) => {
  try {
    const movie = await prisma.movie.deleteMany();
    if (!movie) {
      return c.json(
        {
          success: false,
          massage: `movie not found!`,
        },
        404
      );
    }
    return c.json({
      success: true,
      message: `Delete All movies`,
      data: movie,
    });
  } catch (error) {}

  return c.json({ massage: "All movies succes deleted" });
});

app.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    if (!id) {
      return c.json({ massage: `Movie not found`, Status: 404 });
    }
    const newMovie = await prisma.movie.update({
      where: { id },
      data: {
        title: String(body.title),
        duration: Number(body.duration),
        director: String(body.director),
        producedBy: String(body.producedBy),
      },
    });
    return c.json(newMovie);
  } catch (error) {
    console.error(`Error movies : ${error}`);
  }
});

export default app;
