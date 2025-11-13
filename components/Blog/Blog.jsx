"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogComponent() {
  const [articles, setArticles] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticlesCount, setDisplayedArticlesCount] = useState(8);
  const articlesPerPage = 8;

  useEffect(() => {
    fetch("/Blog/Articles.json")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setFilteredArticles(data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  useEffect(() => {
    filterArticles(selectedTags, searchQuery);
    setDisplayedArticlesCount(articlesPerPage); // Reset displayed articles count on filter change
  }, [selectedTags, searchQuery]);

  const filterArticles = (tags, query) => {
    let filtered = articles;

    if (tags.length > 0) {
      filtered = filtered.filter((article) =>
        tags.every((tag) => article.tags.includes(tag))
      );
    }

    if (query) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  const handleTagClick = (tag) => {
    let newSelectedTags;
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }
    setSelectedTags(newSelectedTags);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setDisplayedArticlesCount((prevCount) => prevCount + articlesPerPage);
  };
  const keywords = articles.map((item) => item.title).join(", ");

  return (
    <>
      <div className="blog">
      <h3>Блог</h3>
      <div className="blog-cards page">
        {filteredArticles.length > 0 ? (
          filteredArticles.slice(0, displayedArticlesCount).map((article) => (
            <div className="article-card" key={article.id}>
            <Link
                style={{ textDecoration: "none" }}
                href={`/blog/${article.url}`}
              >
              <img
                src={`/Blog/${encodeURIComponent(article.photo)}.webp`}
                alt={article.title}
              /></Link>
              <Link
                style={{ textDecoration: "none" }}
                href={`/blog/${article.url}`}
              >
                <p className='card-title'>{article.title}</p>
              </Link>
              {/* <p>{article.description}</p> */}
            </div>
          ))
        ) : (
          <p className="no-articles">Статьи не найдены</p>
        )}
      </div>
      {filteredArticles.length > displayedArticlesCount && (
        <button className="load-more" onClick={handleLoadMore}>
          Показать еще
        </button>
      )}
      </div>
    </>
  );
}
