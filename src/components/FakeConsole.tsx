import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useBrowser } from './BrowserContext';

export function FakeConsole() {
  const { isConsoleOpen, setIsConsoleOpen, openTab, setIsDinoActive } = useBrowser();
  const [history, setHistory] = useState<{ type: 'command' | 'output' | 'error', text: string }[]>([
    { type: 'output', text: 'Portfolio OS v1.0.0' },
    { type: 'output', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isConsoleOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isConsoleOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isConsoleOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'command', text: trimmed }]);
    
    const args = trimmed.toLowerCase().split(' ');
    const command = args[0];

    switch (command) {
      case 'help':
        setHistory(prev => [...prev, { 
          type: 'output', 
          text: 'Available commands:\n- about\n- projects\n- contact\n- resume\n- dinosaur\n- clear\n- exit' 
        }]);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
        setIsConsoleOpen(false);
        break;
      case 'about':
        openTab({ id: 'about', title: 'About', type: 'about', url: 'https://myportfolio.dev/about' });
        setHistory(prev => [...prev, { type: 'output', text: 'Navigating to About...' }]);
        break;
      case 'projects':
        openTab({ id: 'projects', title: 'Projects', type: 'projects', url: 'https://myportfolio.dev/projects' });
        setHistory(prev => [...prev, { type: 'output', text: 'Navigating to Projects...' }]);
        break;
      case 'contact':
        openTab({ id: 'contact', title: 'Contact', type: 'contact', url: 'https://myportfolio.dev/contact' });
        setHistory(prev => [...prev, { type: 'output', text: 'Navigating to Contact...' }]);
        break;
      case 'resume':
        openTab({ id: 'resume', title: 'Resume.pdf', type: 'about', url: 'https://myportfolio.dev/resume.pdf' });
        setHistory(prev => [...prev, { type: 'output', text: 'Opening Resume...' }]);
        break;
      case 'dinosaur':
        setIsDinoActive(true);
        setHistory(prev => [...prev, { type: 'output', text: '🦖 WARNING: Summoning dinosaur... Warning: Meteor detected in local airspace!' }]);
        break;
      case 'sudo':
        if (args[1] === 'hire-me') {
          setHistory(prev => [...prev, { type: 'output', text: 'Permission granted. Let\'s build something great together!' }]);
        } else {
          setHistory(prev => [...prev, { type: 'error', text: `sudo: ${args.slice(1).join(' ')}: command not found` }]);
        }
        break;
      default:
        setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${command}. Type "help" for a list of commands.` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isConsoleOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-0 left-0 right-0 h-64 md:h-80 bg-slate-900/95 backdrop-blur border-t border-slate-700 shadow-2xl z-50 flex flex-col font-mono text-sm"
        >
          {/* Console Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 text-slate-400">
              <TerminalIcon size={16} />
              <span>Terminal</span>
            </div>
            <button 
              onClick={() => setIsConsoleOpen(false)}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>

          {/* Console Output */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {history.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line.type === 'command' && (
                  <div><span className="text-green-400">visitor@portfolio</span><span className="text-slate-400">:</span><span className="text-blue-400">~</span>$ {line.text}</div>
                )}
                {line.type === 'output' && (
                  <div className="text-slate-300">{line.text}</div>
                )}
                {line.type === 'error' && (
                  <div className="text-red-400">{line.text}</div>
                )}
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center">
              <span className="text-green-400 shrink-0">visitor@portfolio</span>
              <span className="text-slate-400 shrink-0">:</span>
              <span className="text-blue-400 shrink-0">~</span>
              <span className="mr-2 shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-slate-100 flex-1 focus:ring-0 p-0"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={endRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
