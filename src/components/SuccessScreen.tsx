'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';

// Linking to the local directory: public/src/img/
const STORY_PICTURES = [
  "/src/img/1.png",
  "/src/img/2.png",
  "/src/img/3.png",
  "/src/img/4.png",
  "/src/img/5.png",
  "/src/img/6.png"
];

const SuccessScreen: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [view, setView] = useState<'celebration' | 'slideshow'>('celebration');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const backgroundDecorations = useMemo(() => {
    return [...Array(24)].map((_, i) => ({
      left: `${(i % 6) * 16 + Math.random() * 8}%`,
      top: `${Math.floor(i / 6) * 22 + Math.random() * 8}%`,
      fontSize: `${Math.random() * 25 + 15}px`,
      duration: `${15 + Math.random() * 10}s`,
      delay: `-${Math.random() * 20}s`,
      emoji: ['❤️', '💖', '✨', '🌸', '💎'][i % 5]
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleShowStory = () => {
    setView('slideshow');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-red-400 to-rose-600 flex flex-col items-center justify-center text-white overflow-hidden animate-in fade-in duration-[1500ms]">
      
      {/* Background Decor Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {backgroundDecorations.map((item, i) => (
          <div 
            key={i}
            className="absolute animate-drift will-change-transform"
            style={{
              left: item.left,
              top: item.top,
              fontSize: item.fontSize,
              animationDuration: item.duration,
              animationDelay: item.delay,
              filter: 'blur(0.5px)'
            }}
          >
            {item.emoji}
          </div>
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content Layer */}
      {showContent && (
        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
          
          {view === 'celebration' ? (
            <div className="text-center space-y-10 animate-in zoom-in fade-in duration-[1200ms]">
              <div className="space-y-6 sm:space-y-4">
                <div className="text-9xl sm:text-8xl animate-bounce" style={{ animationDuration: '3s' }} role="img" aria-label="Happy emoji">🥰</div>
                <h1 className="text-8xl sm:text-9xl font-cursive text-white drop-shadow-2xl leading-tight">
                  Yes!
                </h1>
                <h2 className="text-2xl sm:text-4xl font-romantic tracking-widest text-pink-100 drop-shadow-md leading-relaxed">
                  You've Made Me<br className="hidden sm:block" /> the Happiest Man Alive
                </h2>
              </div>

              <div className="bg-white/10 backdrop-blur-xl p-12 rounded-[4rem] border-2 border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.3)] space-y-8">
                <p className="text-xl sm:text-2xl font-body font-light leading-relaxed max-w-lg mx-auto text-white/95">
                  I promise to make this Valentine's Day as beautiful as you are. 
                  Every second spent with you is a treasure.
                </p>
                <div className="flex justify-center gap-10">
                  <span className="text-4xl animate-pulse" style={{ animationDuration: '5s' }}>✨</span>
                  <span className="text-5xl animate-pulse delay-500" style={{ animationDuration: '5s' }}>❤️</span>
                  <span className="text-4xl animate-pulse delay-1000" style={{ animationDuration: '5s' }}>✨</span>
                </div>
              </div>

              <div className="pt-10">
                <button 
                  onClick={handleShowStory}
                  className="bg-white text-red-600 px-16 py-7 rounded-full font-black text-lg uppercase tracking-widest
                  transition-all duration-300 active:scale-90 hover:scale-110
                  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_-10px_14px_rgba(0,0,0,0.15),inset_0_10px_14px_rgba(255,255,255,1)]"
                >
                  See Our Story Again ✨
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-14 animate-in slide-in-from-right duration-[1200ms]">
              <div className="text-center space-y-4">
                <h2 className="text-6xl font-cursive drop-shadow-lg text-white">Our Story</h2>
                <p className="text-pink-100 font-romantic text-2xl sm:text-3xl tracking-wide italic drop-shadow-sm">Every moment is a memory worth keeping...</p>
              </div>

              {/* Horizontal Scroll Slideshow */}
              <div 
                ref={scrollContainerRef}
                className="w-full overflow-x-auto pb-14 pt-6 px-4 custom-scrollbar flex gap-12 sm:gap-16 snap-x items-center justify-start no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {STORY_PICTURES.map((url, idx) => (
                  <div 
                    key={idx}
                    className="flex-shrink-0 snap-center animate-slow-float will-change-transform cursor-pointer"
                    style={{ animationDelay: `${idx * 0.4}s` }}
                    onClick={() => setSelectedImage(url)}
                  >
                    <div className="relative w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center transition-transform active:scale-95">
                      <svg 
                        className="absolute inset-0 w-full h-full text-pink-200/90 drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      
                      <div className="relative z-10 w-44 h-44 sm:w-64 sm:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                        <img 
                          src={url} 
                          alt={`Story moment ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400";
                          }}
                        />
                      </div>
                      <div className="absolute top-8 right-8 text-white text-4xl animate-pulse">✨</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <a 
                  href="https://www.facebook.com/benlor.rivera.9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-b from-white to-pink-50 text-red-600 px-24 py-8 rounded-full font-black text-2xl uppercase tracking-[0.25em]
                  transition-all duration-300 active:scale-95 active:shadow-[0_15px_30px_-12px_rgba(0,0,0,0.6),inset_0_-8px_10px_rgba(0,0,0,0.15),inset_0_8px_10px_rgba(255,255,255,1)] hover:scale-110
                  shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),inset_0_-12px_16px_rgba(0,0,0,0.12),inset_0_12px_16px_rgba(255,255,255,1)]"
                >
                  My Love ❤️
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full-Size Image Pop-over */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10 animate-in fade-in zoom-in duration-500"
          onClick={() => setSelectedImage(null)}
        >
          {/* Darker backdrop with blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
          
          {/* Decorative Frame Container */}
          <div 
            className="relative max-w-4xl w-full h-auto max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The "Romantic Frame" border effects */}
            <div className="relative group bg-white p-3 sm:p-5 rounded-[2rem] sm:rounded-[3rem] shadow-[0_0_100px_rgba(255,182,193,0.5)] border-[12px] sm:border-[20px] border-white overflow-hidden">
              
              {/* Corner Sparkle Ornaments */}
              <div className="absolute top-2 left-2 text-red-400 text-3xl z-20">✨</div>
              <div className="absolute top-2 right-2 text-red-400 text-3xl z-20">✨</div>
              <div className="absolute bottom-2 left-2 text-red-400 text-3xl z-20">✨</div>
              <div className="absolute bottom-2 right-2 text-red-400 text-3xl z-20">✨</div>

              {/* The Image itself */}
              <img 
                src={selectedImage} 
                className="w-full h-full object-contain rounded-xl sm:rounded-3xl shadow-inner border-2 border-pink-50" 
                alt="Enlarged story moment"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800";
                }}
              />

              {/* Decorative edge overlay (semi-transparent pink tint on edges) */}
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/30 rounded-xl sm:rounded-3xl m-1 sm:m-2"></div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 bg-white text-red-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-2xl transition-transform hover:scale-110 active:scale-90 z-[310] border-4 border-red-50"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessScreen;
