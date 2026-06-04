"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TabType = 'home' | 'about' | 'projects' | 'skills' | 'contact' | 'project';

export interface Tab {
  id: string;
  title: string;
  type: TabType;
  projectId?: string;
  url: string;
  isClosable: boolean;
}

interface BrowserContextType {
  tabs: Tab[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  openTab: (tab: Omit<Tab, 'isClosable'>) => void;
  closeTab: (id: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isConsoleOpen: boolean;
  setIsConsoleOpen: (isOpen: boolean) => void;
  isDinoActive: boolean;
  setIsDinoActive: (active: boolean) => void;
}

const defaultTabs: Tab[] = [
  { id: 'home', title: 'Home', type: 'home', url: 'https://myportfolio.dev', isClosable: false },
  { id: 'about', title: 'About', type: 'about', url: 'https://myportfolio.dev/about', isClosable: false },
  { id: 'projects', title: 'Projects', type: 'projects', url: 'https://myportfolio.dev/projects', isClosable: false },
  { id: 'skills', title: 'Skills', type: 'skills', url: 'https://myportfolio.dev/skills', isClosable: false },
  { id: 'contact', title: 'Contact', type: 'contact', url: 'https://myportfolio.dev/contact', isClosable: false },
];

const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

export function BrowserProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTabId, setActiveTabId] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isDinoActive, setIsDinoActive] = useState(false);

  const openTab = (newTab: Omit<Tab, 'isClosable'>) => {
    // Check if a tab with this id already exists
    const existingTab = tabs.find((t) => t.id === newTab.id);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    // Otherwise, add the new tab
    setTabs((prev) => [...prev, { ...newTab, isClosable: true }]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string) => {
    setTabs((prev) => {
      const newTabs = prev.filter((t) => t.id !== id);
      
      // If we closed the active tab, switch to the Home tab (or the one before it if we want to be fancy, but Home is safe)
      if (activeTabId === id) {
        // Find the index of the closed tab in the original array
        const closedIndex = prev.findIndex(t => t.id === id);
        // Switch to the tab to its left if possible, otherwise 'home'
        if (closedIndex > 0) {
           setActiveTabId(prev[closedIndex - 1].id);
        } else {
           setActiveTabId('home');
        }
      }
      return newTabs;
    });
  };

  return (
    <BrowserContext.Provider
      value={{
        tabs,
        activeTabId,
        setActiveTabId,
        openTab,
        closeTab,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isConsoleOpen,
        setIsConsoleOpen,
        isDinoActive,
        setIsDinoActive
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
}

export function useBrowser() {
  const context = useContext(BrowserContext);
  if (context === undefined) {
    throw new Error('useBrowser must be used within a BrowserProvider');
  }
  return context;
}
