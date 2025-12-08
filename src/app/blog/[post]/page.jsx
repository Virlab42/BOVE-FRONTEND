// app/blog/[post]/page.js
import React from 'react';
import Link from 'next/link';
import './ArticlePage.scss';

// Асинхронная функция для получения мета-тегов
export async function generateMetadata({ params }) {
    const { post } = params;

    // Получение данных статьи
    const res = await fetch(`${process.env.NEXT_PUBLIC_BLOG_URL}/Blog/Articles.json`);
    const data = await res.json();
    console.log(data)
    const article = data.find((item) => item.url === post);

    // Если статья не найдена, возвращаем пустые мета-теги или ставим дефолтные значения
    if (!article) {
        return {
            title: 'Статья не найдена',
            description: 'Эта статья не существует.',
        };
    }

    return {
        title: article.title,
        description: article.description,
        keywords: article.keywords,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BLOG_URL}/blog/${article.url}`
          },
        openGraph: {
            title: article.title,
            description: article.description,
            url: `${process.env.NEXT_PUBLIC_BLOG_URL}/blog/${article.url}`,
            images: [
                {
                    url: `/Blog/${article.photo}.webp`,
                    alt: article.title,
                },
            ],
        },
    };
}

const ArticlePage = async ({ params }) => {
    const { post } = params;

    // Получение данных для контента страницы
    const res = await fetch(`${process.env.NEXT_PUBLIC_BLOG_URL}/Blog/Articles.json`);
    const data = await res.json();
    const article = data.find((item) => item.url === post);

    if (!article) {
        return <div>Статья не найдена</div>;
    }

    const formattedText = article.articlestext.replace(/\n\n/g, '<br><br>');

    return (
        <>
            <div className='project-fon' style={{backgroundImage: `url(/Blog/${article.photo})`}}>
                <h1>{article.title}</h1>
                <p>{article.date}</p>
            </div>
            <div className="article-page">
                {/* <h4>{article.text}</h4> */}
                {/* <img src={`/Blog/${article.photo}.jpg`} alt={article.title} /> */}
                <h4>{article.description}</h4>
                <div className="article-text" dangerouslySetInnerHTML={{ __html: formattedText }} />
                <Link className="link-product" href={`${process.env.NEXT_PUBLIC_BLOG_URL}${article.product}`}>Ссылка на товар</Link>
                <Link href="/blog" className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Thin-big-left SVG Icon</title><path fill="currentColor" d="M6.5 5.5L0 12l6.5 6.5l.707-.707L1.914 12.5H24v-1H1.914l5.293-5.293L6.5 5.5Z"></path></svg>
                Назад в блог</Link>
            </div>
        </>
    );
};

export default ArticlePage;
