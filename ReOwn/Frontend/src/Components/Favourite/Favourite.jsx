import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { BsChatSquareDots } from 'react-icons/bs';
import { ArrowLeft } from 'lucide-react';
import { useFavorites } from '../Context/FavoritesContext';
import { useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS } from '../../data/products';

export default function FavouritePage() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const favoriteProducts = MOCK_PRODUCTS.filter(product => isFavorite(product.id));

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
  };

  const handleChat = (product) => {
    navigate(`/chat/${product.id}`, {
      state: {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        sellerId: product.sellerId,
        sellerName: product.sellerName,
      }
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-teal-400 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F6F3" }} dir="rtl">
      <div className="max-w-6xl px-4 py-6 mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <ArrowLeft className="w-8 h-8 text-gray-600" />
          <h2 className="text-3xl font-bold text-gray-800">Favourites</h2>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-2xl text-gray-700">No favorites yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="relative w-full p-5 overflow-hidden transition-all bg-white shadow-lg cursor-pointer rounded-3xl hover:shadow-xl group/card"
              >

                {/* Image + Heart */}
                <div className="relative">
                  <img
                    src={product.image || "/images/Logo_Img.png"}
                    alt={product.name}
                    className="object-cover w-full h-64 transition-transform duration-300 rounded-xl group-hover/card:scale-110"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(product.id);
                    }}
                    className="absolute p-2 transition bg-white rounded-full shadow-sm top-3 left-3 hover:scale-110"
                  >
                    <FaHeart className="w-6 h-6 text-green-700 animate-heartBeat" />
                  </button>
                </div>

                {/* Info */}
                <div className="flex flex-col h-full pt-4">
                  <h3 className="mb-2 text-lg font-bold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>

                  <span className="text-2xl font-bold text-green-800">
                    {product.price}
                  </span>

                  {/* Buttons */}
                  <div className="flex w-full gap-3 mt-4">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center flex-1 py-2.5 text-white bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black transition-all shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <FiPhone size={20} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChat(product);
                      }}
                      className="flex items-center justify-center flex-1 py-2.5 text-white bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black transition-all shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <BsChatSquareDots size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

<style>{`
  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(1); }
  }
  .animate-heartBeat {
    animation: heartBeat 0.3s ease-in-out;
  }
`}</style>
