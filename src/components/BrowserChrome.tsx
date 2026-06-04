"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, RotateCw, Menu, Terminal } from 'lucide-react';
import { useBrowser } from './BrowserContext';

export function BrowserChrome() {
  const { 
    tabs, 
    activeTabId, 
    setActiveTabId, 
    closeTab, 
    setIsMobileMenuOpen, 
    isConsoleOpen, 
    setIsConsoleOpen 
  } = useBrowser();
  
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const [displayUrl, setDisplayUrl] = useState('');

  // Simulate loading state when changing tabs
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setIsLoading(true);
      setDisplayUrl(activeTab.url);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); // 300ms fake loading
      return () => clearTimeout(timer);
    }
  }, [activeTabId, activeTab]);

  return (
    <div className="flex flex-col border-b border-slate-700 bg-slate-900 rounded-t-xl overflow-hidden">
      {/* Window Controls and Tabs (Desktop) */}
      <div className="flex items-end px-3 pt-3 gap-3 bg-[#0F172A] relative">
        {/* macOS style controls */}
        <div className="flex gap-2 items-center pb-3 pl-1 pr-4 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-1 flex-1 overflow-x-auto no-scrollbar items-end h-[40px]">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 min-w-[120px] max-w-[200px] cursor-pointer rounded-t-lg transition-colors border-t border-x border-transparent
                  ${isActive ? 'bg-[#1E293B] border-slate-700 !border-b-0 text-slate-100 z-10' : 'bg-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'}`}
                style={{ 
                  borderBottom: isActive ? 'none' : '1px solid transparent',
                  boxShadow: isActive ? '0 -2px 10px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="truncate text-sm flex-1 select-none">{tab.title}</span>
                {tab.isClosable && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className="p-0.5 rounded hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden pb-2 ml-auto">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#1E293B] border-b border-slate-800">
        <div className="flex gap-2 text-slate-400 shrink-0">
          <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-800"><ChevronLeft size={18} /></button>
          <button className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-800"><ChevronRight size={18} /></button>
          <button className={`p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-800 ${isLoading ? 'animate-spin' : ''}`}>
            <RotateCw size={16} />
          </button>
        </div>

        <div className="flex-1 flex items-center bg-slate-900 rounded-md px-3 py-1.5 border border-slate-700/50">
          <span className="text-slate-500 mr-2">🔒</span>
          <span className="text-slate-300 text-sm truncate flex-1 font-mono tracking-tight">
            {displayUrl}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            className={`p-1.5 rounded transition-colors ${isConsoleOpen ? 'text-indigo-400 bg-indigo-900/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            title="Open Terminal"
          >
            <Terminal size={18} />
          </button>
        </div>
      </div>
      
      {/* Fake Loading Bar */}
      {isLoading && (
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          className="h-[2px] bg-indigo-500 w-full"
        />
      )}
      {!isLoading && <div className="h-[2px] bg-transparent w-full" />}
    </div>
  );
}
