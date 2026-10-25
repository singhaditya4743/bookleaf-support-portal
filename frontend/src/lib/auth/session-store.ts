import { Session } from '@/types/auth.types';

const STORAGE_KEY = 'bookleaf.session';
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedSession: Session | null = null;

const isSession = (value: unknown): value is Session =>
  typeof value === 'object' && value !== null && 'accessToken' in value && 'user' in value;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): Session | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return isSession(value) ? value : null;
  } catch {
    return null;
  }
}

const notify = () => listeners.forEach((listener) => listener());

export const sessionStore = {
  get(): Session | null {
    const raw = readRaw();
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSession = parse(raw);
    }
    return cachedSession;
  },

  set(session: Session): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    notify();
  },

  clear(): void {
    window.localStorage.removeItem(STORAGE_KEY);
    notify();
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    window.addEventListener('storage', listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', listener);
    };
  },
};
