import { ApiError, NETWORK_ERROR } from '@/lib/api/api-error';
import { sessionStore } from '@/lib/auth/session-store';
import { ApiErrorResponse, RequestOptions } from '@/types/api.types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

const isErrorBody = (value: unknown): value is ApiErrorResponse =>
  typeof value === 'object' && value !== null && 'message' in value;

async function toApiError(response: Response): Promise<ApiError> {
  const body: unknown = await response.json().catch(() => null);
  const message = isErrorBody(body) ? body.message : response.statusText;
  return new ApiError(response.status, Array.isArray(message) ? message.join('. ') : message);
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, signal }: RequestOptions = {},
): Promise<T> {
  const token = sessionStore.get()?.accessToken;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      signal,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ApiError(0, NETWORK_ERROR);
  }

  if (response.status === 401 && token) sessionStore.clear();
  if (!response.ok) throw await toApiError(response);
  return (await response.json()) as T;
}
