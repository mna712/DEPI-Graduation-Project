// src/context/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// إنشاء الـ Context
const FavoritesContext = createContext();

// Hook مخصص للاستخدام السهل
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

// Provider Component
export const FavoritesProvider = ({ children }) => {
  // حفظ الـ favorites في state
  // Key: productId, Value: true/false
  const [favorites, setFavorites] = useState(() => {
    // محاولة جلب الـ favorites من localStorage عند التحميل
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : {};
    } catch (error) {
      console.error('Error loading favorites:', error);
      return {};
    }
  });

  // حفظ الـ favorites في localStorage كل ما يتغيروا
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  // Toggle favorite لمنتج معين
  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));

    /* 
    TODO: لما الـ API يجهز، أضيفي API call هنا:
    
    const isFavorite = !favorites[productId];
    try {
      await fetch(`https://your-api.com/api/favorites/${productId}`, {
        method: isFavorite ? 'POST' : 'DELETE',
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN'
        }
      });
    } catch (error) {
      console.error('Error updating favorite:', error);
      // إذا فشل الـ API، ارجع الـ state للوضع السابق
      setFavorites((prev) => ({
        ...prev,
        [productId]: !isFavorite,
      }));
    }
    */
  };

  // التحقق إذا كان منتج معين في الـ favorites
  const isFavorite = (productId) => {
    return !!favorites[productId];
  };

  // الحصول على عدد الـ favorites
  const getFavoritesCount = () => {
    return Object.values(favorites).filter(Boolean).length;
  };

  // مسح كل الـ favorites
  const clearFavorites = () => {
    setFavorites({});
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};