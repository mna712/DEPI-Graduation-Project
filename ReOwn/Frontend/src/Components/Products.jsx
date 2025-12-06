import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiPhone } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import { useFavorites } from "./Context/FavoritesContext";
import { useProducts } from "../Context/ProductsContext";
import ProductCard from "./ProductCard/ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { products, loading } = useProducts();

  const [showMessage, setShowMessage] = useState({});

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

  // navigation to chat
  const handleChatClick = (product) => {
    console.log("Opening chat for product:", product.id);
    navigate(`/chat/${product.id}`, {
      state: {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        sellerId: product.sellerId,
        sellerName: product.sellerName,
      },
    });
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

  // Filter products by category
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");

  const filteredProducts = categoryId
    ? products.filter((p) => p.categoryId === parseInt(categoryId))
    : products;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h3 className="mb-4 text-3xl font-bold text-green-800 transition-all duration-200 border-b-4 border-green-800 cursor-default w-36 hover:border-green-500">
        Products
      </h3>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
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
