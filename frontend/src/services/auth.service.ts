import { apiRequest } from '@/lib/api/client';
import { sessionStore } from '@/lib/auth/session-store';
import { disconnectSocket } from '@/lib/socket/socket-client';
import { LoginResult } from '@/types/auth.types';
import { LoginCredentials, UserProfile } from '@/types/user.types';

export async function login(credentials: LoginCredentials): Promise<UserProfile> {
  const { accessToken, user } = await apiRequest<LoginResult>('/auth/login', {
    method: 'POST',
    body: { email: credentials.email.trim().toLowerCase(), password: credentials.password },
  });
  sessionStore.set({ accessToken, user });
  return user;
}

export function logout(): void {
  disconnectSocket();
  sessionStore.clear();
}
