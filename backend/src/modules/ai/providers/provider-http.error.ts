export class ProviderHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly retryAfterMs: number | null,
  ) {
    super(message);
  }
}

export async function toProviderError(
  name: string,
  response: Response,
): Promise<ProviderHttpError> {
  const retryAfterSeconds = Number(response.headers.get('retry-after'));
  return new ProviderHttpError(
    response.status,
    `${name} ${response.status}: ${(await response.text()).slice(0, 200)}`,
    retryAfterSeconds > 0 ? retryAfterSeconds * 1000 : null,
  );
}
