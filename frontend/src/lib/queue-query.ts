const STORAGE_KEY = 'bookleaf.queue-query';

export function saveQueueQuery(query: string): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, query);
  } catch {
    return;
  }
}

export function readQueueQuery(): string {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}
