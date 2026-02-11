'use client';

import React from 'react';

interface FloatingIconProps {
  onClick: () => void;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ onClick }) => {
  return (
    <div 
      className="relative cursor-pointer group animate-float transition-all duration-300 hover:scale-110 active:scale-95 z-50 mx-6"
      onClick={onClick}
    >
      {/* 3D Inflated Effect with Enhanced Depth */}
      <div className="relative w-80 h-80 sm:w-72 sm:h-72 bg-gradient-to-b from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl ring-12 ring-red-100/70 border-4 border-red-400">
        
        {/* Bigger internal icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-28 h-28 drop-shadow-2xl"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>

      {/* 1000+ Indicator Badge - Proportional to bigger icon */}
        <div className="absolute top-4 right-4 bg-gradient-to-b from-red-600 to-red-700 text-white text-2xl font-black px-6 py-3 rounded-full border-4 border-white shadow-2xl animate-pulse scale-125">
          1000+
        </div>

        {/* Glossy shine overlay */}
        <div className="absolute top-8 left-8 w-16 h-8 bg-white/20 rounded-full blur-xl -rotate-45"></div>
      </div>
      
      {/* Visual Instruction */}
      <p className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-red-600 font-bold text-2xl drop-shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        Click to Open! ✨
      </p>
    </div>
  );
};

export default FloatingIcon;
