import { makeRequest } from './lib/http';
import type { Post, ApiResponse } from './types';

type GetPostOptions = {
    onProgress?: (progress: number) => void;
};

type GetAllPostsParams = {
    page: number;
    search?: string;
};

export const blogService = {
    getAllPosts(page: number, onProgress?: (p: number) => void, search?: string) {
        const params: GetAllPostsParams = { page };
        if (search) params.search = search;
        
        return makeRequest<ApiResponse<Post[]>>('/posts', {
            params,
            onProgress
        });
    },
    
    getPostBySlug(slug: string, options?: GetPostOptions) {
        return makeRequest<ApiResponse<Post>>(`/posts/${slug}`, {
            onProgress: options?.onProgress
        });
    }
}; 