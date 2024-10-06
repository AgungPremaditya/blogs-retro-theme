import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface IBlog {
    id: string;
    title: string;
    slug: string;
    tags: string[];
    content: string;
}

export const fetchBlogs = async () => {
    const blogsCollection = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCollection);
    const blogsList = blogsSnapshot.docs.map((doc) => doc.data());
    return blogsList;
};

export const fetchBlogBySlug = async (slug: string): Promise<IBlog | null> => {
    const blogsCollection = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCollection);
    const blogsList = blogsSnapshot.docs.map((doc) => doc.data() as IBlog);
    return blogsList.find((blog) => blog.slug === slug) || null;
};
