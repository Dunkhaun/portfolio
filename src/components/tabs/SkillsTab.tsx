import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Wrench } from 'lucide-react';

const skills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Vue', level: 75 },
    { name: 'Framer Motion', level: 80 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 80 },
    { name: 'PostgreSQL', level: 70 },
    { name: 'MongoDB', level: 75 },
  ],
  tools: [
    'Git', 'GitHub', 'VS Code', 'Figma', 'Vercel', 'Docker', 'Jest', 'Webpack'
  ]
};

export default function SkillsTab() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Technical Skills</h1>
        <p className="text-slate-400">A look at my developer toolkit and proficiencies.</p>
      </motion.div>

      <div className="space-y-12">
        {/* Frontend */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-2 mb-6">
            <Terminal size={24} className="text-indigo-400" /> Frontend
          </h2>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 space-y-5 font-mono text-sm">
            {skills.frontend.map((skill, index) => (
              <div key={skill.name} className="flex items-center">
                <div className="w-32 text-slate-300">{skill.name}</div>
                <div className="flex-1 flex gap-1">
                  {[...Array(10)].map((_, i) => {
                    const isFilled = (i + 1) * 10 <= skill.level;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + (index * 0.05) + (i * 0.02) }}
                        className={`w-4 h-5 rounded-sm ${isFilled ? 'bg-indigo-500' : 'bg-slate-700/50'}`}
                      />
                    );
                  })}
                </div>
                <div className="w-10 text-right text-indigo-400">{skill.level}%</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Backend */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-2 mb-6">
            <Database size={24} className="text-blue-400" /> Backend
          </h2>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 space-y-5 font-mono text-sm">
            {skills.backend.map((skill, index) => (
              <div key={skill.name} className="flex items-center">
                <div className="w-32 text-slate-300">{skill.name}</div>
                <div className="flex-1 flex gap-1">
                  {[...Array(10)].map((_, i) => {
                    const isFilled = (i + 1) * 10 <= skill.level;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.05) + (i * 0.02) }}
                        className={`w-4 h-5 rounded-sm ${isFilled ? 'bg-blue-500' : 'bg-slate-700/50'}`}
                      />
                    );
                  })}
                </div>
                <div className="w-10 text-right text-blue-400">{skill.level}%</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tools */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-2 mb-6">
            <Wrench size={24} className="text-purple-400" /> Tools & Workflow
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.05) }}
                className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-700/50 transition-colors cursor-default"
              >
                <span className="text-slate-300 font-medium">{tool}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
