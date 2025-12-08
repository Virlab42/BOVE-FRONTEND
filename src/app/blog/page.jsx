// src/MainBlog.js
import BlogComponent from '../../../components/Blog/Blog';
import './MainBlog.scss'
import './blog.scss'

export const metadata = {
    title: "Блог BOVE",
    description: "",
    alternates: {
      canonical: 'https://'
    },
    keywords: [
    ],
    openGraph: {
      title: "Блог BOVE",
      description: "",
      url: `https://`,
      images: [
          {
              url: ``,
              alt: '',
          },
      ],
  },
  };

export default function MainBlog(){
    return (
        <>
            <section>
              <BlogComponent />
            </section>
        </>
        
    );
};

