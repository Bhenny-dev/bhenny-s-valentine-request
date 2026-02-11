'use client';

import React, { RefObject } from 'react';
import { Message } from '../types';

interface MessageCardProps {
  message: Message;
  onYes: () => void;
  onNo: () => void;
  noButtonPos: { x: number; y: number };
  isNoFleeing: boolean;
  yesButtonScale: number;
  yesButtonRef: React.RefObject<HTMLButtonElement | null>;
  noButtonInitialRef: React.RefObject<HTMLButtonElement | null>;
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
        "We've come such a long way together. It's been <span className="glowing-number">{timeStats.years}</span> years, <span className="glowing-number">{timeStats.months}</span> months, <span className="glowing-number">{timeStats.weeks}</span> weeks, <span className="glowing-number">{timeStats.days}</span> days, <span className="glowing-number">{timeStats.hours}</span> hours, <span className="glowing-number">{timeStats.minutes}</span> minutes, and <span className="glowing-number">{timeStats.seconds}</span> seconds since the day you said "yes" to being my partner. Every moment has been a gift, and I'm grateful for the love and memories we've shared. May we continue to grow together, creating even more beautiful chapters in our story."
      </p>
    );
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-3 sm:px-6 animate-in fade-in zoom-in duration-1000 flex items-center justify-center my-8">
      <div className="relative bg-gradient-to-b from-white via-red-50/30 to-red-100/20 p-10 sm:p-20 rounded-4xl border-4 sm:border-6 border-red-400 m-4 flex flex-col items-center text-center space-y-10 sm:space-y-12 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-[0_30px_70px_-15px_rgba(220,38,38,0.35),inset_0_-20px_40px_rgba(0,0,0,0.06),inset_0_20px_40px_rgba(255,255,255,0.9)]">
        
        <div className="flex flex-col items-center pt-6 pb-4 space-y-4 w-full">
          <span className="text-gray-600 text-xs sm:text-sm uppercase tracking-widest font-bold letter-spacing-md">A Letter From</span>
          <h2 className="text-7xl sm:text-8xl font-cursive font-bold text-red-600 drop-shadow-lg leading-tight px-6 break-words">
            {message.sender}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-pink-100 via-pink-50 to-white p-10 sm:p-14 rounded-3xl border-4 border-pink-400 w-full mx-6 my-4 shadow-[0_15px_40px_-10px_rgba(236,72,153,0.3),inset_0_-10px_20px_rgba(0,0,0,0.04),inset_0_10px_20px_rgba(255,255,255,0.95)]">
          {message.isBhenny ? renderBhennyMessage() : (
            <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-serif">
              "{message.content}"
            </p>
          )}
        </div>

        {message.isBhenny && (
          <div className="pt-8 pb-6 border-t-4 border-pink-400 w-full mx-6">
            <h3 className="text-3xl sm:text-4xl font-black text-red-700 animate-pulse tracking-wide uppercase leading-relaxed">
              Will you be my Valentine? ❤️
            </h3>
          </div>
        )}

        <div className={`flex flex-col sm:flex-row items-center pt-10 w-full gap-10 sm:gap-12 relative justify-center`}>
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
                px-14 sm:px-18 py-6 sm:py-7 m-4 bg-gradient-to-b from-red-300 via-red-500 to-red-700 text-white rounded-full font-black text-2xl sm:text-3xl border-5 border-red-800
                transition-all duration-300 active:scale-90 z-20 whitespace-nowrap
                shadow-[0_24px_50px_-15px_rgba(220,38,38,0.85),inset_0_-14px_18px_rgba(0,0,0,0.45),inset_0_14px_18px_rgba(255,255,255,0.6)]
                hover:shadow-[0_28px_56px_-16px_rgba(220,38,38,0.95),inset_0_-14px_18px_rgba(0,0,0,0.45),inset_0_14px_18px_rgba(255,255,255,0.75)]
                ${message.isBhenny ? 'ring-8 ring-red-100 ring-offset-6 ring-offset-white' : ''}
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
              width: '160px'
            } : { width: 'auto' }}
            className={`
              px-14 sm:px-18 py-6 sm:py-7 m-4 bg-gradient-to-b from-gray-50 via-gray-200 to-gray-400 text-gray-700 rounded-full font-black text-2xl sm:text-3xl border-5 border-gray-600
              transition-all duration-300 active:scale-95
              shadow-[0_18px_45px_-12px_rgba(0,0,0,0.25),inset_0_-14px_18px_rgba(0,0,0,0.2),inset_0_14px_18px_rgba(255,255,255,0.85)]
              ${message.isBhenny && isNoFleeing ? 'cursor-default' : ''}
            `}
          >
            No...
          </button>
        </div>
        
        <div className="pt-8 pb-4 text-xs sm:text-sm text-red-500 font-bold uppercase tracking-wider border-t-3 border-red-300 w-full mx-6">
           {message.isBhenny ? "The Final Decision" : `Message ${message.id} of 1000+`}
        </div>
      </div>
      <div className="absolute -bottom-8 left-4 right-4 h-12 bg-white/60 rounded-[2rem] -z-10 shadow-2xl blur-lg"></div>
    </div>
  );
};

export default MessageCard;
