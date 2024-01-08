import { PrismaClient } from "@prisma/client";

let Prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  Prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.Prisma) {
    // @ts-ignore
    global.Prisma = new PrismaClient();
  } // @ts-ignore
  Prisma = global.Prisma;
}

export default Prisma;
