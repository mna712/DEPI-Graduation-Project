import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
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
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get('http://localhost:3000/api/product', config);
        // Handle different response structures
        if (response.data?.data) {
          setProducts(Array.isArray(response.data.data) ? response.data.data : []);
        } else if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } else {
        // Use mock data if no token
        setProducts(MOCK_PRODUCTS);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      // Fallback to mock data if API fails
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        const response = await axios.post('http://localhost:3000/api/products/add', newProduct, config);
        // Add the new product to the local state
        setProducts(prevProducts => [response.data, ...prevProducts]);
        return response.data;
      } else {
        // If no token, add to local state only
        const product = {
          id: Date.now(),
          ...newProduct,
          categoryId: 1,
        };
        setProducts(prevProducts => [product, ...prevProducts]);
        return product;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
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
