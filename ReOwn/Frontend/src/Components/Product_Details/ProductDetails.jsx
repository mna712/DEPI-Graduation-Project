import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiPhone } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import { useFavorites } from "../Context/FavoritesContext";
import { useFavorites } from "../Context/FavoritesContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState({});


  // Mock Data
const MOCK_PRODUCTS = [
  // Electronics
  {
    id: 1,
    name: "iPhone 13 Pro Max - 256GB Gold Edition",
    price: "30,500 EGP",
    condition: "Used",
    description:
      "Used iPhone 13 Pro Max - Gold color, in excellent condition.\nUsed for 8 months only, battery health 90%.\nNo parts have been replaced and everything works perfectly.",
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=12",
      location: "Cairo, Egypt",
    },
    categoryId: 1,
  },
  {
    id: 2,
    name: "Samsung Galaxy S21 Ultra",
    price: "25,000 EGP",
    condition: "Used",
    description:
      "Samsung Galaxy S21 Ultra 5G - Phantom Black.\nUsed for 1 year, battery health 85%.\nIncludes original box and charger.\nNo scratches or dents.",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Sarah Ahmed",
      avatar: "https://i.pravatar.cc/150?img=25",
      location: "Alexandria, Egypt",
    },
    categoryId: 1,
  },
  {
    id: 3,
    name: "MacBook Pro 14 inch M1 Pro",
    price: "45,000 EGP",
    condition: "New",
    description:
      "Brand new MacBook Pro 14 with M1 Pro chip.\n16GB RAM, 512GB SSD.\nSpace Gray color.\nSealed box with full warranty.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Mohamed Ali",
      avatar: "https://i.pravatar.cc/150?img=33",
      location: "Giza, Egypt",
    },
    categoryId: 1,
  },
  // Fashion
  {
    id: 7,
    name: "Summer Dress Collection",
    price: "1,200 EGP",
    condition: "New",
    description:
      "Beautiful summer dress collection, made of lightweight fabric.\nPerfect for parties and casual outings.\nAvailable in multiple colors and sizes.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600181958351-9b41f0e3c5e1?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Nour El-Din",
      avatar: "https://i.pravatar.cc/150?img=52",
      location: "Cairo, Egypt",
    },
    categoryId: 2,
  },
  {
    id: 8,
    name: "Casual Shirt Premium",
    price: "800 EGP",
    condition: "New",
    description:
      "Premium quality casual shirt, 100% cotton.\nSoft, comfortable, and perfect for everyday wear.\nAvailable in various colors.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Mona Salah",
      avatar: "https://i.pravatar.cc/150?img=60",
      location: "Alexandria, Egypt",
    },
    categoryId: 2,
  },
  {
    id: 9,
    name: "Sport Sneakers Nike",
    price: "2,500 EGP",
    condition: "New",
    description:
      "Nike sport sneakers, lightweight and breathable.\nPerfect for running, gym, and casual wear.\nAvailable in different sizes.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Khaled Youssef",
      avatar: "https://i.pravatar.cc/150?img=44",
      location: "Cairo, Egypt",
    },
    categoryId: 2,
  },
  // Home & Kitchen
  {
    id: 12,
    name: "Coffee Maker Deluxe",
    price: "1,500 EGP",
    condition: "New",
    description:
      "Deluxe coffee maker with multiple brewing options.\nEasy to use and clean.\nPerfect for home and office use.",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585043155562-1a5a77a8c9b3?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Fatma Khalil",
      avatar: "https://i.pravatar.cc/150?img=70",
      location: "Giza, Egypt",
    },
    categoryId: 3,
  },
  {
    id: 13,
    name: "Professional Blender",
    price: "900 EGP",
    condition: "New",
    description:
      "High-performance professional blender.\nPerfect for smoothies, soups, and sauces.\nDurable and easy to clean.",
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Omar Khaled",
      avatar: "https://i.pravatar.cc/150?img=18",
      location: "Cairo, Egypt",
    },
    categoryId: 3,
  },
  {
    id: 14,
    name: "Air Fryer XL",
    price: "2,200 EGP",
    condition: "New",
    description:
      "Extra-large air fryer with rapid air technology.\nCook your favorite meals with less oil.\nEasy to clean and maintain.",
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop",
    ],
    seller: {
      name: "Sara Adel",
      avatar: "https://i.pravatar.cc/150?img=75",
      location: "Alexandria, Egypt",
    },
    categoryId: 3,
  },
];

  useEffect(() => {
    console.log("Product ID from URL:", id);
    loadProductData();
  }, [id]);

  const loadProductData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const foundProduct = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
      console.log("Found product:", foundProduct);

      if (foundProduct) {
        setProduct(foundProduct);

        const related = MOCK_PRODUCTS.filter(
          (p) =>
            p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id
        ).slice(0, 4);

        setRelatedProducts(related);
      }
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
      setCurrentImageIndex(0);
    }
  };

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle main product favorite toggle
  const handleToggleFavorite = () => {
    toggleFavorite(parseInt(id));
  };

  // Handle related products favorite toggle
  const handleToggleLike = (productId) => {
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

  const handleViewProfile = () => {
    if (product?.seller) {
      alert(`Navigate to ${product.seller.name}'s profile`);
    }
  };

  const handleCall = () => {
    alert("Calling seller...");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-green-800 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-white transition-colors bg-green-800 rounded-full hover:bg-green-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleChat = () => {
    // product & seller data for chat
    navigate(`/chat/${product.id}`, {
      state: {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.images[0],
        sellerId: product.seller.id || 2,
        sellerName: product.seller.name,
      },
    });
  };

  const handleChatRelated = (relatedProduct) => {
    navigate(`/chat/${relatedProduct.id}`, {
      state: {
        productId: relatedProduct.id,
        productName: relatedProduct.name,
        productPrice: relatedProduct.price,
        productImage: relatedProduct.images[0],
        sellerId: relatedProduct.seller?.id || 2,
        sellerName: relatedProduct.seller?.name || "Seller",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="px-4 py-5 sm:px-6 lg:px-36">
        <button
          onClick={handleBack}
          className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg"
        >
          <GoArrowLeft
            size={22}
            className="text-gray-800 transition-colors duration-300 hover:text-green-600"
          />
        </button>
      </div>

      {/* Main Content */}
      <main className="px-4 pb-8 mx-auto max-w-7xl">
        {/* Product Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          {/* Left: Image Carousel */}
          <div className="p-6 bg-white shadow-md rounded-2xl animate-fadeIn">
            <div className="relative group">
              <div className="relative flex items-center justify-center overflow-hidden bg-gray-100 rounded-xl aspect-square">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute p-2 transition-all duration-300 -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute p-2 transition-all duration-300 -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index
                          ? "w-6 bg-gray-800"
                          : "bg-gray-300 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div
            className="p-6 bg-white shadow-md rounded-2xl animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="mb-6 leading-relaxed text-gray-700 whitespace-pre-line">
              {product.description}
            </p>

            <div className="flex items-center justify-between pb-6 mb-6 border-b">
              <div className="text-4xl font-bold text-green-800">
                {product.price}
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  Condition:{" "}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Add to Favorites Button  */}
            <button
              onClick={handleToggleFavorite}
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isFavorite(parseInt(id))
                  ? "bg-green-800 text-white hover:bg-green-700"
                  : "bg-white border-2 border-green-800 text-green-800 hover:bg-green-50"
              }`}
            >
              {isFavorite(parseInt(id)) ? (
                <FaHeart size={20} />
              ) : (
                <FiHeart size={20} />
              )}
              {isFavorite(parseInt(id))
                ? "Added to favorites"
                : "Add to favorites"}
            </button>
          </div>
        </div>

        {/* Seller Info & Actions Section */}
        <div className="grid grid-cols-1 gap-6 mb-12 lg:grid-cols-3">
          <div
            className="flex flex-col items-center p-6 text-center bg-white shadow-md rounded-2xl animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            <img
              src={product.seller.avatar}
              alt={product.seller.name}
              className="w-20 h-20 mb-3 border-4 border-green-100 rounded-full"
            />
            <h3 className="mb-1 text-lg font-bold text-gray-900">
              {product.seller.name}
            </h3>
            <button
              onClick={handleViewProfile}
              className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 hover:underline"
            >
              View profile
            </button>
          </div>

          <div
            className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative flex items-center justify-center w-full h-32 mb-3 overflow-hidden bg-gray-100 rounded-lg">
              <MapPin className="w-16 h-16 text-red-600 animate-bounce" />
              <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-green-50 to-blue-50" />
            </div>
            <h4 className="font-semibold text-gray-900">Location</h4>
            <p className="text-sm text-gray-600">{product.seller.location}</p>
          </div>

          <div
            className="flex flex-col justify-center gap-4 p-6 bg-white shadow-md rounded-2xl animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-3 py-3 font-semibold text-white transition-all duration-300 bg-green-800 rounded-full shadow-md hover:bg-yellow-400 hover:text-black hover:scale-105 hover:shadow-lg"
            >
              <FiPhone size={20} />
              Phone number
            </button>
            <button
              onClick={handleChat}
              className="flex items-center justify-center gap-3 py-3 font-semibold text-white transition-all duration-300 bg-green-800 rounded-full shadow-md hover:bg-yellow-400 hover:text-black hover:scale-105 hover:shadow-lg"
            >
              <BsChatSquareDots size={20} />
              Chat
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fadeIn" style={{ animationDelay: "0.5s" }}>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Related products
            </h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => handleProductClick(relatedProduct.id)}
                  className="relative flex flex-col p-5 transition-all duration-300 bg-white shadow-md cursor-pointer rounded-xl hover:shadow-xl hover:-translate-y-1 group/card"
                >
                  <div className="relative mb-3">
                    <button
                      className="absolute z-10 text-green-800 transition-all duration-200 top-2 right-2 hover:text-yellow-400 hover:scale-125"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLike(relatedProduct.id);
                      }}
                      aria-label="Add to favorites"
                    >
                      {isFavorite(relatedProduct.id) ? (
                        <FaHeart size={20} className="animate-heartBeat" />
                      ) : (
                        <FiHeart size={20} />
                      )}
                    </button>
                    {showMessage[relatedProduct.id]?.visible && (
                      <div className="absolute right-0 z-20 px-3 py-2 text-xs text-white bg-green-600 rounded-lg shadow-lg top-10 animate-slideDown whitespace-nowrap">
                        {showMessage[relatedProduct.id].text}
                      </div>
                    )}
                    <div className="relative flex items-center justify-center w-full h-40 overflow-hidden bg-gray-100 rounded-lg">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover/card:opacity-10" />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="mb-2 text-sm font-semibold text-gray-800 transition-colors duration-200 line-clamp-2 group-hover/card:text-green-800">
                      {relatedProduct.name}
                    </h3>
                    <p className="mb-1 text-xs text-gray-500">
                      {relatedProduct.condition}
                    </p>
                    <p className="mb-3 text-lg font-bold text-green-800">
                      {relatedProduct.price}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCall();
                        }}
                        className="flex items-center justify-center flex-1 py-2 text-white transition-all duration-200 bg-green-800 rounded-full shadow-md hover:bg-yellow-400 hover:text-black hover:shadow-lg hover:scale-105"
                      >
                        <FiPhone size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChatRelated(relatedProduct);
                        }}
                        className="flex items-center justify-center flex-1 py-2 text-white transition-all duration-200 bg-green-800 rounded-full shadow-md hover:bg-yellow-400 hover:text-black hover:shadow-lg hover:scale-105"
                      >
                        <BsChatSquareDots size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

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

export default ProductDetails;
