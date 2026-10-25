import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { LoginResult } from '@/types/auth.types';
import { UserProfile } from '@/types/user.types';

export class UserProfileDto implements UserProfile {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Ananya Reddy' })
  name: string;

  @ApiProperty({ example: 'ananya.reddy@email.com' })
  email: string;

  @ApiProperty({ enum: Role, enumName: 'Role', example: Role.AUTHOR })
  role: Role;
}

export class LoginResponseDto implements LoginResult {
  @ApiProperty({ description: 'JWT to send as `Authorization: Bearer <token>`' })
  accessToken: string;

  @ApiProperty({ description: 'Token lifetime in seconds', example: 86400 })
  expiresIn: number;

  @ApiProperty({ type: UserProfileDto })
  user: UserProfileDto;
}
