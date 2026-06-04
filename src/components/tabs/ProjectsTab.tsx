import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { useBrowser } from '../BrowserContext';
import { projectsData } from '../../data/projects';

export default function ProjectsTab() {
  const { openTab } = useBrowser();

  const handleOpenProject = (projectId: string, title: string) => {
    openTab({
      id: `project-${projectId}`,
      title: title,
      type: 'project',
      projectId: projectId,
      url: `https://myportfolio.dev/projects/${projectId}`,
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
        <p className="text-slate-400">Click a project to open it in a new tab.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleOpenProject(project.id, project.title)}
            className="group cursor-pointer bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col h-full"
          >
            {/* Screenshot or Gradient Placeholder */}
            <div className={`h-48 w-full relative overflow-hidden flex items-center justify-center ${!project.image ? `bg-gradient-to-br ${project.color}` : ''}`}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <>
                  <Folder size={48} className="text-white/30" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>


            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <ExternalLink size={18} className="text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
              </div>
              <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2.5 py-1 bg-slate-900 text-slate-300 rounded-md border border-slate-700">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs font-medium px-2.5 py-1 bg-slate-900 text-slate-500 rounded-md border border-slate-700">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
