'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AppState, Message } from '@/src/types';
import FloatingIcon from '@/src/components/FloatingIcon';
import MessageCard from '@/src/components/MessageCard';
import WarningPopover from '@/src/components/WarningPopover';
import HeartWaves from '@/src/components/HeartWaves';
import SuccessScreen from '@/src/components/SuccessScreen';

const SUITOR_NAMES = [
  "Chadwick", "Sir Reginald", "Lord Byron", "Duke Wellington", "Prince Charming",
  "Alphonse", "Barnaby", "Caspian", "Dorian", "Evander", "Fabian", "Gideon",
  "Horatio", "Ignatius", "Jasper", "Killian", "Leopold", "Maximilian", "Nathaniel",
  "Orlando", "Percival", "Quentin", "Roderick", "Sebastian", "Thaddeus", "Ulysses",
  "Valentine", "Wentworth", "Xavier", "Yorick", "Zephyr", "Arthur", "Benedict",
  "Clarence", "Desmond", "Edmund", "Fitzgerald", "Godfrey", "Hamilton", "Ivor",
  "Julian", "Kingsley", "Lysander", "Montgomery", "Neville", "Octavius", "Phineas",
  "Rupert", "Sterling", "Tristan", "Victor", "Winston", "Alistair", "Beau",
  "Clement", "Dante", "Emerson", "Felix", "Graham", "Hugo", "Ivan", "Jude",
  "Knox", "Lionel", "Milo", "Nico", "Otis", "Pierce", "Quinn", "Roman",
  "Silas", "Theo", "Vance", "Wyatt", "Zane", "Augustus", "Beckett", "Cyrus",
  "Dash", "Enzo", "Finn", "Gage", "Holden", "Ira", "Jax", "Kai", "Leo",
  "Magnus", "Nash", "Owen", "Pax", "Ryker", "Sawyer", "Tate", "Uri", "Vico",
  "Wilder", "Xander", "Yael", "Zeke"
];

const DECOY_MESSAGES = [
  "I've got a reserved table at the fanciest steakhouse in town. Say yes?",
  "A bouquet of 100 roses and a sunset carriage ride awaits you. Join me?",
  "I've written a thousand poems about your eyes. Let's spend the day together.",
  "Diamonds are forever, but our love could start tonight at the opera.",
  "I have a private jet ready to take us to Paris for dinner. What say you?",
  "Your beauty outshines the morning sun. Be my Valentine?",
  "I promise a night of luxury and the finest champagne. Be mine?",
  "Let me shower you with gifts and adoration. You deserve the best."
];

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.CLOSED);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isNoFleeing, setIsNoFleeing] = useState(false);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [chaseCount, setChaseCount] = useState(0);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonInitialRef = useRef<HTMLButtonElement>(null);

  const [decoySuitors, setDecoySuitors] = useState<Message[]>([]);

  const [timeStats, setTimeStats] = useState({
    years: "0", months: "0", weeks: "0", days: "0", hours: "0", minutes: "0", seconds: "0"
  });

  const backgroundHearts = useMemo(() => {
    return [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 20 + 20}px`
    }));
  }, []);

  useEffect(() => {
    const shuffledNames = [...SUITOR_NAMES].sort(() => 0.5 - Math.random());
    const shuffledMessages = [...DECOY_MESSAGES].sort(() => 0.5 - Math.random());
    
    setDecoySuitors([
      {
        id: 1,
        sender: shuffledNames[0],
        content: shuffledMessages[0],
        isBhenny: false
      },
      {
        id: 2,
        sender: shuffledNames[1],
        content: shuffledMessages[1],
        isBhenny: false
      }
    ]);

    const startDate = new Date('2023-09-01T00:00:00+08:00').getTime();
    const updateStats = () => {
      const now = Date.now();
      const diff = now - startDate;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = (days / 7).toFixed(1);
      const months = (days / 30.4375).toFixed(1);
      const years = (days / 365.25).toFixed(2);

      setTimeStats({
        years, months, weeks,
        days: days.toLocaleString(),
        hours: hours.toLocaleString(),
        minutes: minutes.toLocaleString(),
        seconds: seconds.toLocaleString()
      });
    };

    updateStats();
    const timer = setInterval(updateStats, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenIcon = () => setAppState(AppState.MESSAGE_1);

  const handleNoClick = () => {
    if (appState === AppState.MESSAGE_1) setAppState(AppState.MESSAGE_2);
    else if (appState === AppState.MESSAGE_2) setAppState(AppState.FINAL_MESSAGE);
  };

  const handleYesClick = () => {
    if (appState === AppState.FINAL_MESSAGE) {
      setAppState(AppState.ACCEPTED);
    } else {
      setIsWarningOpen(true);
    }
  };

  const handleWarningContinue = () => {
    setWarningCount(prev => prev + 1);
  };

  const handleWarningReject = () => {
    setIsWarningOpen(false);
    setWarningCount(0);
    handleNoClick();
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (appState !== AppState.FINAL_MESSAGE) return;

    let currentX = noButtonPos.x;
    let currentY = noButtonPos.y;

    if (!isNoFleeing && noButtonInitialRef.current) {
      const rect = noButtonInitialRef.current.getBoundingClientRect();
      currentX = rect.left;
      currentY = rect.top;
      setNoButtonPos({ x: currentX, y: currentY });
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const btnWidth = 140;
    const btnHeight = 60;
    const centerX = currentX + btnWidth / 2;
    const centerY = currentY + btnHeight / 2;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const threshold = 180;

    if (distance < threshold) {
      if (!isNoFleeing) setIsNoFleeing(true);
      setChaseCount(prev => prev + 1);
      
      const angle = Math.atan2(dy, dx);
      const pushForce = (threshold - distance) * 3.5;
      
      let newX = currentX - Math.cos(angle) * pushForce;
      let newY = currentY - Math.sin(angle) * pushForce;

      const padding = 40;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      if (newX < padding) newX = padding;
      if (newX > screenW - btnWidth - padding) newX = screenW - btnWidth - padding;
      if (newY < padding) newY = padding;
      if (newY > screenH - btnHeight - padding) newY = screenH - btnHeight - padding;

      setNoButtonPos({ x: newX, y: newY });
    }
  }, [appState, noButtonPos, isNoFleeing]);

  useEffect(() => {
    if (chaseCount > 80 && yesButtonScale < 1.1) setYesButtonScale(1.1);
    if (chaseCount > 250 && yesButtonScale < 1.2) setYesButtonScale(1.2);
    if (chaseCount > 500 && yesButtonScale < 1.3) setYesButtonScale(1.3);
  }, [chaseCount, yesButtonScale]);

  const currentMessage = useMemo(() => {
    if (appState === AppState.MESSAGE_1) return decoySuitors[0];
    if (appState === AppState.MESSAGE_2) return decoySuitors[1];
    if (appState === AppState.FINAL_MESSAGE) return { id: 3, sender: "Bhenny", content: "", isBhenny: true };
    return null;
  }, [appState, decoySuitors]);

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center bg-pink-50 overflow-hidden select-none py-8 sm:py-0"
      onMouseMove={handleMouseMove}
    >
      {appState === AppState.FINAL_MESSAGE && (
        <HeartWaves scale={yesButtonScale} />
      )}

      {appState === AppState.CLOSED && (
        <div className="flex flex-col items-center justify-center space-y-12 sm:space-y-16 z-50 px-6 w-full">
          <h1 className="text-5xl sm:text-8xl font-cursive text-red-500 drop-shadow-lg text-center animate-in fade-in slide-in-from-top duration-1000 leading-tight">
            Valentine Request<br />Messages
          </h1>
          <FloatingIcon onClick={handleOpenIcon} />
        </div>
      )}

      {(appState === AppState.MESSAGE_1 || appState === AppState.MESSAGE_2 || appState === AppState.FINAL_MESSAGE) && currentMessage && (
        <MessageCard 
          message={currentMessage}
          onYes={handleYesClick}
          onNo={handleNoClick}
          noButtonPos={noButtonPos}
          isNoFleeing={isNoFleeing}
          yesButtonScale={yesButtonScale}
          yesButtonRef={yesButtonRef}
          noButtonInitialRef={noButtonInitialRef}
          timeStats={timeStats}
        />
      )}

      {isWarningOpen && (
        <WarningPopover 
          count={warningCount}
          onContinue={handleWarningContinue}
          onReject={handleWarningReject}
        />
      )}

      {appState === AppState.ACCEPTED && (
        <SuccessScreen />
      )}

      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {backgroundHearts.map((heart, i) => (
          <div 
            key={i} 
            className="absolute animate-float"
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              fontSize: heart.fontSize
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
}
