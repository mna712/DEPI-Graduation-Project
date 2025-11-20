import React from 'react';

export default function MainSlider() {
  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-4 sm:px-8">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between p-10 lg:p-20 gap-12 lg:gap-20">
<div className="flex flex-col justify-end items-end h-full text-right flex-1 order-2 lg:order-1">
  <h1 className="text-8xl lg:text-9xl font-black text-gray-900 leading-none mb-6">ReOwn</h1>
  <p className="text-3xl lg:text-4xl text-gray-600 mb-10 leading-snug">Give your items a new home</p>
  <button className="bg-[#047857] hover:bg-[#036943] active:bg-[#035233] text-white font-semibold text-xl lg:text-2xl px-12 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
    Shop Now
  </button>
</div>


          <div className="w-full lg:w-auto order-1 lg:order-2">
            <img
              src="public\images\semlogo.png"
              className="w-full max-w-md lg:max-w-lg xl:max-w-2xl mx-auto drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
