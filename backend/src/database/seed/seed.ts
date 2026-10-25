import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { seedAdmins } from '@/database/seed/seed-admins';
import { seedAuthors } from '@/database/seed/seed-authors';

const logger = new Logger('Seed');

async function main(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    const admins = await seedAdmins(prisma);
    const { authors, books } = await seedAuthors(prisma);
    logger.log(`Seeded ${admins} admins, ${authors} authors and ${books} books`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  logger.error(error);
  process.exit(1);
});
