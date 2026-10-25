import { UserProfile } from '@/types/user.types';

export interface LoginResult {
  accessToken: string;
  expiresIn: number;
  user: UserProfile;
}

export interface Session {
  accessToken: string;
  user: UserProfile;
}
