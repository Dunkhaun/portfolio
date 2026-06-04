"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrowser } from './BrowserContext';

const DinoSVG = ({ isCharred }: { isCharred: boolean }) => (
  <svg viewBox="0 0 100 100" className={`w-28 h-28 transition-colors duration-200 ${isCharred ? 'fill-slate-800' : 'fill-emerald-500'}`}>
    {/* Tail, back, head */}
    <path d="M10,60 C20,60 25,55 30,45 C35,35 40,20 55,20 C70,20 75,25 75,35 C75,40 70,45 65,45 L70,45 C75,45 80,42 80,48 C80,55 70,55 60,55 C55,55 50,60 48,65 C45,70 45,75 40,80 L25,80 C15,80 8,75 5,68 C3,63 5,60 10,60 Z" />
    {/* Eye */}
    <circle cx="62" cy="30" r="4.5" fill={isCharred ? "#ef4444" : "#0F172A"} />
    {/* Teeth */}
    <path d="M72,38 L70,42 L68,38 L66,42 L64,38" stroke="white" strokeWidth="1.5" fill="none" />
    {/* Arms */}
    <path d="M52,50 L56,50 L56,54" stroke={isCharred ? "#1e293b" : "#047857"} strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Legs */}
    <path d="M35,80 L35,90 M42,80 L42,90" stroke={isCharred ? "#1e293b" : "#047857"} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const SkullSVG = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 fill-slate-400/90 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
    {/* Skull main body */}
    <path d="M25,55 C25,35 38,25 50,25 C62,25 75,35 75,55 C75,65 68,72 62,72 L62,80 L38,80 L38,72 C32,72 25,65 25,55 Z" />
    {/* Eye sockets */}
    <circle cx="43" cy="50" r="7" fill="#0F172A" />
    <circle cx="57" cy="50" r="7" fill="#0F172A" />
    {/* Nose cavity */}
    <polygon points="50,58 47,64 53,64" fill="#0F172A" />
    {/* Teeth/lines */}
    <path d="M44,80 L44,74 M50,80 L50,74 M56,80 L56,74" stroke="#0F172A" strokeWidth="2.5" />
  </svg>
);

const MeteorSVG = () => (
  <svg viewBox="0 0 120 120" className="w-32 h-32 select-none filter drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
    <defs>
      <linearGradient id="fireTail" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
        <stop offset="40%" stopColor="#f97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
    </defs>
    {/* Fire tail extending to the top-right */}
    <path d="M20,100 L105,15 M30,105 L115,25 M10,95 L95,5" stroke="url(#fireTail)" strokeWidth="18" strokeLinecap="round" />
    {/* Fire core */}
    <circle cx="20" cy="100" r="26" fill="#ef4444" className="animate-ping opacity-50" style={{ animationDuration: '0.6s' }} />
    <circle cx="20" cy="100" r="20" fill="#ef4444" />
    <circle cx="20" cy="100" r="14" fill="#f97316" />
    <circle cx="18" cy="102" r="8" fill="#eab308" />
    {/* Rock core */}
    <circle cx="16" cy="104" r="5" fill="#475569" />
  </svg>
);

type Stage = 'running' | 'terror' | 'incoming' | 'explosion' | 'ashes' | 'fadeout';

export function DinoMeteorOverlay() {
  const { isDinoActive, setIsDinoActive } = useBrowser();
  const [stage, setStage] = useState<Stage>('running');
  const [shake, setShake] = useState(false);

  // Generate explosion particles
  const [particles] = useState(() => 
    Array.from({ length: 45 }).map((_, i) => {
      const angle = (i / 45) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 100 + Math.random() * 250;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 50, // blast upwards slightly
        scale: 0.6 + Math.random() * 1.8,
        color: ['#ef4444', '#f97316', '#eab308', '#dc2626', '#7f1d1d', '#f59e0b'][Math.floor(Math.random() * 6)]
      };
    })
  );

  useEffect(() => {
    if (!isDinoActive) return;

    setStage('running');
    setShake(false);

    // Stage 1: Dino running (0s to 2.8s)
    const terrorTimeout = setTimeout(() => {
      setStage('terror');
    }, 2800);

    // Stage 2: Exclamation / Terror (2.8s to 4.2s)
    const incomingTimeout = setTimeout(() => {
      setStage('incoming');
    }, 4200);

    // Stage 3: Meteor strike hits (Incoming duration is 0.7s)
    const explosionTimeout = setTimeout(() => {
      setStage('explosion');
      setShake(true);
    }, 4900);

    // Stop shaking after 0.8s
    const shakeTimeout = setTimeout(() => {
      setShake(false);
    }, 5700);

    // Stage 4: Ashes / Skull remains (5.8s onwards)
    const ashesTimeout = setTimeout(() => {
      setStage('ashes');
    }, 5900);

    // Stage 5: Fadeout (8s)
    const fadeoutTimeout = setTimeout(() => {
      setStage('fadeout');
    }, 8200);

    // End animation (9s)
    const endTimeout = setTimeout(() => {
      setIsDinoActive(false);
    }, 9000);

    return () => {
      clearTimeout(terrorTimeout);
      clearTimeout(incomingTimeout);
      clearTimeout(explosionTimeout);
      clearTimeout(shakeTimeout);
      clearTimeout(ashesTimeout);
      clearTimeout(fadeoutTimeout);
      clearTimeout(endTimeout);
    };
  }, [isDinoActive, setIsDinoActive]);

  if (!isDinoActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: stage === 'fadeout' ? 0 : 1,
          x: shake ? [0, -12, 12, -12, 12, -8, 8, -4, 4, 0] : 0,
          y: shake ? [0, 8, -8, 8, -8, 6, -6, 3, -3, 0] : 0
        }}
        transition={{ 
          opacity: { duration: 0.8 },
          x: { duration: 0.7, ease: "easeInOut" },
          y: { duration: 0.7, ease: "easeInOut" }
        }}
        className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-[2px] overflow-hidden rounded-xl flex items-center justify-center select-none"
      >
        {/* Dynamic sky glow as meteor approaches */}
        {stage === 'incoming' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2, 0.6] }}
            className="absolute inset-0 bg-red-950/30 pointer-events-none"
          />
        )}

        {/* Massive white/yellow flash on impact */}
        {stage === 'explosion' && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-amber-100 z-50 pointer-events-none"
          />
        )}

        {/* Dino Container */}
        {(stage === 'running' || stage === 'terror' || stage === 'incoming' || stage === 'explosion') && (
          <motion.div
            initial={{ x: "-120%" }}
            animate={
              stage === 'running'
                ? { 
                    x: "40%",
                    y: [0, -15, 0, -15, 0, -15, 0, -15, 0],
                  }
                : { x: "40%", y: 0 }
            }
            transition={
              stage === 'running'
                ? { duration: 2.8, ease: "linear" }
                : { duration: 0.2 }
            }
            className="absolute bottom-16 left-0 flex flex-col items-center"
          >
            {/* Exclamation point above head in 'terror' stage */}
            {stage === 'terror' && (
              <motion.div
                initial={{ scale: 0, y: 15 }}
                animate={{ scale: 1.3, y: 0 }}
                className="bg-red-500 text-white font-black text-2xl w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mb-2 shadow-lg animate-bounce"
              >
                !
              </motion.div>
            )}

            {/* Question Mark or Meteor alert in 'incoming' stage */}
            {stage === 'incoming' && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
                className="bg-orange-500 text-white font-black text-xl px-2.5 py-1 rounded-md border-2 border-white flex items-center justify-center mb-2 shadow-lg font-mono"
              >
                ⚠️ DANGER
              </motion.div>
            )}

            <DinoSVG isCharred={stage === 'explosion'} />
          </motion.div>
        )}

        {/* Incoming Meteor */}
        {stage === 'incoming' && (
          <motion.div
            initial={{ x: "120%", y: "-120%" }}
            animate={{ x: "45%", y: "45%" }}
            transition={{ duration: 0.7, ease: "easeIn" }}
            className="absolute top-0 right-0"
          >
            <MeteorSVG />
          </motion.div>
        )}

        {/* Explosion Particles */}
        {stage === 'explosion' && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map(p => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: p.color,
                  // Positions particles relative to the dino landing spot
                  left: "48%",
                  bottom: "22%",
                  filter: 'blur(1px)'
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: p.scale }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}

        {/* Ashes / Skull remains */}
        {stage === 'ashes' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center gap-4"
          >
            <SkullSVG />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center font-mono space-y-1"
            >
              <h2 className="text-red-500 text-3xl font-extrabold tracking-widest uppercase filter drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                Extinction Event
              </h2>
              <p className="text-slate-400 text-sm">
                RIP Dino (65,000,000 BC - {new Date().getFullYear()} AD)
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
