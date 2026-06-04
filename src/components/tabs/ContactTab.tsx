import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CornerDownRight } from 'lucide-react';

export default function ContactTab() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const placeholderText = "Hi, I'd love to discuss a project with you...";

  useEffect(() => {
    if (!isTyping) return;
    
    const timeout = setTimeout(() => {
      if (message.length < placeholderText.length) {
        setMessage(placeholderText.slice(0, message.length + 1));
      } else {
        setIsTyping(false);
      }
    }, 50 + Math.random() * 50); // Simulate realistic typing speed

    return () => clearTimeout(timeout);
  }, [message, isTyping]);

  const handleFocus = () => {
    if (isTyping) {
      setIsTyping(false);
      if (message === placeholderText) {
        setMessage('');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Contact</h1>
        <p className="text-slate-400">Send me a message to get the conversation started.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Composer Header */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div className="flex gap-2 text-sm text-slate-400">
            <span className="font-semibold text-slate-300">New Message</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          </div>
        </div>

        {/* Composer Fields */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-4 items-center border-b border-slate-700/50 pb-3">
            <span className="text-slate-500 font-medium w-16">To:</span>
            <span className="text-slate-200 bg-slate-700/50 px-2 py-0.5 rounded-md text-sm border border-slate-600">Duncan</span>
          </div>
          
          <div className="flex gap-4 items-center border-b border-slate-700/50 pb-3">
            <span className="text-slate-500 font-medium w-16">From:</span>
            <input 
              type="email" 
              placeholder="visitor@example.com"
              className="bg-transparent border-none outline-none text-slate-200 flex-1 placeholder:text-slate-600 focus:ring-0 p-0"
            />
          </div>

          <div className="flex gap-4 items-center border-b border-slate-700/50 pb-3">
            <span className="text-slate-500 font-medium w-16">Subject:</span>
            <input 
              type="text" 
              defaultValue="Let's Work Together"
              className="bg-transparent border-none outline-none text-slate-200 flex-1 focus:ring-0 p-0"
            />
          </div>

          <div className="mt-2 flex-1 flex flex-col min-h-[250px]">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={handleFocus}
              className="w-full h-full bg-transparent border-none outline-none text-slate-300 resize-none flex-1 placeholder:text-slate-600 focus:ring-0 p-0"
              placeholder="Type your message here..."
            />
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-1 align-middle" />
            )}
          </div>
        </div>

        {/* Composer Footer */}
        <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex justify-between items-center">
          <button className="text-slate-400 hover:text-slate-300 transition-colors p-2 rounded-md hover:bg-slate-700">
            <CornerDownRight size={20} />
          </button>
          
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-600/20">
            Send Message <Send size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
