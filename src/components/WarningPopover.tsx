'use client';

import React from 'react';

interface WarningPopoverProps {
  count: number;
  onContinue: () => void;
  onReject: () => void;
}

const WarningPopover: React.FC<WarningPopoverProps> = ({ count, onContinue, onReject }) => {
  const warnings = [
    "Wait! Are you sure? This could be the worst decision of your life!",
    "His steakhouse probably has zero atmosphere. Don't do it!",
    "100 roses? That's just showing off. It's totally fake!",
    "Are you still clicking continue? Your heart knows better than this!",
    "Just look at Bhenny's 1000+ unread messages. He's clearly the one!",
    "Okay, seriously, stop. Reject this man already!"
  ];

  const currentWarning = warnings[Math.min(count, warnings.length - 1)];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500 p-4">
      {/* 3D Inflated Pop-over Container */}
      <div className="relative bg-gradient-to-b from-white to-gray-100 p-8 sm:p-10 rounded-3xl max-w-sm w-full text-center space-y-6 border-4 border-gray-200
        shadow-2xl"> 
        
        {/* Red X Close Button */}
        <button
          onClick={onReject}
          className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg
          shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Close"
        >
          ✕
        </button>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>⚠️</div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-wider">Warning!</h2>
        </div>
        
        <p className="text-gray-700 font-bold text-sm leading-loose px-2">
          {currentWarning}
        </p>
        
        <div className="flex flex-col gap-4 pt-4">
          {/* Main Button with Inflated Effect */}
          <button 
            onClick={onReject}
            className="w-full py-4 bg-gradient-to-b from-red-400 to-red-600 text-white rounded-full font-black text-sm uppercase tracking-wider
            transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-red-700
            shadow-lg"
          >
            REJECT 🛑
          </button>
          
          <button 
            onClick={onContinue}
            className="w-full py-3 text-gray-500 font-bold text-xs hover:text-gray-700 transition-colors uppercase tracking-widest border-b-2 border-gray-300"
          >
            Continue...
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopover;
