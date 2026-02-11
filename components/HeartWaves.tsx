
import React from 'react';

interface HeartWavesProps {
  scale: number;
}

const HeartWaves: React.FC<HeartWavesProps> = ({ scale }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none -z-10">
      <div 
        className="relative flex items-center justify-center transition-transform duration-1000"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Heart-beat surge effect with 3 wave lines: light, mid, bold */}
        <div className="wave wave-light w-[500px] h-[500px]"></div>
        <div className="wave wave-mid w-[500px] h-[500px]"></div>
        <div className="wave wave-bold w-[500px] h-[500px]"></div>
        
        {/* Centered pulse core */}
        <div className="absolute w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '2s' }}></div>
      </div>
    </div>
  );
};

export default HeartWaves;
