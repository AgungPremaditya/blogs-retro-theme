import { makeRequest } from '../../lib/http';
import type { Post, ApiResponse } from '../../types';

/**
 * Fetches all blog posts with pagination
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 10)
 * @returns Promise with paginated posts data
 */
export async function getAllPosts(page: number = 1, pageSize: number = 10): Promise<ApiResponse<Post[]>> {
  return makeRequest<ApiResponse<Post[]>>('/posts', {
    params: { page, pageSize }
  });
}

/**
 * Fetches a single blog post by ID
 * @param id - Post ID
 * @returns Promise with post data
 */
export async function getPostById(id: string): Promise<Post> {
  const response = await makeRequest<ApiResponse<Post>>(`/posts/${id}`);
  return response.data;
} 