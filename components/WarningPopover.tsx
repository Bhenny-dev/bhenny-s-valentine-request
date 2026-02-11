
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
      <div className="bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-[2rem] max-w-[320px] w-full text-center space-y-5 border border-white/50
        shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3),inset_0_8px_12px_rgba(255,255,255,1),inset_0_-8px_12px_rgba(0,0,0,0.05)]">
        
        <div className="flex flex-col items-center space-y-2">
          <div className="text-4xl animate-bounce" style={{ animationDuration: '2s' }}>⚠️</div>
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Warning!</h2>
        </div>
        
        <p className="text-gray-600 font-bold text-sm leading-relaxed px-2">
          {currentWarning}
        </p>
        
        <div className="flex flex-col gap-3 pt-2">
          {/* Main Button with Inflated Effect */}
          <button 
            onClick={onReject}
            className="w-full py-3 bg-gradient-to-b from-red-400 to-red-600 text-white rounded-full font-black text-sm uppercase tracking-wider
            transition-all duration-300 active:scale-95
            shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2),inset_0_4px_6px_rgba(255,255,255,0.3)]"
          >
            REJECT IMMEDIATELY 🛑
          </button>
          
          <button 
            onClick={onContinue}
            className="w-full py-1 text-gray-400 font-bold text-[10px] hover:text-gray-600 transition-colors uppercase tracking-widest"
          >
            Continue anyway...
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopover;
