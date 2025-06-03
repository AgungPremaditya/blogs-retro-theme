import { API_CONFIG } from '../config';
import { ApiError } from './errors';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
  simulateDelay?: boolean; // Add option to simulate delay
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Makes an HTTP request to the API
 * @param endpoint - API endpoint path
 * @param options - Request options
 * @returns Promise with the response data
 * @throws {ApiError} If the request fails
 */
export async function makeRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  try {
    const { params, simulateDelay = true, ...requestOptions } = options;
    
    // Simulate network delay in development
    if (simulateDelay && process.env.NODE_ENV === 'development') {
      await delay(2000); // 2 seconds delay
    }

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
    return data;
  } catch (error) {
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