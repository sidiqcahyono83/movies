import { Hono } from "hono";
import prisma from "../lib/prisma";

export const app = new Hono();

app.get("/", async (c) => {
  try {
    const allactor = await prisma.actor.findMany({
      include: {
        movie: true,
      },
    });
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

app.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const newActor = await prisma.actor.create({
      data: {
        name: String(body.name),
      },
    });

    return c.json(newActor);
  } catch (error) {
    console.error(`Error get Actor : ${error}`);
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const actor = await prisma.actor.findUnique({
      where: { id: id },
      include: {
        movie: true,
      },
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

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const actor = await prisma.actor.delete({
    where: { id: id },
  });
  if (!id) {
    return c.json({ message: "Actor Not Found" });
  }
  return c.json(`Actor by Title ${actor.name} deleted`);
});

app.delete("/", async (c) => {
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

app.put("/:id", async (c) => {
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

export default app;
