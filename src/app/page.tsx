"use client";

import React from 'react';
import { BrowserProvider } from '@/components/BrowserContext';
import { BrowserChrome } from '@/components/BrowserChrome';
import { TabRenderer } from '@/components/TabRenderer';
import { FakeConsole } from '@/components/FakeConsole';
import { MobileMenu } from '@/components/MobileMenu';
import { DinoMeteorOverlay } from '@/components/DinoMeteorOverlay';

export default function Home() {
  return (
    <BrowserProvider>
      <main className="min-h-screen bg-[#0F172A] p-2 md:p-6 lg:p-12 flex flex-col justify-center items-center font-sans">
        
        {/* Fake Desktop Background / Container */}
        <div className="w-full max-w-[1400px] h-[90vh] md:h-[85vh] flex flex-col rounded-xl shadow-2xl shadow-black/50 border border-slate-700/50 overflow-hidden relative">
          
          <BrowserChrome />
          <TabRenderer />
          <FakeConsole />
          <MobileMenu />
          <DinoMeteorOverlay />
          
        </div>

      </main>
    </BrowserProvider>
  );
}
