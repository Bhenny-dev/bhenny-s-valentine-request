
import React, { RefObject } from 'react';
import { Message } from '../types';

interface MessageCardProps {
  message: Message;
  onYes: () => void;
  onNo: () => void;
  noButtonPos: { x: number; y: number };
  isNoFleeing: boolean;
  yesButtonScale: number;
  yesButtonRef: RefObject<HTMLButtonElement>;
  noButtonInitialRef: RefObject<HTMLButtonElement>;
  timeStats?: {
    years: string;
    months: string;
    weeks: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}

const MessageCard: React.FC<MessageCardProps> = ({ 
  message, 
  onYes, 
  onNo, 
  noButtonPos, 
  isNoFleeing,
  yesButtonScale,
  yesButtonRef,
  noButtonInitialRef,
  timeStats
}) => {
  const renderBhennyMessage = () => {
    if (!timeStats) return null;
    return (
      <p className="text-gray-700 leading-relaxed text-base sm:text-lg italic font-serif">
        "We’ve come such a long way together. It’s been <span className="glowing-number">{timeStats.years}</span> years, <span className="glowing-number">{timeStats.months}</span> months, <span className="glowing-number">{timeStats.weeks}</span> weeks, <span className="glowing-number">{timeStats.days}</span> days, <span className="glowing-number">{timeStats.hours}</span> hours, <span className="glowing-number">{timeStats.minutes}</span> minutes, and <span className="glowing-number">{timeStats.seconds}</span> seconds since the day you said “yes” to being my partner. Every moment has been a gift, and I’m grateful for the love and memories we’ve shared. May we continue to grow together, creating even more beautiful chapters in our story."
      </p>
    );
  };

  return (
    <div className="relative z-10 w-full max-w-lg mx-auto my-4 animate-in fade-in zoom-in duration-1000 px-4 flex items-center justify-center">
      <div className="relative bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-[0_15px_40px_rgba(252,165,165,0.4)] border-x-4 border-t-4 border-b-[10px] border-red-50 flex flex-col items-center text-center space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <div className="flex flex-col items-center pt-2">
          <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-1">A letter from</span>
          <h2 className="text-5xl sm:text-7xl font-cursive font-bold text-red-500 drop-shadow-sm leading-none px-2 py-1">
            {message.sender}
          </h2>
        </div>

        <div className="bg-pink-50/50 p-4 sm:p-6 rounded-3xl border border-pink-100 w-full">
          {message.isBhenny ? renderBhennyMessage() : (
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg italic font-serif">
              "{message.content}"
            </p>
          )}
        </div>

        {message.isBhenny && (
          <div className="pt-2 border-t border-pink-100 w-full">
            <h3 className="text-xl sm:text-2xl font-black text-red-600 animate-pulse tracking-wide uppercase">
              Will you be my Valentine? ❤️
            </h3>
          </div>
        )}

        <div className={`flex flex-col sm:flex-row items-center pt-2 w-full gap-4 sm:gap-6 relative justify-center`}>
          <div className="relative flex items-center justify-center">
            {message.isBhenny && yesButtonScale > 1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                <div className="w-14 h-14 rounded-full border-2 border-red-400/40 animate-ping opacity-75" style={{ animationDuration: '4s' }}></div>
              </div>
            )}
            
            <button
              ref={yesButtonRef}
              onClick={onYes}
              style={{ transform: `scale(${yesButtonScale})` }}
              className={`
                px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-b from-red-400 to-red-600 text-white rounded-full font-black text-xl sm:text-2xl
                transition-all duration-300 active:scale-90 z-20 whitespace-nowrap
                shadow-[0_12px_24px_-8px_rgba(220,38,38,0.6),inset_0_-8px_10px_rgba(0,0,0,0.3),inset_0_8px_10px_rgba(255,255,255,0.4)]
                hover:shadow-[0_15px_30px_-8px_rgba(220,38,38,0.7),inset_0_-8px_10px_rgba(0,0,0,0.3),inset_0_8px_10px_rgba(255,255,255,0.5)]
                ${message.isBhenny ? 'ring-4 ring-red-100 ring-offset-2 ring-offset-white' : ''}
              `}
            >
              YES!
            </button>
          </div>

          <button
            ref={noButtonInitialRef}
            onClick={onNo}
            style={message.isBhenny && isNoFleeing ? {
              position: 'fixed',
              left: `${noButtonPos.x}px`,
              top: `${noButtonPos.y}px`,
              zIndex: 100,
              pointerEvents: 'auto',
              transition: 'all 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
              width: '140px'
            } : { width: 'auto' }}
            className={`
              px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-500 rounded-full font-black text-xl sm:text-2xl
              transition-all duration-300 active:scale-95
              shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1),inset_0_-8px_10px_rgba(0,0,0,0.1),inset_0_8px_10px_rgba(255,255,255,0.6)]
              ${message.isBhenny && isNoFleeing ? 'cursor-default' : ''}
            `}
          >
            No...
          </button>
        </div>
        
        <div className="pt-2 text-[10px] text-red-200 font-bold uppercase tracking-widest">
           {message.isBhenny ? "The Final Decision" : `Message ${message.id} of 1000+`}
        </div>
      </div>
      <div className="absolute -bottom-4 left-10 right-10 h-8 bg-white/40 rounded-[2rem] -z-10 shadow-lg blur-[1px]"></div>
    </div>
  );
};

export default MessageCard;
