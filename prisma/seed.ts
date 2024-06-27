import { PrismaClient } from "@prisma/client";
import { genres } from "../src/data/genres";
const prisma = new PrismaClient();

async function seed() {
  for (let genre of genres) {
    await prisma.genre.create({
      data: genre,
    });
  }
}
seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
