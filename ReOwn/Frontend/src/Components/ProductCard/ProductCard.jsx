import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiPhone } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import { useFavorites } from "../Context/FavoritesContext";

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showMessage, setShowMessage] = useState({ visible: false, text: "" });

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
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
    e.stopPropagation();
    alert("Calling seller...");
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
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
      onClick={handleProductClick}
      className="relative flex flex-col p-5 transition-all duration-300 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-xl hover:-translate-y-1 group/card animate-fadeIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Heart Icon */}
      <div className="relative mb-3">
        <button
          className="absolute z-10 text-green-800 transition-all duration-200 top-2 right-2 hover:text-yellow-400 hover:scale-125"
          onClick={handleToggleFavorite}
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
        
        {showMessage.visible && (
          <div className="absolute right-0 z-20 px-3 py-2 text-sm text-white bg-green-600 rounded-lg shadow-lg top-12 animate-slideDown whitespace-nowrap">
            {showMessage.text}
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
            onClick={handleCall}
            className="flex items-center justify-center flex-1 py-2.5 text-white transition-all duration-200 bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black shadow-md hover:shadow-lg hover:scale-105"
            aria-label="Call seller"
          >
            <FiPhone size={20} />
          </button>
          <button
            onClick={handleChatClick}
            className="flex items-center justify-center flex-1 py-2.5 text-white transition-all duration-200 bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black shadow-md hover:shadow-lg hover:scale-105"
            aria-label="Chat with seller"
          >
            <BsChatSquareDots size={20} />
          </button>
        </div>
      </div>

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
            transform: translateY(-20px);
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
          animation: slideDown 0.5s ease-out;
        }

        .animate-heartBeat {
          animation: heartBeat 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;