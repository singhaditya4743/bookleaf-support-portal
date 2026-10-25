import { join } from 'node:path';
import { SeedAdmin } from '@/types/seed.types';

export const SAMPLE_DATA_PATH = join(process.cwd(), 'prisma', 'data', 'bookleaf_sample_data.json');

export const AUTHOR_DEFAULT_PASSWORD = process.env.SEED_AUTHOR_PASSWORD ?? 'Author@123';
export const ADMIN_DEFAULT_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123';

export const SEED_ADMINS: SeedAdmin[] = [
  { name: 'BookLeaf Admin', email: 'admin@bookleaf.com' },
  { name: 'Support Team', email: 'support@bookleaf.com' },
];

export const BCRYPT_ROUNDS = 10;
