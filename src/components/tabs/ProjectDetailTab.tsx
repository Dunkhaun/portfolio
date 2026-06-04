import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Monitor } from 'lucide-react';
import { projectsData } from '../../data/projects';

export default function ProjectDetailTab({ projectId }: { projectId: string }) {
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return <div className="p-8 text-center text-slate-400">Project not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className={`w-full h-64 md:h-96 rounded-2xl bg-gradient-to-br ${project.color} mb-8 flex items-center justify-center relative overflow-hidden border border-slate-700/50 shadow-2xl`}>
          <Monitor size={80} className="text-white/20" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </motion.div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-8"
        >
          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mb-3">The Problem</h2>
            <p className="text-slate-400 leading-relaxed">{project.problem}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mb-3">The Goal</h2>
            <p className="text-slate-400 leading-relaxed">{project.goal}</p>
          </section>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="text-sm font-medium px-3 py-1.5 bg-indigo-500/10 text-indigo-300 rounded-md border border-indigo-500/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-slate-100 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.features.map((feature, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl bg-slate-800/30 border border-slate-700/30">
              <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-1">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
