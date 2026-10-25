import { SwaggerUiGlobal, SwaggerUiResponse } from '@/types/swagger.types';

export function applyTokenFromLogin(response: SwaggerUiResponse): SwaggerUiResponse {
  const body = response.body as { accessToken?: unknown } | null;
  const token = body?.accessToken;

  if (response.ok && response.url.endsWith('/auth/login') && typeof token === 'string') {
    (globalThis as SwaggerUiGlobal).ui?.preauthorizeApiKey('bearer', token);
  }

  return response;
}
