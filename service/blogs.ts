import { makeRequest } from './lib/http';
import type { Post, ApiResponse } from './types';

type GetPostOptions = {
    onProgress?: (progress: number) => void;
};

export const blogService = {
    getAllPosts(page: number, onProgress?: (p: number) => void) {
        return makeRequest<ApiResponse<Post[]>>('/posts', {
            params: { page },
            onProgress
        });
    },
    
    getPostBySlug(slug: string, options?: GetPostOptions) {
        return makeRequest<ApiResponse<Post>>(`/posts/${slug}`, {
            onProgress: options?.onProgress
        });
    }
}; 