import type { PostDetail, PostList } from "@/service";

const PLACEHOLDER_BASE = "https://placehold.co/600x400/1a1b26/ffd866/png";

export function getPostImage(post: PostList | PostDetail): string {
  if (post.cover_image?.url) return post.cover_image.url;

  const placeholders = [
    `${PLACEHOLDER_BASE}?text=${encodeURIComponent(post.category.name)}`,
    `${PLACEHOLDER_BASE}?text=${encodeURIComponent(post.title.substring(0, 20))}`,
    `${PLACEHOLDER_BASE}?text=Blog+Post`,
  ];

  return placeholders[post.id.charCodeAt(0) % placeholders.length];
}
