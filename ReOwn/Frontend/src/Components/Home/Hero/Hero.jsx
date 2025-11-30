import React from 'react'
import { FaHeart, FaRecycle, FaHandHoldingHeart, FaLeaf } from "react-icons/fa";
import { FiHeart, FiPhone, FiArrowRight } from "react-icons/fi";
import HandToHand from "../../../assets/HandToHand.png";
import { useNavigate } from 'react-router-dom';
function Hero() {
  const navigate = useNavigate();

  return (
    <>
    {/* Hero Section */}
          <div className="relative px-4 py-16 overflow-hidden sm:px-6 lg:px-8">
            <div className="absolute top-0 right-0 w-64 h-64 -mt-32 -mr-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 -mb-48 -ml-48 bg-green-300 rounded-full w-96 h-96 opacity-10 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
    
            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              {/* Left Content */}
              <div className="space-y-6 animate-slideInLeft">
                <div className="flex items-center gap-2 text-green-800">
                  <FaLeaf className="text-2xl animate-bounce" />
                  <span className="text-sm font-semibold tracking-wider uppercase">
                    Sustainable Living
                  </span>
                </div>
    
                <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Give Your Items a{" "}
                  <span className="relative">
                    <span className="relative z-10 text-green-800">New Home</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-300 -rotate-1"></span>
                  </span>
                </h1>
    
                <p className="text-lg text-gray-600 sm:text-xl">
                  Transform pre-loved treasures into someone's new favorite. Buy and
                  sell quality used items while making a positive impact on our
                  planet.
                </p>
    
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                      <FaRecycle className="text-2xl text-green-800" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Eco-Friendly</p>
                      <p className="text-sm text-gray-600">Reduce waste</p>
                    </div>
                  </div>
    
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
                      <FaHandHoldingHeart className="text-2xl text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Save Money</p>
                      <p className="text-sm text-gray-600">Great deals</p>
                    </div>
                  </div>
                </div>
                <button 
                onClick={() => navigate("/categories")}

                className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-green-800 rounded-full shadow-xl hover:bg-yellow-400 hover:text-black hover:shadow-2xl hover:scale-105 group">
                  Shop Now
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </div>
    
              {/* Right Illustration */}
              <div className="relative flex items-center justify-center animate-slideInRight">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                    <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-br from-green-200 to-yellow-200 animate-spin-slow"></div>
                    <div className="relative z-10 text-center">
                      <div className="flex justify-center gap-4 text-5xl">
                        <span
                          className="animate-float"
                          style={{ animationDelay: "0.2s" }}
                        >
                          <img src={HandToHand} alt="Hand to Hand" className="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
    
    </>
  )
}

export default Hero