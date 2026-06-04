import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { useBrowser } from '../BrowserContext';

export default function HomeTab() {
  const { openTab } = useBrowser();

  const handleViewProjects = () => {
    openTab({
      id: 'projects',
      title: 'Projects',
      type: 'projects',
      url: 'https://myportfolio.dev/projects',
    });
  };

  const handleOpenResume = () => {
    // For the sake of the portfolio, maybe just navigate to about or a fake resume tab.
    // Let's open a new tab for Resume.
    openTab({
      id: 'resume',
      title: 'Resume.pdf',
      type: 'about',
      url: 'https://myportfolio.dev/resume.pdf',
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-12 max-w-6xl mx-auto py-12 lg:py-24">
      
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 space-y-8"
      >
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
          Building Websites That Feel <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Effortless</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
          Frontend developer focused on creating fast, beautiful, and user-focused digital experiences.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={handleViewProjects}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-indigo-600/20"
          >
            View Projects <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={handleOpenResume}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors border border-slate-700 hover:border-slate-600"
          >
            <FileText size={18} /> Open Resume
          </button>
        </div>
      </motion.div>

      {/* Hero Graphic: Floating Code Snippets */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 w-full max-w-md relative"
      >
        <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
        
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-6 shadow-2xl font-mono text-sm"
        >
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          </div>
          <pre className="text-slate-300 overflow-x-auto no-scrollbar">
            <code>
              <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> <span className="text-purple-400">=</span> {'{\n'}
              {'  '}name: <span className="text-green-400">"Duncan"</span>,\n
              {'  '}passion: <span className="text-green-400">"Building things"</span>,\n
              {'  '}skills: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Next.js"</span>, <span className="text-green-400">"Tailwind"</span>],\n
              {'  '}coffeeStatus: <span className="text-indigo-400">"Empty"</span>\n
              {'}'}
            </code>
          </pre>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-10 -right-10 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-4 shadow-2xl font-mono text-xs hidden md:block"
        >
           <pre className="text-slate-300">
            <code>
              <span className="text-purple-400">function</span> <span className="text-blue-400">createMagic</span>() {'{\n'}
              {'  '}return <span className="text-indigo-400">true</span>;\n
              {'}'}
            </code>
          </pre>
        </motion.div>
      </motion.div>

    </div>
  );
}
