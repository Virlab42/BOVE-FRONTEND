
import React from 'react';
import Link from 'next/link';
import './ArticlePage.scss';
import Gallery from '../../../../components/Portfolio/Gallary';
import FormGallery from '../../../../components/Portfolio/FormGallary';
import Image from 'next/image';
import Plan from '../../../../components/Portfolio/Plan';


export async function generateMetadata({ params }) {
    const { post } = params;

    
    const res = await fetch(`https://alyakina.ru/Portfolio/Portfolio.json`);
    const data = await res.json();
    const article = data.find((item) => item.url === post);

    
    if (!article) {
        return {
            title: 'Проект не найден',
            description: 'Этого проекта не существует.',
        };
    }

    return {
        title: `${article.seotitle}`,
        description: `${article.seodescription}`,
        keywords: article.keywords,
        alternates: {
            canonical: `https://alyakina.ru/portfolio/${article.url}`
          },
        openGraph: {
            title: `${article.seotitle}`,
            description: `${article.seodescription}`,
            url: `https://alyakina.ru/portfolio/${article.url}`,
            images: [
                {
                    url: `/Portfolio/${article.url}/1.webp`,
                    alt: article.title,
                },
            ],
        },
    };
}

const Portfolio = async ({ params }) => {
    const { post } = params;

    
    const res = await fetch(`https://alyakina.ru/Portfolio/Portfolio.json`);
    const data = await res.json();
    const article = data.find((item) => item.url === post);

    if (!article) {
        return <div>Статья не найдена</div>;
    }

    const formattedText = article.articlestext.replace(/\n\n/g, '<br><br>');

    return (
        <>
            <Image src={`/Portfolio/${article.url}/1.webp`} alt={`Проект дома ${article.title}`} className="project-fon" width={1900} height={1200}/>
            <div className='project-title'>
                <h1>{article.title}</h1>
                <h2>{article.description}</h2>
                    <a href='#article-page' className='down'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </a>
            </div>
            <div id='article-page' className="article-page">
                <div className='project-info'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                        <div>Место нахождения:<br></br><span>{article.location}</span></div>
                    </div>
                    {article.tags == "Частная архитектура" && (
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36"><path fill="currentColor" d="M9 17.41V27h9.59l-2-2H11v-5.59z" className="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M34.87 32.29L32 29.38V32H4v-4.15h2v-1.6H4V19.6h2V18H4v-6.4h2V10H4V4.41l15.94 15.85v-2.82L3.71 1.29A1 1 0 0 0 2 2v31a1 1 0 0 0 1 1h31.16a1 1 0 0 0 .71-1.71" className="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M24 30h4a2 2 0 0 0 2-2V8.7l-2.3-4.23a2 2 0 0 0-1.76-1a2 2 0 0 0-1.76 1.08L22 8.72V28a2 2 0 0 0 2 2m0-20.8l1.94-3.77L28 9.21V24h-4Zm0 16.43h4v2.44h-4Z" className="clr-i-outline clr-i-outline-path-3"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                            <div>Площадь:<br></br><span>{article.square}</span></div>
                        </div>
                    )}
                </div>
                <h4>О проекте</h4>
                <div className="article-text" dangerouslySetInnerHTML={{ __html: formattedText }} />
                {article.plans > 0 && (
                <Plan photos={article.url} length={article.plans} alt={article.title} />
                )}
                <h4>Портфолио проекта</h4>
                <Gallery photos={article.url} length={article.image} alt={article.title}/>
            </div>
            <FormGallery />
        </>
    );
};

export default Portfolio;
