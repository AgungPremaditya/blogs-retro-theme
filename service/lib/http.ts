import { API_CONFIG } from '../config';
import { ApiError } from './errors';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
  onProgress?: (progress: number) => void;
}

/**
 * Makes an HTTP request to the API
 * @param endpoint - API endpoint path
 * @param options - Request options
 * @returns Promise with the response data
 * @throws {ApiError} If the request fails
 */
export async function makeRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  let progressInterval: NodeJS.Timeout | null = null;

  try {
    const { params, onProgress, ...requestOptions } = options;
    
    // Build URL with query parameters
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // Merge default headers with provided headers
    const headers = {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...options.headers,
    };

    // Start progress simulation
    let currentProgress = 0;
    if (onProgress) {
      onProgress(currentProgress);
      progressInterval = setInterval(() => {
        if (currentProgress < 95) {
          currentProgress += 15;
          onProgress(currentProgress);
        }
      }, 50);
    }

    const response = await fetch(url.toString(), {
      ...requestOptions,
      headers,
    });

    if (!response.ok) {
      throw new ApiError(
        `Request failed: ${response.statusText}`,
        response.status,
        await response.json().catch(() => null)
      );
    }

    const data = await response.json();
    
    // Clear interval and set to 100%
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    if (onProgress) {
      onProgress(100);
    }
    
    return data;
  } catch (error) {
    // Clear interval on error
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    if (options.onProgress) {
      options.onProgress(0);
    }

    if (error instanceof ApiError) {
      throw error;
    }
    console.error('Request failed:', error);
    throw new ApiError(
      'Request failed. Please try again later.',
      500
    );
  }
} 