'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { OrderSelectionProvider } from '@/context/OrderSelectionContext';

interface AppLayoutProps {
  children: React.ReactNode;
  topbarRight?: React.ReactNode;
}

export default function AppLayout({ children, topbarRight }: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <OrderSelectionProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Mobile overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar — hidden on mobile unless open */}
        <div
          className={`fixed inset-y-0 left-0 z-50 lg:static lg:z-auto transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <Sidebar onClose={() => setMobileSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Topbar */}
          <header
            className="flex items-center justify-between h-14 px-4 sm:px-6 bg-white flex-shrink-0"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            {/* Hamburger for mobile */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-3 ml-auto">
              {topbarRight ?? null}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </OrderSelectionProvider>
  );
}