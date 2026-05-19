"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 min-h-screen flex flex-col grid-bg">
        <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-background/90 backdrop-blur-xl border-b border-card-border lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg text-muted hover:text-gold transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-hermes tracking-wider">HERMES</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </>
  );
}
