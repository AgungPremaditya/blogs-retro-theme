"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const posts = [
    {
        id: 1,
        image: "https://cdn.myanimelist.net/images/anime/1782/128859l.jpg",
        title: "Backend Optimization (Case: PAMA Project)",
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
];

const BlogDetail = ({ params }: { params: { slug: string } }) => {
    const [activeSection, setActiveSection] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const slug = params.slug;
    const post = posts.find((p) => p.slug === slug);

    useEffect(() => {
        const handleScroll = () => {
            const headings = document.querySelectorAll(
                "h1, h2, h3, h4, h5, h6",
            );
            for (let i = headings.length - 1; i >= 0; i--) {
                const heading = headings[i];
                if (heading.getBoundingClientRect().top <= 100) {
                    setActiveSection(heading.id);
                    break;
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
                    <Link
                        href="/blogs"
                        className="text-yellow-400 hover:underline pixelated"
                    >
                        Blogs
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
                    className="lg:hidden mb-4 px-4 py-2 bg-yellow-400 text-indigo-900 rounded pixelated"
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
                            {post.tags.map((tag) => (
                                <li
                                    key={tag}
                                    className={`pixelated text-yellow-400`}
                                >
                                    <Link
                                        href={`/category/${tag.toLowerCase().replace(/ /g, "-")}`}
                                        className="hover:text-yellow-200"
                                    >
                                        {tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 text-yellow-400 pixelated">
                            Table of Contents
                        </h2>
                        <ul className="space-y-2">
                            {post.content
                                .split("\n")
                                .filter((line) =>
                                    line.replace(/\s/g, "").startsWith("#"),
                                )
                                .map((line) => {
                                    const level = line.split(" ")[0].length;
                                    const title = line.substring(level + 1);
                                    const id = title
                                        .toLowerCase()
                                        .replace(/ /g, "-");
                                    return (
                                        <li
                                            key={id}
                                            className={`pixelated ${activeSection === id ? "text-yellow-400" : "text-gray-400"}`}
                                            style={{
                                                marginLeft: `${(level - 1) * 0.5}rem`,
                                            }}
                                        >
                                            <a
                                                href={`#${id}`}
                                                className="hover:text-yellow-200"
                                            >
                                                {title}
                                            </a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </aside>

                <article className="lg:w-3/4 lg:pl-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400 pixelated">
                        {post.title}
                    </h1>
                </article>
            </main>
        </div>
    );
};

export default BlogDetail;
