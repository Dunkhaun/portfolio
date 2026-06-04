import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Calendar, MapPin, Cpu } from 'lucide-react';

export default function AboutTab() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-2">About Me</h1>
        <p className="text-slate-400">Get to know the developer behind the screen.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Image & Quick Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1 space-y-6"
        >
          {/* Fake Image Placeholder */}
          <div className="aspect-square rounded-2xl bg-gradient-to-tr from-indigo-900 to-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden relative group">
            <User size={64} className="text-slate-600 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 space-y-4">
            <h3 className="text-lg font-semibold text-slate-200">Quick Facts</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3"><Calendar size={16} className="text-indigo-400" /> Age: 16</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-red-400" /> Location: Florida</li>
              <li className="flex items-center gap-3"><Code size={16} className="text-blue-400" /> Coding since: 11</li>
              <li className="flex items-center gap-3"><Cpu size={16} className="text-purple-400" /> Focus: Full-stack web development</li>
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Bio & Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 space-y-10"
        >
          {/* Biography */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-2">
              <User size={24} className="text-indigo-500" /> Biography
            </h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <p>
                Hi, I'm Duncan, a 16-year-old web developer born and raised in Florida. I've been learning programming since I was 11 years old, driven by a curiosity to understand how websites, applications, and other digital products are built.
              </p>
              <p>
                What started as experimenting with code and small personal projects has grown into a passion for creating modern, responsive, and user-focused web applications. I enjoy turning ideas into polished products, whether that means designing intuitive user interfaces or solving technical challenges behind the scenes.
              </p>
              <p>
                Alongside my work as a developer, I'm an honors student currently dual enrolled at Mosley High School while working toward my Associate of Arts (A.A.) degree. Balancing academics with software development has strengthened my problem-solving skills, discipline, and commitment to continuous learning.
              </p>
              <p>
                I'm constantly exploring new technologies and pushing myself to grow as both a developer and a designer. Every project is an opportunity to learn something new, refine my skills, and create something meaningful.
              </p>
              <p>
                When I'm not programming, you'll usually find me exploring emerging technologies, working on personal projects, gaming, or finding inspiration for my next build.
              </p>
              <p>
                Thanks for stopping by my portfolio. Feel free to explore my projects and see what I've been creating.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

