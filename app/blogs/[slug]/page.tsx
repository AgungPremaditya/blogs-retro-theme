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

    // Handle scroll event to highlight active section
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

    // Handle article cannot scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isSidebarOpen]);

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-navy-900 text-gray-300 font-mono">
            <div className="container mx-auto px-4 py-8">
                <div className="lg:flex lg:gap-8">
                    <aside className="lg:w-1/4 mb-8 lg:mb-0">
                        <div className="lg:sticky lg:top-8">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-yellow-400 text-indigo-900 flex items-center justify-center shadow-lg pixelated transition-transform duration-300 ease-in-out transform hover:scale-110"
                            >
                                {isSidebarOpen ? "X" : "≡"}
                            </button>

                            <div
                                className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
                                    isSidebarOpen
                                        ? "opacity-50 z-40"
                                        : "opacity-0 pointer-events-none"
                                } lg:hidden`}
                                onClick={() => setIsSidebarOpen(false)}
                            ></div>

                            <div
                                className={`fixed -bottom-8 left-0 right-0 z-50 bg-navy-900 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                                    isSidebarOpen
                                        ? "translate-y-0"
                                        : "translate-y-full"
                                } lg:static lg:translate-y-0 lg:block lg:h-auto lg:bg-transparent`}
                                style={{ maxHeight: "calc(80vh + 2em)" }}
                            >
                                <div className="p-6 lg:p-0">
                                    <div className="mb-8 lg:mb-12">
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
                                                <li
                                                    key={tag}
                                                    className="text-gray-400"
                                                >
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
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="lg:w-3/4">
                        <article ref={contentRef}>
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
                                dangerouslySetInnerHTML={{
                                    __html: htmlContent,
                                }}
                            />
                        </article>
                    </main>
                </div>
            </div>

            <footer className="mt-12 p-4 text-center text-gray-400">
                <p>&copy; 2024 Schias. All rights reserved.</p>
            </footer>
        </div>
    );
}
