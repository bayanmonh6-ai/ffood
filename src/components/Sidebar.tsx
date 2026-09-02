'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { UtensilsCrossed, ClipboardList, Settings, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';
import { useOrderSelection } from '@/context/OrderSelectionContext';


const navItems = [
  {
    id: 'nav-food-menu',
    label: 'Food menu',
    icon: UtensilsCrossed,
    href: '/',
  },
  {
    id: 'nav-orders',
    label: 'Orders',
    icon: ClipboardList,
    href: '/orders',
  },
  {
    id: 'nav-settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { deliveredCount } = useOrderSelection();

  return (
    <aside
      className={`sidebar-bg flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-[200px]'
      }`}
      style={{ borderRight: '1px solid var(--sidebar-border)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
        <AppLogo size={32} className="flex-shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-white font-bold text-base leading-tight">NomNom</p>
            <p className="text-xs" style={{ color: 'var(--sidebar-muted)' }}>Swift delivery</p>
          </div>
        )}
        {/* Mobile close button */}
        {onClose && !collapsed && (
          <button
            onClick={onClose}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 transition-colors hover:bg-sidebar-active/50"
            style={{ color: 'var(--sidebar-muted)' }}
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {navItems?.map((item) => {
          const Icon = item?.icon;
          const isActive = item?.href === '/'
            ? pathname === '/'
            : pathname?.startsWith(item?.href);

          return (
            <Link
              key={item?.id}
              href={item?.href}
              title={collapsed ? item?.label : undefined}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative ${
                isActive
                  ? 'sidebar-active text-white' : 'text-sidebar-muted hover:text-white hover:bg-sidebar-active/50'
              }`}
              style={{
                color: isActive ? 'white' : 'var(--sidebar-muted)',
              }}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item?.label}</span>
              )}
              {!collapsed && item?.id === 'nav-orders' && deliveredCount > 0 && (
                <span className="ml-auto text-xs font-bold bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {deliveredCount}
                </span>
              )}
              {collapsed && item?.id === 'nav-orders' && deliveredCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
              {/* Tooltip for collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-foreground text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50">
                  {item?.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: User + Collapse */}
      <div className="px-2 pb-4 flex flex-col gap-2" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg mx-auto transition-colors duration-150 hover:bg-sidebar-active/50"
          style={{ color: 'var(--sidebar-muted)' }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}