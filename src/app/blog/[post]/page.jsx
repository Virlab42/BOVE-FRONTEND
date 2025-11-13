// app/blog/[post]/page.js
import React from 'react';
import Link from 'next/link';
import './ArticlePage.scss';

// Асинхронная функция для получения мета-тегов
export async function generateMetadata({ params }) {
    const { post } = params;

    // Получение данных статьи
    const res = await fetch(`https://alyakina.ru/Blog/Articles.json`);
    const data = await res.json();
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
            canonical: `https://alyakina.ru/blog/${article.url}`
          },
        openGraph: {
            title: article.title,
            description: article.description,
            url: `https://alyakina.ru/blog/${article.url}`,
            images: [
                {
                    url: `/content/${article.photo}.webp`,
                    alt: article.title,
                },
            ],
        },
    };
}

const ArticlePage = async ({ params }) => {
    const { post } = params;

    // Получение данных для контента страницы
    const res = await fetch(`https://alyakina.ru/Blog/Articles.json`);
    const data = await res.json();
    const article = data.find((item) => item.url === post);

    if (!article) {
        return <div>Статья не найдена</div>;
    }

    const formattedText = article.articlestext.replace(/\n\n/g, '<br><br>');

    return (
        <>
            <div className='project-fon' style={{backgroundImage: `url(/Blog/${article.photo}.webp)`}}>
                <h1>{article.title}</h1>
                <p>{article.date}</p>
            </div>
            <div className="article-page">
                {/* <h4>{article.text}</h4> */}
                {/* <img src={`/Blog/${article.photo}.jpg`} alt={article.title} /> */}
                <div className="article-text" dangerouslySetInnerHTML={{ __html: formattedText }} />
                <Link href="/blog" className="back-button">Назад в блог</Link>
            </div>
        </>
    );
};

export default ArticlePage;
