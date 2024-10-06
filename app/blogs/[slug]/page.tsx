"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import gfm from "remark-gfm";

import { fetchBlogBySlug, IBlog } from "@/service/blogs";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/service/firebase";

interface TocItem {
    id: string;
    title: string;
    level: number;
}

export default function PostDetail({ params }: { params: { slug: string } }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);
    const [htmlContent, setHtmlContent] = useState("");
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [blog, setBlog] = useState<IBlog | null>(null);

    // Fetch blog data
    const slug = params.slug;
    useEffect(() => {
        const getBlog = async () => {
            const blogData = await fetchBlogBySlug(slug);
            if (blogData) {
                setBlog(blogData);

                const contentRef = ref(storage, blogData.content);
                const contentUrl = await getDownloadURL(contentRef);
                const content = await fetch(contentUrl);
                const text = await content.text();

                const result = await remark()
                    .use(gfm)
                    .use(remarkRehype)
                    .use(rehypeSlug)
                    .use(rehypeStringify)
                    .process(text);

                setHtmlContent(result.toString());
            }
        };

        getBlog();
    }, [slug]);

    // Generate table of contents
    useEffect(() => {
        if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll(
                "h1, h2, h3, h4, h5, h6",
            );
            const tocItems = Array.from(headings).map((heading) => ({
                id: heading.id || "",
                title: heading.textContent || "",
                level: parseInt(heading.tagName.charAt(1)),
            }));
            setTableOfContents(tocItems);
        }
    }, [htmlContent]);

    //
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const headings = contentRef.current.querySelectorAll(
                    "h1, h2, h3, h4, h5, h6",
                );
                for (let i = headings.length - 1; i >= 0; i--) {
                    const heading = headings[i];

                    if (heading.getBoundingClientRect().top <= 100) {
                        setActiveSection(heading.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-navy-900 text-gray-300 font-mono">
            <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden mb-4 px-4 py-2 bg-yellow-400 text-navy-900 rounded pixelated"
                >
                    {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                </button>

                <aside
                    className={`lg:w-1/4 mb-8 lg:mb-0 ${isSidebarOpen ? "block" : "hidden lg:block"}`}
                >
                    <div className="lg:sticky lg:top-4">
                        <h2 className="text-xl font-bold mb-4 text-yellow-400 pixelated">
                            Table of Contents
                        </h2>
                        <ul className="space-y-2">
                            {tableOfContents.map((item) => (
                                <li
                                    key={item.id}
                                    className={`pixelated ${activeSection === item.id ? "text-yellow-400" : "text-gray-400"}`}
                                    style={{
                                        marginLeft: `${(item.level - 1) * 0.5}rem`,
                                    }}
                                >
                                    <a
                                        href={`#${item.id}`}
                                        className="hover:text-yellow-200"
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 text-yellow-400 pixelated">
                            Tags
                        </h2>
                        <ul className="space-y-2">
                            {blog.tags.map((tag) => (
                                <li key={tag} className="text-gray-400">
                                    <Link
                                        href={`/category/${tag.toLowerCase().replace(/ /g, "-")}`}
                                        className="hover:text-yellow-200"
                                    >
                                        #{tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <article className="lg:w-3/4 lg:pl-8" ref={contentRef}>
                    <div className="flex items-center space-x-2 text-sm md:text-base mb-4">
                        <Link
                            href="/"
                            className="text-yellow-400 hover:underline pixelated"
                        >
                            Home
                        </Link>
                        <span className="text-gray-500">&gt;</span>
                        <Link
                            href="/blogs"
                            className="text-yellow-400 hover:underline pixelated"
                        >
                            Blogs
                        </Link>
                        <span className="text-gray-500">&gt;</span>
                        <span className="text-yellow-200 pixelated">
                            {blog.title}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400 pixelated">
                        {blog.title}
                    </h1>
                    <div
                        className="prose prose-invert prose-yellow max-w-none"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </article>
            </main>

            <footer className="mt-12 p-4 text-center text-gray-400">
                <p>&copy; 2024 Schias. All rights reserved.</p>
            </footer>
        </div>
    );
}
