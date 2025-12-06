import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial products
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProducts(MOCK_PRODUCTS);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (newProduct) => {
    const product = {
      id: Date.now(), // Simple ID generation
      ...newProduct,
      categoryId: 1, // Default category, can be made dynamic later
    };
    setProducts(prevProducts => [product, ...prevProducts]);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      loading,
      addProduct,
      loadProducts
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
