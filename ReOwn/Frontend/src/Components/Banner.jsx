import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import KitchenTool from "../assets/product_img/kitchen_tool.png";
import HeadPhone from "../assets/product_img/headPhone.png";
import Shoses from "../assets/product_img/shoses.png";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: 'Give Your Items a Second Life',
      description: 'Buy smart, save more. High-quality pre-owned items waiting for their next home.',
      image: KitchenTool ,
      bgColor: 'bg-amber-100',
      imageRotation: 'rotate-[35deg]'
    },
    {
      id: 2,
      title: 'Fresh Finds Every Day',
      description: 'Handpicked pre-loved items in great condition.\nYour next favorite piece might be right here.',
      image:  HeadPhone,
      bgColor: 'bg-rose-100',
      imageRotation: 'rotate-[-15deg]'
    },
    {
      id: 3,
      title: 'Discover Your Next Treasure',
      description: 'Explore electronics, fashion, furniture, books, and more.\nAll in one clean, simple marketplace.',
      image: Shoses,
      bgColor: 'bg-blue-100',
      imageRotation: 'rotate-[10deg]'
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  //carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="px-4 mt-4 sm:px-6 lg:px-8">
      <div className="relative w-full overflow-hidden shadow-lg rounded-2xl group">
        {/* Slides Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-full flex-shrink-0 ${slide.bgColor} transition-all duration-500`}
            >
              <div className="flex flex-col items-center justify-between gap-8 p-8 lg:flex-row lg:gap-16 lg:px-16 lg:py-12">
                {/* Text Content */}
                <div 
                  className={`flex-1 text-center lg:text-left lg:pl-4 transition-all duration-700 ${
                    currentSlide === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: currentSlide === index ? '200ms' : '0ms' }}
                >
                  <h3 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl animate-slideInLeft">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-700 whitespace-pre-line sm:text-xl lg:text-2xl animate-slideInLeft" style={{ animationDelay: '100ms' }}>
                    {slide.description}
                  </p>
                  <button className="px-8 py-3 mt-6 font-semibold text-white transition-all duration-300 bg-gray-800 rounded-full hover:bg-gray-700 hover:scale-105 hover:shadow-lg animate-slideInLeft" style={{ animationDelay: '200ms' }}>
                    Shop Now
                  </button>
                </div>

                {/* Image */}
                <div 
                  className={`flex items-center justify-center flex-shrink-0 lg:pr-4 transition-all duration-700 ${
                    currentSlide === index 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-0 translate-x-8 scale-95'
                  }`}
                  style={{ transitionDelay: currentSlide === index ? '300ms' : '0ms' }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white/30 blur-3xl animate-pulse"></div>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={`relative w-48 h-48 object-contain ${slide.imageRotation} sm:w-56 sm:h-56 lg:w-72 lg:h-72 transition-transform duration-500 hover:scale-110`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute p-2 transition-all duration-300 -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100 hover:scale-110 disabled:opacity-50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute p-2 transition-all duration-300 -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100 hover:scale-110 disabled:opacity-50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? 'w-8 h-3 bg-gray-800'
                  : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300/50">
          <div
            className="h-full transition-all duration-300 bg-gray-800 animate-progress"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-progress {
          animation: progress 5s linear;
        }

        @media (max-width: 640px) {
          .animate-slideInLeft {
            animation-duration: 0.4s;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;