import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useBrowser } from './BrowserContext';

export function MobileMenu() {
  const { tabs, activeTabId, setActiveTabId, isMobileMenuOpen, setIsMobileMenuOpen, closeTab } = useBrowser();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur flex flex-col md:hidden"
        >
          <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900">
            <span className="text-slate-200 font-semibold">Tabs ({tabs.length})</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative flex items-center justify-between p-4 rounded-xl border ${isActive ? 'bg-indigo-600/10 border-indigo-500/50' : 'bg-slate-800 border-slate-700'}`}
                >
                  <button
                    onClick={() => {
                      setActiveTabId(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 flex items-center gap-3 text-left"
                  >
                    <span className={`font-medium ${isActive ? 'text-indigo-400' : 'text-slate-200'}`}>
                      {tab.title}
                    </span>
                    {tab.type === 'project' && <ExternalLink size={14} className="text-slate-500" />}
                  </button>
                  
                  {tab.isClosable && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-700 ml-2"
                    >
                      <X size={18} />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
