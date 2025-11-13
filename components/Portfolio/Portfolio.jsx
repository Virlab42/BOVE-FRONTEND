'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Portfolio() {
  const [articles, setArticles] = useState([]);
  const [selectedTags, setSelectedTags] = useState(null); // null - начальное состояние, пока не загружены данные
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayedArticlesCount, setDisplayedArticlesCount] = useState(8);
  const articlesPerPage = 8;

  // Загрузка данных с сервера
  useEffect(() => {
    fetch("/Portfolio/Portfolio.json")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setFilteredArticles(data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  // Загружаем выбранные теги из sessionStorage только при монтировании компонента
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTags = JSON.parse(sessionStorage.getItem("selectedTags"));
      if (storedTags) {
        setSelectedTags(storedTags); // Обновляем состояние с выбранными тегами
      } else {
        setSelectedTags(["Все"]); // Если тегов нет, устанавливаем дефолтное значение
      }
    }
  }, []);

  // Фильтрация проектов при изменении selectedTags
  useEffect(() => {
    if (selectedTags && articles.length > 0) {
      filterArticles(selectedTags);
      setDisplayedArticlesCount(articlesPerPage);
    }
  }, [selectedTags, articles]);

  // Сохранение выбранных тегов в sessionStorage
  useEffect(() => {
    if (selectedTags) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("selectedTags", JSON.stringify(selectedTags));
      }
    }
  }, [selectedTags]);

  const filterArticles = (tags) => {
    let filtered = articles;

    if (tags.length > 0 && !tags.includes("Все")) {
      filtered = filtered.filter((article) =>
        tags.every((tag) => article.tags.includes(tag))
      );
    }

    setFilteredArticles(filtered);
  };

  const handleTagClick = (tag) => {
    setSelectedTags(tag === "Все" ? ["Все"] : [tag]);
  };

  const handleLoadMore = () => {
    setDisplayedArticlesCount((prevCount) => prevCount + articlesPerPage);
  };

  if (selectedTags === null) {
    // Показать загрузочный экран, пока теги не загрузятся
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className="search">
        <h1>Проекты</h1>
        <div className="tags-container">
          {["Все", "Частная архитектура", "Дизайн интерьера"].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={selectedTags.includes(tag) ? "active" : ""}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="articles-container">
        {filteredArticles.length > 0 ? (
          filteredArticles.slice(0, displayedArticlesCount).map((article) => (
            <Link className="article-card" key={article.id} href={`/portfolio/${article.url}`} >
              <Image src={`/Portfolio/${article.url}/1.webp`} alt={`Проект дома ${article.description} "${article.title}"`} width={1000} height={1000} />
              <h4>{article.title}</h4>
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </Link>
          ))
        ) : (
          <p className="no-articles">Проекты не найдены</p>
        )}
      </div>
      {filteredArticles.length > displayedArticlesCount && (
        <button className="load-more" onClick={handleLoadMore}>
          Показать еще
        </button>
      )}
    </>
  );
}
