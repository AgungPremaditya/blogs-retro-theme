import { AUTH_STORAGE_KEYS } from "../../config";
import { deleteCookie, getCookie, setCookie } from "../../lib/cookie";
import { makeRequest } from "../../lib/http";
import type { LoginCredentials, LoginResponse, User } from "../../types";

export const authService = {
  login(credentials: LoginCredentials): Promise<LoginResponse> {
    return makeRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  getStoredAuth(): { token: string | null; user: User | null } {
    if (typeof window === "undefined") return { token: null, user: null };
    const token = getCookie(AUTH_STORAGE_KEYS.TOKEN);
    try {
      const userData = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      return { token, user: userData ? (JSON.parse(userData) as User) : null };
    } catch {
      return { token, user: null };
    }
  },

  setStoredAuth(data: LoginResponse): void {
    if (typeof window === "undefined") return;
    setCookie(AUTH_STORAGE_KEYS.TOKEN, data.access_token);
    try {
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(data.user));
    } catch {
      // localStorage unavailable — token cookie is the source of truth
    }
  },

  clearStoredAuth(): void {
    if (typeof window === "undefined") return;
    deleteCookie(AUTH_STORAGE_KEYS.TOKEN);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    } catch {
      // ignore
    }
  },
};
