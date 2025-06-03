/**
 * Custom error class for API-related errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Custom error class for authentication errors
 */
export class AuthError extends Error {
  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'AuthError';
  }
} 