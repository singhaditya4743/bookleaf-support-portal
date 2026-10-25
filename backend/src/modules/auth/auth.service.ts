import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { EnvironmentVariables } from '@/config/env.variables';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginResult } from '@/types/auth.types';
import { JwtPayload, UserProfile } from '@/types/user.types';

const PROFILE_SELECT = { id: true, name: true, email: true, role: true } as const;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<EnvironmentVariables, true>,
  ) {}

  async login({ email, password }: LoginDto): Promise<LoginResult> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    const isValid = user ? await compare(password, user.passwordHash) : false;

    if (!user || !isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      expiresIn: this.config.get('JWT_EXPIRES_IN', { infer: true }),
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async getProfile(userId: string): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: PROFILE_SELECT,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
