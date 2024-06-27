import { Hono } from "hono";
import prisma from "../prismaclient";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Movie API",
    URL: "/movies",
  });
});

app.post("/movies/seedes", async (c) => {
  const newMovie = await prisma.movie.createMany({
    data: [
      {
        title: "Inception",
        duration: 148,
        director: "Christopher Nolan",
      },
      {
        title: "The Dark Knight",
        duration: 152,
        director: "Christopher Nolan",
      },
      {
        title: "Sniper",
        duration: 98,
        director: "Luis Llosa",
      },
      {
        title: "Planet of the Apes",
        duration: 121,
        director: "Tim Burton",
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
    const newMovie = await prisma.movie.create({
      data: {
        title: String(body.title),
        duration: Number(body.duration),
        director: String(body.director),
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
      },
    });
    return c.json(newMovie);
  } catch (error) {
    console.error(`Error movies : ${error}`);
  }
});

const port = 3000;
console.log(`Rest Movies run in PORT: ${port}`);

export default app;
