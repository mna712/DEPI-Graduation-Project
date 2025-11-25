// import React, { useState, useRef } from 'react';
// import { Search, Bell, User, ChevronRight, ChevronLeft, Link } from 'lucide-react';
// import { FaHeart } from 'react-icons/fa';
// import { FiHeart, FiPhone } from 'react-icons/fi';
// import { BsChatSquareDots } from 'react-icons/bs';
// import Banner from '../Banner';
// import Search_Arrow from '../Search_Arrow';

// const Categories = () => {
//   const [likedProducts, setLikedProducts] = useState({});
//   const [showMessage, setShowMessage] = useState({});
//   const carouselRefs = useRef({});

//   //  Category
//   const categories = [
//     {
//       id: 1,
//       name: 'Electronics',
//       products: [
//         {
//           id: 1,
//           name: 'iPhone 13 Pro Max',
//           price: '30,500 EGP',
//           image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400'
//         },
//         {
//           id: 2,
//           name: 'Samsung Galaxy S21',
//           price: '25,000 EGP',
//           image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop'
//         },
//         {
//           id: 3,
//           name: 'MacBook Pro 14',
//           price: '45,000 EGP',
//           image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
//         },
//         {
//           id: 4,
//           name: 'iPad Air',
//           price: '20,000 EGP',
//           image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop'
//         },
//         {
//           id: 5,
//           name: 'AirPods Pro',
//           price: '8,500 EGP',
//           image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop'
//         },
//         {
//           id: 6,
//           name: 'Apple Watch Series 7',
//           price: '12,000 EGP',
//           image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop'
//         }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Fashion',
//       products: [
//         {
//           id: 7,
//           name: 'Summer Dress Collection',
//           price: '1,200 EGP',
//           image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop'
//         },
//         {
//           id: 8,
//           name: 'Casual Shirt Premium',
//           price: '800 EGP',
//           image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop'
//         },
//         {
//           id: 9,
//           name: 'Sport Sneakers Nike',
//           price: '2,500 EGP',
//           image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
//         },
//         {
//           id: 10,
//           name: 'Leather Handbag',
//           price: '1,800 EGP',
//           image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop'
//         },
//         {
//           id: 11,
//           name: 'Classic Watch',
//           price: '3,200 EGP',
//           image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
//         }
//       ]
//     },
//     {
//       id: 3,
//       name: 'Home & Kitchen',
//       products: [
//         {
//           id: 12,
//           name: 'Coffee Maker Deluxe',
//           price: '1,500 EGP',
//           image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop'
//         },
//         {
//           id: 13,
//           name: 'Professional Blender',
//           price: '900 EGP',
//           image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop'
//         },
//         {
//           id: 14,
//           name: 'Air Fryer XL',
//           price: '2,200 EGP',
//           image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop'
//         },
//         {
//           id: 15,
//           name: 'Robot Vacuum Cleaner',
//           price: '3,500 EGP',
//           image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop'
//         },
//         {
//           id: 16,
//           name: 'Pressure Cooker',
//           price: '1,100 EGP',
//           image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop'
//         },
//         {
//           id: 17,
//           name: 'Stand Mixer',
//           price: '2,800 EGP',
//           image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop'
//         }
//       ]
//     }
//   ];

//   const toggleLike = (productId) => {
//     setLikedProducts(prev => ({
//       ...prev,
//       [productId]: !prev[productId]
//     }));

//     const isLiked = !likedProducts[productId];
//     setShowMessage(prev => ({
//       ...prev,
//       [productId]: {
//         visible: true,
//         text: isLiked ? "Added to favorites" : "Removed from favorites",
//       }
//     }));

//     setTimeout(() => {
//       setShowMessage(prev => ({
//         ...prev,
//         [productId]: { ...prev[productId], visible: false }
//       }));
//     }, 2000);
//   };

//   const handleViewMore = (categoryName) => {
//     <Link to={`/product`}/>
//   };

//   const scroll = (categoryId, direction) => {
//     const container = carouselRefs.current[categoryId];
//     if (container) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Search_Arrow/>
//       <Banner/>
      

//       {/* Categories Content */}
//       <main className="px-4 py-4 pb-8 mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
//         {categories.map((category) => (
//           <div key={category.id} className="mb-12">
//             {/* Category Header */}
//             <div className="flex items-center justify-between mb-6 ">
//                <h2 className="pb-1 text-2xl font-bold text-green-800 transition-all duration-200 border-b-4 border-green-800 sm:text-3xl hover:border-green-500">
//                 {category.name}
//               </h2>
              
//               <button
//                 onClick={() => handleViewMore(category.name)}
//                 className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
//               >
//                 <ChevronRight className="w-4 h-4 " />
//                 View more
//               </button>
             
//             </div>

//             {/* Carousel Container */}
//             <div className="relative group">
//               {/* Previous Button */}
//               <button
//                 onClick={() => scroll(category.id, 'left')}
//                 className="absolute right-0 z-10 p-2 -mr-4 transition-opacity duration-300 -translate-y-1/2 rounded-full shadow-lg opacity-0 top-1/2 bg-white/90 hover:bg-yellow-400 group-hover:opacity-100"
//               >
//                 <ChevronRight className="w-6 h-6 text-gray-700" />
//               </button>

//               {/* Products Carousel */}
//               <div
//                 ref={(el) => (carouselRefs.current[category.id] = el)}
//                 className="flex gap-5 pb-4 overflow-x-auto scrollbar-hide scroll-smooth"
//                 style={{
//                   scrollbarWidth: 'none',
//                   msOverflowStyle: 'none'
//                 }}
//               >
//                 {category.products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex-shrink-0 w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]"
//                   >
//                     <div className="relative flex flex-col h-full p-5 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
//                       {/* Heart Icon */}
//                       <div className="relative mb-3">
//                         <button
//                           className="absolute z-10 text-green-800 transition-colors duration-200 top-2 right-2 hover:text-yellow-400"
//                           onClick={() => toggleLike(product.id)}
//                         >
//                           {likedProducts[product.id] ? (
//                             <FaHeart size={24} />
//                           ) : (
//                             <FiHeart size={24} />
//                           )}
//                         </button>
//                         {showMessage[product.id]?.visible && (
//                           <div className="absolute right-0 z-20 px-3 py-2 text-sm text-white bg-green-600 rounded-lg shadow-lg top-12 animate-fade-in whitespace-nowrap">
//                             {showMessage[product.id].text}
//                           </div>
//                         )}
//                         {/* Product Image */}
//                         <div className="flex items-center justify-center w-full overflow-hidden bg-gray-100 rounded-lg h-52">
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                             className="object-cover w-full h-full"
//                           />
//                         </div>
//                       </div>
//                       {/* Product Info */}
//                       <div className="flex flex-col flex-1">
//                         <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">
//                           {product.name}
//                         </h3>
//                         <p className="mb-4 text-xl font-bold text-green-800">
//                           {product.price}
//                         </p>
//                         {/* Buttons */}
//                         <div className="flex gap-3 mt-auto">
//                           <button className="flex items-center justify-center flex-1 py-2.5 text-white transition-all duration-200 bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black shadow-md hover:shadow-lg">
//                             <FiPhone size={20} />
//                           </button>
//                           <button className="flex items-center justify-center flex-1 py-2.5 text-white transition-all duration-200 bg-green-800 rounded-full hover:bg-yellow-400 hover:text-black shadow-md hover:shadow-lg">
//                             <BsChatSquareDots size={20} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Next Button */}
//               <button
//                 onClick={() => scroll(category.id, 'right')}
//                 className="absolute left-0 z-10 p-2 -ml-4 transition-opacity duration-300 -translate-y-1/2 rounded-full shadow-lg opacity-0 top-1/2 bg-white/90 hover:bg-yellow-400 group-hover:opacity-100"
//               >
//                 <ChevronLeft className="w-6 h-6 text-gray-700" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </main>

//       {/* <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }
//       `}</style> */}
//     </div>
//   );
// };

// export default Categories;






import React, { useState, useRef } from 'react';
import Banner from '../Banner';
import Search_Arrow from '../Search_Arrow';
import All_Category from '../All_Category';

const Categories = () => {


  return (
    <div className="min-h-screen bg-gray-50">
      <Search_Arrow/>
      <Banner/>
      <All_Category/>
     
    </div>
  );
};

export default Categories;
