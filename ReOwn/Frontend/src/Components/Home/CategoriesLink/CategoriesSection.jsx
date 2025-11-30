import React from 'react'
import {
  MdKitchen,
  MdDevices,
  MdSportsBasketball,
  MdChildCare,
} from "react-icons/md";
import { GiClothes, GiBookshelf, GiSofa } from "react-icons/gi";

import { useNavigate } from 'react-router-dom';

function CategoriesSection() {
const navigate = useNavigate();
  // Categories with icons
    const categories = [
      {
        id: 1,
        name: "Home & Kitchen",
        icon: MdKitchen,
        gradient: "from-orange-400 to-red-500",
      },
      {
        id: 2,
        name: "Clothes & Accessories",
        icon: GiClothes,
        gradient: "from-pink-400 to-purple-500",
      },
      {
        id: 3,
        name: "Electronics & Gadgets",
        icon: MdDevices,
        gradient: "from-blue-400 to-indigo-500",
      },
      {
        id: 4,
        name: "Books & Games",
        icon: GiBookshelf,
        gradient: "from-yellow-400 to-orange-500",
      },
      {
        id: 5,
        name: "Home Decors & Gifts",
        icon: GiSofa,
        gradient: "from-green-400 to-teal-500",
      },
      {
        id: 6,
        name: "Baby & Kids Items",
        icon: MdChildCare,
        gradient: "from-purple-400 to-pink-500",
      },
      {
        id: 7,
        name: "Sports & Hobbies",
        icon: MdSportsBasketball,
        gradient: "from-cyan-400 to-blue-500",
      },
    ];
  return (
    <>
      {/* Categories Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-green-800 transition-all duration-200 border-b-4 border-green-800 cursor-default w-44 hover:border-yellow-400">
              Categories
            </h2>
            <p className="mt-2 text-gray-600">Explore our diverse collection</p>
          </div>
          <button
          onClick={() => navigate("/categories")}
           className="text-green-800 transition-colors duration-200 hover:text-yellow-600 ">
            View more →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="relative flex flex-col items-center justify-center p-6 transition-all duration-300 bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-2 group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                ></div>

                <div
                  className={`mb-3 text-5xl text-green-800 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                >
                  <IconComponent />
                </div>

                <h3 className="text-sm font-semibold text-center text-gray-800 transition-colors duration-200 group-hover:text-green-800">
                  {category.name}
                </h3>

                <div className="absolute top-0 right-0 w-20 h-20 transition-opacity duration-300 bg-yellow-300 rounded-full opacity-0 -z-10 group-hover:opacity-20 blur-2xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default CategoriesSection ;