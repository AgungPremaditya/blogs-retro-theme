'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Blogs() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(['en-de'], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(['en-ID'], {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const posts = [
        {
            id: 1,
            image: 'https://cdn.myanimelist.net/images/anime/1782/128859l.jpg',
            title: 'Backend Optimization (Case: PAMA Project)',
            shordDesc:
                'Pengalaman pertama melakukan optimasi di salah satu project besar dan berumur. Project ini menggunakan dotnet dan mssql dengan versi yang sudah outdated.',
            tags: ['Backend', '.Net', 'C#', 'MSSQL'],
        },
    ];

    return (
        <div className='bg-navy-900 flex min-h-screen flex-col font-mono text-gray-300'>
            <main className='container mx-auto flex-grow px-4 py-8'>
                <section className='mb-12 text-left'>
                    <h2 className='pixelated mb-4 text-3xl font-bold text-yellow-400 md:text-5xl'>
                        <span className='text-yellow-100'>Its Now</span>{' '}
                        {formatTime(currentTime)}
                        <br /> {formatDate(currentTime)}
                    </h2>
                    <p className='text-lg md:text-xl'>
                        Wanna explore somethings?
                    </p>
                </section>
                <section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className='hover:bg-navy-800 border-2 border-yellow-400 p-4 transition-colors'
                        >
                            <div className='relative mb-4 h-48'>
                                <Image
                                    src={`${post.image}`}
                                    alt={`Cover image for ${post.title}`}
                                    layout='fill'
                                    objectFit='cover'
                                    className='rounded'
                                />
                            </div>
                            <h3 className='pixelated mb-2 text-xl font-bold text-yellow-400'>
                                {post.title}
                            </h3>
                            <div className='mb-4 flex flex-wrap gap-2'>
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className='pixelated bg-yellow-400 px-2 py-1 text-xs text-indigo-900'
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className='mb-4'>{post.shordDesc}</p>
                            <Link
                                href={`/blogs/${post.id}`}
                                className='pixelated inline-block border-2 border-yellow-400 px-4 py-2 font-bold text-yellow-400 transition-colors hover:bg-yellow-400 hover:text-indigo-900'
                            >
                                Read More &gt;
                            </Link>
                        </article>
                    ))}
                </section>
            </main>

            <footer className='mt-auto p-4 text-center text-gray-400'>
                <p>&copy; 2024 Schias. All rights reserved.</p>
            </footer>
        </div>
    );
}
