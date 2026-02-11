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
      <div className="relative bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-[2rem] max-w-[280px] w-full text-center space-y-4 border-2 border-white/70
        shadow-[0_35px_70px_-15px_rgba(0,0,0,0.35),inset_0_10px_15px_rgba(255,255,255,1),inset_0_-10px_15px_rgba(0,0,0,0.08)]"> 
        
        {/* Red X Close Button */}
        <button
          onClick={onReject}
          className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg
          shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Close"
        >
          ✕
        </button>
        
        <div className="flex flex-col items-center space-y-1">
          <div className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>⚠️</div>
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-tighter">Warning!</h2>
        </div>
        
        <p className="text-gray-600 font-bold text-xs leading-relaxed px-1">
          {currentWarning}
        </p>
        
        <div className="flex flex-col gap-3 pt-3">
          {/* Main Button with Inflated Effect */}
          <button 
            onClick={onReject}
            className="w-full py-3 bg-gradient-to-b from-red-400 to-red-600 text-white rounded-full font-black text-xs uppercase tracking-wider
            transition-all duration-300 active:scale-95 hover:scale-105
            shadow-[0_12px_25px_-7px_rgba(220,38,38,0.5),inset_0_-6px_8px_rgba(0,0,0,0.25),inset_0_6px_8px_rgba(255,255,255,0.4)]"
          >
            REJECT 🛑
          </button>
          
          <button 
            onClick={onContinue}
            className="w-full py-2 text-gray-400 font-bold text-[9px] hover:text-gray-600 transition-colors uppercase tracking-widest"
          >
            Continue...
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopover;
