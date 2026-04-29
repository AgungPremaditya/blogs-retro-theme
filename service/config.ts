export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_ENDPOINT || "https://schias-blogs.onrender.com",
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

export const AUTH_STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_data",
} as const;
