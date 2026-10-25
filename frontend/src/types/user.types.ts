export type Role = 'AUTHOR' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
