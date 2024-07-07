import { Hono } from "hono";
import prisma from "../lib/prisma";

export const app = new Hono();

app.get("/", async (c) => {
  try {
    const allGenres = await prisma.genre.findMany({
      include: {
        movie: true,
      },
    });
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

app.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const newGenre = await prisma.genre.create({
      data: {
        name: String(body.name),
      },
    });

    return c.json(newGenre);
  } catch (error) {
    console.error(`Error get movies : ${error}`);
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const genre = await prisma.genre.findUnique({
      where: { id: id },
      include: {
        movie: true,
      },
    });
    if (!genre) {
      return c.json(
        {
          success: false,
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

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const genre = await prisma.genre.delete({
    where: { id: id },
  });
  if (!id) {
    return c.json({ message: "genres Not Found" });
  }
  return c.json(`genres by Title ${genre.name} deleted`);
});

app.delete("/", async (c) => {
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

app.put("/:id", async (c) => {
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

export default app;
