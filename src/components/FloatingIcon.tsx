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
      <div className="relative w-80 h-80 sm:w-72 sm:h-72 bg-gradient-to-b from-red-400 via-red-500 to-red-700 rounded-full flex items-center justify-center ring-12 ring-red-100/70 border-6 border-red-500
        shadow-[0_40px_80px_-20px_rgba(220,38,38,0.5),0_0_0_8px_rgba(255,255,255,0.3),inset_0_-25px_40px_rgba(0,0,0,0.3),inset_0_25px_40px_rgba(255,255,255,0.6)]">
        
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
        <div className="absolute top-6 right-6 bg-gradient-to-b from-red-500 via-red-600 to-red-700 text-white text-3xl font-black px-7 py-4 rounded-full border-4 border-red-800 shadow-[0_12px_25px_-8px_rgba(220,38,38,0.6),inset_0_-6px_10px_rgba(0,0,0,0.4),inset_0_6px_10px_rgba(255,255,255,0.4)] animate-pulse scale-125">
          1000+
        </div>

        {/* Glossy shine overlay */}
        <div className="absolute top-12 left-12 w-20 h-12 bg-white/30 rounded-full blur-2xl -rotate-45 opacity-80"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent"></div>
      </div>
      
      {/* Visual Instruction */}
      <p className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-red-600 font-bold text-2xl drop-shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        Click to Open! ✨
      </p>
    </div>
  );
};

export default FloatingIcon;
