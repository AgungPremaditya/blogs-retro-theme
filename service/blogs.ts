import { makeRequest } from "./lib/http";
import type { ApiResponse, PostDetail, PostList } from "./types";

type ProgressFn = (progress: number) => void;

export const blogService = {
  getAllPosts(page: number, onProgress?: ProgressFn, search?: string) {
    const params: Record<string, string | number> = { page };
    if (search) params.search = search;
    return makeRequest<ApiResponse<PostList[]>>("/posts", { params, onProgress });
  },

  getPostBySlug(slug: string, options?: { onProgress?: ProgressFn }) {
    return makeRequest<ApiResponse<PostDetail>>(`/posts/by-slug/${slug}`, {
      onProgress: options?.onProgress,
    });
  },
};
