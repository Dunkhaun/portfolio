import React from 'react';
import { useBrowser } from './BrowserContext';
import HomeTab from './tabs/HomeTab';
import AboutTab from './tabs/AboutTab';
import ProjectsTab from './tabs/ProjectsTab';
import ProjectDetailTab from './tabs/ProjectDetailTab';
import SkillsTab from './tabs/SkillsTab';
import ContactTab from './tabs/ContactTab';
import DoomTab from './tabs/DoomTab';

export function TabRenderer() {
  const { tabs, activeTabId } = useBrowser();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  if (!activeTab) return null;

  return (
    <div className="flex-1 overflow-y-auto bg-[#0F172A] relative text-slate-100 p-6 md:p-10 scroll-smooth">
      {/* We keep components mounted if we want to preserve state, but for simplicity, 
          we can just render the active one. Given React's nature, switching will unmount. 
          To feel like a real browser we could hide inactive tabs, but re-rendering is fine for this scope. */}
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div 
            key={tab.id} 
            className="w-full h-full"
            style={{ display: isActive ? 'block' : 'none' }}
          >
            {tab.type === 'home' && <HomeTab />}
            {tab.type === 'about' && <AboutTab />}
            {tab.type === 'projects' && <ProjectsTab />}
            {tab.type === 'project' && <ProjectDetailTab projectId={tab.projectId!} />}
            {tab.type === 'skills' && <SkillsTab />}
            {tab.type === 'contact' && <ContactTab />}
            {tab.type === 'doom' && <DoomTab />}
          </div>
        );
      })}
    </div>
  );
}
