import { QueryError } from '@/types/api.types';

export const NETWORK_ERROR =
  'Unable to reach the server. Please check your connection and try again.';
const FALLBACK_ERROR = 'Something went wrong. Please try again.';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function toQueryError(error: unknown): QueryError {
  if (error instanceof ApiError) return { status: error.status, message: error.message };
  return { status: 0, message: error instanceof Error ? error.message : FALLBACK_ERROR };
}

export const getErrorMessage = (error: unknown): string => toQueryError(error).message;

export const isNotFound = (error: QueryError | null): boolean =>
  error?.status === 404 || error?.status === 400;
