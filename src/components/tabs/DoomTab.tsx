import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Play, RefreshCw, Volume2 } from 'lucide-react';

export default function DoomTab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [degaussKey, setDegaussKey] = useState(0);

  const triggerDegauss = () => {
    setDegaussKey(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 pb-20 flex flex-col items-center">
      {/* Tab Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3 tracking-wider uppercase">
          <Gamepad2 className="text-red-500 animate-pulse" size={32} />
          Doom (1993)
        </h1>
        <p className="text-slate-400 mt-1 font-mono text-xs">Simulated MS-DOS Retro Console Environment</p>
      </motion.div>

      {/* CRT Monitor Housing */}
      <motion.div
        key={degaussKey}
        animate={degaussKey > 0 ? {
          scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
          rotate: [0, 1, -1, 0.5, -0.5, 0],
          filter: ['contrast(1)', 'contrast(3) brightness(1.5)', 'contrast(0.2) brightness(0.5)', 'contrast(1.2)', 'contrast(1)'],
        } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-full max-w-3xl bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-2xl relative flex flex-col md:flex-row gap-6 border-b-8 border-r-8 shadow-black/60"
      >
        {/* Screen Container */}
        <div className="flex-1 flex flex-col">
          <div className="relative bg-black rounded-xl overflow-hidden aspect-[4/3] border-4 border-slate-900 shadow-inner flex flex-col items-center justify-center">
            {/* Screen Scanlines and Glare Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] opacity-25 z-20" />
            <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent to-black/40 z-10" />

            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-950 z-30 select-none">
                {/* CRT Flickering Title */}
                <h2 className="text-red-600 font-extrabold text-4xl mb-4 tracking-widest font-mono uppercase animate-pulse">
                  M.S. D.O.S.
                </h2>
                <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/30 flex items-center justify-center mb-6">
                  <Gamepad2 className="text-red-500" size={32} />
                </div>
                <p className="text-slate-400 font-mono text-sm max-w-sm mb-6 leading-relaxed">
                  Press START below to initialize emulation of the classic DOOM shareware v1.9.
                </p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30 font-mono uppercase tracking-wider text-sm border border-red-500"
                >
                  <Play size={16} fill="white" /> Start Game
                </button>
              </div>
            ) : (
              <iframe
                src="https://playclassic.games/embed/?game=doom"
                className="w-full h-full border-none z-0 relative"
                allowFullScreen
                allow="autoplay; gamepad"
                title="Doom MS-DOS Play Classic Game Embed"
              />
            )}
          </div>

          {/* Under Screen Bezel Label */}
          <div className="flex justify-between items-center mt-3 px-1 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span>Model: CRT-1993</span>
            <span>Multisync Monitor</span>
          </div>
        </div>

        {/* CRT Control Panel Column */}
        <div className="w-full md:w-36 flex md:flex-col justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-slate-700/30 shrink-0 gap-4">
          {/* Top Dials */}
          <div className="flex md:flex-col gap-4 items-center justify-center w-full">
            {/* Dial 1 */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase mb-1">Contrast</span>
              <div className="w-8 h-8 rounded-full border-2 border-slate-600 bg-slate-800 relative cursor-pointer active:rotate-45 transition-transform duration-200">
                <div className="w-1 h-3 bg-slate-500 absolute top-0 left-1/2 -translate-x-1/2 rounded" />
              </div>
            </div>
            {/* Dial 2 */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase mb-1">Bright</span>
              <div className="w-8 h-8 rounded-full border-2 border-slate-600 bg-slate-800 relative cursor-pointer active:-rotate-45 transition-transform duration-200">
                <div className="w-1 h-3 bg-slate-500 absolute top-0 left-1/2 -translate-x-1/2 rounded" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex md:flex-col gap-3 items-center justify-center w-full">
            {/* Degauss Button */}
            <button
              onClick={triggerDegauss}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded text-[10px] font-mono uppercase tracking-wider w-24 text-center transition-colors active:bg-slate-600"
              title="Click to reset visual alignment / degauss the screen"
            >
              Degauss
            </button>

            {/* Restart Emulation */}
            {isPlaying && (
              <button
                onClick={() => setIsPlaying(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded text-[10px] font-mono uppercase tracking-wider w-24 text-center transition-colors"
              >
                <RefreshCw size={10} /> Reset
              </button>
            )}
          </div>

          {/* Bottom Status / Power Indicator */}
          <div className="flex flex-col items-center justify-center mt-auto">
            <div className="flex items-center gap-2">
              {/* Glowing Power Light */}
              <div className={`w-3.5 h-3.5 rounded-full border border-black/40 shadow-inner transition-all duration-300 ${isPlaying ? 'bg-green-500 shadow-green-400/80 animate-pulse' : 'bg-red-500 shadow-red-400/80'}`} />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">Power</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Game Controls Guide */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl mt-8 bg-slate-800/40 border border-slate-700/40 rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Gamepad2 size={16} className="text-indigo-400" />
          Emulation Controls Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-slate-400">
          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800">
            <span className="text-indigo-400 block font-bold mb-1">MOVEMENT</span>
            <span>Arrow Keys / WASD</span>
          </div>
          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800">
            <span className="text-indigo-400 block font-bold mb-1">SHOOT / FIRE</span>
            <span>Ctrl / Left-Click</span>
          </div>
          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800">
            <span className="text-indigo-400 block font-bold mb-1">USE / OPEN</span>
            <span>Spacebar</span>
          </div>
          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800">
            <span className="text-indigo-400 block font-bold mb-1">WEAPONS</span>
            <span>Keys 1 to 7</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
