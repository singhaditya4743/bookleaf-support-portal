import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@/config/env.validation';
import { AdminModule } from '@/modules/admin/admin.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { AuthorModule } from '@/modules/author/author.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    AuthModule,
    AuthorModule,
    AdminModule,
  ],
})
export class AppModule {}
