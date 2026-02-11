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
      <div className="relative bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6 rounded-[2rem] max-w-[260px] w-full text-center space-y-3 border border-white/50
        shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3),inset_0_8px_12px_rgba(255,255,255,1),inset_0_-8px_12px_rgba(0,0,0,0.05)]">
        
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
        
        <div className="flex flex-col gap-2 pt-1">
          {/* Main Button with Inflated Effect */}
          <button 
            onClick={onReject}
            className="w-full py-2 bg-gradient-to-b from-red-400 to-red-600 text-white rounded-full font-black text-xs uppercase tracking-wider
            transition-all duration-300 active:scale-95
            shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2),inset_0_4px_6px_rgba(255,255,255,0.3)]"
          >
            REJECT 🛑
          </button>
          
          <button 
            onClick={onContinue}
            className="w-full py-1 text-gray-400 font-bold text-[9px] hover:text-gray-600 transition-colors uppercase tracking-widest"
          >
            Continue...
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopover;
