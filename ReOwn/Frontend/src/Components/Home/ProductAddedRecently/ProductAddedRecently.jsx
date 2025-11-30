import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiPhone, FiArrowRight } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../../Context/FavoritesContext";

function ProductAddedRecently() {
  
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showMessage, setShowMessage] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Mock Recently Added Products
  const MOCK_PRODUCTS = [
    {
      id: 1,
      name: "iPhone 13 Pro Max - 256GB Gold Edition",
      price: "30,500 EGP",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
      sellerId: 2,
      sellerName: "Ahmed"
    },
    {
      id: 2,
      name: "Samsung Galaxy S21 Ultra",
      price: "25,000 EGP",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
      sellerId: 3,
      sellerName: "Mona"
    },
    {
      id: 3,
      name: "MacBook Pro 14 inch M1 Pro",
      price: "45,000 EGP",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      sellerId: 4,
      sellerName: "Omar"
    },
    {
      id: 4,
      name: "iPad Air 5th Generation",
      price: "20,000 EGP",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      sellerId: 2,
      sellerName: "Ahmed"
    },
    {
      id: 5,
      name: "AirPods Pro 2nd Generation",
      price: "8,500 EGP",
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop",
      sellerId: 5,
      sellerName: "Sara"
    },
    {
      id: 6,
      name: "Apple Watch Series 7 GPS",
      price: "12,000 EGP",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop",
      sellerId: 3,
      sellerName: "Mona"
    },
    {
      id: 7,
      name: "Sony WH-1000XM4 Headphones",
      price: "9,800 EGP",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop",
      sellerId: 6,
      sellerName: "Khaled"
    },
    {
      id: 8,
      name: "Nintendo Switch OLED",
      price: "15,000 EGP",
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
      sellerId: 7,
      sellerName: "Yasmin"
    },
  ];

  useEffect(() => {
    loadProducts();
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const updateItemsPerPage = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerPage(4);
    } else if (window.innerWidth >= 640) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(1);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
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

  const handleChat = (product) => {
    navigate(`/chat/${product.id}`, {
      state: {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        sellerId: product.sellerId,
        sellerName: product.sellerName
      }
    });
  };

  const handleProductClick = (productId) => {
    console.log("Navigating to product:", productId);
    navigate(`/product/${productId}`);
  };

  const handleViewAllProducts = () => {
    console.log("Navigating to all products");
    navigate('/product');
  };

  const nextSlide = () => {
    if (currentIndex < products.length - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <>
      {/* Recently Added Products Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-green-800 transition-all duration-200 border-b-4 border-green-800 cursor-default w-72 hover:border-yellow-400">
              Recently Added
            </h2>
            <p className="mt-2 text-gray-600">Fresh items just listed</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-green-800 rounded-full border-t-transparent animate-spin"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="mb-6">
              <button
                onClick={handleViewAllProducts}
                className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 bg-green-800 rounded-full shadow-md hover:bg-yellow-400 hover:text-black hover:shadow-lg hover:scale-105"
              >
                View More
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Products Carousel */}
            <div className="overflow-hidden">
              <div
                className="grid w-full grid-cols-1 gap-5 transition-transform duration-500 ease-in-out sm:grid-cols-2 lg:grid-cols-4"
                style={{ transform: `translateX(0)` }}
              >
                {visibleProducts.map((product, index) => (
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
                            handleChat(productproduct);
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
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({
                length: Math.ceil(products.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerPage) === index
                      ? "w-8 bg-green-800"
                      : "w-2 bg-gray-300 hover:bg-green-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
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

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-heartBeat {
          animation: heartBeat 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}

export default ProductAddedRecently;