import { API_CONFIG } from '../../config';
import type { LoginResponse, LoginCredentials, User } from '../../types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  }

  getStoredAuth(): { token: string | null; user: User | null } {
    try {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      return {
        token,
        user: userData ? JSON.parse(userData) : null,
      };
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return { token: null, user: null };
    }
  }

  setStoredAuth(data: LoginResponse): void {
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('user_data', JSON.stringify(data.user));
  }

  clearStoredAuth(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
}

export const authService = new AuthService(); 