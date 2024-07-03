import { Hono } from "hono";
import prisma from "../lib/prisma";
import { actors } from "./data/actors";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Movie API",
    URL: "/movies",
  });
});

app.post("/movies/seed", async (c) => {
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

app.get("/movies", async (c) => {
  try {
    const allMovies = await prisma.movie.findMany();
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

app.post("/movies", async (c) => {
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
    console.log(newMovie);

    return c.json(newMovie);
  } catch (error) {
    console.error(`Error get movies : ${error}`);
  }
});

app.get("/movies/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const movie = await prisma.movie.findUnique({
      where: { id: id },
    });
    if (!movie) {
      return c.json(
        {
          message: false,
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

app.delete("/movies/:id", async (c) => {
  const id = c.req.param("id");
  const movie = await prisma.movie.delete({
    where: { id: id },
  });
  if (!id) {
    return c.json({ message: "Movies Not Found" });
  }
  return c.json(`movies by Title ${movie.title} deleted`);
});

app.delete("/movies", async (c) => {
  try {
    const movie = await prisma.movie.deleteMany();
    if (!movie) {
      return c.json(
        {
          message: false,
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

app.put("movies/:id", async (c) => {
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

// Genre
app.get("/genres", async (c) => {
  try {
    const allGenres = await prisma.genre.findMany();
    return c.json(
      {
        success: true,
        massage: "List data genre movies",
        data: allGenres,
      },
      200
    );
  } catch (error) {
    console.error(`Error get genre : ${error}`);
  }
});

app.post("/genres", async (c) => {
  try {
    const body = await c.req.json();
    // const movieData = [];
    // for (let i = 0; i < body.movies.length; i++) {
    //   movieData.push({
    //     where: { title: body.title[i] },
    //     create: { title: body.title[i] },
    //   });
    // }

    const newGenre = await prisma.genre.create({
      data: {
        name: String(body.name),
        // movie: {
        //   connectOrCreate: movieData,
        // },
      },
    });
    console.log(newGenre);

    return c.json(newGenre);
  } catch (error) {
    console.error(`Error get movies : ${error}`);
  }
});

app.get("/genres/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const genre = await prisma.genre.findUnique({
      where: { id: id },
    });
    if (!genre) {
      return c.json(
        {
          message: false,
          massage: `genre not found!`,
        },
        404
      );
    }
    return c.json({
      success: true,
      message: `Detail genre ${genre.name}`,
      data: genre,
    });
  } catch (error) {
    console.error(`Error get genre : ${error}`);
  }
});

app.delete("/genres/:id", async (c) => {
  const id = c.req.param("id");
  const genre = await prisma.genre.delete({
    where: { id: id },
  });
  if (!id) {
    return c.json({ message: "genres Not Found" });
  }
  return c.json(`genres by Title ${genre.name} deleted`);
});

app.delete("/genres", async (c) => {
  try {
    const genre = await prisma.genre.deleteMany();
    if (!genre) {
      return c.json(
        {
          message: false,
          massage: `genre not found!`,
        },
        404
      );
    }
    return c.json({
      success: true,
      message: `Delete All genres`,
      data: genre,
    });
  } catch (error) {}

  return c.json({ massage: "All genres succes deleted" });
});

app.put("genres/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    if (!id) {
      return c.json({ massage: `genre not found`, Status: 404 });
    }
    const newGenre = await prisma.genre.update({
      where: { id },
      data: {
        name: String(body.name),
      },
    });
    return c.json(newGenre);
  } catch (error) {
    console.error(`Error genres : ${error}`);
  }
});

// Actor
app.get("/actors", async (c) => {
  try {
    const allactor = await prisma.actor.findMany();
    return c.json(
      {
        success: true,
        massage: "List data actor",
        data: allactor,
      },
      200
    );
  } catch (error) {
    console.error(`Error get actor : ${error}`);
  }
});

app.post("/actors", async (c) => {
  try {
    const body = await c.req.json();

    const newActor = await prisma.actor.create({
      data: {
        name: String(body.name),
      },
    });
    console.log(newActor);

    return c.json(newActor);
  } catch (error) {
    console.error(`Error get Actor : ${error}`);
  }
});

app.get("/actors/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const actor = await prisma.actor.findUnique({
      where: { id: id },
    });
    if (!actor) {
      return c.json(
        {
          message: false,
          massage: `actor not found!`,
        },
        404
      );
    }
    return c.json({
      success: true,
      message: `Detail genre ${actor.name}`,
      data: actor,
    });
  } catch (error) {
    console.error(`Error get Actor : ${error}`);
  }
});

app.delete("/actors/:id", async (c) => {
  const id = c.req.param("id");
  const actor = await prisma.actor.delete({
    where: { id: id },
  });
  if (!id) {
    return c.json({ message: "Actor Not Found" });
  }
  return c.json(`Actor by Title ${actor.name} deleted`);
});

app.delete("/actors", async (c) => {
  try {
    const actor = await prisma.actor.deleteMany();
    if (!actor) {
      return c.json(
        {
          message: false,
          massage: `Actor not found!`,
        },
        404
      );
    }
    return c.json({
      success: true,
      message: `Delete All Actors`,
      data: actor,
    });
  } catch (error) {}

  return c.json({ massage: "All Actors succes deleted" });
});

app.put("actors/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    if (!id) {
      return c.json({ massage: `genre not found`, Status: 404 });
    }
    const newActor = await prisma.actor.update({
      where: { id },
      data: {
        name: String(body.name),
      },
    });
    return c.json(newActor);
  } catch (error) {
    console.error(`Error actor : ${error}`);
  }
});

const port = 3000;
console.log(`Rest genres run in PORT: ${port}`);

export default app;
