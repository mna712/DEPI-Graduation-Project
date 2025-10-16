import React from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 60"
        className="w-40 h-20"
      >

        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#7c3aed" /> 
            <stop offset="30%" stopColor="#3b82f6" />  
            <stop offset="60%" stopColor="#ec4899" />  
            <stop offset="100%" stopColor="#22c55e" /> 
          </linearGradient>
        </defs>

        <text x="0" y="10" className="logo-text">
          ReOwn
        </text>
      </svg>
    </div>
  );
};

export default Logo;
