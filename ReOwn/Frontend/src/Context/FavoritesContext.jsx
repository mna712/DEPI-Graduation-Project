import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        } else {
          setFavorites([]);
        }
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = (product) => {
    const isFav = favorites.some(item => item.productId === product.id);
    let newFavorites;
    if (isFav) {
      newFavorites = favorites.filter(item => item.productId !== product.id);
    } else {
      const favItem = {
        _id: product.id,
        productId: product.id,
        productName: product.name,
        price: product.price,
        image: product.images[0],
        condition: product.condition,
        description: product.description,
        seller: product.seller
      };
      newFavorites = [...favorites, favItem];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (id) => favorites.some(item => item.productId === id);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
