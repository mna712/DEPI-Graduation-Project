import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function Search_Arrow() {
  const navigate = useNavigate(); 

  return (
    <>
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-full gap-3">
          {/* ArrowLeft */}
          <button
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg"
          >
            <GoArrowLeft
              size={22}
              className="text-gray-800 transition-colors duration-300 hover:text-green-600"
            />
          </button>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search categories ..."
            className="flex-1 w-full max-w-md px-6 py-3 transition-all duration-300 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 hover:border-gray-300"
          />
        </div>
      </div>
    </>
  );
}

export default Search_Arrow;