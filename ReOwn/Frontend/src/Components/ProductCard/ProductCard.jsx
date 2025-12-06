import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiPhone } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import { useFavorites } from "../Context/FavoritesContext";

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showMessage, setShowMessage] = useState(false);

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click
    toggleFavorite(product.id);

    const isNowFavorite = !isFavorite(product.id);
    setShowMessage({
      visible: true,
      text: isNowFavorite ? "Added to favorites" : "Removed from favorites",
    });

    setTimeout(() => {
      setShowMessage({ visible: false, text: "" });
    }, 2000);
  };

  const handleCall = (e) => {
    e.stopPropagation(); // Prevent card click
    alert("Calling seller...");
  };

  const handleChatClick = (e) => {
    e.stopPropagation(); // Prevent card click
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

  const handleProductClick = () => {
    console.log("Navigating to product:", product.id);
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg animate-fadeIn"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
        >
          {isFavorite(product.id) ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FiHeart className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-green-600 font-bold text-xl mb-3">{product.price}</p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleCall}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            <FiPhone className="w-4 h-4" />
            Call
          </button>

          <button
            onClick={handleChatClick}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <BsChatSquareDots className="w-4 h-4" />
            Chat
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showMessage.visible && (
        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium animate-slideDown">
          {showMessage.text}
        </div>
      )}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

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

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
