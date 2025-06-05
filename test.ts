import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  await prisma.$disconnect();
  console.log('Prisma works!');
}

main().catch(console.error);
