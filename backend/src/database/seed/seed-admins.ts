import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';
import { ADMIN_DEFAULT_PASSWORD, BCRYPT_ROUNDS, SEED_ADMINS } from '@/database/seed/seed.constants';

export async function seedAdmins(prisma: PrismaClient): Promise<number> {
  const passwordHash = await hash(ADMIN_DEFAULT_PASSWORD, BCRYPT_ROUNDS);

  for (const admin of SEED_ADMINS) {
    await prisma.user.upsert({
      where: { email: admin.email },
      update: { name: admin.name, role: Role.ADMIN },
      create: { ...admin, passwordHash, role: Role.ADMIN },
    });
  }

  return SEED_ADMINS.length;
}
