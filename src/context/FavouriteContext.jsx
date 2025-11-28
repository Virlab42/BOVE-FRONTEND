'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  // Загружаем избранное из localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('favourites')) || [];
      setFavourites(saved);
    } catch {
      setFavourites([]);
    }
  }, []);

  // Сохраняем избранное при изменениях
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Проверка
  const isFavourite = (id) => favourites.some((item) => item.id === id);

  // Переключить избранное
  const toggleFavourite = (item) => {
    setFavourites((prev) => {
      const exists = prev.some((f) => f.id === item.id);

      if (exists) {
        return prev.filter((f) => f.id !== item.id);
      }

      return [...prev, item];
    });
  };
const clearFavourites = () => {
  setFavourites([]);
  localStorage.setItem("favourites", JSON.stringify([]));
};
  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite, isFavourite, clearFavourites }}>
      {children}
    </FavouriteContext.Provider>
  );
}

export const useFavourite = () => useContext(FavouriteContext);
