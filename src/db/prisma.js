import pkg from "@prisma/client";

const { PrismaClient } = pkg;

let prisma;

if (!global.__prisma) {
  global.__prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });
}

prisma = global.__prisma;

export default prisma;
