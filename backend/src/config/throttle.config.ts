const ONE_MINUTE_MS = 60000;

export const THROTTLE_DEFAULT = { name: 'default', ttl: ONE_MINUTE_MS, limit: 120 };

export const LOGIN_THROTTLE = { default: { ttl: ONE_MINUTE_MS, limit: 10 } };

export const AI_DRAFT_THROTTLE = { default: { ttl: ONE_MINUTE_MS, limit: 5 } };
