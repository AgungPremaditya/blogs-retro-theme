import { API_CONFIG, AUTH_STORAGE_KEYS } from "../config";
import { getCookie } from "./cookie";
import { ApiError } from "./errors";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
  onProgress?: (progress: number) => void;
  auth?: boolean;
}

export async function makeRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, onProgress, auth, headers, ...rest } = options;

  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    }
  }

  const finalHeaders: Record<string, string> = {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(headers as Record<string, string>),
  };
  if (auth) {
    const token = getCookie(AUTH_STORAGE_KEYS.TOKEN);
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  // Indeterminate progress signal: 0 = start, 100 = done. No fake increments.
  onProgress?.(0);

  try {
    const response = await fetch(url.toString(), { ...rest, headers: finalHeaders });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new ApiError(
        `Request failed: ${response.statusText}`,
        response.status,
        data,
      );
    }

    const data = (await response.json()) as T;
    onProgress?.(100);
    return data;
  } catch (error) {
    onProgress?.(0);
    if (error instanceof ApiError) throw error;
    throw new ApiError("Request failed. Please try again later.", 500);
  }
}
