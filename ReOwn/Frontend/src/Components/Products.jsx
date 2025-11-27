import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiPhone } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import { useFavorites } from "./Context/FavoritesContext"; 

const Products = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites(); 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState({});

    // Mock Data 
  const MOCK_PRODUCTS = [
    {
      id: 1,
      name: "iPhone 13 Pro Max - 256GB Gold Edition",
      price: "30,500 EGP",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21 Ultra",
      price: "25,000 EGP",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "MacBook Pro 14 inch M1 Pro",
      price: "45,000 EGP",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "iPad Air 5th Generation",
      price: "20,000 EGP",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "AirPods Pro 2nd Generation",
      price: "8,500 EGP",
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Apple Watch Series 7 GPS",
      price: "12,000 EGP",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop",
    },
  ];

  // Fetch products on component mount
  useEffect(() => {
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

  const handleToggleFavorite = (productId) => {

    toggleFavorite(productId);


    const isNowFavorite = !isFavorite(productId);
    setShowMessage((prev) => ({
      ...prev,
      [productId]: {
        visible: true,
        text: isNowFavorite ? "Added to favorites" : "Removed from favorites",
      },
    }));

    setTimeout(() => {
      setShowMessage((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], visible: false },
      }));
    }, 2000);
  };

  const handleCall = () => {
    alert("Calling seller...");
  };

  const handleChat = () => {
    alert("Opening chat...");
  };

  const handleProductClick = (productId) => {
    console.log("Navigating to product:", productId);
    navigate(`/product/${productId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-green-800 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('category');
  
  const filteredProducts = categoryId 
    ? products.filter(p => p.categoryId === parseInt(categoryId))
    : products; 
  
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h3 className="mb-4 text-3xl font-bold text-green-800 transition-all duration-200 border-b-4 border-green-800 cursor-default w-36 hover:border-green-500">
        Products
      </h3>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="relative flex flex-col p-5 transition-all duration-300 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-xl hover:-translate-y-1 group/card animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Heart Icon */}
            <div className="relative mb-3">
              <button
                className="absolute z-10 text-green-800 transition-all duration-200 top-2 right-2 hover:text-yellow-400 hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(product.id);
                }}
                aria-label={
                  isFavorite(product.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {isFavorite(product.id) ? (
                  <FaHeart size={24} className="animate-heartBeat" />
                ) : (
                  <FiHeart size={24} />
                )}
              </button>
              {showMessage[product.id]?.visible && (
                <div className="absolute right-0 z-20 px-3 py-2 text-sm text-white bg-green-600 rounded-lg shadow-lg top-12 animate-slideDown whitespace-nowrap">
                  {showMessage[product.id].text}
                </div>
              )}
              {/* Product Image */}
              <div className="relative flex items-center justify-center w-full overflow-hidden bg-gray-100 rounded-lg h-52">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover/card:opacity-10" />
              </div>
            </div>
            {/* Product Info */}
            <div className="flex flex-col flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors duration-200 line-clamp-2 group-hover/card:text-green-800">
                {product.name}
              </h3>
              <p className="mb-4 text-xl font-bold text-green-800">
                {product.price}
              </p>
              {/* Buttons */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall();
                  }}
                  className="flex items-center justify-center flex-1 py-2.5 text-white transition-all duration-200 bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black shadow-md hover:shadow-lg hover:scale-105"
                  aria-label="Call seller"
                >
                  <FiPhone size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChat();
                  }}
                  className="flex items-center justify-center flex-1 py-2.5 text-white transition-all duration-200 bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black shadow-md hover:shadow-lg hover:scale-105"
                  aria-label="Chat with seller"
                >
                  <BsChatSquareDots size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heartBeat {
          0%,
          100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-heartBeat {
          animation: heartBeat 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Products;