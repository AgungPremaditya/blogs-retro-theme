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

export interface Post {
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

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: PaginationMeta;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
} 