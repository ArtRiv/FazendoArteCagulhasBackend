// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'ALL' },
      { name: 'ANIMES' },
      { name: 'GAMES' },
      { name: 'CUTE' },
      { name: 'RELIGIOUS' },
      { name: 'PLUSHIES' },
      { name: 'GEEK' },
      { name: 'PRINCESS' },
      { name: 'HEROES' },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
