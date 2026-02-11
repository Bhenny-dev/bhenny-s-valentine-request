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
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-8 animate-in fade-in zoom-in duration-1000 flex items-center justify-center my-6">
      <div className="relative bg-gradient-to-b from-white to-red-50/20 p-8 sm:p-16 rounded-3xl border-4 sm:border-4 border-red-300 m-3 flex flex-col items-center text-center space-y-8 sm:space-y-10 max-h-[90vh] overflow-y-auto custom-scrollbar
        shadow-[0_20px_50px_-10px_rgba(220,38,38,0.4),inset_0_-15px_30px_rgba(0,0,0,0.08),inset_0_15px_30px_rgba(255,255,255,0.8)]">
        
        <div className="flex flex-col items-center pt-4 pb-4 space-y-4 w-full">
          <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest font-bold letter-spacing-md">A Letter From</span>
          <h2 className="text-6xl sm:text-8xl font-cursive font-bold text-red-600 drop-shadow-lg leading-tight px-4 break-words">
            {message.sender}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 sm:p-12 rounded-3xl border-4 border-pink-400 w-full m-3 shadow-[0_12px_30px_-8px_rgba(236,72,153,0.3),inset_0_-8px_16px_rgba(0,0,0,0.06),inset_0_8px_16px_rgba(255,255,255,0.9)]">
          {message.isBhenny ? renderBhennyMessage() : (
            <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-serif">
              "{message.content}"
            </p>
          )}
        </div>

        {message.isBhenny && (
          <div className="pt-6 pb-4 border-t-4 border-pink-300 w-full">
            <h3 className="text-2xl sm:text-3xl font-black text-red-700 animate-pulse tracking-wide uppercase leading-relaxed">
              Will you be my Valentine? ❤️
            </h3>
          </div>
        )}

        <div className={`flex flex-col sm:flex-row items-center pt-8 w-full gap-8 sm:gap-10 relative justify-center`}>
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
                px-12 sm:px-16 py-5 sm:py-6 m-3 bg-gradient-to-b from-red-400 via-red-500 to-red-600 text-white rounded-full font-black text-xl sm:text-2xl border-4 border-red-700
                transition-all duration-300 active:scale-90 z-20 whitespace-nowrap
                shadow-[0_20px_40px_-12px_rgba(220,38,38,0.8),inset_0_-12px_16px_rgba(0,0,0,0.4),inset_0_12px_16px_rgba(255,255,255,0.5)]
                hover:shadow-[0_24px_48px_-14px_rgba(220,38,38,0.9),inset_0_-12px_16px_rgba(0,0,0,0.4),inset_0_12px_16px_rgba(255,255,255,0.7)]
                ${message.isBhenny ? 'ring-6 ring-red-100 ring-offset-4 ring-offset-white' : ''}
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
              px-12 sm:px-16 py-5 sm:py-6 m-3 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-600 rounded-full font-black text-xl sm:text-2xl border-4 border-gray-400
              transition-all duration-300 active:scale-95
              shadow-[0_15px_35px_-10px_rgba(0,0,0,0.2),inset_0_-12px_16px_rgba(0,0,0,0.15),inset_0_12px_16px_rgba(255,255,255,0.8)]
              ${message.isBhenny && isNoFleeing ? 'cursor-default' : ''}
            `}
          >
            No...
          </button>
        </div>
        
        <div className="pt-6 pb-3 text-xs sm:text-sm text-red-400 font-bold uppercase tracking-wider border-t-2 border-red-200 w-full">
           {message.isBhenny ? "The Final Decision" : `Message ${message.id} of 1000+`}
        </div>
      </div>
      <div className="absolute -bottom-6 left-6 right-6 h-10 bg-white/50 rounded-[2rem] -z-10 shadow-xl blur-sm"></div>
    </div>
  );
};

export default MessageCard;
