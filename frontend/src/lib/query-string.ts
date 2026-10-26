type QueryValue = string | number | null | undefined;

export function toQueryString(params: Record<string, QueryValue>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : '';
}
