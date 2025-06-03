export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Author {
    id: string;
    email: string;
    avatar: string | null;
    username: string;
}

export interface CoverImage {
    id: string;
    url: string;
    public_id: string;
}

// Type for posts in the list view (main page)
export interface PostList {
    id: string;
    title: string;
    slug: string;
    content: string;
    category: {
        name: string;
    };
    author: {
        username: string;
    };
    cover_image: CoverImage | null;
}

// Type for post detail view with exact API response structure
export interface PostDetail {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    published_at: string;
    author_id: string;
    category_id: string;
    category: Category;
    author: Author;
    cover_image: CoverImage | null;
}

// Type for API responses
export interface ApiResponse<T> {
    data: T;
    meta: PaginationMeta;
}

// Type for pagination metadata
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
} 