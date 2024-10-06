"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { remark } from "remark";
import html from "remark-html";
interface TocItem {
    id: string;
    title: string;
    level: number;
}

const posts = [
    {
        id: 1,
        title: "The Evolution of RPGs",
        category: "Game History",
        slug: "backend-optimization-case-pama-project",
        tags: ["Backend", ".Net", "C#", "MSSQL"],
        content: `
# The Evolution of RPGs

## Early Days
Role-playing games (RPGs) have come a long way since their inception. In the early days, text-based adventures ruled supreme.

## The Golden Age
### Console RPGs
The late 80s and early 90s saw the rise of console RPGs, with titles like Final Fantasy and Dragon Quest leading the charge.

### PC RPGs
Meanwhile, on PC, games like Ultima and Wizardry were pushing the boundaries of what was possible in digital storytelling.

## Modern Era
Today, RPGs span a wide range of subgenres, from action RPGs to MMORPGs, each offering unique experiences to players around the world.

## Conclusion
The journey of RPGs from simple text adventures to complex, immersive worlds is a testament to the genre's enduring appeal and the creativity of game developers.
    `,
    },
    // Add more posts here...
];

const categories = [
    "Game History",
    "Game Design",
    "Retro Gaming",
    "Modern Gaming",
];

export default function PostDetail({ params }: { params: { slug: string } }) {
    const [activeSection, setActiveSection] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);
    const [htmlContent, setHtmlContent] = useState("");
    const contentRef = useRef<HTMLDivElement | null>(null);

    const slug = params.slug;
    const post = posts.find((p) => p.slug === slug);

    useEffect(() => {
        const processContent = async () => {
            const result = await remark()
                .use(html, { sanitize: false })
                .process(post?.content);
            setHtmlContent(result.toString());
        };
        processContent();
    }, [post?.content]);

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

    if (!post) return <div>Post not found</div>;

    return (
        <div className="min-h-screen bg-navy-900 text-gray-300 font-mono">
            <header className="p-4 md:p-6 bg-navy-800">
                <nav className="flex items-center space-x-2 text-sm md:text-base">
                    <Link
                        href="/"
                        className="text-yellow-400 hover:underline pixelated"
                    >
                        Home
                    </Link>
                    <span className="text-gray-500">&gt;</span>
                    <span className="text-yellow-200 pixelated">
                        {post.title}
                    </span>
                </nav>
            </header>

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
                            Categories
                        </h2>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    className={`pixelated ${category === post.category ? "text-yellow-400" : "text-gray-400"}`}
                                >
                                    <Link
                                        href={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
                                        className="hover:text-yellow-200"
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 text-yellow-400 pixelated">
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
                    </div>
                </aside>

                <article className="lg:w-3/4 lg:pl-8" ref={contentRef}>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400 pixelated">
                        {post.title}
                    </h1>
                    <div
                        className="prose prose-invert prose-yellow max-w-none"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </article>
            </main>

            <footer className="mt-12 p-4 text-center text-gray-400">
                <p>&copy; 2023 Retro Game Blog. All rights reserved.</p>
            </footer>

            <style jsx global>{`
                @font-face {
                    font-family: "Pixelated";
                    src: url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
                }
                .pixelated {
                    font-family: "Pixelated", monospace;
                    image-rendering: pixelated;
                }
                .bg-navy-900 {
                    background-color: #0a192f;
                }
                .bg-navy-800 {
                    background-color: #112240;
                }
                .prose h1,
                .prose h2,
                .prose h3,
                .prose h4,
                .prose h5,
                .prose h6 {
                    font-family: "Pixelated", monospace;
                    color: #fbbf24;
                    margin-top: 2em;
                    margin-bottom: 1em;
                }
                .prose h1 {
                    font-size: 2.25rem;
                }
                .prose h2 {
                    font-size: 1.875rem;
                }
                .prose h3 {
                    font-size: 1.5rem;
                }
                .prose h4 {
                    font-size: 1.25rem;
                }
                .prose h5 {
                    font-size: 1.125rem;
                }
                .prose h6 {
                    font-size: 1rem;
                }
                .prose p {
                    margin-bottom: 1.5em;
                }
                .prose a {
                    color: #fbbf24;
                    text-decoration: underline;
                }
                .prose code {
                    background-color: #112240;
                    padding: 0.2em 0.4em;
                    border-radius: 0.25em;
                    font-size: 0.875em;
                }
                .prose pre {
                    background-color: #112240;
                    padding: 1em;
                    border-radius: 0.5em;
                    overflow-x: auto;
                    margin: 1.5em 0;
                }
                .prose pre code {
                    background-color: transparent;
                    padding: 0;
                    font-size: 0.875em;
                }
            `}</style>
        </div>
    );
}
