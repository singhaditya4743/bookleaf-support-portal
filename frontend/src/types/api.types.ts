export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
}

export interface QueryError {
  status: number;
  message: string;
}

export interface QueryResult<T> {
  data: T | null;
  error: QueryError | null;
  loading: boolean;
  reload: () => void;
  setData: (update: (current: T) => T) => void;
}
